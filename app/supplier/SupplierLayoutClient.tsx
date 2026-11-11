
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Home,
  Boxes,
  ShoppingBag,
  Truck,
  UserCheck,
  LogOut,
} from 'lucide-react';

type Profile = {
  nama: string;
  role: string;
  avatar_url?: string | null;
};

function getInitials(nama: string) {
  return (
    nama
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase() || 'U'
  );
}

function formatRole(role: string) {
  return role
    .split(/\s+/)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}

export default function SupplierLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [profile, setProfile] = useState<Profile | null>(null);

  // Mengambil profil Supplier
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
          throw new Error(
            result.error || 'Gagal mengambil profil.'
          );
        }

        setProfile({
          nama: result.data.nama || 'Pengguna',
          role: result.data.role || 'supplier',
          avatar_url: result.data.avatar_url || null,
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(
            'Gagal memuat profil Supplier:',
            error
          );
        }
      }
    }

    loadProfile();

    return () => controller.abort();
  }, [pathname]);

  // Menu navigasi
  const menuItems = [
    {
      name: 'Home Page',
      href: '/supplier',
      icon: Home,
    },
    {
      name: 'Ketersediaan Bahan Baku',
      href: '/supplier/ketersediaan',
      icon: Boxes,
    },
    {
      name: 'Pesanan Bahan Baku',
      href: '/supplier/pesanan',
      icon: ShoppingBag,
    },
    {
      name: 'Informasi Pengiriman',
      href: '/supplier/pengiriman',
      icon: Truck,
    },
  ];

  // Judul header
  const getTitle = () => {
    if (pathname === '/supplier') {
      return 'Home Page';
    }

    if (pathname.startsWith('/supplier/ketersediaan')) {
      return 'Ketersediaan Bahan Baku';
    }

    if (pathname.startsWith('/supplier/pesanan')) {
      return 'Pesanan Bahan Baku';
    }

    if (pathname.startsWith('/supplier/pengiriman')) {
      return 'Informasi Pengiriman';
    }

    if (pathname.startsWith('/supplier/profil')) {
      return 'Edit Profil';
    }

    if (pathname.startsWith('/supplier/logout')) {
      return 'Konfirmasi Log out';
    }

    return 'Supplier Portal';
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        backgroundColor: '#e9d5ff',
        fontFamily: 'system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* SIDEBAR */}
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
        <div>
          <h2
            style={{
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '24px',
              paddingLeft: '8px',
            }}
          >
            Menu Supplier
          </h2>

          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== '/supplier' &&
                  pathname.startsWith(item.href));

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
                    backgroundColor: isActive
                      ? '#6b21a8'
                      : '#ffffff',
                    color: isActive
                      ? '#ffffff'
                      : '#6b21a8',
                    boxShadow:
                      '0 2px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* PENGATURAN AKUN */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              color: '#581c87',
              paddingLeft: '8px',
              fontWeight: 'bold',
            }}
          >
            Pengaturan akun
          </div>

          <Link
            href="/supplier/profil"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              borderRadius: '20px',
              backgroundColor:
                pathname.startsWith('/supplier/profil')
                  ? '#6b21a8'
                  : '#ffffff',
              color:
                pathname.startsWith('/supplier/profil')
                  ? '#ffffff'
                  : '#6b21a8',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          >
            <UserCheck size={16} />
            Edit Profil
          </Link>

          <Link
            href="/supplier/logout"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              borderRadius: '20px',
              backgroundColor:
                pathname.startsWith('/supplier/logout')
                  ? '#6b21a8'
                  : '#ffffff',
              color:
                pathname.startsWith('/supplier/logout')
                  ? '#ffffff'
                  : '#6b21a8',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          >
            <LogOut size={16} />
            Log out
          </Link>
        </div>
      </aside>

      {/* AREA KANAN */}
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
        {/* HEADER */}
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

          {/* IDENTITAS SUPPLIER */}
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
                {profile
                  ? formatRole(profile.role)
                  : 'Supplier'}
              </div>
            </div>

            {/* AVATAR */}
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
                  alt="Avatar Supplier"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                getInitials(profile?.nama || 'Supplier')
              )}
            </div>
          </div>
        </header>

        {/* KONTEN HALAMAN */}
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
