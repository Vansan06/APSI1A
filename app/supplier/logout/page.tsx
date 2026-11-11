'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutSupplierPage() {
  const router = useRouter();

  const handleBatal = () => {
    // Kembali ke Home Page Supplier jika dibatalkan
    router.push('/supplier');
  };

  const handleLogout = () => {
    // Hapus data sesi demo jika ada
    localStorage.removeItem('pb025_processed');

    // Navigasi ke Welcome Page utama ('/' atau '/welcome')
    router.push('/'); 
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)' }}>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '40px 32px', width: '460px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        
        {/* Top Icon Box */}
        <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: '#f3e8ff', color: '#6b21a8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LogOut size={32} />
        </div>

        {/* Title & Description */}
        <h3 style={{ fontSize: '22px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
          Keluar dari akun supplier?
        </h3>

        <div style={{ fontSize: '13px', color: '#555', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 'bold', color: '#333' }}>Budiman • budiman@gmail.com</div>
          <div>Anda perlu masuk kembali untuk mengelola ketersediaan bahan baku, pesanan, dan pengiriman.</div>
        </div>

        {/* Notice Info Box */}
        <div style={{ backgroundColor: '#f3e8ff', color: '#581c87', padding: '12px 20px', borderRadius: '12px', fontSize: '12px', width: '100%', boxSizing: 'border-box' }}>
          Pastikan perubahan Anda sudah disimpan sebelum keluar dari akun.
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', width: '100%', justifyContent: 'center' }}>
          <button 
            type="button"
            onClick={handleBatal}
            style={{ padding: '10px 28px', border: '1px solid #6b21a8', borderRadius: '20px', color: '#6b21a8', backgroundColor: '#ffffff', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Batal
          </button>
          <button 
            type="button"
            onClick={handleLogout}
            style={{ padding: '10px 28px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Log out
          </button>
        </div>

        <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
          Pilih Batal untuk tetap masuk.
        </div>

      </div>

    </div>
  );
}