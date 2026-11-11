'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle, Trash2, Info } from 'lucide-react';

interface HapusResepRecord {
  kode: string;
  nama: string;
  versi: string;
  oleh: string;
  status: string;
  hasilAdonan: string;
  waktuProses: string;
  komposisiCount: string;
  totalBiayaBahan: string;
  biayaPerHasil: string;
}

const HAPUS_RESEP_MAP: Record<string, HapusResepRecord> = {
  'RSP-001': {
    kode: 'RSP-001',
    nama: 'Donat Cokelat',
    versi: 'Versi 1.2',
    oleh: 'Siti Rahmah',
    status: 'Aktif',
    hasilAdonan: '100 pcs',
    waktuProses: '120 menit',
    komposisiCount: '7 bahan baku',
    totalBiayaBahan: 'Rp268.000',
    biayaPerHasil: 'Rp2.680/pcs',
  },
  'RSP-002': {
    kode: 'RSP-002',
    nama: 'Donat Keju',
    versi: 'Versi 1.0',
    oleh: 'Siti Rahmah',
    status: 'Aktif',
    hasilAdonan: '100 pcs',
    waktuProses: '110 menit',
    komposisiCount: '3 bahan baku',
    totalBiayaBahan: 'Rp315.000',
    biayaPerHasil: 'Rp3.150/pcs',
  },
  'RSP-003': {
    kode: 'RSP-003',
    nama: 'Donat Gula',
    versi: 'Versi 1.1',
    oleh: 'Ahmad Faisal',
    status: 'Aktif',
    hasilAdonan: '60 pcs',
    waktuProses: '90 menit',
    komposisiCount: '2 bahan baku',
    totalBiayaBahan: 'Rp252.000',
    biayaPerHasil: 'Rp4.200/pcs',
  },
  'RSP-004': {
    kode: 'RSP-004',
    nama: 'Donat Stroberi',
    versi: 'Versi 1.0',
    oleh: 'Siti Rahmah',
    status: 'Aktif',
    hasilAdonan: '50 pcs', // Diperbarui dari 'pak' ke 'pcs'
    waktuProses: '100 menit',
    komposisiCount: '2 bahan baku',
    totalBiayaBahan: 'Rp230.000',
    biayaPerHasil: 'Rp4.600/pcs', // Diperbarui ke /pcs
  },
};

export default function HapusResepAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'RSP-001';

  const data = HAPUS_RESEP_MAP[id] || HAPUS_RESEP_MAP['RSP-001'];

  const handleConfirmHapus = () => {
    router.push('/admin/resep?notify=hapus');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Resep &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Konfirmasi Hapus Resep</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Konfirmasi Hapus Resep
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Periksa resep dan dampak penghapusan sebelum melanjutkan.
          </div>
        </div>

        <Link
          href="/admin/resep"
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
          <span>Kembali ke Resep</span>
        </Link>
      </div>

      {/* BANNER WARNING */}
      <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <AlertTriangle size={20} color="#dc2626" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#991b1b', marginBottom: '4px' }}>
            Hapus resep ini?
          </div>
          <div style={{ fontSize: '11px', color: '#b91c1c', lineHeight: 1.4 }}>
            Resep tidak lagi tersedia sebagai acuan produksi setelah dihapus. Tindakan ini tidak dapat dibatalkan.
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
              <div style={{ fontSize: '11px', color: '#777' }}>{data.kode} • {data.versi} • Oleh {data.oleh}</div>
            </div>
            <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
              {data.status}
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
                <td style={{ padding: '10px', color: '#555' }}>Hasil per adonan</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.hasilAdonan}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px', color: '#555' }}>Waktu proses</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.waktuProses}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px', color: '#555' }}>Komposisi</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.komposisiCount}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px', color: '#555' }}>Total biaya bahan</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.totalBiayaBahan}</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', color: '#555' }}>Biaya per hasil</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.biayaPerHasil}</td>
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
          <button type="button" onClick={() => router.push('/admin/resep')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
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