'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, ShieldAlert } from 'lucide-react';

export default function LogoutOwnerPage() {
  const router = useRouter();

  const handleLogoutConfirm = () => {
    router.push('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '75vh' }}>
      
      {/* Modal Card Konfirmasi Log Out */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '36px 32px', width: '480px', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
        
        {/* Icon Header */}
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#fff5f7', color: '#a02e59', margin: '0 auto 20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LogOut size={32} />
        </div>

        {/* Title & Subtitle */}
        <h2 style={{ fontSize: '22px', color: '#a02e59', margin: '0 0 10px 0', fontWeight: 'bold' }}>
          Yakin ingin keluar?
        </h2>
        <p style={{ fontSize: '12px', color: '#777777', margin: '0 0 24px 0', lineHeight: 1.5 }}>
          Sesi Home Page Owner akan diakhiri. Anda perlu masuk kembali untuk mengakses data dan melanjutkan pekerjaan.
        </p>

        {/* User Card Info */}
        <div style={{ backgroundColor: '#fff5f7', borderRadius: '12px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', textAlign: 'left' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffffff', color: '#a02e59', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', border: '1px solid #f0d5de' }}>
            AR
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#a02e59' }}>Aunur Rahman</div>
            <div style={{ fontSize: '11px', color: '#777777' }}>aunurrahman@gmail.com • Owner</div>
          </div>
        </div>

        {/* Security Note */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px', color: '#137333', marginBottom: '24px' }}>
          <ShieldAlert size={14} /> Mode hanya lihat • Tidak ada perubahan data.
        </div>

        {/* Buttons Action */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link 
            href="/owner"
            style={{ flex: 1, padding: '12px', border: '1px solid #cccccc', borderRadius: '20px', color: '#555555', backgroundColor: '#ffffff', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', display: 'block' }}
          >
            Batal, Tetap di Sini
          </Link>
          <button 
            onClick={handleLogoutConfirm}
            style={{ flex: 1, padding: '12px', backgroundColor: '#702643', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <LogOut size={16} /> Ya, Keluar
          </button>
        </div>

      </div>

      {/* Footer Security Reminder */}
      <div style={{ marginTop: '20px', fontSize: '11px', color: '#702643', opacity: 0.9 }}>
        Selalu keluar dari akun saat menggunakan perangkat bersama.
      </div>

    </div>
  );
}
