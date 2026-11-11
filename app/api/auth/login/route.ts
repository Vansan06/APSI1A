import { prisma } from "@/lib/prisma";
import { makeSession, sessionCookie } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { fail, ok } from "@/lib/http";

const ROLE_MAP: Record<string, "admin" | "owner" | "supplier" | "karyawan produksi"> = {
  admin: "admin",
  owner: "owner",
  supplier: "supplier",
  "karyawan produksi": "karyawan produksi",
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    if (!email || !password) return fail("Email dan password wajib diisi.");

    const user = await prisma.akun_pengguna.findUnique({ where: { email } });
    if (!user || !user.aktif || !verifyPassword(password, user.password_hash)) {
      return fail("Email atau password tidak valid.", 401);
    }

    const role = ROLE_MAP[String(user.role).trim().toLowerCase()];
    if (!role) return fail("Role akun tidak dikenali. Hubungi administrator.", 403);

    await prisma.akun_pengguna.update({
      where: { id: user.id },
      data: { akses_terakhir: new Date() },
    });

    const response = ok({
      id: user.id,
      name: user.nama,
      email: user.email,
      role,
    });

    response.cookies.set(
      sessionCookie,
      makeSession({ id: user.id, name: user.nama, email: user.email, role }),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 12,
      },
    );
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return fail("Gagal memproses login.", 500);
  }
}
