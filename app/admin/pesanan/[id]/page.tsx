'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Info } from 'lucide-react';

interface PesananDetailMap {
  [key: string]: {
    noPo: string;
    pelanggan: string;
    tanggal: string;
    waktu: string;
    produk: string;
    kodeProduk: string;
    kuantitas: string;
    hargaSatuan: string;
    subtotal: string;
    total: string;
    statusPesanan: string;
    statusPembayaran: string;
    metodePembayaran: string;
    catatan: string;
    infoAlert: string;
    imageSrc: string;
  };
}

const DETAIL_DATA: PesananDetailMap = {
  'PSN-261024-01': {
    noPo: 'PSN-261024-01',
    pelanggan: 'Toko Sari',
    tanggal: '24 Oktober 2026',
    waktu: '14.00',
    produk: 'Donat Cokelat',
    kodeProduk: 'PRD-001 • per pcs',
    kuantitas: '200 pcs',
    hargaSatuan: 'Rp8.000',
    subtotal: 'Rp1.600.000',
    total: 'Rp1.600.000',
    statusPesanan: 'Siap dikirim',
    statusPembayaran: 'Lunas',
    metodePembayaran: 'Transfer bank',
    catatan: '200 Donat Cokelat siap diambil pukul 14.00. Pembayaran lunas melalui transfer bank.',
    infoAlert: 'Pesanan siap diambil. Pastikan 200 pcs Donat Cokelat sudah disiapkan untuk Toko Sari sebelum waktu pengambilan pukul 14.00.',
    imageSrc: '/donat-cokelat.png',
  },
  'PSN-261024-02': {
    noPo: 'PSN-261024-02',
    pelanggan: 'Kafe Senja',
    tanggal: '24 Oktober 2026',
    waktu: '15.30',
    produk: 'Donat Keju',
    kodeProduk: 'PRD-002 • per pcs',
    kuantitas: '150 pcs',
    hargaSatuan: 'Rp9.000',
    subtotal: 'Rp1.350.000',
    total: 'Rp1.350.000',
    statusPesanan: 'Diproduksi',
    statusPembayaran: 'Lunas',
    metodePembayaran: 'Transfer bank',
    catatan: 'Pesanan sedang diproses di divisi produksi batch 2.',
    infoAlert: 'Pesanan dalam tahap produksi. Estimasi selesai pukul 15.00.',
    imageSrc: '/donat-keju.png',
  },
  'PSN-261024-03': {
    noPo: 'PSN-261024-03',
    pelanggan: 'Dina Lestari',
    tanggal: '24 Oktober 2026',
    waktu: '11.00',
    produk: 'Donat Gula',
    kodeProduk: 'PRD-003 • per pcs',
    kuantitas: '120 pcs',
    hargaSatuan: 'Rp12.000',
    subtotal: 'Rp1.440.000',
    total: 'Rp1.440.000',
    statusPesanan: 'Siap dikirim',
    statusPembayaran: 'Lunas',
    metodePembayaran: 'Tunai',
    catatan: 'Pembayaran tunai saat pengambilan barang di outlet.',
    infoAlert: 'Pesanan telah siap dikemas dan menunggu pengambilan.',
    imageSrc: '/donat-gula.png',
  },
  'PSN-261024-04': {
    noPo: 'PSN-261024-04',
    pelanggan: 'Bima Pratama',
    tanggal: '24 Oktober 2026',
    waktu: '16.00',
    produk: 'Donat Stroberi',
    kodeProduk: 'PRD-004 • per pcs',
    kuantitas: '50 pcs',
    hargaSatuan: 'Rp11.800',
    subtotal: 'Rp590.000',
    total: 'Rp590.000',
    statusPesanan: 'Menunggu bayar',
    statusPembayaran: 'Belum lunas',
    metodePembayaran: 'Transfer bank',
    catatan: 'Menunggu bukti transfer konfirmasi pembayaran.',
    infoAlert: 'Menunggu konfirmasi pembayaran dari pelanggan sebelum masuk antrean produksi.',
    imageSrc: '/donat-stroberi.png',
  },
};

