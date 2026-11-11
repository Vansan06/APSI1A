'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Camera, ShieldCheck, Lock, Save } from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';

export default function EditProfilPage() {
  const router = useRouter();

  // State Informasi Pribadi
  const [nama, setNama] = useState('Siti Rahmah');
  const [email, setEmail] = useState('sitirahmah@gmail.com');
  const [telepon, setTelepon] = useState('0812-3456-7890');
  const [peran] = useState('Karyawan Produksi');
  const [alamat, setAlamat] = useState('Jl. Melati No. 12, Kecamatan Coblong, Bandung, Jawa Barat 40132');

  // State Ubah Kata Sandi
  const [kataSandiSaatIni, setKataSandiSaatIni] = useState('............');
  const [kataSandiBaru, setKataSandiBaru] = useState('');
  const [konfirmasiKataSandi, setKonfirmasiKataSandi] = useState('');

  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSimpan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  // Fungsi saat tombol "Selesai" pada modal diklik
  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/karyawan-produksi'); // Kembali ke Home Page Karyawan Produksi
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* JUDUL BAGIAN */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px 24px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '20px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
          Edit Profil
        </h2>
      </div>

      <form onSubmit={handleSimpan} style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* KOLOM KIRI (PROFIL SAYA & KEAMANAN AKUN) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* KARTU 1: PROFIL SAYA */}
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#b0525e', textAlign: 'left', marginBottom: '20px' }}>
              Profil saya
            </div>

            <div style={{ width: '84px', height: '84px', borderRadius: '50%', backgroundColor: '#fdf0ee', color: '#b0525e', fontSize: '28px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
              SR
            </div>

            <h3 style={{ fontSize: '18px', margin: '0 0 2px 0', color: '#333333', fontWeight: 'bold' }}>
              Siti Rahmah
            </h3>
            <p style={{ fontSize: '12px', color: '#777777', margin: '0 0 10px 0' }}>
              sitirahmah@gmail.com
            </p>

            <span style={{ display: 'inline-block', backgroundColor: '#fdf0ee', color: '#b0525e', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', marginBottom: '16px' }}>
              Karyawan Produksi
            </span>

            <div>
              <button
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  border: '1px solid #cccccc',
                  borderRadius: '8px',
                  color: '#444444',
                  backgroundColor: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                <Camera size={14} />
                <span>Ubah Foto</span>
              </button>
            </div>

            <p style={{ fontSize: '10px', color: '#999999', marginTop: '16px', marginBottom: 0, lineHeight: 1.4 }}>
              JPG atau PNG, maksimal 2 MB. Foto ditampilkan pada profil akun.
            </p>
          </div>

          {/* KARTU 2: KEAMANAN AKUN */}
          <div style={{ backgroundColor: '#ffffff', padding: '20px 24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <h4 style={{ fontSize: '14px', color: '#b0525e', margin: '0 0 12px 0', fontWeight: 'bold' }}>
              Keamanan akun
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2e7d32', fontSize: '12px', fontWeight: 'bold', marginBottom: '12px' }}>
              <ShieldCheck size={16} />
              <span>Email terverifikasi</span>
            </div>

            <div style={{ fontSize: '11px', color: '#666666', lineHeight: 1.5, marginBottom: '12px' }}>
              Masuk terakhir<br />
              <strong>24 Oktober 2026, 07.45 WIB</strong><br />
              Peramban Chrome • Bandung
            </div>

            <p style={{ fontSize: '10px', color: '#888888', margin: 0, lineHeight: 1.4 }}>
              Gunakan kata sandi yang unik dan jangan bagikan akses akun Anda.
            </p>
          </div>

        </div>

        {/* KOLOM KANAN (INFORMASI PRIBADI & UBAH KATA SANDI) */}
        <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* BAGIAN INFORMASI PRIBADI */}
          <div>
            <h4 style={{ color: '#b0525e', margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
              Informasi pribadi
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Nama lengkap *</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '8px' }}>
              <div>
                <label style={labelStyle}>Nomor telepon</label>
                <input
                  type="text"
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Peran akun</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={peran}
                    readOnly
                    style={{ ...inputStyle, backgroundColor: '#fdf0ee', color: '#555555', cursor: 'not-allowed', paddingRight: '36px' }}
                  />
                  <Lock size={14} color="#888888" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <p style={{ fontSize: '10px', color: '#888888', marginTop: 0, marginBottom: '16px' }}>
              ID karyawan: KRY-003 • Peran akun hanya dapat diubah oleh admin.
            </p>

            <div>
              <label style={labelStyle}>Alamat</label>
              <textarea
                rows={3}
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: 0 }} />

          {/* BAGIAN UBAH KATA SANDI */}
          <div>
            <h4 style={{ color: '#b0525e', margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>
              Ubah kata sandi
            </h4>
            <p style={{ fontSize: '11px', color: '#777777', margin: '0 0 16px 0' }}>
              Kosongkan bagian ini jika tidak ingin mengganti kata sandi.
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Kata sandi saat ini</label>
              <input
                type="password"
                value={kataSandiSaatIni}
                onChange={(e) => setKataSandiSaatIni(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '8px' }}>
              <div>
                <label style={labelStyle}>Kata sandi baru</label>
                <input
                  type="password"
                  placeholder="Masukkan kata sandi baru"
                  value={kataSandiBaru}
                  onChange={(e) => setKataSandiBaru(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Konfirmasi kata sandi</label>
                <input
                  type="password"
                  placeholder="Ulangi kata sandi baru"
                  value={konfirmasiKataSandi}
                  onChange={(e) => setKonfirmasiKataSandi(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <p style={{ fontSize: '10px', color: '#888888', marginTop: 0, marginBottom: '24px' }}>
              Minimal 8 karakter, kombinasi huruf dan angka.
            </p>

            {/* TOMBOL AKSI */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Link
                href="/karyawan-produksi"
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cccccc',
                  borderRadius: '8px',
                  color: '#555555',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                Batal
              </Link>

              <button
                type="submit"
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#b0525e',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Save size={16} />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>

        </div>
      </form>

      {/* MODAL SUKSES */}
      <SuccessModal
        isOpen={isModalOpen}
        title="Berhasil diedit"
        desc="Perubahan berhasil disimpan."
        onClose={handleCloseModal}
      />

    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#444444',
  marginBottom: '6px'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box'
};