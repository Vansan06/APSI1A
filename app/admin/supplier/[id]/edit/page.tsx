'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, Info } from 'lucide-react';

interface EditSupplierRecord {
  kode: string;
  namaPerusahaan: string;
  namaKontak: string;
  telepon: string;
  email: string;
  kota: string;
  alamat: string;
  status: string;
  bahanDipasok: string;
  estimasiPengiriman: string;
}

const ALL_EDIT_SUPPLIER_DATA: Record<string, EditSupplierRecord> = {
  'SUP-001': {
    kode: 'SUP-001',
    namaPerusahaan: 'CV Sumber Pangan',
    namaKontak: 'Budiman',
    telepon: '0812-3456-7801',
    email: '',
    kota: 'Bandung',
    alamat: '',
    status: 'Aktif',
    bahanDipasok: 'Tepung, gula, ragi',
    estimasiPengiriman: '',
  },
  'SUP-002': {
    kode: 'SUP-002',
    namaPerusahaan: 'PT Prima Dairy',
    namaKontak: 'Rina Wijaya',
    telepon: '0812-3456-7802',
    email: 'kontak@primadairy.com',
    kota: 'Bandung',
    alamat: 'Jl. Industri No. 45, Bandung',
    status: 'Aktif',
    bahanDipasok: 'Mentega, keju, susu',
    estimasiPengiriman: '2',
  },
  'SUP-003': {
    kode: 'SUP-003',
    namaPerusahaan: 'CV Cokelat Nusantara',
    namaKontak: 'Andi Saputra',
    telepon: '0812-3456-7803',
    email: 'info@cokelatnusantara.co.id',
    kota: 'Cimahi',
    alamat: 'Jl. Raya Cimahi No. 12',
    status: 'Aktif',
    bahanDipasok: 'Cokelat batang',
    estimasiPengiriman: '3',
  },
  'SUP-004': {
    kode: 'SUP-004',
    namaPerusahaan: 'UD Ternak Makmur',
    namaKontak: 'Eko Prasetyo',
    telepon: '0812-3456-7804',
    email: 'ternakmakmur@gmail.com',
    kota: 'Lembang',
    alamat: 'Lembang, Bandung Barat',
    status: 'Aktif',
    bahanDipasok: 'Telur',
    estimasiPengiriman: '1',
  },
};

export default function EditSupplierAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'SUP-001';

  const initialData = ALL_EDIT_SUPPLIER_DATA[id] || ALL_EDIT_SUPPLIER_DATA['SUP-001'];

  const [namaPerusahaan, setNamaPerusahaan] = useState(initialData.namaPerusahaan);
  const [namaKontak, setNamaKontak] = useState(initialData.namaKontak);
  const [telepon, setTelepon] = useState(initialData.telepon);
  const [email, setEmail] = useState(initialData.email);
  const [kota, setKota] = useState(initialData.kota);
  const [alamat, setAlamat] = useState(initialData.alamat);
  const [status, setStatus] = useState(initialData.status);
  const [bahanDipasok, setBahanDipasok] = useState(initialData.bahanDipasok);
  const [estimasiPengiriman, setEstimasiPengiriman] = useState(initialData.estimasiPengiriman);

  useEffect(() => {
    const data = ALL_EDIT_SUPPLIER_DATA[id] || ALL_EDIT_SUPPLIER_DATA['SUP-001'];
    setNamaPerusahaan(data.namaPerusahaan);
    setNamaKontak(data.namaKontak);
    setTelepon(data.telepon);
    setEmail(data.email);
    setKota(data.kota);
    setAlamat(data.alamat);
    setStatus(data.status);
    setBahanDipasok(data.bahanDipasok);
    setEstimasiPengiriman(data.estimasiPengiriman);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/supplier?notify=edit');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Supplier &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Edit Supplier</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Edit Supplier
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Perbarui {id} — {namaPerusahaan}, lalu simpan perubahan Anda.
          </div>
        </div>

        <Link
          href="/admin/supplier"
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
          <span>Kembali ke Data Supplier</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
          
          {/* INFORMASI SUPPLIER LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={cardFormStyle}>
              <h3 style={sectionTitleStyle}>Identitas dan kontak</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Kode supplier *</label>
                  <input type="text" value={id} disabled style={{ ...inputStyle, backgroundColor: '#f3f4f6', cursor: 'not-allowed' }} />
                </div>
                <div>
                  <label style={labelStyle}>Nama perusahaan *</label>
                  <input type="text" value={namaPerusahaan} onChange={(e) => setNamaPerusahaan(e.target.value)} style={inputStyle} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Nama kontak *</label>
                  <input type="text" value={namaKontak} onChange={(e) => setNamaKontak(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Telepon *</label>
                  <input type="text" value={telepon} onChange={(e) => setTelepon(e.target.value)} style={inputStyle} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" placeholder="Masukkan email supplier" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Belum diisi. Gunakan format email yang valid.</div>
                </div>
                <div>
                  <label style={labelStyle}>Kota *</label>
                  <input type="text" value={kota} onChange={(e) => setKota(e.target.value)} style={inputStyle} required />
                </div>
              </div>
            </div>

            {/* ALAMAT DAN PASOKAN */}
            <div style={cardFormStyle}>
              <h3 style={sectionTitleStyle}>Alamat dan pasokan</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Alamat</label>
                  <input type="text" placeholder="Masukkan alamat lengkap" value={alamat} onChange={(e) => setAlamat(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Status *</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle} required>
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Bahan yang dipasok *</label>
                  <select value={bahanDipasok} onChange={(e) => setBahanDipasok(e.target.value)} style={inputStyle} required>
                    <option value="Tepung, gula, ragi">Tepung, gula, ragi</option>
                    <option value="Mentega, keju, susu">Mentega, keju, susu</option>
                    <option value="Cokelat batang">Cokelat batang</option>
                    <option value="Telur">Telur</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Estimasi pengiriman (hari)</label>
                  <input type="text" placeholder="Masukkan jumlah hari" value={estimasiPengiriman} onChange={(e) => setEstimasiPengiriman(e.target.value)} style={inputStyle} />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Belum diisi. Isi sesuai kesepakatan supplier.</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '11px', color: '#777' }}>Ringkasan data</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>{namaPerusahaan}</div>
              <div style={{ fontSize: '11px', color: '#777', marginBottom: '8px' }}>{id} • {kota}</div>
              <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                {status}
              </span>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                <Info size={16} /> Lengkapi data yang tersedia
              </div>
              <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
                Email, alamat, dan estimasi pengiriman belum diisi. Tambahkan hanya informasi yang sudah dikonfirmasi.
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                <Info size={16} /> Bahan yang dipasok
              </div>
              <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
                Supplier ini memasok {bahanDipasok}. Periksa kembali pilihan bahan sebelum menyimpan perubahan.
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
            <button type="button" onClick={() => router.push('/admin/supplier')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
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