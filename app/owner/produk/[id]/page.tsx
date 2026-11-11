'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const DATA_DETAIL_PRODUK: Record<string, {
  kode: string;
  nama: string;
  harga: string;
  resep: string;
  hasilAdonan: string;
  biayaBahan: string;
  satuan: string;
  stok: string;
  status: string;
  gambar: string;
}> = {
  'PRD-001': {
    kode: 'PRD-001',
    nama: 'Donat Cokelat',
    harga: 'Rp8.000 per buah',
    resep: 'RSP-001 · Donat Cokelat',
    hasilAdonan: '50 buah',
    biayaBahan: 'Rp3.200 per buah (tidak termasuk tenaga kerja)',
    satuan: 'buah',
    stok: 'Tidak tersedia',
    status: 'Aktif',
    gambar: '/donat-cokelat.png',
  },
  'PRD-002': {
    kode: 'PRD-002',
    nama: 'Donat Keju',
    harga: 'Rp9.000 per buah',
    resep: 'RSP-002 · Donat Keju',
    hasilAdonan: '50 buah',
    biayaBahan: 'Rp3.500 per buah (tidak termasuk tenaga kerja)',
    satuan: 'buah',
    stok: 'Tidak tersedia',
    status: 'Aktif',
    gambar: '/donat-keju.png',
  },
  'PRD-003': {
    kode: 'PRD-003',
    nama: 'Donat Gula',
    harga: 'Rp12.000 per buah',
    resep: 'RSP-003 · Donat Gula',
    hasilAdonan: '60 buah',
    biayaBahan: 'Rp2.800 per buah (tidak termasuk tenaga kerja)',
    satuan: 'buah',
    stok: 'Tidak tersedia',
    status: 'Aktif',
    gambar: '/donat-gula.png',
  },
  'PRD-004': {
    kode: 'PRD-004',
    nama: 'Donat Stroberi',
    harga: 'Rp11.800 per buah',
    resep: 'RSP-004 · Donat Stroberi',
    hasilAdonan: '45 buah',
    biayaBahan: 'Rp3.600 per buah (tidak termasuk tenaga kerja)',
    satuan: 'buah',
    stok: 'Tidak tersedia',
    status: 'Aktif',
    gambar: '/donat-stroberi.png',
  },
};

export default function DetailProdukOwner() {
  const params = useParams();
  const id = params?.id as string;

  const produk = DATA_DETAIL_PRODUK[id] || DATA_DETAIL_PRODUK['PRD-001'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Breadcrumb Header */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '10px 20px', fontSize: '12px', color: '#a02e59' }}>
        <Link href="/owner/produk" style={{ color: '#a02e59', textDecoration: 'none' }}>← Kembali ke Data Produk</Link> / Detail Produk
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        
        {/* Top Header Card */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f0d5de' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Image 
              src={produk.gambar} 
              alt={produk.nama} 
              width={40} 
              height={40} 
              style={{ borderRadius: '8px', objectFit: 'cover' }} 
            />
            <div>
              <div style={{ fontSize: '11px', color: '#888' }}>{produk.kode}</div>
              <h2 style={{ fontSize: '20px', color: '#a02e59', margin: 0, fontWeight: 'bold' }}>{produk.nama}</h2>
            </div>
          </div>
          <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
            {produk.status}
          </span>
        </div>

        {/* Informational Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
          <h4 style={{ color: '#a02e59', margin: 0, fontWeight: 'bold' }}>Informasi produk</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Kode produk</span><span style={{ fontWeight: 'bold' }}>{produk.kode}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Nama produk</span><span style={{ fontWeight: 'bold', color: '#a02e59' }}>{produk.nama}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Harga jual</span><span style={{ fontWeight: 'bold', color: '#a02e59' }}>{produk.harga}</span>
          </div>

          <h4 style={{ color: '#a02e59', marginTop: '16px', margin: 0, fontWeight: 'bold' }}>Informasi resep terkait</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Resep terkait</span><span style={{ fontWeight: 'bold', color: '#a02e59' }}>{produk.resep}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Hasil per adonan</span><span style={{ fontWeight: 'bold' }}>{produk.hasilAdonan}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Estimasi biaya bahan</span><span style={{ fontWeight: 'bold', color: '#a02e59' }}>{produk.biayaBahan}</span>
          </div>

          <h4 style={{ color: '#a02e59', marginTop: '16px', margin: 0, fontWeight: 'bold' }}>Informasi tambahan</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Satuan</span><span style={{ fontWeight: 'bold' }}>{produk.satuan}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Stok</span><span style={{ color: '#888' }}>{produk.stok}</span>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <Link href="/owner/produk" style={{ padding: '8px 20px', border: '1px solid #a02e59', borderRadius: '20px', color: '#a02e59', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
            ← Kembali ke Data Produk
          </Link>
        </div>

      </div>
    </div>
  );
}