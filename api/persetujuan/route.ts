import { NextResponse } from 'next/server';
import { getPemesananDatabase } from '../pemesanan-bahan-baku/store';

function getRole(request: Request) {
  const role = request.headers.get('x-user-role')?.trim().toLowerCase();
  return role === 'owner' ? 'Owner' : role === 'admin' ? 'Admin' : null;
}

// Owner meninjau pengajuan; Admin dapat melihat status persetujuan.
export async function GET(request: Request) {
  const role = getRole(request);
  if (!role) {
    return NextResponse.json(
      { success: false, message: 'Hanya Admin dan Owner yang dapat melihat pengajuan' },
      { status: 403 },
    );
  }

  const data = getPemesananDatabase().filter(
    (order) =>
      order.status === 'Menunggu Persetujuan Owner' ||
      order.status === 'Menunggu Konfirmasi Supplier' ||
      order.status === 'Disetujui Owner' ||
      order.status === 'Ditolak Owner',
  );
  return NextResponse.json({ success: true, roleAkses: role, data });
}

// Owner menyetujui atau menolak pesanan Admin.
export async function PATCH(request: Request) {
  if (getRole(request) !== 'Owner') {
    return NextResponse.json(
      { success: false, message: 'Hanya Owner yang dapat menyetujui pesanan bahan baku' },
      { status: 403 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Format JSON tidak valid' }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== 'object' ||
    typeof (body as Record<string, unknown>).id !== 'string' ||
    !['Disetujui', 'Ditolak'].includes(String((body as Record<string, unknown>).keputusan))
  ) {
    return NextResponse.json(
      { success: false, message: 'id dan keputusan "Disetujui" atau "Ditolak" wajib diisi' },
      { status: 400 },
    );
  }

  const { id, keputusan } = body as { id: string; keputusan: 'Disetujui' | 'Ditolak' };
  const order = getPemesananDatabase().find((item) => item.id === id);
  if (!order) {
    return NextResponse.json({ success: false, message: 'Pengajuan tidak ditemukan' }, { status: 404 });
  }
  if (order.status !== 'Menunggu Persetujuan Owner') {
    return NextResponse.json(
      { success: false, message: 'Pengajuan sudah diproses atau tidak menunggu persetujuan' },
      { status: 409 },
    );
  }

  order.status = keputusan === 'Disetujui' ? 'Menunggu Konfirmasi Supplier' : 'Ditolak Owner';
  order.disetujuiOleh = 'Owner';

  return NextResponse.json({
    success: true,
    message: `Pesanan ${keputusan.toLowerCase()} oleh Owner`,
    data: order,
  });
}
