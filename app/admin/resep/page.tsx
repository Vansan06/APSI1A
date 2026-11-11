'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Plus, Check, Edit3 } from 'lucide-react';

export interface ResepKomposisi {
  bahanBaku: string;
  takaran: string;
  biaya: string;
}

export interface ResepItem {
  id: string; // Kode resep e.g. RSP-001
  nama: string;
  versi: string;
  oleh: string;
  hasilAdonan: string;
  waktuProses: string;
  biayaBahan: string;
  biayaPerPcs: string;
  status: 'Aktif' | 'Nonaktif';
  imageSrc: string;
  komposisi: ResepKomposisi[];
  langkah: string[];
}

export const RESEP_LIST: ResepItem[] = [
  {
    id: 'RSP-001',
    nama: 'Donat Cokelat',
    versi: 'Versi 1.2',
    oleh: 'Siti Rahmah',
    hasilAdonan: '100 pcs',
    waktuProses: '120 menit',
    biayaBahan: 'Rp268.000',
    biayaPerPcs: 'Rp2.680 / pcs',
    status: 'Aktif',
    imageSrc: '/donat-cokelat.png',
    komposisi: [
      { bahanBaku: 'Tepung Terigu', takaran: '5 kg', biaya: 'Rp60.000' },
      { bahanBaku: 'Gula Pasir', takaran: '1 kg', biaya: 'Rp17.000' },
      { bahanBaku: 'Mentega', takaran: '0,8 kg', biaya: 'Rp64.000' },
      { bahanBaku: 'Cokelat Batang', takaran: '1 kg', biaya: 'Rp70.000' },
      { bahanBaku: 'Telur', takaran: '1 kg', biaya: 'Rp28.000' },
      { bahanBaku: 'Susu Bubuk', takaran: '0,3 kg', biaya: 'Rp24.000' },
      { bahanBaku: 'Ragi Instan', takaran: '0,05 kg', biaya: 'Rp5.000' },
    ],
    langkah: [
      '1. Campur bahan dan uleni hingga kalis (25 menit).',
      '2. Istirahatkan, bagi adonan, lalu isi cokelat (70 menit).',
      '3. Panggang pada 180°C selama 25 menit; dinginkan.',
    ],
  },
  {
    id: 'RSP-002',
    nama: 'Donat Keju',
    versi: 'Versi 1.0',
    oleh: 'Siti Rahmah',
    hasilAdonan: '100 pcs',
    waktuProses: '110 menit',
    biayaBahan: 'Rp315.000',
    biayaPerPcs: 'Rp3.150 / pcs',
    status: 'Aktif',
    imageSrc: '/donat-keju.png',
    komposisi: [
      { bahanBaku: 'Tepung Terigu', takaran: '5 kg', biaya: 'Rp60.000' },
      { bahanBaku: 'Keju Cheddar', takaran: '2 kg', biaya: 'Rp190.000' },
      { bahanBaku: 'Mentega', takaran: '0,8 kg', biaya: 'Rp65.000' },
    ],
    langkah: [
      '1. Campur adonan dasar donat hingga halus.',
      '2. Tambahkan parutan keju ke dalam isian dan topping.',
      '3. Goreng hingga kuning keemasan.',
    ],
  },
  {
    id: 'RSP-003',
    nama: 'Donat Gula',
    versi: 'Versi 1.1',
    oleh: 'Ahmad Faisal',
    hasilAdonan: '60 pcs',
    waktuProses: '90 menit',
    biayaBahan: 'Rp252.000',
    biayaPerPcs: 'Rp4.200 / pcs',
    status: 'Aktif',
    imageSrc: '/donat-gula.png',
    komposisi: [
      { bahanBaku: 'Tepung Terigu', takaran: '3 kg', biaya: 'Rp36.000' },
      { bahanBaku: 'Gula Halus', takaran: '2 kg', biaya: 'Rp34.000' },
    ],
    langkah: [
      '1. Olah adonan donat klasik.',
      '2. Goreng dengan minyak panas.',
      '3. Taburkan gula halus merata.',
    ],
  },
  {
    id: 'RSP-004',
    nama: 'Donat Stroberi',
    versi: 'Versi 1.0',
    oleh: 'Siti Rahmah',
    hasilAdonan: '50 pcs',
    waktuProses: '100 menit',
    biayaBahan: 'Rp230.000',
    biayaPerPcs: 'Rp4.600 / pcs',
    status: 'Aktif',
    imageSrc: '/donat-stroberi.png',
    komposisi: [
      { bahanBaku: 'Tepung Terigu', takaran: '3 kg', biaya: 'Rp36.000' },
      { bahanBaku: 'Selai Stroberi', takaran: '1,5 kg', biaya: 'Rp45.000' },
    ],
    langkah: [
      '1. Uleni adonan hingga elastis.',
      '2. Isi dengan jam stroberi alami.',
      '3. Goreng hingga matang presisi.',
    ],
  },
];

