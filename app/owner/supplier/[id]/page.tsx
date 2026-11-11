'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock DB data supplier lengkap
const DATA_DETAIL_SUPPLIER: Record<string, {
  kode: string;
  nama: string;
  pasokan: string;
  waktuKirim: string;
  kontakUtama: string;
  nomorTelepon: string;
  email: string;
  alamat: string;
  status: string;
  catatan: string;
}> = {
  'SUP-001': {
    kode: 'SUP-001',
    nama: 'PT Sumber Pangan',
    pasokan: 'Tepung terigu & gula pasir',
    waktuKirim: '2 hari kerja',
    kontakUtama: 'Budi Santoso',
    nomorTelepon: '0812-1111-2345',
    email: 'pemasaran@sumberpangan.co.id',
    alamat: 'Jl. Industri Raya No. 45, Kawasan Industri Cimahi, Bandung',
    status: 'Aktif',
    catatan: 'Supplier utama tepung dan gula. Kualitas bahan stabil dan selalu tepat waktu dalam pengiriman.',
  },
  'SUP-002': {
    kode: 'SUP-002',
    nama: 'CV Manis Jaya',
    pasokan: 'Cokelat batang, glaze & keju cheddar',
    waktuKirim: '1 hari kerja',
    kontakUtama: 'Sari Wijaya',
    nomorTelepon: '0813-2222-3456',
    email: 'order@manisjaya.com',
    alamat: 'Jl. Sukajadi No. 112, Bandung, Jawa Barat',
    status: 'Aktif',
    catatan: 'Pemasok bahan toping donat premium. Layanan pengiriman cepat 1 hari sampai.',
  },
  'SUP-010': {
    kode: 'SUP-010',
    nama: 'CV Susu Makmur',
    pasokan: 'Susu bubuk, margarin & olahan susu',
    waktuKirim: '2 hari kerja',
    kontakUtama: 'Rina Kartika',
    nomorTelepon: '0812-4567-8901',
    email: 'sales@susumakmur.co.id',
    alamat: 'Jl. Raya Lembang No. 88, Bandung Barat',
    status: 'Baru',
    catatan: 'Supplier baru yang mendaftar bulan ini. Masih dalam verifikasi kelengkapan sertifikat halal.',
  },
  'SUP-011': {
    kode: 'SUP-011',
    nama: 'Toko Rasa Nusantara',
    pasokan: 'Perisa makanan, esens stroberi & pelapis donat',
    waktuKirim: '1 hari kerja',
    kontakUtama: 'Dedi Kurniawan',
    nomorTelepon: '0813-6789-0123',
    email: 'rasanusantara.bdg@gmail.com',
    alamat: 'Jl. Pasar Baru No. 12, Bandung',
    status: 'Baru',
    catatan: 'Penyedia perisa alami. Menunggu persetujuan sampel kualitas resep dari tim operasional.',
  },
};

export default function DetailSupplierOwnerPage() {
  const params = useParams();
  const id = params?.id as string;

  // Mengambil data supplier berdasarkan ID URL, fallback ke SUP-001 jika ID tidak ditemukan
  const supplier = DATA_DETAIL_SUPPLIER[id] || DATA_DETAIL_SUPPLIER['SUP-001'];
  const isBaru = supplier.status === 'Baru';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Breadcrumb Navigation */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '10px 20px', fontSize: '12px', color: '#a02e59' }}>
        <Link href="/owner/supplier" style={{ color: '#a02e59', textDecoration: 'none' }}>← Kembali ke Data Supplier</Link> / Detail Supplier
      </div>

      {/* Main Detail Container */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        
        {/* Header Title & Status Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f0d5de' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#888' }}>{supplier.kode}</div>
            <h2 style={{ fontSize: '20px', color: '#a02e59', margin: 0, fontWeight: 'bold' }}>{supplier.nama}</h2>
          </div>
          <span style={{
            backgroundColor: isBaru ? '#fef7e0' : '#e6f4ea',
            color: isBaru ? '#b45309' : '#137333',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 'bold'
          }}>
            {supplier.status}
          </span>
        </div>

        {/* Informational Sections */}
        <h4 style={{ color: '#a02e59', marginBottom: '10px', marginTop: 0, fontWeight: 'bold' }}>Informasi supplier</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Kode supplier</span>
            <span style={{ fontWeight: 'bold' }}>{supplier.kode}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Nama supplier</span>
            <span style={{ fontWeight: 'bold', color: '#a02e59' }}>{supplier.nama}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Jenis pasokan</span>
            <span style={{ fontWeight: 'bold' }}>{supplier.pasokan}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Waktu kirim</span>
            <span style={{ fontWeight: 'bold' }}>{supplier.waktuKirim}</span>
          </div>
        </div>

        <h4 style={{ color: '#a02e59', marginBottom: '10px', fontWeight: 'bold' }}>Kontak dan lokasi</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Kontak utama</span>
            <span style={{ fontWeight: 'bold' }}>{supplier.kontakUtama}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Nomor telepon</span>
            <span style={{ fontWeight: 'bold', color: '#a02e59' }}>{supplier.nomorTelepon}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Email</span>
            <span style={{ color: '#555' }}>{supplier.email}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0', borderBottom: '1px solid #fafafa' }}>
            <span style={{ color: '#777' }}>Alamat kantor / gudang</span>
            <span style={{ color: '#555' }}>{supplier.alamat}</span>
          </div>
        </div>

        {/* Notice Info Box */}
        <div style={{ backgroundColor: '#fff5f7', padding: '12px 16px', borderRadius: '8px', marginTop: '20px', fontSize: '12px', color: '#702643', lineHeight: 1.5 }}>
          <strong>Catatan Operasional:</strong> {supplier.catatan}
        </div>

        {/* Back Button */}
        <div style={{ marginTop: '24px' }}>
          <Link href="/owner/supplier" style={{ padding: '8px 20px', border: '1px solid #a02e59', borderRadius: '20px', color: '#a02e59', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' }}>
            ← Kembali ke Data Supplier
          </Link>
        </div>

      </div>
    </div>
  );
}