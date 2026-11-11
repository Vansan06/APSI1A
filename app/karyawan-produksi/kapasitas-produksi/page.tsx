'use client';

import React from 'react';
import Image from 'next/image';
import {
  Calendar,
  Factory,
  ClipboardList,
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';

interface AlokasiItem {
  id: string;
  waktu: string;
  produk: string;
  gambar: string;
  target: string;
  alat: string;
  penanggungJawab: string;
  status: 'Selesai' | 'Berjalan' | 'Terjadwal';
}

const DAFTAR_ALOKASI: AlokasiItem[] = [
  {
    id: '1',
    waktu: '08.00–10.00',
    produk: 'Donat Cokelat',
    gambar: '/donat-cokelat.png',
    target: '250 pcs',
    alat: 'Oven utama',
    penanggungJawab: 'Siti Rahmah',
    status: 'Selesai',
  },
  {
    id: '2',
    waktu: '10.00–12.00',
    produk: 'Donat Gula',
    gambar: '/donat-gula.png',
    target: '150 pcs',
    alat: 'Oven utama',
    penanggungJawab: 'Siti Rahmah',
    status: 'Selesai',
  },
  {
    id: '3',
    waktu: '12.30–14.30',
    produk: 'Donat Keju',
    gambar: '/donat-keju.png',
    target: '170 pcs',
    alat: 'Oven utama',
    penanggungJawab: 'Siti Rahmah',
    status: 'Berjalan',
  },
  {
    id: '4',
    waktu: '14.30–16.00',
    produk: 'Donat Stroberi',
    gambar: '/donat-stroberi.png',
    target: '50 pcs',
    alat: 'Oven utama',
    penanggungJawab: 'Siti Rahmah',
    status: 'Terjadwal',
  },
];

export default function KapasitasProduksiPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* BARIS ATAS: TITLE & BADGE TANGGAL */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ fontSize: '24px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
          Kapasitas Produksi
        </h2>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            color: '#444444',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <Calendar size={14} color="#b0525e" />
          <span>24 Oktober 2026</span>
        </div>
      </div>

      {/* KARTU STATISTIK 3 KOLOM */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        
        {/* KARTU 1: KAPASITAS HARIAN */}
        <div style={cardStatStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
              Kapasitas harian
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>
              800 unit
            </div>
            <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>
              1 sif • 08.00–16.00
            </div>
          </div>
          <div style={iconBadgeStyle}>
            <Factory size={20} color="#b0525e" />
          </div>
        </div>

        {/* KARTU 2: RENCANA HARI INI */}
        <div style={cardStatStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
              Rencana hari ini
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>
              620 unit
            </div>
            <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>
              520 pesanan + 100 stok
            </div>
          </div>
          <div style={iconBadgeStyle}>
            <ClipboardList size={20} color="#b0525e" />
          </div>
        </div>

        {/* KARTU 3: SISA KAPASITAS */}
        <div style={cardStatStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
              Sisa kapasitas
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>
              180 unit
            </div>
            <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>
              22,5% kapasitas masih tersedia
            </div>
          </div>
          <div style={iconBadgeStyle}>
            <BarChart3 size={20} color="#b0525e" />
          </div>
        </div>

      </div>

      {/* KARTU PEMAKAIAN SUMBER DAYA (PROGRESS BARS) */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        }}
      >
        <h3 style={{ fontSize: '16px', color: '#b0525e', margin: '0 0 20px 0', fontWeight: 'bold' }}>
          Pemakaian sumber daya
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          
          {/* ITEM 1: OVEN UTAMA */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#333333', marginBottom: '8px' }}>
              <span>Oven utama</span>
              <span style={{ color: '#b0525e' }}>78%</span>
            </div>
            <div style={progressTrackStyle}>
              <div style={{ ...progressBarFillStyle, width: '78%' }} />
            </div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>
              6,2 dari 8 jam operasi
            </div>
          </div>

          {/* ITEM 2: MESIN PENGADUK */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#333333', marginBottom: '8px' }}>
              <span>Mesin pengaduk</span>
              <span style={{ color: '#b0525e' }}>67%</span>
            </div>
            <div style={progressTrackStyle}>
              <div style={{ ...progressBarFillStyle, width: '67%' }} />
            </div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>
              4 dari 6 jam operasi
            </div>
          </div>

          {/* ITEM 3: TIM PRODUKSI */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#333333', marginBottom: '8px' }}>
              <span>Tim produksi</span>
              <span style={{ color: '#b0525e' }}>75%</span>
            </div>
            <div style={progressTrackStyle}>
              <div style={{ ...progressBarFillStyle, width: '75%' }} />
            </div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>
              6 dari 8 orang dialokasikan
            </div>
          </div>

        </div>
      </div>

      {/* BARIS DROPDOWN SIF & HEADER ALOKASI */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '4px',
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#b0525e' }}>
          Jadwal produksi • Sabtu, 24 Oktober 2026
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#444444',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            cursor: 'pointer',
          }}
        >
          <ChevronDown size={14} />
          <span>Sif pagi</span>
        </div>
      </div>

      {/* TABEL ALOKASI PRODUKSI */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        }}
      >
        <h3 style={{ fontSize: '16px', color: '#b0525e', margin: '0 0 16px 0', fontWeight: 'bold' }}>
          Alokasi produksi
        </h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf0ee', color: '#b0525e', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', borderRadius: '8px 0 0 8px' }}>Waktu</th>
              <th style={{ padding: '12px 14px' }}>Produk</th>
              <th style={{ padding: '12px 14px' }}>Target</th>
              <th style={{ padding: '12px 14px' }}>Alat</th>
              <th style={{ padding: '12px 14px' }}>Penanggung jawab</th>
              <th style={{ padding: '12px 14px', borderRadius: '0 8px 8px 0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {DAFTAR_ALOKASI.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '14px', fontWeight: 'bold', color: '#333333' }}>
                  {item.waktu}
                </td>
                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: '#fcdcd9',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={item.gambar}
                        alt={item.produk}
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <span style={{ fontWeight: 'bold', color: '#333333' }}>{item.produk}</span>
                  </div>
                </td>
                <td style={{ padding: '14px', color: '#444444' }}>{item.target}</td>
                <td style={{ padding: '14px', color: '#444444' }}>{item.alat}</td>
                <td style={{ padding: '14px', color: '#444444' }}>{item.penanggungJawab}</td>
                <td style={{ padding: '14px' }}>
                  <span style={getStatusBadgeStyle(item.status)}>{item.status}</span>
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
          <span>Menampilkan 1–4 dari 4 data</span>
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

      {/* BANNER CATATAN TUGAS BERIKUTNYA */}
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
            backgroundColor: '#fdf0ee',
            color: '#b0525e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Info size={18} />
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#b0525e' }}>
            Tugas Anda berikutnya • Donat Keju
          </div>
          <div style={{ fontSize: '11px', color: '#666666', marginTop: '2px' }}>
            Gunakan oven utama hingga pukul 14.30. Laporkan kendala alat atau keterlambatan kepada penanggung jawab produksi; perubahan kapasitas dilakukan oleh admin.
          </div>
        </div>
      </div>

    </div>
  );
}

/* STYLES HELPER */
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

const progressTrackStyle: React.CSSProperties = {
  height: '8px',
  backgroundColor: '#fdf0ee',
  borderRadius: '4px',
  overflow: 'hidden',
};

const progressBarFillStyle: React.CSSProperties = {
  height: '100%',
  backgroundColor: '#b0525e',
  borderRadius: '4px',
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

function getStatusBadgeStyle(status: AlokasiItem['status']): React.CSSProperties {
  switch (status) {
    case 'Selesai':
      return {
        backgroundColor: '#e6f4ea',
        color: '#137333',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-block',
      };
    case 'Berjalan':
      return {
        backgroundColor: '#e8f0fe',
        color: '#1a73e8',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-block',
      };
    case 'Terjadwal':
      return {
        backgroundColor: '#fdf0ee',
        color: '#b0525e',
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