export default function DetailPesananAdminPage() {
  const params = useParams();
  const id = (params?.id as string) || 'PSN-261024-01';
  const data = DETAIL_DATA[id] || DETAIL_DATA['PSN-261024-01'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Pesanan &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Detail Pesanan</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Detail Pesanan
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Informasi lengkap pesanan {data.noPo}. Data ditampilkan dalam mode baca-saja.
          </div>
        </div>

        <Link
          href="/admin/pesanan"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            border: '1px solid #6b21a8',
            borderRadius: '20px',
            color: '#6b21a8',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Data Pesanan</span>
        </Link>
      </div>

      {/* INFORMASI PESANAN */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>Informasi pesanan</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '12px' }}>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Nomor pesanan</div>
            <div style={{ fontWeight: 'bold', color: '#6b21a8', fontSize: '14px', marginTop: '2px' }}>{data.noPo}</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Pelanggan</div>
            <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.pelanggan}</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Tanggal pesanan</div>
            <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.tanggal}</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Waktu pengambilan</div>
            <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.waktu}</div>
          </div>
        </div>
      </div>

      {/* RINCIAN ITEM PESANAN */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>Rincian item pesanan</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '16px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Produk</th>
              <th style={{ padding: '10px' }}>Kuantitas (pcs)</th>
              <th style={{ padding: '10px' }}>Harga satuan</th>
              <th style={{ padding: '10px' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={data.imageSrc}
                    alt={data.produk}
                    style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', backgroundColor: '#f3e8ff' }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>{data.produk}</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>{data.kodeProduk}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '12px 10px', color: '#333' }}>{data.kuantitas}</td>
              <td style={{ padding: '12px 10px', color: '#333' }}>{data.hargaSatuan}</td>
              <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#333' }}>{data.subtotal}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>1 jenis produk • {data.kuantitas}</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
            Total pesanan <span style={{ color: '#6b21a8', fontSize: '18px', marginLeft: '8px' }}>{data.total}</span>
          </div>
        </div>
      </div>

      {/* STATUS & CATATAN */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
        
        <div style={cardStyle}>
          <h3 style={titleStyle}>Status dan pembayaran</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '12px' }}>
            <div>
              <div style={{ color: '#777', fontSize: '11px', marginBottom: '4px' }}>Status pesanan</div>
              <span style={getBadgeStyle(data.statusPesanan)}>{data.statusPesanan}</span>
            </div>
            <div>
              <div style={{ color: '#777', fontSize: '11px', marginBottom: '4px' }}>Status pembayaran</div>
              <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>{data.statusPembayaran}</span>
            </div>
            <div>
              <div style={{ color: '#777', fontSize: '11px', marginBottom: '4px' }}>Metode pembayaran</div>
              <div style={{ fontWeight: 'bold', color: '#333' }}>{data.metodePembayaran}</div>
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Catatan pesanan</h3>
          <div style={{ fontSize: '12px', color: '#333' }}>{data.catatan}</div>
        </div>

      </div>

      {/* ALERT INFO BOX */}
      <div style={{ backgroundColor: '#f3e8ff', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '12px', color: '#581c87' }}>
        <Info size={18} color="#6b21a8" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Informasi Pesanan</div>
          <div>{data.infoAlert}</div>
        </div>
      </div>

      {/* BOTTOM ACTION */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
        <Link href="/admin/pesanan" style={{ padding: '10px 24px', backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '20px', color: '#555', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>
          Kembali
        </Link>
      </div>

    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
};

const titleStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#6b21a8',
  margin: '0 0 16px 0',
  fontWeight: 'bold',
};

function getBadgeStyle(status: string): React.CSSProperties {
  if (status === 'Siap dikirim') {
    return { backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  } else if (status === 'Diproduksi') {
    return { backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  } else {
    return { backgroundColor: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  }
}