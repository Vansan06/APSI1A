'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingBag,
  Factory,
  BookOpen,
  Boxes,
  ClipboardPlus,
  History,
  UserCog,
  LogOut,
} from 'lucide-react';

const MENU_PRODUKSI = [
  { name: 'Home Page', href: '/karyawan-produksi', icon: Home },
  { name: 'Pesanan Masuk', href: '/karyawan-produksi/pesanan-masuk', icon: ShoppingBag },
  { name: 'Kapasitas Produksi', href: '/karyawan-produksi/kapasitas-produksi', icon: Factory },
  { name: 'Resep', href: '/karyawan-produksi/resep', icon: BookOpen },
  { name: 'Data Bahan Baku', href: '/karyawan-produksi/bahan-baku', icon: Boxes },
  { name: 'Input Hasil Produksi', href: '/karyawan-produksi/input-hasil', icon: ClipboardPlus },
  { name: 'Riwayat Produksi', href: '/karyawan-produksi/riwayat-produksi', icon: History },
];

export default function ProduksiLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#f2c4be', fontFamily: 'sans-serif' }}>
      
      {/* SIDEBAR LEFT */}
      <aside
        style={{
          width: '260px',
          height: '100vh',
          backgroundColor: '#f2c4be',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          flexShrink: 0
        }}
      >
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '24px', paddingLeft: '8px', lineHeight: 1.2 }}>
            Menu<br />Karyawan<br />Produksi
          </h1>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {MENU_PRODUKSI.map((item) => {
              const Icon = item.icon;
              // Pengecekan rute aktif yang presisi agar tidak bentrok dengan rute logout
              const isActive = pathname === item.href || (item.href !== '/karyawan-produksi' && pathname.startsWith(item.href));

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
                    fontSize: '13px',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    backgroundColor: isActive ? '#b0525e' : '#ffffff',
                    color: isActive ? '#ffffff' : '#b0525e',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px' }}>
          {/* MENU EDIT PROFIL */}
          <Link
            href="/karyawan-produksi/profil"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 'bold',
              textDecoration: 'none',
              backgroundColor: pathname === '/karyawan-produksi/profil' ? '#b0525e' : '#ffffff',
              color: pathname === '/karyawan-produksi/profil' ? '#ffffff' : '#b0525e'
            }}
          >
            <UserCog size={18} />
            <span>Edit Profil</span>
          </Link>

          {/* MENU LOG OUT (Penting: href harus menunjuk persis ke /karyawan-produksi/logout) */}
          <Link
            href="/karyawan-produksi/logout"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 'bold',
              textDecoration: 'none',
              backgroundColor: pathname === '/karyawan-produksi/logout' ? '#b0525e' : '#ffffff',
              color: pathname === '/karyawan-produksi/logout' ? '#ffffff' : '#b0525e'
            }}
          >
            <LogOut size={18} />
            <span>Log out</span>
          </Link>
        </div>
      </aside>

      {/* RIGHT CONTENT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', minWidth: 0, overflow: 'hidden' }}>
        
        {/* HEADER TOP */}
        <header
          style={{
            height: '70px',
            backgroundColor: '#b0525e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            color: '#ffffff',
            flexShrink: 0
          }}
        >
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            {pathname === '/karyawan-produksi' && 'Home Page'}
            {pathname === '/karyawan-produksi/pesanan-masuk' && 'Pesanan Masuk'}
            {pathname === '/karyawan-produksi/kapasitas-produksi' && 'Kapasitas Produksi'}
            {pathname === '/karyawan-produksi/resep' && 'Resep Standar'}
            {pathname.startsWith('/karyawan-produksi/bahan-baku') && 'Data Bahan Baku'}
            {pathname === '/karyawan-produksi/input-hasil' && 'Input Hasil Produksi'}
            {pathname.startsWith('/karyawan-produksi/riwayat-produksi') && 'Riwayat Produksi'}
            {pathname === '/karyawan-produksi/profil' && 'Edit Profil'}
            {pathname === '/karyawan-produksi/logout' && 'Log out'}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Siti Rahmah</div>
              <div style={{ fontSize: '11px', color: '#fcdcd9' }}>Karyawan Produksi</div>
            </div>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                color: '#b0525e',
                fontWeight: 'bold',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              SR
            </div>
          </div>
        </header>

        {/* MAIN BODY */}
        <main style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

    </div>
  );
}