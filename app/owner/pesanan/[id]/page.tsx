'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock database data pesanan pelanggan lengkap
const DATA_DETAIL_PESANAN: Record<string, {
  id: string;
  pelanggan: string;
  tanggal: string;
  jenis: string;
  status: string;
  total: string;
  kontak: string;
  alamat: string;
  item: string;
  pembayaran: string;
}> = {
  'PSN-1025-107': {
    id: 'PSN-1025-107',
    pelanggan: 'Ibu Rani',
    tanggal: '25 Oktober 2026',
    jenis: 'Kotak donat',
    status: 'Dikemas',
    total: 'Rp192.000',
    kontak: '0812-9876-5432',
    alamat: 'Jl. Dago No. 45, Bandung',
    item: '2 Box Donat Assorted (24 pcs)',
    pembayaran: 'QRIS - Lunas',
  },
  'PSN-1025-108': {
    id: 'PSN-1025-108',
    pelanggan: 'Bapak Adi',
    tanggal: '25 Oktober 2026',
    jenis: 'Kotak donat',
    status: 'Dikemas',
    total: 'Rp96.000',
    kontak: '0813-1122-3344',
    alamat: 'Jl. Riau No. 12, Bandung',
    item: '1 Box Donat Cokelat (12 pcs)',
    pembayaran: 'Transfer Bank - Lunas',
  },
  'PSN-1025-109': {
    id: 'PSN-1025-109',
    pelanggan: 'Kantor Sejahtera',
    tanggal: '25 Oktober 2026',
    jenis: 'Kotak donat',
    status: 'Dikemas',
    total: 'Rp480.000',
    kontak: '0811-5566-7788',
    alamat: 'Gedung Wisma Lt. 3, Bandung',
    item: '5 Box Donat Mix Party (60 pcs)',
    pembayaran: 'Transfer Bank - Lunas',
  },
  'PSN-1025-110': {
    id: 'PSN-1025-110',
    pelanggan: 'Ibu Dewi',
    tanggal: '25 Oktober 2026',
    jenis: 'Kotak donat',
    status: 'Diproses',
    total: 'Rp48.000',
    kontak: '0815-4433-2211',
    alamat: 'Ambil di Toko',
    item: '1/2 Box Donat Keju (6 pcs)',
    pembayaran: 'Tunai di Kasir',
  },
  'PSN-1025-111': {
    id: 'PSN-1025-111',
    pelanggan: 'Bapak Rizal',
    tanggal: '25 Oktober 2026',
    jenis: 'Kotak donat',
    status: 'Diproses',
    total: 'Rp288.000',
    kontak: '0817-9988-7766',
    alamat: 'Jl. Buah Batu No. 88, Bandung',
    item: '3 Box Donat Gula & Stroberi (36 pcs)',
    pembayaran: 'QRIS - Lunas',
  },
  'PSN-1025-106': {
    id: 'PSN-1025-106',
    pelanggan: 'Ibu Maya',
    tanggal: '25 Oktober 2026',
    jenis: 'Kotak donat',
    status: 'Selesai',
    total: 'Rp96.000',
    kontak: '0819-3322-1100',
    alamat: 'Jl. Cihampelas No. 20, Bandung',
    item: '1 Box Donat Keju (12 pcs)',
    pembayaran: 'QRIS - Lunas',
  },
};

export default function DetailPesananOwnerPage() {
  const params = useParams();
  const id = params?.id as string;

  // Ambil data pesanan sesuai ID dari URL, atau fallback ke PSN-1025-107 jika tidak ditemukan
  const pesanan = DATA_DETAIL_PESANAN[id] || DATA_DETAIL_PESANAN['PSN-1025-107'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Breadcrumb Header */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '10px 20px', fontSize: '12px', color: '#a02e59' }}>
        <Link href="/owner/pesanan" style={{ color: '#a02e59', textDecoration: 'none' }}>← Kembali ke Pesanan</Link> / Detail Pesanan
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '18px', color: '#a02e59', margin: '0 0 16px 0', fontWeight: 'bold' }}>Detail Pesanan</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Kolom Kiri: Fakta Tercatat */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <h5 style={{ color: '#a02e59', margin: 0, fontWeight: 'bold' }}>Fakta tercatat</h5>
            <div>
              <div style={{ color: '#777', fontSize: '11px' }}>ID pesanan</div>
              <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#a02e59' }}>{pesanan.id}</div>
            </div>
            <div>
              <div style={{ color: '#777', fontSize: '11px' }}>Nama pelanggan</div>
              <div style={{ fontWeight: 'bold' }}>{pesanan.pelanggan}</div>
            </div>
            <div>
              <div style={{ color: '#777', fontSize: '11px' }}>Tanggal pesanan</div>
              <div style={{ fontWeight: 'bold' }}>{pesanan.tanggal}</div>
            </div>
            <div>
              <div style={{ color: '#777', fontSize: '11px' }}>Jenis pesanan</div>
              <div style={{ fontWeight: 'bold' }}>{pesanan.jenis}</div>
            </div>
            <div>
              <div style={{ color: '#777', fontSize: '11px' }}>Status</div>
              <span style={{
                backgroundColor: pesanan.status === 'Dikemas' ? '#fef7e0' : pesanan.status === 'Diproses' ? '#e8f0fe' : '#e6f4ea',
                color: pesanan.status === 'Dikemas' ? '#b45309' : pesanan.status === 'Diproses' ? '#1a73e8' : '#137333',
                padding: '2px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 'bold',
                display: 'inline-block'
              }}>
                {pesanan.status}
              </span>
            </div>
            <div>
              <div style={{ color: '#777', fontSize: '11px' }}>Total biaya</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#a02e59' }}>{pesanan.total}</div>
            </div>
          </div>

          {/* Kolom Kanan: Rincian Lengkap */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <h5 style={{ color: '#a02e59', margin: 0, fontWeight: 'bold' }}>Informasi rincian</h5>
            <div><span style={{ color: '#777' }}>Kontak:</span> <span style={{ fontWeight: 'bold' }}>{pesanan.kontak}</span></div>
            <div><span style={{ color: '#777' }}>Alamat:</span> <span style={{ fontWeight: 'bold' }}>{pesanan.alamat}</span></div>
            <div><span style={{ color: '#777' }}>Detail item:</span> <span style={{ fontWeight: 'bold', color: '#a02e59' }}>{pesanan.item}</span></div>
            <div><span style={{ color: '#777' }}>Pembayaran:</span> <span style={{ fontWeight: 'bold', color: '#137333' }}>{pesanan.pembayaran}</span></div>
          </div>

        </div>
      </div>

      {/* Card Info Akses Baca-saja */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h5 style={{ color: '#a02e59', margin: '0 0 4px 0', fontWeight: 'bold' }}>Akses baca-saja</h5>
        <p style={{ fontSize: '12px', color: '#777', margin: '0 0 16px 0' }}>
          Halaman ini menampilkan data pesanan yang sudah tercatat. Owner dapat melihat informasi bisnis yang tersedia tanpa kemampuan edit, tambah, hapus, atau meminta persetujuan.
        </p>
        <Link href="/owner/pesanan" style={{ padding: '10px 24px', border: '1px solid #a02e59', borderRadius: '20px', color: '#a02e59', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', display: 'inline-block' }}>
          ← Kembali ke Pesanan
        </Link>
      </div>

    </div>
  );
}