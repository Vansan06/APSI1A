import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { fail, ok } from "@/lib/http";
import { newId } from "@/lib/ids";
import { hashPassword } from "@/lib/password";
export async function GET() { const auth=await requireRole(["admin","owner"]); if(auth.response)return auth.response; const rows=await prisma.akun_pengguna.findMany({select:{id:true,nama:true,email:true,role:true,avatar_url:true,aktif:true,akses_terakhir:true,created_at:true},orderBy:{nama:"asc"}}); return ok(rows); }
export async function POST(request:Request) { const auth=await requireRole(["admin"]); if(auth.response)return auth.response; try { const b=await request.json(); if(!b.nama||!b.email||!b.password||!b.role)return fail("Nama, email, password, dan role wajib diisi."); const row=await prisma.akun_pengguna.create({data:{id:newId("USR"),nama:b.nama,email:String(b.email).toLowerCase(),password_hash:hashPassword(b.password),role:b.role,ref_id:b.ref_id??null,avatar_url:b.avatar_url??null}}); return ok({id:row.id,nama:row.nama,email:row.email,role:row.role},201); } catch(e){return fail("Email mungkin sudah digunakan.",409);} }
