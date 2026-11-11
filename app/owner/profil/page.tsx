'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, ShieldCheck, Check } from 'lucide-react';

export default function EditProfilOwnerPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    namaLengkap: 'Aunur Rahman',
    email: 'aunurrahman@gmail.com',
    nomorTelepon: '0812-1111-2345',
    peranAkun: 'Owner',
    alamat: 'Jl. Anggrek No. 8, Kecamatan Coblong, Bandung, Jawa Barat 40132',
    kataSandiSaatIni: '',
    kataSandiBaru: '',
    konfirmasiKataSandi: '',
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handler Tombol Batal -> Kembali ke Home Page (/owner)
  const handleBatal = () => {
    router.push('/owner');
  };

  // Handler Submit Form -> Tampilkan Modal
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  // Handler Tombol Selesai pada Modal -> Kembali ke Home Page (/owner)
  const handleSelesai = () => {
    setShowSuccessModal(false);
    router.push('/owner');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
        Edit Profil
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px' }}>
        
        {/* KOLOM KIRI: CARD PROFIL SAYA & KEAMANAN AKUN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Card Profil Saya */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h4 style={{ color: '#a02e59', margin: '0 0 20px 0', fontSize: '15px', textAlign: 'left' }}>Profil saya</h4>
            
            <div style={{ margin: '0 auto 16px auto', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#fbebf0', color: '#a02e59', fontSize: '32px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              AR
            </div>

            <h3 style={{ fontSize: '18px', color: '#a02e59', margin: '0 0 4px 0' }}>{formData.namaLengkap}</h3>
            <p style={{ fontSize: '12px', color: '#777', margin: '0 0 8px 0' }}>{formData.email}</p>
            
            <span style={{ backgroundColor: '#fff5f7', color: '#a02e59', padding: '2px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block', marginBottom: '20px' }}>
              Owner
            </span>

            <div>
              <button 
                type="button" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', border: '1px solid #a02e59', borderRadius: '20px', color: '#a02e59', backgroundColor: '#ffffff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                <Camera size={14} /> Ubah Foto
              </button>
            </div>
          </div>

          {/* Card Keamanan Akun */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '12px' }}>
            <h4 style={{ color: '#a02e59', margin: '0 0 12px 0', fontSize: '14px' }}>Keamanan akun</h4>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#137333', fontWeight: 'bold', marginBottom: '12px' }}>
              <ShieldCheck size={16} /> Email terverifikasi
            </div>

            <div style={{ color: '#666', lineHeight: 1.5 }}>
              <div><strong>Masuk terakhir</strong></div>
              <div>24 Oktober 2026, 07.45 WIB</div>
              <div style={{ color: '#888', fontSize: '11px' }}>Peramban Chrome • Bandung</div>
            </div>

            <div style={{ marginTop: '12px', color: '#888', fontSize: '11px', lineHeight: 1.4 }}>
              Gunakan kata sandi yang unik dan jangan bagikan akses akun Anda.
            </div>
          </div>

        </div>

        {/* KOLOM KANAN: FORM INFORMASI PRIBADI & UBAH KATA SANDI */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Section 1: Informasi Pribadi */}
          <div>
            <h4 style={{ color: '#a02e59', margin: '0 0 16px 0', fontSize: '16px' }}>Informasi pribadi</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px', fontWeight: 'bold' }}>Nama lengkap</label>
                <input 
                  type="text"
                  value={formData.namaLengkap}
                  onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px', fontWeight: 'bold' }}>Email</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px', fontWeight: 'bold' }}>Nomor telepon</label>
                <input 
                  type="text"
                  value={formData.nomorTelepon}
                  onChange={(e) => setFormData({ ...formData, nomorTelepon: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px', fontWeight: 'bold' }}>Peran akun</label>
                <input 
                  type="text"
                  value={formData.peranAkun}
                  disabled
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff5f7', color: '#a02e59', fontWeight: 'bold', fontSize: '13px', cursor: 'not-allowed' }}
                />
                <span style={{ fontSize: '10px', color: '#888', marginTop: '4px', display: 'block' }}>
                  ID owner: OWN-001 • Peran akun hanya dapat diubah oleh admin.
                </span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px', fontWeight: 'bold' }}>Alamat</label>
              <textarea 
                rows={3}
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', fontFamily: 'inherit' }}
              />
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f0d5de', margin: '0' }} />

          {/* Section 2: Ubah Kata Sandi */}
          <div>
            <h4 style={{ color: '#a02e59', margin: '0 0 4px 0', fontSize: '16px' }}>Ubah kata sandi</h4>
            <p style={{ fontSize: '11px', color: '#777', margin: '0 0 16px 0' }}>Masukkan kata sandi saat ini untuk memverifikasi perubahan.</p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px', fontWeight: 'bold' }}>Kata sandi saat ini</label>
              <input 
                type="password"
                placeholder="••••••••••••"
                value={formData.kataSandiSaatIni}
                onChange={(e) => setFormData({ ...formData, kataSandiSaatIni: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px', fontWeight: 'bold' }}>Kata sandi baru</label>
                <input 
                  type="password"
                  placeholder="••••••••••••"
                  value={formData.kataSandiBaru}
                  onChange={(e) => setFormData({ ...formData, kataSandiBaru: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px', fontWeight: 'bold' }}>Konfirmasi kata sandi</label>
                <input 
                  type="password"
                  placeholder="••••••••••••"
                  value={formData.konfirmasiKataSandi}
                  onChange={(e) => setFormData({ ...formData, konfirmasiKataSandi: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none' }}
                />
              </div>
            </div>
            <span style={{ fontSize: '10px', color: '#888', marginTop: '6px', display: 'block' }}>
              Pastikan kata sandi baru dan konfirmasi kata sandi cocok.
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button 
              type="button" 
              onClick={handleBatal}
              style={{ padding: '10px 24px', border: '1px solid #cccccc', borderRadius: '20px', color: '#555555', backgroundColor: '#ffffff', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Batal
            </button>
            <button 
              type="submit" 
              style={{ padding: '10px 24px', backgroundColor: '#a02e59', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Simpan Perubahan
            </button>
          </div>

        </div>

      </form>

      {/* MODAL NOTIFIKASI - PROFIL BERHASIL DISIMPAN */}
      {showSuccessModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', width: '420px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f5e8ee', color: '#a02e59', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={28} strokeWidth={3} />
            </div>

            <h3 style={{ fontSize: '20px', color: '#a02e59', margin: '0 0 8px 0', fontWeight: 'bold' }}>
              Profil berhasil diperbarui
            </h3>
            
            <p style={{ fontSize: '13px', color: '#666', margin: '0 0 24px 0' }}>
              Perubahan profil Anda telah berhasil disimpan.
            </p>

            <button 
              onClick={handleSelesai}
              style={{ width: '100%', padding: '12px', backgroundColor: '#702643', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Selesai
            </button>

          </div>
        </div>
      )}

    </div>
  );
}