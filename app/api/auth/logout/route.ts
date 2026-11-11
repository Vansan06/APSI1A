
import { NextResponse } from "next/server";
import { sessionCookie } from "@/lib/auth";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Berhasil keluar dari akun.",
    });

    response.cookies.set(sessionCookie, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("LOGOUT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengakhiri sesi login.",
      },
      { status: 500 }
    );
  }
}
