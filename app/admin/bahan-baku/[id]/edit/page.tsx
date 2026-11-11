'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, Info } from 'lucide-react';

interface EditBahanRecord {
  kode: string;
  nama: string;
  satuan: string;
  supplier: string;
  stokTersedia: string;
  stokMinimum: string;
  hargaSatuan: string;
  statusPersediaan: string;
}

const ALL_EDIT_BAHAN_DATA: Record<string, EditBahanRecord> = {
  'BB-001': {
    kode: 'BB-001',
    nama: 'Tepung Terigu',
    satuan: 'kg',
    supplier: 'CV Sumber Pangan',
    stokTersedia: '125',
    stokMinimum: '50',
    hargaSatuan: 'Rp12.000',
    statusPersediaan: 'Aman',
  },
  'BB-002': {
    kode: 'BB-002',
    nama: 'Gula Pasir',
    satuan: 'kg',
    supplier: 'CV Sumber Pangan',
    stokTersedia: '60',
    stokMinimum: '25',
    hargaSatuan: 'Rp17.000',
    statusPersediaan: 'Aman',
  },
  'BB-003': {
    kode: 'BB-003',
    nama: 'Mentega',
    satuan: 'kg',
    supplier: 'PT Prima Dairy',
    stokTersedia: '8',
    stokMinimum: '15',
    hargaSatuan: 'Rp80.000',
    statusPersediaan: 'Stok rendah',
  },
  'BB-004': {
    kode: 'BB-004',
    nama: 'Cokelat Batang',
    satuan: 'kg',
    supplier: 'PT Cokelat Nusantara',
    stokTersedia: '6',
    stokMinimum: '10',
    hargaSatuan: 'Rp70.000',
    statusPersediaan: 'Stok rendah',
  },
  'BB-005': {
    kode: 'BB-005',
    nama: 'Telur',
    satuan: 'kg',
    supplier: 'Ternak Makmur',
    stokTersedia: '30',
    stokMinimum: '15',
    hargaSatuan: 'Rp28.000',
    statusPersediaan: 'Aman',
  },
  'BB-006': {
    kode: 'BB-006',
    nama: 'Keju Cheddar',
    satuan: 'kg',
    supplier: 'PT Prima Dairy',
    stokTersedia: '18',
    stokMinimum: '10',
    hargaSatuan: 'Rp95.000',
    statusPersediaan: 'Aman',
  },
};

export default function EditBahanBakuAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'BB-001';

  const initialData = ALL_EDIT_BAHAN_DATA[id] || ALL_EDIT_BAHAN_DATA['BB-001'];

  const [namaBahan, setNamaBahan] = useState(initialData.nama);
  const [satuan, setSatuan] = useState(initialData.satuan);
  const [supplier, setSupplier] = useState(initialData.supplier);
  const [stokTersedia, setStokTersedia] = useState(initialData.stokTersedia);
  const [stokMinimum, setStokMinimum] = useState(initialData.stokMinimum);
  const [hargaSatuan, setHargaSatuan] = useState(initialData.hargaSatuan);
  const [statusPersediaan, setStatusPersediaan] = useState(initialData.statusPersediaan);

  useEffect(() => {
    const data = ALL_EDIT_BAHAN_DATA[id] || ALL_EDIT_BAHAN_DATA['BB-001'];
    setNamaBahan(data.nama);
    setSatuan(data.satuan);
    setSupplier(data.supplier);
    setStokTersedia(data.stokTersedia);
    setStokMinimum(data.stokMinimum);
    setHargaSatuan(data.hargaSatuan);
    setStatusPersediaan(data.statusPersediaan);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/bahan-baku?notify=edit');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Bahan Baku &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Edit Bahan Baku</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Edit Bahan Baku
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Perbarui {id} — {namaBahan}, lalu simpan perubahan Anda.
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Kode bahan *</label>
                  <input type="text" value={id} disabled style={{ ...inputStyle, backgroundColor: '#f3f4f6', cursor: 'not-allowed' }} />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Kode harus unik.</div>
                </div>
                <div>
                  <label style={labelStyle}>Nama bahan *</label>
                  <input type="text" value={namaBahan} onChange={(e) => setNamaBahan(e.target.value)} style={inputStyle} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Satuan *</label>
                  <select value={satuan} onChange={(e) => setSatuan(e.target.value)} style={inputStyle} required>
                    <option value="kg">kg</option>
                    <option value="gram">gram</option>
                    <option value="liter">liter</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Supplier *</label>
                  <select value={supplier} onChange={(e) => setSupplier(e.target.value)} style={inputStyle} required>
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
                  <label style={labelStyle}>Stok tersedia *</label>
                  <input type="text" value={stokTersedia} onChange={(e) => setStokTersedia(e.target.value)} style={inputStyle} required />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Dalam {satuan}. Angka 0 atau lebih.</div>
                </div>
                <div>
                  <label style={labelStyle}>Stok minimum *</label>
                  <input type="text" value={stokMinimum} onChange={(e) => setStokMinimum(e.target.value)} style={inputStyle} required />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Batas peringatan stok dalam {satuan}.</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Harga / satuan *</label>
                  <input type="text" value={hargaSatuan} onChange={(e) => setHargaSatuan(e.target.value)} style={inputStyle} required />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Harga untuk setiap 1 {satuan}; harus lebih dari Rp0.</div>
                </div>
                <div>
                  <label style={labelStyle}>Status persediaan *</label>
                  <select value={statusPersediaan} onChange={(e) => setStatusPersediaan(e.target.value)} style={inputStyle} required>
                    <option value="Aman">Aman</option>
                    <option value="Stok rendah">Stok rendah</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '11px', color: '#777' }}>Ringkasan data</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>{namaBahan}</div>
              <div style={{ fontSize: '11px', color: '#777', marginBottom: '8px' }}>{id} • {supplier}</div>
              <span style={getKondisiBadgeStyle(statusPersediaan)}>{statusPersediaan}</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                <Info size={16} /> Satuan tetap konsisten
              </div>
              <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
                Stok {stokTersedia} {satuan}, minimum {stokMinimum} {satuan}, dan harga {hargaSatuan}/{satuan} menggunakan satuan yang sama.
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                <Info size={16} /> Periksa perubahan stok
              </div>
              <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
                Pastikan perubahan stok sesuai catatan persediaan. Harga bahan menjadi acuan perhitungan biaya resep.
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

function getKondisiBadgeStyle(kondisi: string): React.CSSProperties {
  if (kondisi === 'Aman') {
    return { backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  } else {
    return { backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  }
}