'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Boxes, ShoppingBag, Truck, UserCheck, LogOut } from 'lucide-react';

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home Page', href: '/supplier', icon: Home },
    { name: 'Ketersediaan Bahan Baku', href: '/supplier/ketersediaan', icon: Boxes },
    { name: 'Pesanan Bahan Baku', href: '/supplier/pesanan', icon: ShoppingBag },
    { name: 'Informasi Pengiriman', href: '/supplier/pengiriman', icon: Truck },
  ];

  const getTitle = () => {
    if (pathname === '/supplier') return 'Home Page';
    if (pathname.startsWith('/supplier/ketersediaan')) return 'Ketersediaan Bahan Baku';
    if (pathname.startsWith('/supplier/pesanan')) return 'Pesanan Bahan Baku';
    if (pathname.startsWith('/supplier/pengiriman')) return 'Informasi Pengiriman';
    if (pathname === '/supplier/profil') return 'Edit Profil';
    if (pathname === '/supplier/logout') return 'Konfirmasi Log out';
    return 'Supplier Portal';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#e9d5ff', fontFamily: 'system-ui, sans-serif', overflow: 'hidden' }}>
      
      {/* SIDEBAR LEFT - Deep Plum / Violet Theme */}
      <aside 
        style={{ 
          width: '240px', 
          backgroundColor: '#e9d5ff', 
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
            Menu Supplier
          </h2>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/supplier' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    backgroundColor: isActive ? '#6b21a8' : '#ffffff',
                    color: isActive ? '#ffffff' : '#6b21a8',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM BUTTONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
          <div style={{ fontSize: '10px', color: '#581c87', paddingLeft: '8px', fontWeight: 'bold' }}>Pengaturan akun</div>
          <Link 
            href="/supplier/profil" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '10px 16px', 
              borderRadius: '20px', 
              backgroundColor: pathname === '/supplier/profil' ? '#6b21a8' : '#ffffff', 
              color: pathname === '/supplier/profil' ? '#ffffff' : '#6b21a8', 
              textDecoration: 'none', 
              fontSize: '13px', 
              fontWeight: 'bold' 
            }}
          >
            <UserCheck size={16} /> Edit Profil
          </Link>
          <Link 
            href="/supplier/logout" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '10px 16px', 
              borderRadius: '20px', 
              backgroundColor: pathname === '/supplier/logout' ? '#6b21a8' : '#ffffff', 
              color: pathname === '/supplier/logout' ? '#ffffff' : '#6b21a8', 
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
        
        {/* HEADER TOP - Purple Plum */}
        <header 
          style={{ 
            backgroundColor: '#7e22ce', 
            height: '70px', 
            padding: '0 32px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            color: '#ffffff',
            flexShrink: 0
          }}
        >
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {getTitle()}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Budiman</div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>Supplier</div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#ffffff', color: '#7e22ce', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
              B
            </div>
          </div>
        </header>

        {/* AREA ISIAN KONTEN (Scrollable) */}
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
        </main>

      </div>

    </div>
  );
}