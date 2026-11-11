'use client';

import React, { useState } from 'react';
import { 
  Package, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface HasilProduksiItem {
  id: string;
  produk: string;
  waktu: string;
  target: string;
  hasil: string;
  lolos: string;
  ditolak: string;
  pemeriksa: string;
  status: 'Selesai' | 'Berjalan' | 'Terjadwal';
  image: string;
}

const HASIL_PRODUKSI_LIST: HasilProduksiItem[] = [
  {
    id: 'PRD-261024-01',
    produk: 'Donat Cokelat',
    waktu: '10.00',
    target: '250 pcs',
    hasil: '250 pcs',
    lolos: '246 pcs',
    ditolak: '4 pcs',
    pemeriksa: 'Siti Rahmah',
    status: 'Selesai',
    image: '/donat-cokelat.png',
  },
  {
    id: 'PRD-261024-02',
    produk: 'Donat Gula',
    waktu: '12.00',
    target: '150 pcs',
    hasil: '150 pcs',
    lolos: '148 pcs',
    ditolak: '2 pcs',
    pemeriksa: 'Siti Rahmah',
    status: 'Selesai',
    image: '/donat-gula.png',
  },
  {
    id: 'PRD-261024-03',
    produk: 'Donat Keju',
    waktu: '12.30–14.30',
    target: '170 pcs',
    hasil: '—',
    lolos: '—',
    ditolak: '—',
    pemeriksa: 'Siti Rahmah',
    status: 'Berjalan',
    image: '/donat-keju.png',
  },
  {
    id: 'PRD-261024-04',
    produk: 'Donat Stroberi',
    waktu: '14.30',
    target: '50 pak',
    hasil: '—',
    lolos: '—',
    ditolak: '—',
    pemeriksa: 'Siti Rahmah',
    status: 'Terjadwal',
    image: '/donat-stroberi.png',
  },
];

export default function AdminHasilProduksiPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTanggal, setFilterTanggal] = useState('24 Okt 2026');
  const [filterHasil, setFilterHasil] = useState('Semua hasil');

  const getStatusBadge = (status: string) => {
    if (status === 'Selesai') {
      return { bg: '#e6f4ea', color: '#137333' };
    }
    if (status === 'Berjalan') {
      return { bg: '#e0f2fe', color: '#0369a1' };
    }
    return { bg: '#fef3c7', color: '#b45309' }; // Terjadwal
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER UTAMA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
          Hasil Produksi
        </h2>
      </div>

      {/* 3 KARTU STATISTIK RINGKASAN */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        
        {/* CARD 1: HASIL HARI INI */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Hasil hari ini</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#333333', margin: '4px 0' }}>
              400 pcs
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>2 batch selesai dari 4 rencana</div>
          </div>
          <div style={iconBadgeStyle}>
            <Package size={20} color="#6b21a8" />
          </div>
        </div>

        {/* CARD 2: LOLOS MUTU */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Lolos mutu</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#333333', margin: '4px 0' }}>
              394 pcs
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>98,5% dari hasil produksi</div>
          </div>
          <div style={iconBadgeStyle}>
            <CheckCircle2 size={20} color="#6b21a8" />
          </div>
        </div>

        {/* CARD 3: TIDAK LOLOS MUTU */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Tidak lolos mutu</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#333333', margin: '4px 0' }}>
              6 pcs
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>Dipisahkan dari stok siap jual</div>
          </div>
          <div style={iconBadgeStyle}>
            <AlertTriangle size={20} color="#6b21a8" />
          </div>
        </div>

      </div>

      {/* TABEL CATATAN HASIL PRODUKSI */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Catatan hasil produksi
          </h3>
          <span style={{ fontSize: '11px', color: '#888' }}>4 data</span>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} color="#888" style={{ position: 'absolute', left: '12px' }} />
            <input
              type="text"
              placeholder="Cari batch atau nama produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <select 
            value={filterTanggal} 
            onChange={(e) => setFilterTanggal(e.target.value)}
            style={selectStyle}
          >
            <option>24 Okt 2026</option>
          </select>

          <select 
            value={filterHasil} 
            onChange={(e) => setFilterHasil(e.target.value)}
            style={selectStyle}
          >
            <option>Semua hasil</option>
            <option>Selesai</option>
            <option>Berjalan</option>
            <option>Terjadwal</option>
          </select>
        </div>

        {/* TABEL */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
              <th style={{ padding: '10px 12px', borderRadius: '6px 0 0 6px' }}>Batch / produk</th>
              <th style={{ padding: '10px 12px' }}>Target</th>
              <th style={{ padding: '10px 12px' }}>Hasil</th>
              <th style={{ padding: '10px 12px' }}>Lolos</th>
              <th style={{ padding: '10px 12px' }}>Ditolak</th>
              <th style={{ padding: '10px 12px' }}>Pemeriksa</th>
              <th style={{ padding: '10px 12px', borderRadius: '0 6px 6px 0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {HASIL_PRODUKSI_LIST.map((item) => {
              const badge = getStatusBadge(item.status);
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #fdf2f8' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={item.image}
                        alt={item.produk}
                        style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#333' }}>{item.id}</div>
                        <div style={{ fontSize: '10px', color: '#777' }}>
                          {item.produk} &bull; {item.waktu}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px', color: '#333' }}>{item.target}</td>
                  <td style={{ padding: '12px', color: '#333' }}>{item.hasil}</td>
                  <td style={{ padding: '12px', color: '#333' }}>{item.lolos}</td>
                  <td style={{ padding: '12px', color: '#333' }}>{item.ditolak}</td>
                  <td style={{ padding: '12px', color: '#333' }}>{item.pemeriksa}</td>
                  <td style={{ padding: '12px' }}>
                    <span 
                      style={{ 
                        backgroundColor: badge.bg, 
                        color: badge.color, 
                        padding: '4px 10px', 
                        borderRadius: '12px', 
                        fontSize: '11px', 
                        fontWeight: 'bold' 
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* PAGINATION FOOTER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '11px', color: '#888888' }}>
          <div>Menampilkan 1–4 dari 4 data</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button disabled style={{ border: 'none', background: 'none', cursor: 'not-allowed', color: '#ccc' }}>
              <ChevronLeft size={16} />
            </button>
            <span style={{ backgroundColor: '#6b21a8', color: '#ffffff', width: '22px', height: '22px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              1
            </span>
            <button disabled style={{ border: 'none', background: 'none', cursor: 'not-allowed', color: '#ccc' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* BANNER INFORMASI CATATAN MUTU BATCH */}
      <div 
        style={{ 
          backgroundColor: '#fffbeb', 
          border: '1px solid #fef3c7', 
          borderRadius: '12px', 
          padding: '16px 20px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)' 
        }}
      >
        <div 
          style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            backgroundColor: '#fef3c7', 
            color: '#b45309', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexShrink: 0 
          }}
        >
          <AlertTriangle size={16} />
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#92400e' }}>
            Catatan mutu batch PRD-261024-01
          </div>
          <div style={{ fontSize: '11px', color: '#b45309', marginTop: '2px' }}>
            4 Donat Cokelat ditolak karena permukaan terlalu matang. Sebanyak 246 pcs telah dicatat masuk gudang produk jadi.
          </div>
        </div>
      </div>

    </div>
  );
}

const statCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const iconBadgeStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  backgroundColor: '#f3e8ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const selectStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  fontSize: '12px',
  backgroundColor: '#ffffff',
  color: '#333',
  outline: 'none',
  cursor: 'pointer',
};