import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export type Role = "admin" | "karyawan produksi" | "supplier" | "owner";
export type Session = { id: string; name: string; email: string; role: Role; exp: number };
const COOKIE = "dfo_session";
const secret = () => process.env.SESSION_SECRET || (process.env.NODE_ENV === "production" ? "" : "dev-only-change-this-secret");
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }
export function makeSession(session: Omit<Session, "exp">) {
  if (!secret()) throw new Error("SESSION_SECRET wajib diatur.");
  const payload = Buffer.from(JSON.stringify({ ...session, exp: Date.now() + 1000 * 60 * 60 * 12 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token || !secret()) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = Buffer.from(sign(payload)); const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
  try { const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session; return session.exp > Date.now() ? session : null; } catch { return null; }
}
export async function requireRole(roles?: Role[]) {
  const session = await getSession();
  if (!session) return { session: null, response: NextResponse.json({ success:false, error:"Unauthenticated" }, { status:401 }) };
  if (roles && !roles.includes(session.role)) return { session:null, response:NextResponse.json({ success:false, error:"Forbidden" }, { status:403 }) };
  return { session, response:null };
}
export const sessionCookie = COOKIE;
