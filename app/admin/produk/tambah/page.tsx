'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Upload } from 'lucide-react';

export default function AdminTambahProdukPage() {
  const router = useRouter();

  const [kodeProduk, setKodeProduk] = useState('');
  const [namaProduk, setNamaProduk] = useState('');
  const [kategori, setKategori] = useState('');
  const [satuan, setSatuan] = useState('');
  const [hargaJual, setHargaJual] = useState('');
  const [stokAwal, setStokAwal] = useState('');
  const [statusProduk, setStatusProduk] = useState('');
  const [resepTerhubung, setResepTerhubung] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/produk", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_produk:kodeProduk,nama_produk:namaProduk,harga_jual:Number(hargaJual.replace(/[^0-9]/g,"")),jumlah_berhasil:Number(stokAwal)})});
    if(!response.ok){const result=await response.json();alert(result.error||"Gagal menyimpan produk.");return;}
    router.push('/admin/produk?notify=simpan');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Produk &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Tambah Produk</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Tambah Produk
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Tambahkan produk baru ke katalog dan hubungkan dengan resep produksinya.
          </div>
        </div>

        <Link
          href="/admin/produk"
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
          <span>Kembali ke Data Produk</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
          
          {/* INFORMASI PRODUK LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={cardFormStyle}>
              <h3 style={sectionTitleStyle}>Informasi produk</h3>
              <div style={{ fontSize: '11px', color: '#777', marginBottom: '14px' }}>
                Lengkapi identitas, harga jual, dan stok awal produk.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Kode produk *</label>
                  <input type="text" placeholder="Contoh: PRD-005" value={kodeProduk} onChange={(e) => setKodeProduk(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Nama produk *</label>
                  <input type="text" placeholder="Masukkan nama produk" value={namaProduk} onChange={(e) => setNamaProduk(e.target.value)} style={inputStyle} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Kategori *</label>
                  <select value={kategori} onChange={(e) => setKategori(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih kategori</option>
                    <option value="Donat">Donat</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Satuan *</label>
                  <select value={satuan} onChange={(e) => setSatuan(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih satuan</option>
                    <option value="pcs">pcs</option>
                    <option value="pak">pak</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Harga jual *</label>
                  <input type="text" placeholder="Rp Masukkan harga jual" value={hargaJual} onChange={(e) => setHargaJual(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Stok awal *</label>
                  <input type="text" placeholder="Masukkan jumlah stok" value={stokAwal} onChange={(e) => setStokAwal(e.target.value)} style={inputStyle} required />
                </div>
              </div>
            </div>

            {/* STATUS DAN RESEP */}
            <div style={cardFormStyle}>
              <h3 style={sectionTitleStyle}>Status dan resep</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '8px' }}>
                <div>
                  <label style={labelStyle}>Status produk *</label>
                  <select value={statusProduk} onChange={(e) => setStatusProduk(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih status produk</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Resep terhubung *</label>
                  <select value={resepTerhubung} onChange={(e) => setResepTerhubung(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih resep produk</option>
                    <option value="Resep Donat Cokelat">Resep Donat Cokelat</option>
                    <option value="Resep Donat Keju">Resep Donat Keju</option>
                    <option value="Resep Donat Gula">Resep Donat Gula</option>
                    <option value="Resep Donat Stroberi">Resep Donat Stroberi</option>
                  </select>
                </div>
              </div>
              <div style={{ fontSize: '11px', color: '#888' }}>
                Resep digunakan sebagai acuan kebutuhan bahan baku saat produksi.
              </div>
            </div>

          </div>

          {/* FOTO PRODUK RIGHT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={cardFormStyle}>
              <h3 style={sectionTitleStyle}>Foto produk</h3>
              
              <div
                style={{
                  border: '2px dashed #d8b4fe',
                  borderRadius: '12px',
                  padding: '32px 16px',
                  textAlign: 'center',
                  backgroundColor: '#faf5ff',
                  marginBottom: '12px',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffffff', color: '#6b21a8', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Upload size={20} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>
                  Belum ada foto produk
                </div>
                <div style={{ fontSize: '11px', color: '#777', marginBottom: '16px' }}>
                  Pilih foto untuk ditampilkan pada katalog produk.
                </div>

                <button
                  type="button"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #6b21a8',
                    borderRadius: '16px',
                    color: '#6b21a8',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Pilih Foto
                </button>
              </div>

              <div style={{ fontSize: '10px', color: '#888', lineHeight: 1.4 }}>
                Format JPG atau PNG, maksimal 2 MB. Gunakan foto dengan rasio 1:1.
              </div>
            </div>

            {/* TENTANG STOK PRODUK INFO */}
            <div style={{ backgroundColor: '#f3e8ff', borderRadius: '12px', padding: '16px', fontSize: '11px', color: '#581c87' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Tentang stok produk</div>
              <div>
                Stok berikutnya diperbarui dari hasil produksi yang lolos pemeriksaan mutu. Alokasi pesanan dipisahkan dari stok siap jual.
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER ACTIONS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>
            * Wajib diisi. Periksa harga, satuan, dan resep sebelum menyimpan.
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={() => router.push('/admin/produk')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
              Batal
            </button>
            <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} /> Simpan Produk
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