'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Info } from 'lucide-react';

export default function AdminTambahBahanBakuPage() {
  const router = useRouter();

  const [kodeBahan, setKodeBahan] = useState('');
  const [namaBahan, setNamaBahan] = useState('');
  const [satuan, setSatuan] = useState('');
  const [supplier, setSupplier] = useState('');
  const [stokAwal, setStokAwal] = useState('');
  const [stokMinimum, setStokMinimum] = useState('');
  const [hargaSatuan, setHargaSatuan] = useState('');
  const [statusPersediaan, setStatusPersediaan] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/bahan-baku?notify=simpan');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Bahan Baku &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Tambah Bahan Baku</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Tambah Bahan Baku
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Daftarkan bahan, satuan pembelian, dan batas minimum persediaan.
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

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
          
          {/* FORM LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={cardFormStyle}>
              <h3 style={sectionTitleStyle}>Informasi bahan baku</h3>
              <div style={{ fontSize: '11px', color: '#777', marginBottom: '14px' }}>
                Kolom bertanda * wajib diisi.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Kode bahan *</label>
                  <input type="text" placeholder="Contoh: BB-009" value={kodeBahan} onChange={(e) => setKodeBahan(e.target.value)} style={inputStyle} required />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Kode harus unik.</div>
                </div>
                <div>
                  <label style={labelStyle}>Nama bahan *</label>
                  <input type="text" placeholder="Masukkan nama bahan baku" value={namaBahan} onChange={(e) => setNamaBahan(e.target.value)} style={inputStyle} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Satuan *</label>
                  <select value={satuan} onChange={(e) => setSatuan(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih satuan</option>
                    <option value="kg">kg</option>
                    <option value="gram">gram</option>
                    <option value="liter">liter</option>
                  </select>
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Gunakan satuan yang sama untuk stok dan harga.</div>
                </div>
                <div>
                  <label style={labelStyle}>Supplier *</label>
                  <select value={supplier} onChange={(e) => setSupplier(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih supplier</option>
                    <option value="CV Sumber Pangan">CV Sumber Pangan</option>
                    <option value="PT Prima Dairy">PT Prima Dairy</option>
                    <option value="PT Cokelat Nusantara">PT Cokelat Nusantara</option>
                    <option value="Ternak Makmur">Ternak Makmur</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={cardFormStyle}>
              <h3 style={sectionTitleStyle}>Persediaan dan harga</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Stok awal *</label>
                  <input type="text" placeholder="Masukkan jumlah stok" value={stokAwal} onChange={(e) => setStokAwal(e.target.value)} style={inputStyle} required />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Angka 0 atau lebih.</div>
                </div>
                <div>
                  <label style={labelStyle}>Stok minimum *</label>
                  <input type="text" placeholder="Masukkan batas minimum" value={stokMinimum} onChange={(e) => setStokMinimum(e.target.value)} style={inputStyle} required />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Digunakan sebagai batas peringatan stok.</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Harga / satuan *</label>
                  <input type="text" placeholder="Rp • Masukkan harga" value={hargaSatuan} onChange={(e) => setHargaSatuan(e.target.value)} style={inputStyle} required />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Harga harus lebih dari Rp0.</div>
                </div>
                <div>
                  <label style={labelStyle}>Status persediaan *</label>
                  <select value={statusPersediaan} onChange={(e) => setStatusPersediaan(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih status</option>
                    <option value="Aman">Aman</option>
                    <option value="Stok rendah">Stok rendah</option>
                  </select>
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Sesuaikan dengan stok dan batas minimum.</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                <Info size={16} /> Konsistensi satuan
              </div>
              <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
                Contoh: bila satuan kg, isi stok dan minimum dalam kg, serta harga untuk setiap 1 kg.
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                <Info size={16} /> Periksa supplier
              </div>
              <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
                Hubungkan bahan ke supplier yang sesuai agar pemesanan bahan baku lebih mudah ditelusuri.
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
            <button type="button" onClick={() => router.push('/admin/bahan-baku')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
              Batal
            </button>
            <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} /> Simpan Bahan Baku
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