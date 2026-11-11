import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { ok, fail } from "@/lib/http";
import { dayStart } from "@/lib/ids";

export async function GET(request: Request) {
  const auth = await requireRole();
  if (auth.response) return auth.response;

  const url = new URL(request.url);
  const tanggal = dayStart(url.searchParams.get("tanggal") || undefined);
  const capacity = await prisma.kapasitas_harian.findUnique({ where: { tanggal } });

  return ok({
    tanggal,
    kapasitas_total: capacity?.kapasitas_total ?? 800,
    kapasitas_terpakai: capacity?.kapasitas_terpakai ?? 0,
    sisa: Math.max(0, (capacity?.kapasitas_total ?? 800) - (capacity?.kapasitas_terpakai ?? 0)),
    jam_operasional: capacity?.jam_operasional ?? "08:00-17:00",
  });
}

export async function PATCH(request: Request) {
  const auth = await requireRole(["admin", "owner"]);
  if (auth.response) return auth.response;

  const body = await request.json().catch(() => null);
  if (!body) return fail("Data kapasitas tidak valid.");

  const tanggal = dayStart(body.tanggal);
  const total = Number(body.kapasitas_total);
  if (!Number.isInteger(total) || total < 0) return fail("Kapasitas harus berupa bilangan bulat non-negatif.");

  const current = await prisma.kapasitas_harian.findUnique({ where: { tanggal } });
  if (current && total < current.kapasitas_terpakai) {
    return fail("Kapasitas tidak boleh lebih kecil dari pemakaian saat ini.");
  }

  const row = await prisma.kapasitas_harian.upsert({
    where: { tanggal },
    create: { tanggal, kapasitas_total: total, jam_operasional: body.jam_operasional ?? null },
    update: { kapasitas_total: total, jam_operasional: body.jam_operasional ?? undefined },
  });
  return ok(row);
}
