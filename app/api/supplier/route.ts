import{prisma}from"@/lib/prisma";import{requireRole}from"@/lib/auth";import{ok,fail}from"@/lib/http";
export async function GET(){const a=await requireRole(["admin","owner"]);if(a.response)return a.response;return ok(await prisma.supplier.findMany({select:{id_supplier:true,nama_supplier:true,email:true,alamat:true},orderBy:{nama_supplier:"asc"}}));}
