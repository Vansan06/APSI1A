'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

export default function EditProfilSupplierFigmaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    namaPerusahaan: 'CV Sumber Pangan',
    namaPenanggungJawab: 'Budiman',
    nomorTelepon: '081244445678',
    emailKontak: 'budiman@gmail.com',
    emailAkun: 'budiman@gmail.com',
    alamatLengkap: 'Jl. Sukajadi No. 45, Bandung, Jawa Barat',
    kota: 'Bandung',
    kodePos: '40162',
    passwordSaatIni: '',
    passwordBaru: '',
    konfirmasiPasswordBaru: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleBatal = () => {
    router.push('/supplier');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSelesai = () => {
    setShowModal(false);
    router.push('/supplier');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Banner Title */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '12px 20px', fontSize: '14px', fontWeight: 'bold', color: '#6b21a8' }}>
        Kelola Profil Supplier
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Main 2-Column Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px' }}>
          
          {/* LEFT COLUMN: Identitas & Alamat */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Identitas & Kontak */}
            <div>
              <h4 style={{ color: '#6b21a8', margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>Identitas & Kontak Supplier</h4>
              
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#581c87', marginBottom: '6px' }}>Nama supplier / perusahaan</label>
                <input 
                  type="text" 
                  value={formData.namaPerusahaan} 
                  onChange={(e) => setFormData({ ...formData, namaPerusahaan: e.target.value })} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '13px', boxSizing: 'border-box' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#581c87', marginBottom: '6px' }}>Nama penanggung jawab</label>
                  <input 
                    type="text" 
                    value={formData.namaPenanggungJawab} 
                    onChange={(e) => setFormData({ ...formData, namaPenanggungJawab: e.target.value })} 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '13px', boxSizing: 'border-box' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#581c87', marginBottom: '6px' }}>Nomor telepon</label>
                  <input 
                    type="text" 
                    value={formData.nomorTelepon} 
                    onChange={(e) => setFormData({ ...formData, nomorTelepon: e.target.value })} 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '13px', boxSizing: 'border-box' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#581c87', marginBottom: '6px' }}>Email kontak</label>
                <input 
                  type="email" 
                  value={formData.emailKontak} 
                  onChange={(e) => setFormData({ ...formData, emailKontak: e.target.value })} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '13px', boxSizing: 'border-box' }} 
                />
              </div>
            </div>

            {/* Alamat Supplier */}
            <div>
              <h4 style={{ color: '#6b21a8', margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>Alamat Supplier</h4>
              
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#581c87', marginBottom: '6px' }}>Alamat lengkap</label>
                <textarea 
                  rows={2} 
                  value={formData.alamatLengkap} 
                  onChange={(e) => setFormData({ ...formData, alamatLengkap: e.target.value })} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '13px', fontFamily: 'inherit', boxSizing: 'border-box' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#581c87', marginBottom: '6px' }}>Kota / kabupaten</label>
                  <input 
                    type="text" 
                    value={formData.kota} 
                    onChange={(e) => setFormData({ ...formData, kota: e.target.value })} 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '13px', boxSizing: 'border-box' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#581c87', marginBottom: '6px' }}>Kode pos</label>
                  <input 
                    type="text" 
                    value={formData.kodePos} 
                    onChange={(e) => setFormData({ ...formData, kodePos: e.target.value })} 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '13px', boxSizing: 'border-box' }} 
                  />
                </div>
              </div>

              <span style={{ fontSize: '11px', color: '#888' }}>
                Gunakan kontak dan alamat yang dapat dihubungi untuk koordinasi pasokan bahan baku.
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: Informasi Akun & Pengaturan Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Card Informasi Akun */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ color: '#6b21a8', margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Informasi Akun</h4>
                <span style={{ backgroundColor: '#f3e8ff', color: '#6b21a8', padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Supplier</span>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#581c87', marginBottom: '6px' }}>Email akun</label>
                <input 
                  type="email" 
                  value={formData.emailAkun} 
                  onChange={(e) => setFormData({ ...formData, emailAkun: e.target.value })} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '13px', boxSizing: 'border-box' }} 
                />
                <span style={{ fontSize: '10px', color: '#888', marginTop: '4px', display: 'block' }}>Email ini digunakan untuk masuk ke akun supplier.</span>
              </div>
            </div>

            {/* Card Pengaturan Password */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h4 style={{ color: '#6b21a8', margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>Pengaturan Password</h4>
                <span style={{ fontSize: '11px', color: '#888' }}>Isi hanya jika ingin mengganti password.</span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#581c87', marginBottom: '6px' }}>Password saat ini</label>
                <input 
                  type="password" 
                  placeholder="Masukkan password saat ini" 
                  value={formData.passwordSaatIni} 
                  onChange={(e) => setFormData({ ...formData, passwordSaatIni: e.target.value })} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '13px', boxSizing: 'border-box' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#581c87', marginBottom: '6px' }}>Password baru</label>
                <input 
                  type="password" 
                  placeholder="Masukkan password baru" 
                  value={formData.passwordBaru} 
                  onChange={(e) => setFormData({ ...formData, passwordBaru: e.target.value })} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '13px', boxSizing: 'border-box' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#581c87', marginBottom: '6px' }}>Konfirmasi password baru</label>
                <input 
                  type="password" 
                  placeholder="Ulangi password baru" 
                  value={formData.konfirmasiPasswordBaru} 
                  onChange={(e) => setFormData({ ...formData, konfirmasiPasswordBaru: e.target.value })} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '13px', boxSizing: 'border-box' }} 
                />
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar Footer */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '12px', color: '#666' }}>
            Profil Budiman • Supplier • SUP-001
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              type="button" 
              onClick={handleBatal} 
              style={{ padding: '10px 24px', border: '1px solid #6b21a8', borderRadius: '20px', color: '#6b21a8', backgroundColor: '#ffffff', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Batal
            </button>
            <button 
              type="submit" 
              style={{ padding: '10px 24px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Simpan Perubahan
            </button>
          </div>
        </div>

        <div style={{ fontSize: '11px', color: '#581c87', marginTop: '-8px' }}>
          Sistem Informasi Produksi DFO Donat • Data contoh untuk tampilan Home Page
        </div>

      </form>

      {/* Modal Sukses */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', width: '380px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#6b21a8', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={28} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '20px', color: '#6b21a8', margin: '0 0 8px 0', fontWeight: 'bold' }}>Berhasil diedit</h3>
            <p style={{ fontSize: '13px', color: '#666', margin: '0 0 24px 0' }}>Perubahan berhasil disimpan.</p>
            <button onClick={handleSelesai} style={{ width: '100%', padding: '12px', backgroundColor: '#581c87', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
              Selesai
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
