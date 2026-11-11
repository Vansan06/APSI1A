'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Camera, 
  CheckCircle2, 
  Lock, 
  Save, 
  Check 
} from 'lucide-react';

export default function AdminEditProfilPage() {
  const router = useRouter();

  // State Form Informasi Pribadi
  const [namaLengkap, setNamaLengkap] = useState('Enji Putri');
  const [email, setEmail] = useState('enjiputrii@gmail.com');
  const [nomorTelepon, setNomorTelepon] = useState('0812-2222-3456');
  const [peranAkun] = useState('Admin');
  const [alamat, setAlamat] = useState('Jl. Kenanga No. 15, Kecamatan Sukajadi, Bandung, Jawa Barat 40161');

  // State Form Ubah Kata Sandi
  const [kataSandiSaatIni, setKataSandiSaatIni] = useState('');
  const [kataSandiBaru, setKataSandiBaru] = useState('');
  const [konfirmasiKataSandi, setKonfirmasiKataSandi] = useState('');

  // State Modal Sukses
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const handleSimpan = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModalSuccess(true);
  };

  const handleBatal = () => {
    router.push('/admin'); // Mengarahkan ke Home Page Admin
  };

  const handleSelesai = () => {
    setShowModalSuccess(false);
    router.push('/admin'); // Mengarahkan ke Home Page Admin setelah simpan & klik Selesai
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER UTAMA */}
      <div>
        <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
          Edit Profil
        </h2>
      </div>

      {/* MAIN LAYOUT 2 KOLOM */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* KOLOM KIRI (PROFIL SAYA & KEAMANAN AKUN) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* CARD PROFIL SAYA */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '15px', color: '#333333', margin: '0 0 20px 0', textAlign: 'left', fontWeight: 'bold' }}>
              Profil saya
            </h3>

            {/* AVATAR LARGE */}
            <div 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                backgroundColor: '#f3e8ff', 
                color: '#6b21a8', 
                fontSize: '28px', 
                fontWeight: 'bold', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px auto' 
              }}
            >
              EP
            </div>

            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}>
              {namaLengkap}
            </div>
            <div style={{ fontSize: '11px', color: '#777777', margin: '2px 0 10px 0' }}>
              {email}
            </div>

            <span style={{ backgroundColor: '#faf5ff', color: '#6b21a8', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', border: '1px solid #f3e8ff' }}>
              {peranAkun}
            </span>

            <div style={{ marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => alert('Fitur ubah foto profil')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  backgroundColor: '#ffffff',
                  color: '#333333',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                <Camera size={14} color="#555" />
                <span>Ubah Foto</span>
              </button>
            </div>

            <div style={{ fontSize: '10px', color: '#999999', marginTop: '14px', lineHeight: 1.4 }}>
              JPG atau PNG, maksimal 2 MB. Foto ditampilkan pada profil akun.
            </div>
          </div>

          {/* CARD KEAMANAN AKUN */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '15px', color: '#333333', margin: '0 0 14px 0', fontWeight: 'bold' }}>
              Keamanan akun
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#137333', fontSize: '12px', fontWeight: 'bold', marginBottom: '14px' }}>
              <CheckCircle2 size={16} />
              <span>Email terverifikasi</span>
            </div>

            <div style={{ fontSize: '11px', color: '#555555', lineHeight: 1.5 }}>
              Masuk terakhir<br />
              <strong style={{ color: '#333' }}>24 Oktober 2026, 07.45 WIB</strong><br />
              <span style={{ color: '#777' }}>Peramban Chrome &bull; Bandung</span>
            </div>

            <div style={{ fontSize: '10px', color: '#888888', marginTop: '14px', lineHeight: 1.4 }}>
              Gunakan kata sandi yang unik dan jangan bagikan akses akun Anda.
            </div>
          </div>

        </div>

        {/* KOLOM KANAN (FORM INFORMASI PRIBADI & UBAH KATA SANDI) */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <form onSubmit={handleSimpan} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* BAGIAN 1: INFORMASI PRIBADI */}
            <div>
              <h3 style={{ fontSize: '16px', color: '#333333', margin: '0 0 16px 0', fontWeight: 'bold' }}>
                Informasi pribadi
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Nama lengkap *</label>
                  <input
                    type="text"
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
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
                    value={nomorTelepon}
                    onChange={(e) => setNomorTelepon(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Peran akun</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={peranAkun}
                      disabled
                      style={{ ...inputStyle, backgroundColor: '#f3e8ff', color: '#555555', paddingRight: '36px', cursor: 'not-allowed' }}
                    />
                    <Lock size={14} color="#777" style={{ position: 'absolute', right: '12px' }} />
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '10px', color: '#888888', marginBottom: '16px' }}>
                ID admin: ADM-002 &bull; Peran akun hanya dapat diubah oleh admin.
              </div>

              <div>
                <label style={labelStyle}>Alamat</label>
                <textarea
                  rows={3}
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: 0 }} />

            {/* BAGIAN 2: UBAH KATA SANDI */}
            <div>
              <h3 style={{ fontSize: '16px', color: '#333333', margin: '0 0 4px 0', fontWeight: 'bold' }}>
                Ubah kata sandi
              </h3>
              <div style={{ fontSize: '11px', color: '#777777', marginBottom: '16px' }}>
                Kosongkan bagian ini jika tidak ingin mengganti kata sandi.
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Kata sandi saat ini</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
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

              <div style={{ fontSize: '10px', color: '#888888' }}>
                Minimal 8 karakter, kombinasi huruf dan angka.
              </div>
            </div>

            {/* ACTION BUTTONS (BATAL & SIMPAN PERUBAHAN) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
              <button
                type="button"
                onClick={handleBatal}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#ffffff',
                  color: '#555555',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Batal
              </button>
              <button
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  backgroundColor: '#6b21a8',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(107, 33, 168, 0.2)',
                }}
              >
                <Save size={16} />
                <span>Simpan Perubahan</span>
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* MODAL NOTIFIKASI BERHASIL DISIMPAN */}
      {showModalSuccess && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', width: '360px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#6b21a8', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={28} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '20px', color: '#6b21a8', margin: '0 0 8px 0', fontWeight: 'bold' }}>Perubahan Disimpan</h3>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 20px 0' }}>Profil akun Anda telah berhasil diperbarui.</p>
            <button
              onClick={handleSelesai}
              style={{ width: '100%', padding: '10px', backgroundColor: '#581c87', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Selesai
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 'bold',
  color: '#555555',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  fontSize: '12px',
  backgroundColor: '#ffffff',
  color: '#333333',
  outline: 'none',
  boxSizing: 'border-box',
};