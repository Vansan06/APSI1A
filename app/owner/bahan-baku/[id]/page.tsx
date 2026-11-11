'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

// Data Mock Detail Bahan Baku berdasarkan Kode Bahan (ID)
const DATA_DETAIL_BAHAN_BAKU: Record<string, {
  kode: string;
  nama: string;
  kategori: string;
  satuan: string;
  stokTersedia: string;
  stokMinimum: string;
  status: string;
  catatan: string;
}> = {
  'BB-001': {
    kode: 'BB-001',
    nama: 'Tepung terigu protein tinggi',
    kategori: 'Bahan utama',
    satuan: 'kg',
    stokTersedia: '18 kg',
    stokMinimum: '25 kg',
    status: 'Perlu restock',
    catatan: 'Stok tersedia 18 kg di bawah stok minimum 25 kg. Owner hanya dapat melihat data bahan baku.',
  },
  'BB-002': {
    kode: 'BB-002',
    nama: 'Gula pasir',
    kategori: 'Bahan utama',
    satuan: 'kg',
    stokTersedia: '40 kg',
    stokMinimum: '20 kg',
    status: 'Cukup',
    catatan: 'Stok bahan baku dalam kondisi aman untuk kebutuhan produksi mingguan.',
  },
  'BB-003': {
    kode: 'BB-003',
    nama: 'Cokelat batang',
    kategori: 'Toping & Isian',
    satuan: 'kg',
    stokTersedia: '12 kg',
    stokMinimum: '15 kg',
    status: 'Perlu restock',
    catatan: 'Stok tersedia 12 kg di bawah stok minimum 15 kg. Owner hanya dapat melihat data bahan baku.',
  },
  'BB-004': {
    kode: 'BB-004',
    nama: 'Keju Cheddar',
    kategori: 'Toping & Isian',
    satuan: 'kg',
    stokTersedia: '25 kg',
    stokMinimum: '10 kg',
    status: 'Cukup',
    catatan: 'Stok bahan baku dalam kondisi aman untuk kebutuhan produksi mingguan.',
  },
};

export default function DetailBahanBakuOwnerPage() {
  const params = useParams();
  const id = params?.id as string;

  // Ambil data bahan baku sesuai ID dari URL, atau fallback ke BB-001 jika tidak ditemukan
  const bahan = DATA_DETAIL_BAHAN_BAKU[id] || DATA_DETAIL_BAHAN_BAKU['BB-001'];
  const isWarning = bahan.status === 'Perlu restock';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Breadcrumb Header */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '10px 20px', fontSize: '12px', color: '#a02e59' }}>
        <Link href="/owner/bahan-baku" style={{ color: '#a02e59', textDecoration: 'none' }}>← Kembali ke Data Bahan Baku</Link> / Detail Bahan Baku
      </div>

      {/* Main Detail Card */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        
        {/* Header Title & Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f0d5de' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#888' }}>{bahan.kode}</div>
            <h2 style={{ fontSize: '20px', color: '#a02e59', margin: 0, fontWeight: 'bold' }}>{bahan.nama}</h2>
          </div>
          <span style={{
            backgroundColor: isWarning ? '#fef7e0' : '#e6f4ea',
            color: isWarning ? '#b45309' : '#137333',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 'bold'
          }}>
            {bahan.status}
          </span>
        </div>

        {/* Informational Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Kode bahan</span>
            <span style={{ fontWeight: 'bold' }}>{bahan.kode}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Nama bahan</span>
            <span style={{ fontWeight: 'bold', color: '#a02e59' }}>{bahan.nama}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Kategori</span>
            <span style={{ fontWeight: 'bold' }}>{bahan.kategori}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Satuan</span>
            <span style={{ fontWeight: 'bold' }}>{bahan.satuan}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Stok tersedia</span>
            <span style={{ fontWeight: 'bold', color: isWarning ? '#b45309' : '#137333' }}>{bahan.stokTersedia}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Stok minimum</span>
            <span style={{ fontWeight: 'bold' }}>{bahan.stokMinimum}</span>
          </div>
        </div>

        {/* Notice Box */}
        <div style={{ 
          backgroundColor: isWarning ? '#fff5f7' : '#f0fdf4', 
          padding: '12px 16px', 
          borderRadius: '8px', 
          marginTop: '20px', 
          fontSize: '12px', 
          color: isWarning ? '#702643' : '#166534',
          lineHeight: 1.5 
        }}>
          ⓘ {bahan.catatan}
        </div>

        {/* Back Button */}
        <div style={{ marginTop: '24px' }}>
          <Link href="/owner/bahan-baku" style={{ padding: '8px 20px', border: '1px solid #a02e59', borderRadius: '20px', color: '#a02e59', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' }}>
            ← Kembali ke Data Bahan Baku
          </Link>
        </div>

      </div>
    </div>
  );
}