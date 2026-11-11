import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { fail, ok } from "@/lib/http";

const ROLE_MAP: Record<string, "admin" | "owner" | "supplier" | "karyawan produksi"> = {
  admin: "admin",
  owner: "owner",
  supplier: "supplier",
  "karyawan produksi": "karyawan produksi",
};

function makeId(prefix: string) {
  // Semua ID relasi dibuat maksimal 20 karakter sesuai skema lama.
  return `${prefix}-${randomBytes(8).toString("hex")}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return fail("Data pendaftaran tidak valid.");
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const requestedRole =
      typeof body.role === "string" ? body.role.trim().toLowerCase() : "";
    const role = ROLE_MAP[requestedRole];

    if (!name || !email || !phone || !password || !requestedRole) {
      return fail("Semua kolom wajib diisi.");
    }
    if (name.length > 100) return fail("Nama maksimal 100 karakter.");
    if (email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail("Format email tidak valid.");
    }
    if (phone.length > 30) return fail("Nomor telepon maksimal 30 karakter.");
    if (password.length < 8) return fail("Password minimal 8 karakter.");
    if (password.length > 128) return fail("Password maksimal 128 karakter.");
    if (!role) return fail("Role yang dipilih tidak valid.");

    const existing = await prisma.akun_pengguna.findUnique({
      where: { email },
      select: { id: true },
    });
    if (existing) {
      return fail("Email sudah terdaftar. Silakan gunakan email lain.", 409);
    }

    const userId = makeId("USR");
    const refId =
      role === "admin" ? makeId("ADM") :
      role === "owner" ? makeId("OWN") :
      role === "supplier" ? makeId("SUP") :
      makeId("KRY");

    const user = await prisma.$transaction(async (tx) => {
      // Buat record role terkait agar akun baru juga memiliki identitas
      // pada tabel operasional lama, bukan hanya pada akun_pengguna.
      if (role === "admin") {
        await tx.admin.create({ data: { id_admin: refId } });
      } else if (role === "owner") {
        await tx.owner.create({ data: { id_owner: refId } });
      } else if (role === "supplier") {
        await tx.supplier.create({
          data: {
            id_supplier: refId,
            nama_supplier: name,
            username: email,
            email,
          },
        });
      } else {
        await tx.karyawan_produksi.create({
          data: { id_karyawan: refId },
        });
      }

      return tx.akun_pengguna.create({
        data: {
          id: userId,
          nama: name,
          email,
          phone,
          password_hash: hashPassword(password),
          role,
          ref_id: refId,
          aktif: true,
        },
        select: {
          id: true,
          nama: true,
          email: true,
          phone: true,
          role: true,
          ref_id: true,
          created_at: true,
        },
      });
    });

    return ok(
      {
        message: "Akun berhasil dibuat. Silakan masuk menggunakan akun baru.",
        user,
      },
      201,
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return fail("Email sudah terdaftar. Silakan gunakan email lain.", 409);
    }

    console.error("Register error:", error);
    return fail("Pendaftaran gagal. Periksa koneksi database dan coba lagi.", 500);
  }
}
