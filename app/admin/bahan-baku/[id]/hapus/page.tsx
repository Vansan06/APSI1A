'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle, Trash2, Info } from 'lucide-react';

interface HapusBahanRecord {
  kode: string;
  nama: string;
  supplier: string;
  satuan: string;
  stokTersedia: string;
  stokMinimum: string;
  hargaSatuan: string;
  statusPersediaan: string;
}

const HAPUS_BAHAN_MAP: Record<string, HapusBahanRecord> = {
  'BB-001': {
    kode: 'BB-001',
    nama: 'Tepung Terigu',
    supplier: 'CV Sumber Pangan',
    satuan: 'kg',
    stokTersedia: '125 kg',
    stokMinimum: '50 kg',
    hargaSatuan: 'Rp12.000 / kg',
    statusPersediaan: 'Aman',
  },
  'BB-002': {
    kode: 'BB-002',
    nama: 'Gula Pasir',
    supplier: 'CV Sumber Pangan',
    satuan: 'kg',
    stokTersedia: '60 kg',
    stokMinimum: '25 kg',
    hargaSatuan: 'Rp17.000 / kg',
    statusPersediaan: 'Aman',
  },
  'BB-003': {
    kode: 'BB-003',
    nama: 'Mentega',
    supplier: 'PT Prima Dairy',
    satuan: 'kg',
    stokTersedia: '8 kg',
    stokMinimum: '15 kg',
    hargaSatuan: 'Rp80.000 / kg',
    statusPersediaan: 'Stok rendah',
  },
  'BB-004': {
    kode: 'BB-004',
    nama: 'Cokelat Batang',
    supplier: 'PT Cokelat Nusantara',
    satuan: 'kg',
    stokTersedia: '6 kg',
    stokMinimum: '10 kg',
    hargaSatuan: 'Rp70.000 / kg',
    statusPersediaan: 'Stok rendah',
  },
  'BB-005': {
    kode: 'BB-005',
    nama: 'Telur',
    supplier: 'Ternak Makmur',
    satuan: 'kg',
    stokTersedia: '30 kg',
    stokMinimum: '15 kg',
    hargaSatuan: 'Rp28.000 / kg',
    statusPersediaan: 'Aman',
  },
  'BB-006': {
    kode: 'BB-006',
    nama: 'Keju Cheddar',
    supplier: 'PT Prima Dairy',
    satuan: 'kg',
    stokTersedia: '18 kg',
    stokMinimum: '10 kg',
    hargaSatuan: 'Rp95.000 / kg',
    statusPersediaan: 'Aman',
  },
};

export default function HapusBahanBakuAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'BB-001';

  const data = HAPUS_BAHAN_MAP[id] || HAPUS_BAHAN_MAP['BB-001'];

  const handleConfirmHapus = async () => {
    const response=await fetch(`/api/bahan-baku/${encodeURIComponent(id)}`,{method:"DELETE"});
    if(!response.ok){const result=await response.json();alert(result.error||"Gagal menghapus data.");return;}
    router.push('/admin/bahan-baku?notify=hapus');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Bahan Baku &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Konfirmasi Hapus Bahan Baku</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Konfirmasi Hapus Bahan Baku
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Pastikan bahan yang dipilih tidak lagi dibutuhkan sebelum menghapus.
          </div>
        </div>

        <Link
          href="/admin/bahan-baku"
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
          <span>Kembali ke Data Bahan Baku</span>
        </Link>
      </div>

      {/* BANNER PERINGATAN HAPUS */}
      <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <AlertTriangle size={20} color="#dc2626" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#991b1b', marginBottom: '4px' }}>
            Hapus bahan baku ini?
          </div>
          <div style={{ fontSize: '11px', color: '#b91c1c', lineHeight: 1.4 }}>
            Bahan ini masih memiliki stok {data.stokTersedia} dan tercantum dalam komposisi RSP-001. Periksa keterkaitannya sebelum menghapus. Tindakan ini tidak dapat dibatalkan.
          </div>
        </div>
      </div>

      {/* RINGKASAN DATA YANG AKAN DIHAPUS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
        
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '15px', color: '#6b21a8', margin: '0 0 16px 0', fontWeight: 'bold' }}>
            Ringkasan data yang akan dihapus
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{data.nama}</div>
              <div style={{ fontSize: '11px', color: '#777' }}>{data.kode} • {data.supplier}</div>
            </div>
            <span style={getKondisiBadgeStyle(data.statusPersediaan)}>
              {data.statusPersediaan}
            </span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Informasi</th>
                <th style={{ padding: '10px' }}>Nilai</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px', color: '#555' }}>Satuan</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.satuan}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px', color: '#555' }}>Stok tersedia</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.stokTersedia}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px', color: '#555' }}>Stok minimum</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.stokMinimum}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px', color: '#555' }}>Harga / satuan</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.hargaSatuan}</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', color: '#555' }}>Status persediaan</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.statusPersediaan}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* RIGHT SIDE WARNING CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
              Sebelum melanjutkan
            </div>
            <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.5 }}>
              Pastikan Anda memilih data yang benar dan tidak lagi membutuhkannya untuk kegiatan operasional.<br /><br />
              Pilih Batal untuk mempertahankan data. Pilih Konfirmasi Hapus hanya setelah memeriksa ringkasan.
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
              <Info size={16} /> Riwayat operasional
            </div>
            <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
              Periksa keterkaitan data sebelum menghapus. Simpan catatan yang masih dibutuhkan untuk laporan.
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <div style={{ fontSize: '11px', color: '#777' }}>
          Data belum dihapus. Konfirmasi diperlukan untuk melanjutkan.
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" onClick={() => router.push('/admin/bahan-baku')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            Batal
          </button>
          <button type="button" onClick={handleConfirmHapus} style={{ padding: '10px 24px', backgroundColor: '#b91c1c', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Trash2 size={16} /> Konfirmasi Hapus
          </button>
        </div>
      </div>

    </div>
  );
}

function getKondisiBadgeStyle(kondisi: string): React.CSSProperties {
  if (kondisi === 'Aman') {
    return { backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  } else {
    return { backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  }
}