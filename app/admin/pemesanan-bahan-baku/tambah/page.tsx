'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Info } from 'lucide-react';

export default function AdminBuatPemesananBahanBakuPage() {
  const router = useRouter();

  const [nomorPO, setNomorPO] = useState('');
  const [supplier, setSupplier] = useState('');
  const [bahanBaku, setBahanBaku] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [satuan, setSatuan] = useState('');
  const [totalBiaya, setTotalBiaya] = useState('');
  const [estimasiTiba, setEstimasiTiba] = useState('');
  const [catatan, setCatatan] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/pemesanan-bahan-baku?notify=simpan');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Pemesanan Bahan Baku &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Buat Pemesanan</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Buat Pemesanan Bahan Baku
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Buat order pembelian bahan baku ke supplier terverifikasi.
          </div>
        </div>

        <Link
          href="/admin/pemesanan-bahan-baku"
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
          <span>Kembali ke Pemesanan</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={cardFormStyle}>
              <h3 style={sectionTitleStyle}>Informasi pemesanan</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Nomor PO *</label>
                  <input type="text" placeholder="Contoh: PO-261024-03" value={nomorPO} onChange={(e) => setNomorPO(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Supplier *</label>
                  <select value={supplier} onChange={(e) => setSupplier(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih supplier</option>
                    <option value="PT Prima Dairy">PT Prima Dairy</option>
                    <option value="CV Cokelat Nusantara">CV Cokelat Nusantara</option>
                    <option value="CV Sumber Pangan">CV Sumber Pangan</option>
                    <option value="UD Ternak Makmur">UD Ternak Makmur</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Bahan baku *</label>
                  <select value={bahanBaku} onChange={(e) => setBahanBaku(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih bahan baku</option>
                    <option value="Mentega">Mentega</option>
                    <option value="Cokelat Batang">Cokelat Batang</option>
                    <option value="Tepung Terigu">Tepung Terigu</option>
                    <option value="Telur">Telur</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Jumlah dipesan *</label>
                  <input type="text" placeholder="Masukkan jumlah" value={jumlah} onChange={(e) => setJumlah(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Satuan *</label>
                  <select value={satuan} onChange={(e) => setSatuan(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih satuan</option>
                    <option value="kg">kg</option>
                    <option value="butir">butir</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Total biaya (Rp) *</label>
                  <input type="text" placeholder="Contoh: 1500000" value={totalBiaya} onChange={(e) => setTotalBiaya(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Estimasi tiba *</label>
                  <input type="date" value={estimasiTiba} onChange={(e) => setEstimasiTiba(e.target.value)} style={inputStyle} required />
                </div>
              </div>
            </div>

            <div style={cardFormStyle}>
              <h3 style={sectionTitleStyle}>Catatan pemesanan</h3>
              <textarea
                rows={4}
                placeholder="Tambahkan catatan khusus pengiriman atau spesifikasi mutu..."
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                <Info size={16} /> Verifikasi PO
              </div>
              <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
                Setiap pemesanan yang disimpan akan dikirim ke portal supplier terkait untuk status konfirmasi.
              </div>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>* Wajib diisi. Periksa kembali data sebelum menyimpan.</div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={() => router.push('/admin/pemesanan-bahan-baku')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
              Batal
            </button>
            <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} /> Simpan Pemesanan
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