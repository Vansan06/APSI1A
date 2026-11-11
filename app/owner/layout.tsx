'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Package,
  Boxes,
  BookOpen,
  Truck,
  ShoppingBag,
  ClipboardList,
  FileText,
  UserCheck,
  LogOut,
} from 'lucide-react';

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home Page', href: '/owner', icon: Home },
    { name: 'Data Produk', href: '/owner/produk', icon: Package },
    { name: 'Data Bahan Baku', href: '/owner/bahan-baku', icon: Boxes },
    { name: 'Resep', href: '/owner/resep', icon: BookOpen },
    { name: 'Data Supplier', href: '/owner/supplier', icon: Truck },
    { name: 'Pemesanan Bahan Baku', href: '/owner/pemesanan-bahan-baku', icon: ShoppingBag },
    { name: 'Pesanan', href: '/owner/pesanan', icon: ClipboardList },
    { name: 'Laporan', sub: 'Harian & Bulanan', href: '/owner/laporan', icon: FileText },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#e59cae', fontFamily: 'system-ui, sans-serif', overflow: 'hidden' }}>
      
      {/* 1. SIDEBAR LEFT - Kunci Diam di Kiri */}
      <aside 
        style={{ 
          width: '240px', 
          backgroundColor: '#e59cae', 
          padding: '20px 16px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          height: '100vh',
          flexShrink: 0,
          boxSizing: 'border-box'
        }}
      >
        <div>
          <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', paddingLeft: '8px' }}>
            Menu Owner
          </h2>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/owner' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    backgroundColor: isActive ? '#a02e59' : '#ffffff',
                    color: isActive ? '#ffffff' : '#ac3562',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <Icon size={18} />
                  <div>
                    <div>{item.name}</div>
                    {item.sub && <div style={{ fontSize: '9px', opacity: 0.8, marginTop: '-2px' }}>{item.sub}</div>}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM BUTTONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
          <Link 
            href="/owner/profil" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '10px 16px', 
              borderRadius: '20px', 
              backgroundColor: pathname === '/owner/profil' ? '#a02e59' : '#ffffff', 
              color: pathname === '/owner/profil' ? '#ffffff' : '#a02e59', 
              textDecoration: 'none', 
              fontSize: '13px', 
              fontWeight: 'bold' 
            }}
          >
            <UserCheck size={16} /> Edit Profil
          </Link>
          <Link 
            href="/owner/logout" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '10px 16px', 
              borderRadius: '20px', 
              backgroundColor: pathname === '/owner/logout' ? '#a02e59' : '#ffffff', 
              color: pathname === '/owner/logout' ? '#ffffff' : '#a02e59', 
              textDecoration: 'none', 
              fontSize: '13px', 
              fontWeight: 'bold' 
            }}
          >
            <LogOut size={16} /> Log out
          </Link>
        </div>
      </aside>

      {/* AREA KANAN UTAMA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        
        {/* 2. HEADER TOP (Judul "Home Page" & Profil) - Kunci Diam di Atas */}
        <header 
          style={{ 
            backgroundColor: '#a02e59', 
            height: '70px', 
            padding: '0 32px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            color: '#ffffff',
            flexShrink: 0
          }}
        >
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Home Page</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Aunur Rahman</div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>Owner</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#ffffff', color: '#a02e59', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
              AR
            </div>
          </div>
        </header>

        {/* 3. AREA ISIAN KONTEN (Hanya Bagian Ini Yang Bergulir / Scrollable) */}
        <main 
          style={{ 
            flex: 1, 
            padding: '24px 32px', 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {children}

          <footer style={{ padding: '12px 0', fontSize: '11px', color: '#702643', marginTop: 'auto' }}>
            Akses Owner · Lihat detail dan beri persetujuan
          </footer>
        </main>

      </div>

    </div>
  );
}