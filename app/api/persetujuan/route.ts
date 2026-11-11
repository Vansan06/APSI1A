import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { ok, fail } from "@/lib/http";
export async function GET(){const a=await requireRole(["owner","admin"]);if(a.response)return a.response;return ok(await prisma.pesanan_bahan_baku.findMany({where:{status:"Menunggu Supplier"},include:{supplier:true,detail_pesanan_bahan_baku:{include:{bahan_baku:true}}},orderBy:{tanggal_pesanan:"desc"}}));}
export async function PATCH(r:Request){const a=await requireRole(["owner"]);if(a.response)return a.response;const b=await r.json();if(!b.id_pengadaan)return fail("id_pengadaan wajib diisi.");try{return ok(await prisma.pesanan_bahan_baku.update({where:{id_pengadaan:b.id_pengadaan},data:{persetujuan_owner:a.session!.id,status:b.status??"Diterima Supplier"}}));}catch{return fail("PO tidak ditemukan.",404);}}
