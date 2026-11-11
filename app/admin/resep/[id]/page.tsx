'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Info } from 'lucide-react';

interface KomposisiDetail {
  bahan: string;
  takaran: string;
  biaya: string;
}

interface ResepDetailRecord {
  kode: string;
  nama: string;
  versi: string;
  oleh: string;
  status: string;
  hasilAdonan: string;
  satuanHasil: string;
  waktuProses: string;
  totalBiayaBahan: string;
  biayaPerHasil: string;
  imageSrc: string;
  komposisi: KomposisiDetail[];
  instruksi: string[];
}

const DETAIL_RESEP_MAP: Record<string, ResepDetailRecord> = {
  'RSP-001': {
    kode: 'RSP-001',
    nama: 'Donat Cokelat',
    versi: 'Versi 1.2',
    oleh: 'Siti Rahmah',
    status: 'Aktif',
    hasilAdonan: '100',
    satuanHasil: 'pcs',
    waktuProses: '120',
    totalBiayaBahan: 'Rp268.000',
    biayaPerHasil: 'Rp2.680/pcs',
    imageSrc: '/donat-cokelat2.png',
    komposisi: [
      { bahan: 'Tepung Terigu', takaran: '5 kg', biaya: 'Rp60.000' },
      { bahan: 'Gula Pasir', takaran: '1 kg', biaya: 'Rp17.000' },
      { bahan: 'Mentega', takaran: '0,8 kg', biaya: 'Rp64.000' },
      { bahan: 'Cokelat Batang', takaran: '1 kg', biaya: 'Rp70.000' },
      { bahan: 'Telur', takaran: '1 kg', biaya: 'Rp28.000' },
      { bahan: 'Susu Bubuk', takaran: '0,3 kg', biaya: 'Rp24.000' },
      { bahan: 'Ragi Instan', takaran: '0,05 kg', biaya: 'Rp5.000' },
    ],
    instruksi: [
      '1. Campur bahan dan uleni hingga kalis (25 menit).',
      '2. Istirahatkan, bagi adonan, lalu isi cokelat (70 menit).',
      '3. Panggang pada 180°C selama 25 menit; dinginkan.',
    ],
  },
  'RSP-002': {
    kode: 'RSP-002',
    nama: 'Donat Keju',
    versi: 'Versi 1.0',
    oleh: 'Siti Rahmah',
    status: 'Aktif',
    hasilAdonan: '100',
    satuanHasil: 'pcs',
    waktuProses: '110',
    totalBiayaBahan: 'Rp315.000',
    biayaPerHasil: 'Rp3.150/pcs',
    imageSrc: '/donat-keju2.png',
    komposisi: [
      { bahan: 'Tepung Terigu', takaran: '5 kg', biaya: 'Rp60.000' },
      { bahan: 'Keju Cheddar', takaran: '2 kg', biaya: 'Rp190.000' },
      { bahan: 'Mentega', takaran: '0,8 kg', biaya: 'Rp65.000' },
    ],
    instruksi: [
      '1. Campur adonan dasar donat hingga halus.',
      '2. Tambahkan parutan keju ke dalam isian dan topping.',
      '3. Goreng hingga kuning keemasan.',
    ],
  },
  'RSP-003': {
    kode: 'RSP-003',
    nama: 'Donat Gula',
    versi: 'Versi 1.1',
    oleh: 'Ahmad Faisal',
    status: 'Aktif',
    hasilAdonan: '60',
    satuanHasil: 'pcs',
    waktuProses: '90',
    totalBiayaBahan: 'Rp252.000',
    biayaPerHasil: 'Rp4.200/pcs',
    imageSrc: '/donat-gula2.png',
    komposisi: [
      { bahan: 'Tepung Terigu', takaran: '3 kg', biaya: 'Rp36.000' },
      { bahan: 'Gula Halus', takaran: '2 kg', biaya: 'Rp34.000' },
    ],
    instruksi: [
      '1. Olah adonan donat klasik.',
      '2. Goreng dengan minyak panas.',
      '3. Taburkan gula halus merata.',
    ],
  },
  'RSP-004': {
    kode: 'RSP-004',
    nama: 'Donat Stroberi',
    versi: 'Versi 1.0',
    oleh: 'Siti Rahmah',
    status: 'Aktif',
    hasilAdonan: '50',
    satuanHasil: 'pcs', // Diperbarui dari 'pak' menjadi 'pcs'
    waktuProses: '100',
    totalBiayaBahan: 'Rp230.000',
    biayaPerHasil: 'Rp4.600/pcs', // Diperbarui menjadi /pcs
    imageSrc: '/donat-stroberi2.png',
    komposisi: [
      { bahan: 'Tepung Terigu', takaran: '3 kg', biaya: 'Rp36.000' },
      { bahan: 'Selai Stroberi', takaran: '1,5 kg', biaya: 'Rp45.000' },
    ],
    instruksi: [
      '1. Uleni adonan hingga elastis.',
      '2. Isi dengan jam stroberi alami.',
      '3. Goreng hingga matang presisi.',
    ],
  },
};

