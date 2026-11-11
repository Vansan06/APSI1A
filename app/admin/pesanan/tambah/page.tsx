'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Check } from 'lucide-react';

export default function AdminTambahPesananPage() {
  const router = useRouter();

  const [noPesanan, setNoPesanan] = useState('');
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [tglPesanan, setTglPesanan] = useState('');
  const [waktuPengambilan, setWaktuPengambilan] = useState('');
  const [produk, setProduk] = useState('');
  const [kuantitas, setKuantitas] = useState('');
  const [statusPesanan, setStatusPesanan] = useState('');
  const [statusPembayaran, setStatusPembayaran] = useState('');
  const [metodePembayaran, setMetodePembayaran] = useState('');
  const [catatan, setCatatan] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/pesanan?notify=simpan');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Pesanan &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Tambah Pesanan</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Tambah Pesanan
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Buat pesanan baru dengan melengkapi pelanggan, item produk, dan pembayaran.
          </div>
        </div>

        <Link
          href="/admin/pesanan"
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
          <span>Kembali ke Data Pesanan</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* INFORMASI PESANAN */}
        <div style={cardFormStyle}>
          <h3 style={sectionTitleStyle}>Informasi pesanan</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Nomor pesanan *</label>
              <input type="text" placeholder="Masukkan nomor pesanan" value={noPesanan} onChange={(e) => setNoPesanan(e.target.value)} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Nama pelanggan *</label>
              <input type="text" placeholder="Masukkan nama pelanggan" value={namaPelanggan} onChange={(e) => setNamaPelanggan(e.target.value)} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Tanggal pesanan *</label>
              <input type="date" value={tglPesanan} onChange={(e) => setTglPesanan(e.target.value)} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Waktu pengambilan</label>
              <input type="time" value={waktuPengambilan} onChange={(e) => setWaktuPengambilan(e.target.value)} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* ITEM PESANAN */}
        <div style={cardFormStyle}>
          <h3 style={sectionTitleStyle}>Item pesanan</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '16px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Produk</th>
                <th style={{ padding: '10px' }}>Kuantitas (pcs)</th>
                <th style={{ padding: '10px' }}>Harga satuan</th>
                <th style={{ padding: '10px' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px' }}>
                  <select value={produk} onChange={(e) => setProduk(e.target.value)} style={inputStyle}>
                    <option value="">Pilih produk...</option>
                    <option value="Donat Cokelat">Donat Cokelat</option>
                    <option value="Donat Keju">Donat Keju</option>
                    <option value="Donat Gula">Donat Gula</option>
                    <option value="Donat Stroberi">Donat Stroberi</option>
                  </select>
                </td>
                <td style={{ padding: '10px' }}>
                  <input type="number" placeholder="Masukkan jumlah" value={kuantitas} onChange={(e) => setKuantitas(e.target.value)} style={inputStyle} />
                </td>
                <td style={{ padding: '10px', color: '#777' }}>Harga otomatis</td>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>Rp0</td>
              </tr>
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button type="button" style={{ padding: '8px 16px', border: '1px solid #d8b4fe', borderRadius: '16px', backgroundColor: '#ffffff', color: '#6b21a8', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={14} /> Tambah item
            </button>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
              Total pesanan <span style={{ color: '#6b21a8', fontSize: '18px', marginLeft: '8px' }}>Rp0</span>
            </div>
          </div>
        </div>

        {/* STATUS & CATATAN */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
          <div style={cardFormStyle}>
            <h3 style={sectionTitleStyle}>Status dan pembayaran</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Status pesanan *</label>
                <select value={statusPesanan} onChange={(e) => setStatusPesanan(e.target.value)} style={inputStyle} required>
                  <option value="">Pilih status</option>
                  <option value="Siap dikirim">Siap dikirim</option>
                  <option value="Diproduksi">Diproduksi</option>
                  <option value="Menunggu bayar">Menunggu bayar</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Status pembayaran *</label>
                <select value={statusPembayaran} onChange={(e) => setStatusPembayaran(e.target.value)} style={inputStyle} required>
                  <option value="">Pilih pembayaran</option>
                  <option value="Lunas">Lunas</option>
                  <option value="Belum lunas">Belum lunas</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Metode pembayaran</label>
                <select value={metodePembayaran} onChange={(e) => setMetodePembayaran(e.target.value)} style={inputStyle}>
                  <option value="">Pilih metode</option>
                  <option value="Transfer bank">Transfer bank</option>
                  <option value="Tunai">Tunai</option>
                </select>
              </div>
            </div>
          </div>

          <div style={cardFormStyle}>
            <h3 style={sectionTitleStyle}>Catatan pesanan</h3>
            <label style={labelStyle}>Catatan (opsional)</label>
            <textarea rows={3} placeholder="Tambahkan instruksi atau catatan pengambilan..." value={catatan} onChange={(e) => setCatatan(e.target.value)} style={{ ...inputStyle, fontFamily: 'inherit' }} />
          </div>
        </div>

        {/* BUTTON ACTIONS */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
          <button type="button" onClick={() => router.push('/admin/pesanan')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            Batal
          </button>
          <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Check size={16} /> Simpan Pesanan
          </button>
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
  margin: '0 0 16px 0',
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