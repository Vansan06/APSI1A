import { NextResponse } from 'next/server';

// Simulasi database pemesanan bahan baku
let PEMESANAN_DATABASE = [
  {
    id: 'PO-20261024-01',
    supplier: 'PT Prima Dairy',
    bahanBaku: 'Mentega',
    jumlah: '20 kg',
    totalHarga: 'Rp2.400.000',
    status: 'Menunggu Konfirmasi',
    tanggalPesan: '24 Okt 2026',
    dibuatOleh: 'Admin (Enji Putri)',
  },
  {
    id: 'PO-20261024-02',
    supplier: 'CV Cokelat Nusantara',
    bahanBaku: 'Cokelat Batang',
    jumlah: '15 kg',
    totalHarga: 'Rp1.800.000',
    status: 'Diterima Supplier',
    tanggalPesan: '24 Okt 2026',
    dibuatOleh: 'Admin (Enji Putri)',
  },
];

// 1. GET: Dilihat oleh ADMIN (untuk cek status) & SUPPLIER (untuk melihat pesanan masuk)
export async function GET(request: Request) {
  const role = request.headers.get('x-user-role'); // Dipassing via Middleware/Session

  if (role !== 'Admin' && role !== 'Supplier' && role !== 'Owner') {
    return NextResponse.json({ success: false, message: 'Akses Ditolak' }, { status: 403 });
  }

  return NextResponse.json({
    success: true,
    roleAkses: role,
    totalData: PEMESANAN_DATABASE.length,
    data: PEMESANAN_DATABASE,
  });
}

// 2. POST: Khusus AKTOR ADMIN (Place Order Bahan Baku)
export async function POST(request: Request) {
  const role = request.headers.get('x-user-role');

  if (role !== 'Admin') {
    return NextResponse.json({ success: false, message: 'Hanya Admin yang dapat membuat pesanan bahan baku' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const newOrder = {
      id: `PO-${Date.now()}`,
      supplier: body.supplier,
      bahanBaku: body.bahanBaku,
      jumlah: body.jumlah,
      totalHarga: body.totalHarga,
      status: 'Menunggu Konfirmasi',
      tanggalPesan: '24 Okt 2026',
      dibuatOleh: 'Admin (Enji Putri)',
    };

    PEMESANAN_DATABASE.push(newOrder);

    return NextResponse.json({
      success: true,
      message: 'Pesanan bahan baku berhasil dibuat oleh Admin',
      data: newOrder,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Format data tidak valid' }, { status: 400 });
  }
}

// 3. PATCH: Khusus AKTOR SUPPLIER (Konfirmasi / Terima Pesanan)
export async function PATCH(request: Request) {
  const role = request.headers.get('x-user-role');

  if (role !== 'Supplier') {
    return NextResponse.json({ success: false, message: 'Hanya Supplier yang dapat mengonfirmasi pesanan' }, { status: 403 });
  }

  try {
    const { id, statusPenerimaan } = await request.json();
    const itemIndex = PEMESANAN_DATABASE.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ success: false, message: 'Pesanan tidak ditemukan' }, { status: 404 });
    }

    // Update status oleh Supplier
    PEMESANAN_DATABASE[itemIndex].status = statusPenerimaan; // e.g., "Diterima Supplier" / "Dikirim"

    return NextResponse.json({
      success: true,
      message: `Pesanan ${id} berhasil diperbarui oleh Supplier`,
      data: PEMESANAN_DATABASE[itemIndex],
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal memperbarui status' }, { status: 400 });
  }
}