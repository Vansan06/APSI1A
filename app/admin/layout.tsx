
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  FileText,
  Package,
  Boxes,
  BookOpen,
  Users,
  ShoppingCart,
  Factory,
  CheckCircle2,
  UserCheck,
  BarChart3,
  User,
  LogOut,
} from 'lucide-react';

type Profile = {
  nama: string;
  role: string;
  avatar_url?: string | null;
};

function getInitials(nama: string) {
  return nama
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase() || 'U';
}

function formatRole(role: string) {
  return role
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Data Pesanan', href: '/admin/pesanan', icon: FileText },
  { name: 'Data Produk', href: '/admin/produk', icon: Package },
  { name: 'Data Bahan Baku', href: '/admin/bahan-baku', icon: Boxes },
  { name: 'Resep', href: '/admin/resep', icon: BookOpen },
  { name: 'Data Supplier', href: '/admin/supplier', icon: Users },
  {
    name: 'Pemesanan Bahan Baku',
    href: '/admin/pemesanan-bahan-baku',
    icon: ShoppingCart,
  },
  {
    name: 'Kapasitas Produksi',
    href: '/admin/kapasitas',
    icon: Factory,
  },
  {
    name: 'Hasil Produksi',
    href: '/admin/hasil-produksi',
    icon: CheckCircle2,
  },
  {
    name: 'Manajemen Pengguna',
    href: '/admin/pengguna',
    icon: UserCheck,
  },
  { name: 'Laporan', href: '/admin/laporan', icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          cache: 'no-store',
          credentials: 'same-origin',
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(result.error || 'Gagal mengambil profil.');
        }

        setProfile({
          nama: result.data.nama || 'Pengguna',
          role: result.data.role || 'admin',
          avatar_url: result.data.avatar_url || null,
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Gagal memuat profil Admin:', error);
        }
      }
    }

    loadProfile();

    return () => controller.abort();
  }, [pathname]);

  const getTitle = () => {
    if (pathname === '/admin') return 'Dashboard Admin';
    if (pathname.startsWith('/admin/pesanan')) return 'Data Pesanan';
    if (pathname.startsWith('/admin/produk')) return 'Data Produk';
    if (pathname.startsWith('/admin/bahan-baku'))
      return 'Data Bahan Baku';
    if (pathname.startsWith('/admin/resep')) return 'Resep';
    if (pathname.startsWith('/admin/supplier')) return 'Data Supplier';
    if (pathname.startsWith('/admin/pemesanan-bahan-baku'))
      return 'Pemesanan Bahan Baku';
    if (pathname.startsWith('/admin/kapasitas'))
      return 'Kapasitas Produksi';
    if (pathname.startsWith('/admin/hasil-produksi'))
      return 'Hasil Produksi';
    if (pathname.startsWith('/admin/pengguna'))
      return 'Manajemen Pengguna';
    if (pathname.startsWith('/admin/laporan')) return 'Laporan';
    if (pathname === '/admin/profil') return 'Edit Profil';
    if (pathname === '/admin/logout') return 'Log out';

    return 'Dashboard Admin';
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#e9d5ff',
        fontFamily: 'system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* SIDEBAR LEFT */}
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
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            overflowY: 'auto',
            paddingRight: '4px',
          }}
        >
          <h2
            style={{
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '20px',
              paddingLeft: '8px',
            }}
          >
            Menu Admin
          </h2>

          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== '/admin' &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    backgroundColor: isActive ? '#6b21a8' : '#ffffff',
                    color: isActive ? '#ffffff' : '#6b21a8',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM BUTTONS */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #d8b4fe',
          }}
        >
          <Link
            href="/admin/profil"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              borderRadius: '20px',
              backgroundColor:
                pathname === '/admin/profil' ? '#6b21a8' : '#ffffff',
              color:
                pathname === '/admin/profil' ? '#ffffff' : '#6b21a8',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          >
            <User size={16} /> Edit Profil
          </Link>

          <Link
            href="/admin/logout"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              borderRadius: '20px',
              backgroundColor:
                pathname === '/admin/logout' ? '#6b21a8' : '#ffffff',
              color:
                pathname === '/admin/logout' ? '#ffffff' : '#6b21a8',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          >
            <LogOut size={16} /> Log out
          </Link>
        </div>
      </aside>

      {/* AREA KANAN UTAMA */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {/* HEADER TOP */}
        <header
          style={{
            backgroundColor: '#7e22ce',
            height: '70px',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#ffffff',
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              margin: 0,
            }}
          >
            {getTitle()}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                }}
              >
                {profile?.nama || 'Memuat profil...'}
              </div>

              <div
                style={{
                  fontSize: '11px',
                  opacity: 0.8,
                }}
              >
                {profile ? formatRole(profile.role) : 'Admin'}
              </div>
            </div>

            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                color: '#7e22ce',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar Admin"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                getInitials(profile?.nama || 'Admin')
              )}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main
          style={{
            flex: 1,
            padding: '24px 32px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
