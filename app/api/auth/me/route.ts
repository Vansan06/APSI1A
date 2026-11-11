
import { prisma } from "@/lib/prisma";
import {
  getSession,
  makeSession,
  sessionCookie,
} from "@/lib/auth";
import {
  hashPassword,
  verifyPassword,
} from "@/lib/password";
import { fail, ok } from "@/lib/http";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return fail("Silakan login terlebih dahulu.", 401);
    }

    const user = await prisma.akun_pengguna.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        nama: true,
        email: true,
        phone: true,
        alamat: true,
        role: true,
        avatar_url: true,
        akses_terakhir: true,
        created_at: true,
      },
    });

    if (!user) {
      return fail("Pengguna tidak ditemukan.", 404);
    }

    return ok(user);
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    return fail("Gagal mengambil data profil.", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return fail("Silakan login terlebih dahulu.", 401);
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return fail("Data profil tidak valid.", 400);
    }

    const nama =
      typeof body.nama === "string"
        ? body.nama.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const phone =
      body.phone === null
        ? null
        : typeof body.phone === "string"
          ? body.phone.trim() || null
          : undefined;

    const alamat =
      body.alamat === null
        ? null
        : typeof body.alamat === "string"
          ? body.alamat.trim() || null
          : undefined;

    // Validasi nama
    if (!nama || nama.length < 2 || nama.length > 100) {
      return fail(
        "Nama harus berisi 2 sampai 100 karakter.",
        400
      );
    }

    // Validasi email
    if (
      !email ||
      email.length > 150 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return fail("Format email tidak valid.", 400);
    }

    // Validasi nomor telepon
    if (
      phone !== undefined &&
      phone !== null &&
      phone.length > 30
    ) {
      return fail(
        "Nomor telepon maksimal 30 karakter.",
        400
      );
    }

    // Validasi alamat
    if (
      alamat !== undefined &&
      alamat !== null &&
      alamat.length > 500
    ) {
      return fail(
        "Alamat maksimal 500 karakter.",
        400
      );
    }

    // Ambil akun berdasarkan session login
    const existingUser =
      await prisma.akun_pengguna.findUnique({
        where: {
          id: session.id,
        },
      });

    if (!existingUser || !existingUser.aktif) {
      return fail(
        "Akun tidak ditemukan atau tidak aktif.",
        404
      );
    }

    // Data yang akan diperbarui
    const updateData: {
      nama: string;
      email: string;
      phone?: string | null;
      alamat?: string | null;
      password_hash?: string;
    } = {
      nama,
      email,
    };

    if (phone !== undefined) {
      updateData.phone = phone;
    }

    if (alamat !== undefined) {
      updateData.alamat = alamat;
    }

    // Password hanya berubah jika password baru diisi
    const newPassword =
      typeof body.newPassword === "string"
        ? body.newPassword
        : "";

    if (newPassword) {
      const currentPassword =
        typeof body.currentPassword === "string"
          ? body.currentPassword
          : "";

      const confirmPassword =
        typeof body.confirmPassword === "string"
          ? body.confirmPassword
          : "";

      if (!currentPassword) {
        return fail(
          "Masukkan password saat ini.",
          400
        );
      }

      const passwordValid = verifyPassword(
        currentPassword,
        existingUser.password_hash
      );

      if (!passwordValid) {
        return fail(
          "Password saat ini tidak benar.",
          400
        );
      }

      if (
        newPassword.length < 8 ||
        newPassword.length > 128
      ) {
        return fail(
          "Password harus 8 sampai 128 karakter.",
          400
        );
      }

      if (newPassword !== confirmPassword) {
        return fail(
          "Konfirmasi password tidak cocok.",
          400
        );
      }

      updateData.password_hash =
        hashPassword(newPassword);
    }

    // Simpan seluruh perubahan ke akun yang sedang login
    const updatedUser =
      await prisma.akun_pengguna.update({
        where: {
          id: session.id,
        },
        data: updateData,
        select: {
          id: true,
          nama: true,
          email: true,
          phone: true,
          alamat: true,
          role: true,
          avatar_url: true,
          akses_terakhir: true,
        },
      });

    // Perbarui session agar nama dan email pada header ikut berubah
    const response = ok(updatedUser);

    response.cookies.set(
      sessionCookie,
      makeSession({
        id: updatedUser.id,
        name: updatedUser.nama,
        email: updatedUser.email,
        role: session.role,
      }),
      {
        httpOnly: true,
        sameSite: "lax",
        secure:
          process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 12,
      }
    );

    return response;

  } catch (error: unknown) {
    console.error("PATCH PROFILE ERROR:", error);

    const prismaError = error as {
      code?: string;
    };

    if (prismaError.code === "P2002") {
      return fail(
        "Email tersebut sudah digunakan akun lain.",
        409
      );
    }

    if (prismaError.code === "P2025") {
      return fail(
        "Akun tidak ditemukan.",
        404
      );
    }

    return fail(
      "Gagal menyimpan perubahan profil.",
      500
    );
  }
}
