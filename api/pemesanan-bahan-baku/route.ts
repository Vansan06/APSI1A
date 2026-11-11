import { NextResponse } from 'next/server';
import {
  createNomorPemesanan,
  getPemesananDatabase,
  type StatusPemesanan,
} from './store';

type Role = 'Admin' | 'Supplier' | 'Owner';

function getRole(request: Request): Role | null {
  const role = request.headers.get('x-user-role')?.trim().toLowerCase();

  if (role === 'admin') return 'Admin';
  if (role === 'supplier') return 'Supplier';
  if (role === 'owner') return 'Owner';
  return null;
}

function isValidOrderInput(
  body: unknown,
): body is Record<string, unknown> & {
  supplier: string;
  bahanBaku: string;
  jumlah: string;
  totalHarga: number;
} {
  if (!body || typeof body !== 'object') return false;

  const input = body as Record<string, unknown>;
  return (
    typeof input.supplier === 'string' &&
    input.supplier.trim().length > 0 &&
    typeof input.bahanBaku === 'string' &&
    input.bahanBaku.trim().length > 0 &&
    typeof input.jumlah === 'string' &&
    input.jumlah.trim().length > 0 &&
    typeof input.totalHarga === 'number' &&
    Number.isFinite(input.totalHarga) &&
    input.totalHarga > 0
  );
}

// Admin, Supplier, dan Owner dapat melihat pesanan sesuai hak akses pada matrix.
export async function GET(request: Request) {
  const role = getRole(request);
  if (!role) {
    return NextResponse.json({ success: false, message: 'Akses ditolak' }, { status: 403 });
  }

  const data = getPemesananDatabase();
  return NextResponse.json({
    success: true,
    roleAkses: role,
    totalData: data.length,
    data,
  });
}

// Admin membuat pesanan baru yang harus disetujui Owner sebelum dikirim ke Supplier.
export async function POST(request: Request) {
  if (getRole(request) !== 'Admin') {
    return NextResponse.json(
      { success: false, message: 'Hanya Admin yang dapat membuat pesanan bahan baku' },
      { status: 403 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Format JSON tidak valid' }, { status: 400 });
  }

  if (!isValidOrderInput(body)) {
    return NextResponse.json(
      {
        success: false,
        message: 'supplier, bahanBaku, jumlah, dan totalHarga (angka positif) wajib diisi',
      },
      { status: 400 },
    );
  }

  const order = {
    id: createNomorPemesanan(),
    supplier: body.supplier.trim(),
    bahanBaku: body.bahanBaku.trim(),
    jumlah: body.jumlah.trim(),
    totalHarga: body.totalHarga,
    status: 'Menunggu Persetujuan Owner' as const,
    tanggalPesan: new Date().toISOString().slice(0, 10),
    dibuatOleh: 'Admin',
    disetujuiOleh: null,
  };
  getPemesananDatabase().push(order);

  return NextResponse.json(
    { success: true, message: 'Pesanan dibuat dan menunggu persetujuan Owner', data: order },
    { status: 201 },
  );
}

// Admin hanya dapat mengubah detail pesanan sebelum Owner memproses persetujuan.
export async function PUT(request: Request) {
  if (getRole(request) !== 'Admin') {
    return NextResponse.json(
      { success: false, message: 'Hanya Admin yang dapat mengubah detail pesanan' },
      { status: 403 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Format JSON tidak valid' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ success: false, message: 'Data pesanan tidak valid' }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  if (typeof input.id !== 'string' || !isValidOrderInput(input)) {
    return NextResponse.json(
      {
        success: false,
        message: 'id, supplier, bahanBaku, jumlah, dan totalHarga (angka positif) wajib diisi',
      },
      { status: 400 },
    );
  }

  const order = getPemesananDatabase().find((item) => item.id === input.id);
  if (!order) {
    return NextResponse.json({ success: false, message: 'Pesanan tidak ditemukan' }, { status: 404 });
  }
  if (order.status !== 'Menunggu Persetujuan Owner') {
    return NextResponse.json(
      { success: false, message: 'Detail hanya dapat diubah sebelum persetujuan Owner' },
      { status: 409 },
    );
  }

  order.supplier = input.supplier.trim();
  order.bahanBaku = input.bahanBaku.trim();
  order.jumlah = input.jumlah.trim();
  order.totalHarga = input.totalHarga;

  return NextResponse.json({ success: true, message: 'Pesanan berhasil diperbarui', data: order });
}

// Supplier menerima pesanan setelah Owner menyetujuinya.
export async function PATCH(request: Request) {
  if (getRole(request) !== 'Supplier') {
    return NextResponse.json(
      { success: false, message: 'Hanya Supplier yang dapat menerima pesanan' },
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
    (body as Record<string, unknown>).keputusan !== 'Terima'
  ) {
    return NextResponse.json(
      { success: false, message: 'id dan keputusan "Terima" wajib diisi' },
      { status: 400 },
    );
  }

  const { id } = body as { id: string; keputusan: 'Terima' };
  const order = getPemesananDatabase().find((item) => item.id === id);
  if (!order) {
    return NextResponse.json({ success: false, message: 'Pesanan tidak ditemukan' }, { status: 404 });
  }
  if (order.status !== 'Menunggu Konfirmasi Supplier') {
    return NextResponse.json(
      { success: false, message: 'Pesanan belum disetujui Owner atau sudah diproses Supplier' },
      { status: 409 },
    );
  }

  order.status = 'Diterima Supplier' satisfies StatusPemesanan;
  return NextResponse.json({ success: true, message: 'Pesanan diterima Supplier', data: order });
}
