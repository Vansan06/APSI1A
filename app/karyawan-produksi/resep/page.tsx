'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Printer, Search } from 'lucide-react';

interface BahanItem {
  nama: string;
  takaran: string;
  biaya: string;
}

interface ResepItem {
  id: string;
  kode: string;
  nama: string;
  versi: string;
  oleh: string;
  gambar: string;
  bannerGambar: string;
  status: 'Aktif';
  hasilPerAdonan: string;
  waktuProses: string;
  biayaBahanTotal: string;
  biayaPerPcs: string;
  unit: string;
  komposisi: BahanItem[];
  langkah: string[];
  pemeriksaan: string;
}

const DATA_RESEP: ResepItem[] = [
  {
    id: '1',
    kode: 'RSP-001',
    nama: 'Donat Cokelat',
    versi: 'Versi 1.2',
    oleh: 'Siti Rahmah',
    gambar: '/donat-cokelat.png',
    bannerGambar: '/donat-cokelat2.png',
    status: 'Aktif',
    hasilPerAdonan: '100 pcs',
    waktuProses: '120 menit',
    biayaBahanTotal: 'Rp268.000',
    biayaPerPcs: 'Rp2.680 / pcs',
    unit: 'pcs',
    komposisi: [
      { nama: 'Tepung Terigu', takaran: '5 kg', biaya: 'Rp60.000' },
      { nama: 'Gula Pasir', takaran: '1 kg', biaya: 'Rp17.000' },
      { nama: 'Mentega', takaran: '0,8 kg', biaya: 'Rp64.000' },
      { nama: 'Cokelat Batang', takaran: '1 kg', biaya: 'Rp70.000' },
      { nama: 'Telur', takaran: '1 kg', biaya: 'Rp28.000' },
      { nama: 'Susu Bubuk', takaran: '0,3 kg', biaya: 'Rp24.000' },
      { nama: 'Ragi Instan', takaran: '0,05 kg', biaya: 'Rp5.000' },
    ],
    langkah: [
      '1. Campur bahan dan uleni hingga kalis (25 menit).',
      '2. Istirahatkan, bagi adonan, lalu isi cokelat (70 menit).',
      '3. Panggang pada 180°C selama 25 menit; dinginkan.',
    ],
    pemeriksaan:
      'Permukaan keemasan, tekstur empuk, isian merata, dan produk sudah dingin. Pisahkan produk gosong atau bentuk tidak sesuai.',
  },
  {
    id: '2',
    kode: 'RSP-002',
    nama: 'Donat Keju',
    versi: 'Versi 1.0',
    oleh: 'Siti Rahmah',
    gambar: '/donat-keju.png',
    bannerGambar: '/donat-keju2.png',
    status: 'Aktif',
    hasilPerAdonan: '100 pcs',
    waktuProses: '110 menit',
    biayaBahanTotal: 'Rp315.000',
    biayaPerPcs: 'Rp3.150 / pcs',
    unit: 'pcs',
    komposisi: [
      { nama: 'Tepung Terigu High Protein', takaran: '5 kg', biaya: 'Rp65.000' },
      { nama: 'Keju Parut Premium', takaran: '1,5 kg', biaya: 'Rp110.000' },
      { nama: 'Mentega Utama', takaran: '0,8 kg', biaya: 'Rp64.000' },
      { nama: 'Susu UHT', takaran: '1 Liter', biaya: 'Rp20.000' },
      { nama: 'Telur', takaran: '1 kg', biaya: 'Rp28.000' },
      { nama: 'Ragi Instan', takaran: '0,05 kg', biaya: 'Rp5.000' },
    ],
    langkah: [
      '1. Uleni adonan tepung, susu, dan ragi hingga setengah kalis.',
      '2. Tambahkan mentega, uleni hingga elastis sempurna (30 menit).',
      '3. Bentuk donat, berikan keju melimpah di bagian topping setelah digoreng/dipanggang.',
    ],
    pemeriksaan:
      'Warna kuning keemasan, keju parut tidak gosong dan menempel sempurna, tekstur dalam lembut.',
  },
  {
    id: '3',
    kode: 'RSP-003',
    nama: 'Donat Gula',
    versi: 'Versi 1.1',
    oleh: 'Siti Rahmah',
    gambar: '/donat-gula.png',
    bannerGambar: '/donat-gula2.png',
    status: 'Aktif',
    hasilPerAdonan: '60 pcs',
    waktuProses: '90 menit',
    biayaBahanTotal: 'Rp252.000',
    biayaPerPcs: 'Rp4.200 / pcs',
    unit: 'pcs',
    komposisi: [
      { nama: 'Tepung Terigu', takaran: '3 kg', biaya: 'Rp36.000' },
      { nama: 'Gula Halus Premium', takaran: '1 kg', biaya: 'Rp22.000' },
      { nama: 'Mentega', takaran: '0,5 kg', biaya: 'Rp40.000' },
      { nama: 'Telur', takaran: '0,6 kg', biaya: 'Rp18.000' },
      { nama: 'Minyak Goreng Khusus', takaran: '2 Liter', biaya: 'Rp36.000' },
    ],
    langkah: [
      '1. Aduk semua bahan utama hingga kalis.',
      '2. Resting adonan 45 menit lalu cetak donat melingkar.',
      '3. Goreng dengan api sedang hingga matang merata, lalu taburi gula halus dingin.',
    ],
    pemeriksaan:
      'Taburan gula halus merata, tidak basah/meleleh, tekstur rupa donat mengembang sempurna.',
  },
  {
    id: '4',
    kode: 'RSP-004',
    nama: 'Donat Stroberi',
    versi: 'Versi 1.0',
    oleh: 'Siti Rahmah',
    gambar: '/donat-stroberi.png',
    bannerGambar: '/donat-stroberi2.png',
    status: 'Aktif',
    hasilPerAdonan: '50 pcs',
    waktuProses: '100 menit',
    biayaBahanTotal: 'Rp230.000',
    biayaPerPcs: 'Rp4.600 / pcs',
    unit: 'pcs',
    komposisi: [
      { nama: 'Tepung Terigu', takaran: '4 kg', biaya: 'Rp48.000' },
      { nama: 'Glaze Stroberi', takaran: '1,5 kg', biaya: 'Rp85.000' },
      { nama: 'Mentega', takaran: '0,6 kg', biaya: 'Rp48.000' },
      { nama: 'Susu Bubuk', takaran: '0,3 kg', biaya: 'Rp24.000' },
      { nama: 'Telur', takaran: '0,8 kg', biaya: 'Rp25.000' },
    ],
    langkah: [
      '1. Mix adonan utama hingga terbentuk ring khas donat.',
      '2. Proofing adonan selama 40 menit.',
      '3. Goreng dan celupkan bagian atas ke glaze stroberi.',
    ],
    pemeriksaan:
      'Glaze stroberi mengkilap, tidak terlalu encer, serta tekstur empuk.',
  },
];

