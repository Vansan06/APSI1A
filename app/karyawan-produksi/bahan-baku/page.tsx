'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Boxes,
  AlertTriangle,
  ShieldCheck,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  RotateCcw,
  Info,
} from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';

export interface BahanBakuItem {
  id: string;
  nama: string;
  stok: string;
  min: string;
  kedaluwarsa: string;
  lokasi: string;
  kondisi: 'Aman' | 'Stok rendah';
}

const BAHAN_BAKU_DATA: BahanBakuItem[] = [
  {
    id: 'BB-001',
    nama: 'Tepung Terigu',
    stok: '125 kg',
    min: '50 kg',
    kedaluwarsa: '20 Des 2026',
    lokasi: 'Rak A-01',
    kondisi: 'Aman',
  },
  {
    id: 'BB-002',
    nama: 'Gula Pasir',
    stok: '60 kg',
    min: '25 kg',
    kedaluwarsa: '10 Mar 2027',
    lokasi: 'Rak A-02',
    kondisi: 'Aman',
  },
  {
    id: 'BB-003',
    nama: 'Mentega',
    stok: '8 kg',
    min: '15 kg',
    kedaluwarsa: '02 Nov 2026',
    lokasi: 'Pendingin B-01',
    kondisi: 'Stok rendah',
  },
  {
    id: 'BB-004',
    nama: 'Cokelat Batang',
    stok: '6 kg',
    min: '10 kg',
    kedaluwarsa: '18 Des 2026',
    lokasi: 'Rak B-02',
    kondisi: 'Stok rendah',
  },
  {
    id: 'BB-005',
    nama: 'Telur',
    stok: '30 kg',
    min: '15 kg',
    kedaluwarsa: '30 Okt 2026',
    lokasi: 'Pendingin B-02',
    kondisi: 'Aman',
  },
  {
    id: 'BB-006',
    nama: 'Keju Cheddar',
    stok: '18 kg',
    min: '10 kg',
    kedaluwarsa: '15 Nov 2026',
    lokasi: 'Pendingin B-01',
    kondisi: 'Aman',
  },
  {
    id: 'BB-007',
    nama: 'Susu Bubuk',
    stok: '12 kg',
    min: '5 kg',
    kedaluwarsa: '12 Jan 2027',
    lokasi: 'Rak A-03',
    kondisi: 'Aman',
  },
  {
    id: 'BB-008',
    nama: 'Ragi Instan',
    stok: '2 kg',
    min: '1 kg',
    kedaluwarsa: '28 Feb 2027',
    lokasi: 'Rak A-03',
    kondisi: 'Aman',
  },
];

