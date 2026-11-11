'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Plus, Info } from 'lucide-react';

export default function AdminTambahResepPage() {
  const router = useRouter();

  const [kodeResep, setKodeResep] = useState('');
  const [produk, setProduk] = useState('');
  const [statusResep, setStatusResep] = useState('');
  const [hasilAdonan, setHasilAdonan] = useState('');
  const [satuanHasil, setSatuanHasil] = useState('');
  const [waktuProses, setWaktuProses] = useState('');
  const [instruksi, setInstruksi] = useState('');

  const [komposisiList, setKomposisiList] = useState([
    { bahanBaku: '', takaran: '', biaya: 'Rp0' }
  ]);

  const handleAddRow = () => {
    setKomposisiList([...komposisiList, { bahanBaku: '', takaran: '', biaya: 'Rp0' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/resep?notify=simpan');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Resep &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Tambah Resep</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Tambah Resep
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Buat resep sebagai acuan komposisi bahan dan proses produksi.
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

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
          
          {/* INFORMASI RESEP & KOMPOSISI LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={cardFormStyle}>
              <h3 style={sectionTitleStyle}>Informasi resep</h3>
              <div style={{ fontSize: '11px', color: '#777', marginBottom: '14px' }}>
                Lengkapi resep baru. Semua kolom bertanda * wajib diisi.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={labelStyle}>Kode resep *</label>
                  <input type="text" placeholder="Masukkan kode unik" value={kodeResep} onChange={(e) => setKodeResep(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Produk / nama resep *</label>
                  <select value={produk} onChange={(e) => setProduk(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih produk / nama resep</option>
                    <option value="Donat Cokelat">Donat Cokelat</option>
                    <option value="Donat Keju">Donat Keju</option>
                    <option value="Donat Gula">Donat Gula</option>
                    <option value="Donat Stroberi">Donat Stroberi</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Status *</label>
                  <select value={statusResep} onChange={(e) => setStatusResep(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih status</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Hasil per adonan *</label>
                  <input type="text" placeholder="Jumlah hasil, min. 1" value={hasilAdonan} onChange={(e) => setHasilAdonan(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Satuan hasil *</label>
                  <select value={satuanHasil} onChange={(e) => setSatuanHasil(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih satuan</option>
                    <option value="pcs">pcs</option>
                    <option value="pak">pak</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Waktu proses (menit) *</label>
                  <input type="text" placeholder="Durasi, min. 1 menit" value={waktuProses} onChange={(e) => setWaktuProses(e.target.value)} style={inputStyle} required />
                </div>
              </div>
            </div>

            {/* KOMPOSISI BAHAN */}
            <div style={cardFormStyle}>
              <h3 style={sectionTitleStyle}>Komposisi bahan</h3>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '12px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
                    <th style={{ padding: '8px' }}>Bahan baku *</th>
                    <th style={{ padding: '8px' }}>Takaran / satuan *</th>
                    <th style={{ padding: '8px' }}>Biaya bahan</th>
                  </tr>
                </thead>
                <tbody>
                  {komposisiList.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '6px 4px' }}>
                        <select style={inputStyle}>
                          <option value="">Pilih bahan baku</option>
                          <option value="Tepung Terigu">Tepung Terigu</option>
                          <option value="Gula Pasir">Gula Pasir</option>
                          <option value="Mentega">Mentega</option>
                          <option value="Cokelat Batang">Cokelat Batang</option>
                          <option value="Telur">Telur</option>
                        </select>
                      </td>
                      <td style={{ padding: '6px 4px' }}>
                        <input type="text" placeholder="Masukkan takaran" style={inputStyle} />
                      </td>
                      <td style={{ padding: '6px 4px' }}>
                        <input type="text" value={row.biaya} readOnly style={{ ...inputStyle, backgroundColor: '#f3f4f6' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', color: '#888' }}>Takaran harus &gt; 0. Biaya mengikuti bahan dan takaran.</span>
                <button
                  type="button"
                  onClick={handleAddRow}
                  style={{
                    padding: '6px 14px',
                    border: '1px solid #6b21a8',
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    color: '#6b21a8',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Plus size={14} /> Tambah Baris
                </button>
              </div>

              <div style={{ marginTop: '16px', backgroundColor: '#faf5ff', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', color: '#6b21a8' }}>
                <span>Total biaya bahan</span>
                <span>Rp0 • Belum dihitung</span>
              </div>
            </div>

          </div>

          {/* LANGKAH PRODUKSI RIGHT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={cardFormStyle}>
              <h3 style={sectionTitleStyle}>Langkah produksi</h3>
              <div style={{ fontSize: '11px', color: '#777', marginBottom: '10px' }}>
                Tuliskan urutan kerja dan durasi setiap tahap.
              </div>

              <label style={labelStyle}>Instruksi produksi *</label>
              <textarea
                rows={6}
                placeholder="Contoh: 1. Campur bahan dan uleni..."
                value={instruksi}
                onChange={(e) => setInstruksi(e.target.value)}
                style={{ ...inputStyle, resize: 'vertical' }}
                required
              />
              <div style={{ fontSize: '10px', color: '#888', marginTop: '6px' }}>
                Sertakan durasi, suhu, dan petunjuk pendinginan.
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                <Info size={16} /> Perhitungan biaya
              </div>
              <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
                Total biaya dihitung dari seluruh komposisi. Isi bahan, takaran, dan hasil per adonan sebelum menyimpan.
              </div>
            </div>

          </div>

        </div>

        {/* FOOTER ACTIONS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>
            * Wajib diisi. Periksa kembali data sebelum menyimpan.
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={() => router.push('/admin/resep')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
              Batal
            </button>
            <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} /> Simpan Resep
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}

const cardFormStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#6b21a8',
  margin: '0 0 12px 0',
  fontWeight: 'bold',
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