export default function ResepPage() {
  const [selectedId, setSelectedId] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const resepAktif = DATA_RESEP.find((r) => r.id === selectedId) || DATA_RESEP[0];

  const filteredResep = DATA_RESEP.filter((r) =>
    r.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.kode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* BARIS ATAS: TITLE & TOMBOL CETAK RESEP */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ fontSize: '24px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
          Resep
        </h2>
        <button
          onClick={() => window.print()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            color: '#b0525e',
            border: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            cursor: 'pointer',
          }}
        >
          <Printer size={14} />
          <span>Cetak Resep</span>
        </button>
      </div>

      {/* TAMPILAN 2 KOLOM (DAFTAR RESEP & DETAIL RESEP) */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* PANEL KIRI: DAFTAR RESEP */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h3 style={{ fontSize: '15px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Daftar resep
          </h3>

          {/* INPUT SEARCH */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={14}
              color="#aaaaaa"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* LIST ITEMS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredResep.map((item) => {
              const isSelected = item.id === selectedId;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    borderRadius: '12px',
                    border: isSelected ? '1.5px solid #b0525e' : '1px solid #f0f0f0',
                    backgroundColor: isSelected ? '#fdf0ee' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#fcdcd9',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.gambar}
                      alt={item.nama}
                      fill
                      style={{ objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#b0525e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.nama}
                    </div>
                    <div style={{ fontSize: '10px', color: '#777777', marginTop: '2px' }}>
                      {item.kode} • {item.hasilPerAdonan}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#444444', marginTop: '2px' }}>
                      {item.biayaPerPcs}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FOOTER KETERANGAN */}
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '12px', fontSize: '10px', color: '#888888', lineHeight: 1.4 }}>
            <div>{DATA_RESEP.length} resep aktif • Diperbarui 24 Okt 2026</div>
            <div style={{ marginTop: '4px' }}>
              Resep disetujui untuk produksi. Hubungi admin jika perlu perubahan komposisi.
            </div>
          </div>
        </div>

        {/* PANEL KANAN: DETAIL RESEP */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* BANNER FOTO PRODUK */}
          <div
            style={{
              width: '100%',
              height: '140px',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: '#fcdcd9',
            }}
          >
            <Image
              src={resepAktif.bannerGambar}
              alt={resepAktif.nama}
              fill
              style={{ objectFit: 'cover' }}
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = 'none';
              }}
            />
          </div>

          {/* TITLE & HEADER DETAIL */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: '20px', color: '#b0525e', margin: '0 0 4px 0', fontWeight: 'bold' }}>
                {resepAktif.nama}
              </h3>
              <div style={{ fontSize: '11px', color: '#777777' }}>
                {resepAktif.kode} • {resepAktif.versi} • Oleh {resepAktif.oleh}
              </div>
            </div>

            <span
              style={{
                backgroundColor: '#e6f4ea',
                color: '#137333',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 'bold',
              }}
            >
              {resepAktif.status}
            </span>
          </div>

          {/* RINGKASAN HARIAN (3 KOTAK) */}
          <div
            style={{
              backgroundColor: '#fdf0ee',
              borderRadius: '12px',
              padding: '16px 24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '10px', color: '#777777', marginBottom: '4px' }}>
                Hasil per adonan
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#b0525e' }}>
                {resepAktif.hasilPerAdonan}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '10px', color: '#777777', marginBottom: '4px' }}>
                Waktu proses
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#b0525e' }}>
                {resepAktif.waktuProses}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '10px', color: '#777777', marginBottom: '4px' }}>
                Biaya bahan
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#b0525e' }}>
                {resepAktif.biayaBahanTotal}
              </div>
            </div>
          </div>

          {/* KOMPOSISI BAHAN */}
          <div>
            <h4 style={{ fontSize: '14px', color: '#b0525e', margin: '0 0 12px 0', fontWeight: 'bold' }}>
              Komposisi bahan • 1 adonan
            </h4>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#fdf0ee', color: '#b0525e', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px', borderRadius: '8px 0 0 8px' }}>Bahan baku</th>
                  <th style={{ padding: '10px 14px' }}>Takaran</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', borderRadius: '0 8px 8px 0' }}>Biaya</th>
                </tr>
              </thead>
              <tbody>
                {resepAktif.komposisi.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#333333' }}>
                      {item.nama}
                    </td>
                    <td style={{ padding: '12px 14px', color: '#555555' }}>
                      {item.takaran}
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', color: '#555555' }}>
                      {item.biaya}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* LANGKAH PRODUKSI */}
          <div>
            <h4 style={{ fontSize: '14px', color: '#b0525e', margin: '0 0 10px 0', fontWeight: 'bold' }}>
              Langkah produksi
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#444444', lineHeight: 1.5 }}>
              {resepAktif.langkah.map((l, idx) => (
                <div key={idx}>{l}</div>
              ))}
            </div>
          </div>

          {/* PEMERIKSAAN SEBELUM PENGEMASAN */}
          <div
            style={{
              backgroundColor: '#fdf0ee',
              borderRadius: '10px',
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#b0525e', marginBottom: '4px' }}>
              Pemeriksaan sebelum pengemasan
            </div>
            <div style={{ fontSize: '11px', color: '#555555', lineHeight: 1.5 }}>
              {resepAktif.pemeriksaan}
            </div>
          </div>

          {/* FOOTER BIAYA PER PCS */}
          <div style={{ fontSize: '10px', color: '#888888' }}>
            Biaya bahan {resepAktif.biayaPerPcs}; belum termasuk tenaga kerja dan kemasan.
          </div>
        </div>

      </div>

    </div>
  );
}