function DataBahanBakuContent() {
  const searchParams = useSearchParams();
  const notifParam = searchParams.get('notif');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterKondisi, setFilterKondisi] = useState('Semua kondisi');
  const [filterGudang, setFilterGudang] = useState('Gudang utama');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(notifParam === 'disimpan');
  const [modalTitle, setModalTitle] = useState('Berhasil diedit');
  const [modalDesc, setModalDesc] = useState('Perubahan berhasil disimpan.');

  // Handler Klik Tombol Laporkan Stok Rendah
  const handleLaporkanStokRendah = () => {
    setModalTitle('Berhasil dilaporkan');
    setModalDesc('Laporan stok rendah telah dikirim ke admin.');
    setIsModalOpen(true);
  };

  const filteredData = BAHAN_BAKU_DATA.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKondisi =
      filterKondisi === 'Semua kondisi' || item.kondisi === filterKondisi;
    return matchSearch && matchKondisi;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* MODAL SUKSES */}
      <SuccessModal
        isOpen={isModalOpen}
        title={modalTitle}
        desc={modalDesc}
        onClose={() => setIsModalOpen(false)}
      />

      {/* BARIS ATAS: TITLE & TOMBOL LAPORKAN STOK RENDAH */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ fontSize: '24px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
          Data Bahan Baku
        </h2>
        <button
          onClick={handleLaporkanStokRendah}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#b0525e',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <AlertTriangle size={14} />
          <span>Laporkan Stok Rendah</span>
        </button>
      </div>

      {/* KARTU STATISTIK 3 KOLOM */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        
        {/* KARTU 1: JENIS BAHAN */}
        <div style={cardStatStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
              Jenis bahan
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>
              8 bahan
            </div>
            <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>
              Tersimpan di gudang utama
            </div>
          </div>
          <div style={iconBadgeStyle}>
            <Boxes size={20} color="#b0525e" />
          </div>
        </div>

        {/* KARTU 2: DI BAWAH MINIMUM */}
        <div style={cardStatStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
              Di bawah minimum
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>
              2 bahan
            </div>
            <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>
              Mentega dan cokelat batang
            </div>
          </div>
          <div style={iconBadgeStyle}>
            <AlertTriangle size={20} color="#b0525e" />
          </div>
        </div>

        {/* KARTU 3: KONDISI BAHAN */}
        <div style={cardStatStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
              Kondisi bahan
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>
              Layak pakai
            </div>
            <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>
              Gunakan bahan terdekat kedaluwarsa
            </div>
          </div>
          <div style={iconBadgeStyle}>
            <ShieldCheck size={20} color="#b0525e" />
          </div>
        </div>

      </div>

      {/* TABEL PERSEDIAAN BAHAN BAKU */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h3 style={{ fontSize: '16px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Persediaan bahan baku
          </h3>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', width: '280px' }}>
              <Search
                size={14}
                color="#aaaaaa"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Cari kode atau nama bahan..."
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

            <select
              value={filterKondisi}
              onChange={(e) => setFilterKondisi(e.target.value)}
              style={selectStyle}
            >
              <option value="Semua kondisi">Semua kondisi</option>
              <option value="Aman">Aman</option>
              <option value="Stok rendah">Stok rendah</option>
            </select>

            <select
              value={filterGudang}
              onChange={(e) => setFilterGudang(e.target.value)}
              style={selectStyle}
            >
              <option value="Gudang utama">Gudang utama</option>
            </select>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf0ee', color: '#b0525e', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', borderRadius: '8px 0 0 8px' }}>Bahan baku</th>
              <th style={{ padding: '12px 14px' }}>Stok</th>
              <th style={{ padding: '12px 14px' }}>Minimum</th>
              <th style={{ padding: '12px 14px' }}>Kedaluwarsa</th>
              <th style={{ padding: '12px 14px' }}>Lokasi</th>
              <th style={{ padding: '12px 14px' }}>Kondisi</th>
              <th style={{ padding: '12px 14px', textAlign: 'right', borderRadius: '0 8px 8px 0' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '14px' }}>
                  <div style={{ fontWeight: 'bold', color: '#333333' }}>{item.nama}</div>
                  <div style={{ fontSize: '10px', color: '#888888', marginTop: '2px' }}>
                    {item.id}
                  </div>
                </td>
                <td style={{ padding: '14px', fontWeight: 'bold', color: item.kondisi === 'Stok rendah' ? '#dc3545' : '#333333' }}>
                  {item.stok}
                </td>
                <td style={{ padding: '14px', color: '#555555' }}>{item.min}</td>
                <td style={{ padding: '14px', color: '#555555' }}>{item.kedaluwarsa}</td>
                <td style={{ padding: '14px', color: '#555555' }}>{item.lokasi}</td>
                <td style={{ padding: '14px' }}>
                  <span style={getKondisiBadgeStyle(item.kondisi)}>
                    {item.kondisi}
                  </span>
                </td>
                <td style={{ padding: '14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                    <Link
                      href={`/karyawan-produksi/bahan-baku/detail?id=${item.id}`}
                      style={btnDetailStyle}
                    >
                      <Eye size={12} />
                      <span>Lihat Detail Bahan Baku</span>
                    </Link>
                    <Link
                      href={`/karyawan-produksi/bahan-baku/perbarui?id=${item.id}`}
                      style={btnPerbaruiStyle}
                    >
                      <RotateCcw size={12} />
                      <span>Perbarui Stok</span>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINASI BATASTABEL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '16px',
            fontSize: '11px',
            color: '#777777',
          }}
        >
          <span>Menampilkan 1–{filteredData.length} dari {BAHAN_BAKU_DATA.length} data</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button style={pageButtonStyle} disabled>
              <ChevronLeft size={14} />
            </button>
            <button style={{ ...pageButtonStyle, backgroundColor: '#b0525e', color: '#ffffff' }}>
              1
            </button>
            <button style={pageButtonStyle} disabled>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* BANNER CATATAN PERHATIAN STOK */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '16px 24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#fff3cd',
            color: '#856404',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Info size={18} />
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#856404' }}>
            Perhatikan stok mentega dan cokelat batang
          </div>
          <div style={{ fontSize: '11px', color: '#666666', marginTop: '2px' }}>
            Stok masih tersedia untuk jadwal hari ini, tetapi berada di bawah minimum. Laporkan kebutuhan kepada admin; jangan mengganti bahan tanpa persetujuan.
          </div>
        </div>
      </div>

    </div>
  );
}

/* HELPER STYLES */
const cardStatStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const iconBadgeStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  backgroundColor: '#fdf0ee',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const selectStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  fontSize: '12px',
  color: '#444444',
  backgroundColor: '#ffffff',
  outline: 'none',
};

const pageButtonStyle: React.CSSProperties = {
  width: '28px',
  height: '28px',
  borderRadius: '6px',
  border: '1px solid #e2e8f0',
  backgroundColor: '#ffffff',
  color: '#555555',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '12px',
};

const btnDetailStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '6px 10px',
  border: '1px solid #b0525e',
  color: '#b0525e',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '11px',
  fontWeight: 'bold',
};

const btnPerbaruiStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '6px 10px',
  backgroundColor: '#b0525e',
  color: '#ffffff',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '11px',
  fontWeight: 'bold',
};

function getKondisiBadgeStyle(kondisi: BahanBakuItem['kondisi']): React.CSSProperties {
  switch (kondisi) {
    case 'Aman':
      return {
        backgroundColor: '#e6f4ea',
        color: '#137333',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-block',
      };
    case 'Stok rendah':
      return {
        backgroundColor: '#fff3cd',
        color: '#856404',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-block',
      };
    default:
      return {};
  }
}

export default function DataBahanBakuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataBahanBakuContent />
    </Suspense>
  );
}