export default function DetailResepAdminPage() {
  const params = useParams();
  const id = (params?.id as string) || 'RSP-001';
  const data = DETAIL_RESEP_MAP[id] || DETAIL_RESEP_MAP['RSP-001'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Resep &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Detail Resep</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Detail Resep
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Lihat komposisi, biaya bahan, dan langkah produksi {data.nama}.
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

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
        
        {/* LEFT IDENTITAS & KOMPOSISI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={cardStyle}>
            <h3 style={titleStyle}>Identitas resep</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', fontSize: '12px', marginBottom: '16px' }}>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Kode resep *</div>
                <div style={{ fontWeight: 'bold', color: '#6b21a8', fontSize: '14px', marginTop: '2px' }}>{data.kode}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Produk / nama resep *</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.nama}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Status *</div>
                <div style={{ marginTop: '2px' }}>
                  <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                    {data.status}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', fontSize: '12px' }}>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Hasil per adonan *</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.hasilAdonan}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Satuan hasil *</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.satuanHasil}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Waktu proses (menit) *</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.waktuProses}</div>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={titleStyle}>Komposisi bahan</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '16px' }}>
              <thead>
                <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px' }}>Bahan baku</th>
                  <th style={{ padding: '8px 12px' }}>Takaran</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Biaya bahan</th>
                </tr>
              </thead>
              <tbody>
                {data.komposisi.map((k, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #fdf2f8' }}>
                    <td style={{ padding: '10px 12px', color: '#333' }}>{k.bahan}</td>
                    <td style={{ padding: '10px 12px', color: '#333' }}>{k.takaran}</td>
                    <td style={{ padding: '10px 12px', color: '#333', textAlign: 'right', fontWeight: 'bold' }}>{k.biaya}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ backgroundColor: '#faf5ff', padding: '12px 16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '14px', color: '#6b21a8' }}>
              <span>Total biaya bahan</span>
              <span>{data.totalBiayaBahan}</span>
            </div>
          </div>

        </div>

        {/* RIGHT CARD (FOTO VERSI 2) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={cardStyle}>
            <h3 style={{ fontSize: '16px', color: '#333', margin: '0 0 4px 0', fontWeight: 'bold' }}>{data.nama}</h3>
            <div style={{ fontSize: '11px', color: '#777', marginBottom: '12px' }}>{data.kode} • {data.versi} • Oleh {data.oleh}</div>
            
            <img
              src={data.imageSrc}
              alt={data.nama}
              style={{ width: '100%', height: '180px', borderRadius: '12px', objectFit: 'cover', backgroundColor: '#f3e8ff', marginBottom: '12px' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#777' }}>{data.kode} • {data.versi}</span>
              <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                {data.status}
              </span>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={titleStyle}>Langkah produksi</h3>
            <div style={{ fontSize: '11px', color: '#777', marginBottom: '10px' }}>Total proses {data.waktuProses} menit per adonan.</div>
            <div style={{ fontSize: '12px', color: '#444', lineHeight: 1.6 }}>
              {data.instruksi.map((step, idx) => (
                <div key={idx} style={{ marginBottom: '4px' }}>{step}</div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
              <Info size={16} /> Biaya bahan per hasil
            </div>
            <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
              {data.totalBiayaBahan} ÷ {data.hasilAdonan} {data.satuanHasil} = {data.biayaPerHasil}. Belum termasuk tenaga kerja dan kemasan.
            </div>
          </div>

        </div>

      </div>

      <div style={{ fontSize: '11px', color: '#777', marginTop: '8px' }}>
        Informasi ditampilkan dalam mode baca saja.
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link href="/admin/resep" style={{ padding: '10px 24px', backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '20px', color: '#555', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>
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