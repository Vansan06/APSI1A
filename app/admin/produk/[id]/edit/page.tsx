'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, Upload, Trash2 } from 'lucide-react';

interface EditProdukRecord {
  kode: string;
  nama: string;
  kategori: string;
  satuan: string;
  hargaJual: string;
  stokTersedia: string;
  status: string;
  resepName: string;
  imageSrc: string;
}

const ALL_PRODUK_EDIT_DATA: Record<string, EditProdukRecord> = {
  'PRD-001': {
    kode: 'PRD-001',
    nama: 'Donat Cokelat',
    kategori: 'Donat',
    satuan: 'pcs',
    hargaJual: 'Rp8.000',
    stokTersedia: '60',
    status: 'Aktif',
    resepName: 'Resep Donat Cokelat',
    imageSrc: '/donat-cokelat.png',
  },
  'PRD-002': {
    kode: 'PRD-002',
    nama: 'Donat Keju',
    kategori: 'Donat',
    satuan: 'pcs',
    hargaJual: 'Rp9.000',
    stokTersedia: '40',
    status: 'Aktif',
    resepName: 'Resep Donat Keju',
    imageSrc: '/donat-keju.png',
  },
  'PRD-003': {
    kode: 'PRD-003',
    nama: 'Donat Gula',
    kategori: 'Donat',
    satuan: 'pcs',
    hargaJual: 'Rp12.000',
    stokTersedia: '45',
    status: 'Aktif',
    resepName: 'Resep Donat Gula',
    imageSrc: '/donat-gula.png',
  },
  'PRD-004': {
    kode: 'PRD-004',
    nama: 'Donat Stroberi',
    kategori: 'Donat',
    satuan: 'pcs',
    hargaJual: 'Rp11.800',
    stokTersedia: '20',
    status: 'Aktif',
    resepName: 'Resep Donat Stroberi',
    imageSrc: '/donat-stroberi.png',
  },
};

export default function EditProdukAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'PRD-001';

  const initialData = ALL_PRODUK_EDIT_DATA[id] || ALL_PRODUK_EDIT_DATA['PRD-001'];

  const [namaProduk, setNamaProduk] = useState(initialData.nama);
  const [kategori, setKategori] = useState(initialData.kategori);
  const [satuan, setSatuan] = useState(initialData.satuan);
  const [hargaJual, setHargaJual] = useState(initialData.hargaJual);
  const [stokTersedia, setStokTersedia] = useState(initialData.stokTersedia);
  const [statusProduk, setStatusProduk] = useState(initialData.status);
  const [resepTerhubung, setResepTerhubung] = useState(initialData.resepName);

  useEffect(() => {
    const data = ALL_PRODUK_EDIT_DATA[id] || ALL_PRODUK_EDIT_DATA['PRD-001'];
    setNamaProduk(data.nama);
    setKategori(data.kategori);
    setSatuan(data.satuan);
    setHargaJual(data.hargaJual);
    setStokTersedia(data.stokTersedia);
    setStatusProduk(data.status);
    setResepTerhubung(data.resepName);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response=await fetch(`/api/produk/${encodeURIComponent(id)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({nama_produk:namaProduk,harga_jual:Number(hargaJual.replace(/[^0-9]/g,"")),jumlah_berhasil:Number(stokTersedia)})});
    if(!response.ok){const result=await response.json();alert(result.error||"Gagal menyimpan perubahan.");return;}
    router.push('/admin/produk?notify=edit');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Produk &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Edit Produk</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Edit Produk
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Perbarui data {id} — {namaProduk}, lalu simpan perubahan Anda.
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
                Sesuaikan identitas, harga jual, dan stok produk.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Kode produk *</label>
                  <input type="text" value={id} disabled style={{ ...inputStyle, backgroundColor: '#f3f4f6', cursor: 'not-allowed' }} />
                </div>
                <div>
                  <label style={labelStyle}>Nama produk *</label>
                  <input type="text" value={namaProduk} onChange={(e) => setNamaProduk(e.target.value)} style={inputStyle} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Kategori *</label>
                  <select value={kategori} onChange={(e) => setKategori(e.target.value)} style={inputStyle} required>
                    <option value="Donat">Donat</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Satuan *</label>
                  <select value={satuan} onChange={(e) => setSatuan(e.target.value)} style={inputStyle} required>
                    <option value="pcs">pcs</option>
                    <option value="pak">pak</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Harga jual *</label>
                  <input type="text" value={hargaJual} onChange={(e) => setHargaJual(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Stok tersedia *</label>
                  <input type="text" value={stokTersedia} onChange={(e) => setStokTersedia(e.target.value)} style={inputStyle} required />
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
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Resep terhubung *</label>
                  <select value={resepTerhubung} onChange={(e) => setResepTerhubung(e.target.value)} style={inputStyle} required>
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
              
              <img
                src={initialData.imageSrc}
                alt={namaProduk}
                style={{ width: '100%', height: '180px', borderRadius: '12px', objectFit: 'cover', backgroundColor: '#f3e8ff', marginBottom: '12px' }}
              />

              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #6b21a8',
                    borderRadius: '8px',
                    color: '#6b21a8',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <Upload size={14} /> Ganti Foto
                </button>
                <button
                  type="button"
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    color: '#555',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <Trash2 size={14} /> Hapus Foto
                </button>
              </div>

              <div style={{ fontSize: '10px', color: '#888', lineHeight: 1.4 }}>
                Format JPG atau PNG, maksimal 2 MB. Foto saat ini tetap digunakan jika tidak diganti.
              </div>
            </div>

            {/* TENTANG STOK PRODUK INFO */}
            <div style={{ backgroundColor: '#f3e8ff', borderRadius: '12px', padding: '16px', fontSize: '11px', color: '#581c87' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Tentang stok produk</div>
              <div>
                Stok saat ini {stokTersedia} pcs. Stok berikutnya diperbarui dari hasil produksi yang lolos pemeriksaan mutu.
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
              <Check size={16} /> Simpan Perubahan
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