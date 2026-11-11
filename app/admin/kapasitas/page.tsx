'use client';

import React, { useState } from 'react';
import { 
  Factory, 
  ClipboardList, 
  BarChart3, 
  SlidersHorizontal, 
  Check, 
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AlokasiItem {
  id: string;
  waktu: string;
  produk: string;
  target: string;
  alat: string;
  penanggungJawab: string;
  status: 'Selesai' | 'Berjalan' | 'Terjadwal';
  image: string;
}

const ALOKASI_LIST: AlokasiItem[] = [
  {
    id: '1',
    waktu: '08.00–10.00',
    produk: 'Donat Cokelat',
    target: '250 pcs',
    alat: 'Oven utama',
    penanggungJawab: 'Siti Rahmah',
    status: 'Selesai',
    image: '/donat-cokelat.png',
  },
  {
    id: '2',
    waktu: '10.00–12.00',
    produk: 'Donat Gula',
    target: '150 pcs',
    alat: 'Oven utama',
    penanggungJawab: 'Siti Rahmah',
    status: 'Selesai',
    image: '/donat-gula.png',
  },
  {
    id: '3',
    waktu: '12.30–14.30',
    produk: 'Donat Keju',
    target: '170 pcs',
    alat: 'Oven utama',
    penanggungJawab: 'Siti Rahmah',
    status: 'Berjalan',
    image: '/donat-keju.png',
  },
  {
    id: '4',
    waktu: '14.30–16.00',
    produk: 'Donat Stroberi',
    target: '50 pak',
    alat: 'Oven utama',
    penanggungJawab: 'Siti Rahmah',
    status: 'Terjadwal',
    image: '/donat-stroberi.png',
  },
];

export default function AdminKapasitasProduksiPage() {
  const [showModalAtur, setShowModalAtur] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [shiftPilihan, setShiftPilihan] = useState('Sif pagi');

  // State Form Atur Kapasitas
  const [kapasitasHarian, setKapasitasHarian] = useState('800');
  const [jamOperasional, setJamOperasional] = useState('08.00–16.00');

  const handleSimpanKapasitas = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModalAtur(false);
    setShowModalSuccess(true);
  };

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
      
      {/* HEADER UTAMA DAN TOMBOL ATUR KAPASITAS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
          Kapasitas Produksi
        </h2>
        <button
          onClick={() => setShowModalAtur(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#6b21a8',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(107, 33, 168, 0.2)',
          }}
        >
          <SlidersHorizontal size={16} />
          <span>Atur Kapasitas</span>
        </button>
      </div>

      {/* 3 KARTU RINGKASAN UTAMA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        
        {/* KARTU 1: KAPASITAS HARIAN */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Kapasitas harian</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#333333', margin: '4px 0' }}>
              800 unit
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>1 sif &bull; 08.00–16.00</div>
          </div>
          <div style={iconBadgeStyle}>
            <Factory size={20} color="#6b21a8" />
          </div>
        </div>

        {/* KARTU 2: RENCANA HARI INI */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Rencana hari ini</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#333333', margin: '4px 0' }}>
              620 unit
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>520 pesanan + 100 stok</div>
          </div>
          <div style={iconBadgeStyle}>
            <ClipboardList size={20} color="#6b21a8" />
          </div>
        </div>

        {/* KARTU 3: SISA KAPASITAS */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Sisa kapasitas</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#333333', margin: '4px 0' }}>
              180 unit
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>22,5% tersedia untuk pesanan baru</div>
          </div>
          <div style={iconBadgeStyle}>
            <BarChart3 size={20} color="#6b21a8" />
          </div>
        </div>

      </div>

      {/* PANEL PEMAKAIAN SUMBER DAYA (PROGRESS BARS) */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '15px', color: '#333333', margin: '0 0 16px 0', fontWeight: 'bold' }}>
          Pemakaian sumber daya
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          
          {/* BAR 1: OVEN UTAMA */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ color: '#444444' }}>Oven utama</span>
              <span style={{ fontWeight: 'bold', color: '#6b21a8' }}>78%</span>
            </div>
            <div style={progressTrackStyle}>
              <div style={{ ...progressFillStyle, width: '78%' }} />
            </div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>
              6,2 dari 8 jam operasi
            </div>
          </div>

          {/* BAR 2: MESIN PENGADUK */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ color: '#444444' }}>Mesin pengaduk</span>
              <span style={{ fontWeight: 'bold', color: '#6b21a8' }}>67%</span>
            </div>
            <div style={progressTrackStyle}>
              <div style={{ ...progressFillStyle, width: '67%' }} />
            </div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>
              4 dari 6 jam operasi
            </div>
          </div>

          {/* BAR 3: TIM PRODUKSI */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ color: '#444444' }}>Tim produksi</span>
              <span style={{ fontWeight: 'bold', color: '#6b21a8' }}>75%</span>
            </div>
            <div style={progressTrackStyle}>
              <div style={{ ...progressFillStyle, width: '75%' }} />
            </div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>
              6 dari 8 orang dialokasikan
            </div>
          </div>

        </div>
      </div>

      {/* HEADER SUB JADWAL & SELECTOR SHIFT */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
        <div style={{ fontSize: '12px', color: '#555555', fontWeight: '500' }}>
          Jadwal produksi &bull; Sabtu, 24 Oktober 2026
        </div>
        <div>
          <select 
            value={shiftPilihan} 
            onChange={(e) => setShiftPilihan(e.target.value)}
            style={{ 
              padding: '6px 12px', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0', 
              backgroundColor: '#ffffff', 
              fontSize: '12px', 
              color: '#333', 
              outline: 'none',
              cursor: 'pointer' 
            }}
          >
            <option>Sif pagi</option>
            <option>Sif siang</option>
          </select>
        </div>
      </div>

      {/* TABEL ALOKASI PRODUKSI */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Alokasi produksi
          </h3>
          <span style={{ fontSize: '11px', color: '#888' }}>4 data</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
              <th style={{ padding: '10px 12px', borderRadius: '6px 0 0 6px' }}>Waktu</th>
              <th style={{ padding: '10px 12px' }}>Produk</th>
              <th style={{ padding: '10px 12px' }}>Target</th>
              <th style={{ padding: '10px 12px' }}>Alat</th>
              <th style={{ padding: '10px 12px' }}>Penanggung jawab</th>
              <th style={{ padding: '10px 12px', borderRadius: '0 6px 6px 0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {ALOKASI_LIST.map((item) => {
              const badge = getStatusBadge(item.status);
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #fdf2f8' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#333' }}>
                    {item.waktu}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={item.image}
                        alt={item.produk}
                        style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <span style={{ fontWeight: '500', color: '#333' }}>{item.produk}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px', color: '#333' }}>{item.target}</td>
                  <td style={{ padding: '12px', color: '#333' }}>{item.alat}</td>
                  <td style={{ padding: '12px', color: '#333' }}>{item.penanggungJawab}</td>
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

      {/* MODAL ATUR KAPASITAS */}
      {showModalAtur && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '24px', width: '420px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>Atur Kapasitas Produksi</h3>
              <button onClick={() => setShowModalAtur(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#777' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSimpanKapasitas} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Kapasitas Harian (unit) *</label>
                <input
                  type="number"
                  value={kapasitasHarian}
                  onChange={(e) => setKapasitasHarian(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Jam Operasional *</label>
                <input
                  type="text"
                  value={jamOperasional}
                  onChange={(e) => setJamOperasional(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowModalAtur(false)}
                  style={{ padding: '8px 18px', border: '1px solid #ccc', borderRadius: '16px', backgroundColor: '#fff', color: '#555', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', backgroundColor: '#6b21a8', color: '#fff', border: 'none', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NOTIFIKASI SUKSES */}
      {showModalSuccess && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', width: '360px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#6b21a8', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={28} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '20px', color: '#6b21a8', margin: '0 0 8px 0', fontWeight: 'bold' }}>Berhasil Diperbarui</h3>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 20px 0' }}>Pengaturan kapasitas produksi berhasil disimpan.</p>
            <button
              onClick={() => setShowModalSuccess(false)}
              style={{ width: '100%', padding: '10px', backgroundColor: '#581c87', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Selesai
            </button>
          </div>
        </div>
      )}

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

const progressTrackStyle: React.CSSProperties = {
  width: '100%',
  height: '8px',
  backgroundColor: '#f3e8ff',
  borderRadius: '4px',
  overflow: 'hidden',
};

const progressFillStyle: React.CSSProperties = {
  height: '100%',
  backgroundColor: '#86198f',
  borderRadius: '4px',
  transition: 'width 0.3s ease',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 'bold',
  color: '#555555',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  fontSize: '12px',
  outline: 'none',
  boxSizing: 'border-box',
};