export default function AdminResepPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const notifyType = searchParams.get('notify');
  const [selectedId, setSelectedId] = useState<string>('RSP-001');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');

  const activeResep = RESEP_LIST.find((r) => r.id === selectedId) || RESEP_LIST[0];

  useEffect(() => {
    if (notifyType === 'simpan') {
      setModalTitle('Berhasil disimpan');
      setModalDesc('Data resep berhasil disimpan.');
      setShowModal(true);
    } else if (notifyType === 'edit') {
      setModalTitle('Berhasil diedit');
      setModalDesc('Data resep berhasil diedit.');
      setShowModal(true);
    } else if (notifyType === 'hapus') {
      setModalTitle('Berhasil dihapus');
      setModalDesc('Data resep berhasil dihapus.');
      setShowModal(true);
    }
  }, [notifyType]);

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/admin/resep');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* HEADER UTAMA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Resep
          </h2>
        </div>
      </div>

      {/* DUA KOLOM: MASTER LIST (KIRI) & DETAIL PREVIEW (KANAN) */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* KOLOM KIRI: DAFTAR RESEP */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '15px', color: '#6b21a8', margin: '0 0 14px 0', fontWeight: 'bold' }}>
            Daftar resep
          </h3>

          <div style={{ marginBottom: '14px' }}>
            <input
              type="text"
              placeholder="Cari nama produk..."
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {RESEP_LIST.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid #6b21a8' : '1px solid #f3e8ff',
                    backgroundColor: isSelected ? '#faf5ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img
                      src={item.imageSrc}
                      alt={item.nama}
                      style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover', backgroundColor: '#f3e8ff' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', color: '#333', fontSize: '13px' }}>{item.nama}</div>
                      <div style={{ fontSize: '10px', color: '#777', marginTop: '2px' }}>{item.id} • {item.hasilAdonan}</div>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b21a8', marginTop: '2px' }}>{item.biayaPerPcs}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px', paddingTop: '8px', borderTop: '1px border-dash #e2e8f0', fontSize: '11px' }}>
                    <Link href={`/admin/resep/${item.id}`} style={{ color: '#6b21a8', textDecoration: 'none', fontWeight: 'bold' }}>
                      Lihat Detail Resep
                    </Link>
                    <Link href={`/admin/resep/${item.id}/hapus`} style={{ color: '#b91c1c', textDecoration: 'none', fontWeight: '500' }}>
                      Hapus
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '16px', fontSize: '10px', color: '#888' }}>
            4 resep aktif • Diperbarui 24 Okt 2026
          </div>

          <div style={{ marginTop: '14px' }}>
            <Link
              href="/admin/resep/tambah"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                justifyContent: 'center',
                padding: '10px 16px',
                backgroundColor: '#6b21a8',
                color: '#ffffff',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 'bold',
                boxSizing: 'border-box',
              }}
            >
              <Plus size={16} />
              <span>Tambah Resep</span>
            </Link>
          </div>
        </div>

        {/* KOLOM KANAN: PREVIEW DETAIL RESEP YANG AKTIF */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <img
                src={activeResep.imageSrc}
                alt={activeResep.nama}
                style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ fontSize: '20px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
                  {activeResep.nama}
                </h3>
                <div style={{ fontSize: '11px', color: '#777', marginTop: '2px' }}>
                  {activeResep.id} • {activeResep.versi} • Oleh {activeResep.oleh}
                </div>
              </div>
            </div>
            <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
              {activeResep.status}
            </span>
          </div>

          {/* 3 KARTU METRIK RESEP */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px', backgroundColor: '#fcf4ff', padding: '16px', borderRadius: '12px' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#777' }}>Hasil per adonan</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6b21a8' }}>{activeResep.hasilAdonan}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#777' }}>Waktu proses</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6b21a8' }}>{activeResep.waktuProses}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#777' }}>Biaya bahan</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6b21a8' }}>{activeResep.biayaBahan}</div>
            </div>
          </div>

          {/* KOMPOSISI BAHAN */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', color: '#6b21a8', margin: '0 0 12px 0', fontWeight: 'bold' }}>
              Komposisi bahan
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', borderRadius: '6px 0 0 6px' }}>Bahan baku</th>
                  <th style={{ padding: '8px 12px' }}>Takaran</th>
                  <th style={{ padding: '8px 12px', borderRadius: '0 6px 6px 0', textAlign: 'right' }}>Biaya</th>
                </tr>
              </thead>
              <tbody>
                {activeResep.komposisi.map((k, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #fdf2f8' }}>
                    <td style={{ padding: '10px 12px', color: '#333' }}>{k.bahanBaku}</td>
                    <td style={{ padding: '10px 12px', color: '#333' }}>{k.takaran}</td>
                    <td style={{ padding: '10px 12px', color: '#333', textAlign: 'right', fontWeight: 'bold' }}>{k.biaya}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* LANGKAH PRODUKSI */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', color: '#6b21a8', margin: '0 0 10px 0', fontWeight: 'bold' }}>
              Langkah produksi
            </h4>
            <div style={{ fontSize: '12px', color: '#444', lineHeight: 1.6 }}>
              {activeResep.langkah.map((step, idx) => (
                <div key={idx} style={{ marginBottom: '4px' }}>{step}</div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '11px', color: '#888', marginBottom: '20px' }}>
            Biaya bahan {activeResep.biayaPerPcs}; belum termasuk tenaga kerja dan kemasan.
          </div>

          {/* TOMBOL EDIT RESEP */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              href={`/admin/resep/${activeResep.id}/edit`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 20px',
                backgroundColor: '#6b21a8',
                color: '#ffffff',
                borderRadius: '16px',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              <Edit3 size={14} /> Edit Resep
            </Link>
          </div>

        </div>

      </div>

      {/* MODAL NOTIFIKASI BERHASIL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', width: '380px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#6b21a8', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={28} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '20px', color: '#6b21a8', margin: '0 0 8px 0', fontWeight: 'bold' }}>{modalTitle}</h3>
            <p style={{ fontSize: '13px', color: '#666', margin: '0 0 24px 0' }}>{modalDesc}</p>
            <button onClick={handleCloseModal} style={{ width: '100%', padding: '12px', backgroundColor: '#581c87', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
              Selesai
            </button>
          </div>
        </div>
      )}

    </div>
  );
}