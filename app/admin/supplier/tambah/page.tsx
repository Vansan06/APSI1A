'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Info } from 'lucide-react';

export default function AdminTambahSupplierPage() {
  const router = useRouter();

  const [kodeSupplier, setKodeSupplier] = useState('');
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [namaKontak, setNamaKontak] = useState('');
  const [telepon, setTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [kota, setKota] = useState('');
  const [alamat, setAlamat] = useState('');
  const [status, setStatus] = useState('');
  const [bahanDipasok, setBahanDipasok] = useState('');
  const [estimasiPengiriman, setEstimasiPengiriman] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/supplier?notify=simpan');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Supplier &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Tambah Supplier</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Tambah Supplier
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Tambahkan mitra pemasok dan informasi kontak untuk kebutuhan pembelian bahan.
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
              <div style={{ fontSize: '11px', color: '#777', marginBottom: '14px' }}>
                Kolom bertanda * wajib diisi.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Kode supplier *</label>
                  <input type="text" placeholder="Contoh: SUP-005" value={kodeSupplier} onChange={(e) => setKodeSupplier(e.target.value)} style={inputStyle} required />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Kode harus unik.</div>
                </div>
                <div>
                  <label style={labelStyle}>Nama perusahaan *</label>
                  <input type="text" placeholder="Masukkan nama perusahaan" value={namaPerusahaan} onChange={(e) => setNamaPerusahaan(e.target.value)} style={inputStyle} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Nama kontak *</label>
                  <input type="text" placeholder="Masukkan nama penanggung jawab" value={namaKontak} onChange={(e) => setNamaKontak(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Telepon *</label>
                  <input type="text" placeholder="Contoh: 08xx-xxxx-xxxx" value={telepon} onChange={(e) => setTelepon(e.target.value)} style={inputStyle} required />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Gunakan nomor aktif yang dapat dihubungi.</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" placeholder="Contoh: kontak@perusahaan.id" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Gunakan format alamat email yang valid.</div>
                </div>
                <div>
                  <label style={labelStyle}>Kota *</label>
                  <input type="text" placeholder="Masukkan kota supplier" value={kota} onChange={(e) => setKota(e.target.value)} style={inputStyle} required />
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
                    <option value="">Pilih status</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Bahan yang dipasok *</label>
                  <select value={bahanDipasok} onChange={(e) => setBahanDipasok(e.target.value)} style={inputStyle} required>
                    <option value="">Pilih bahan baku</option>
                    <option value="Tepung, gula, ragi">Tepung, gula, ragi</option>
                    <option value="Mentega, keju, susu">Mentega, keju, susu</option>
                    <option value="Cokelat batang">Cokelat batang</option>
                    <option value="Telur">Telur</option>
                  </select>
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Dapat memilih lebih dari satu bahan.</div>
                </div>
                <div>
                  <label style={labelStyle}>Estimasi pengiriman (hari)</label>
                  <input type="text" placeholder="Masukkan jumlah hari" value={estimasiPengiriman} onChange={(e) => setEstimasiPengiriman(e.target.value)} style={inputStyle} />
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Isi angka 1 atau lebih bila sudah disepakati.</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT CARDS INFO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                <Info size={16} /> Kontak pemasok
              </div>
              <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
                Pastikan nama kontak dan nomor telepon benar agar konfirmasi pesanan dapat dilakukan dengan mudah.
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                <Info size={16} /> Estimasi pengiriman
              </div>
              <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
                Isi berdasarkan kesepakatan dengan supplier, bukan perkiraan yang belum dikonfirmasi.
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
              <Check size={16} /> Simpan Supplier
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