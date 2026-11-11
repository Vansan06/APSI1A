'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutAdminPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/'); // Mengarahkan langsung ke Welcome Page (localhost:3000)
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
        Log out
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '480px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '40px 32px', width: '460px', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#6b21a8', margin: '0 auto 20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogOut size={28} />
          </div>

          <h3 style={{ fontSize: '22px', color: '#6b21a8', margin: '0 0 8px 0', fontWeight: 'bold' }}>
            Yakin ingin keluar?
          </h3>

          <p style={{ fontSize: '12px', color: '#666666', lineHeight: 1.6, margin: '0 0 24px 0' }}>
            Sesi Dashboard Admin akan diakhiri. Anda perlu masuk kembali untuk mengakses data dan melanjutkan pekerjaan.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link 
              href="/admin" 
              style={{ 
                flex: 1, 
                padding: '12px', 
                backgroundColor: '#ffffff', 
                color: '#555555', 
                border: '1px solid #e2e8f0', 
                borderRadius: '10px', 
                fontSize: '12px', 
                fontWeight: 'bold', 
                textDecoration: 'none', 
                textAlign: 'center' 
              }}
            >
              Batal, Tetap di Sini
            </Link>

            <button 
              onClick={handleLogout}
              style={{ 
                flex: 1, 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '6px', 
                padding: '12px', 
                backgroundColor: '#6b21a8', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '10px', 
                fontSize: '12px', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(107, 33, 168, 0.2)'
              }}
            >
              <LogOut size={14} /> Ya, Keluar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}