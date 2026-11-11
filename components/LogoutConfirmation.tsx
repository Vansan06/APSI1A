
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  ShieldCheck,
  X,
} from 'lucide-react';

type Profile = {
  id: string;
  nama: string;
  email: string;
  role: string;
  avatar_url?: string | null;
};

type Props = {
  role: 'admin' | 'owner' | 'supplier' | 'karyawan-produksi';
};

const dashboardPaths: Record<Props['role'], string> = {
  admin: '/admin',
  owner: '/owner',
  supplier: '/supplier',
  'karyawan-produksi': '/karyawan-produksi',
};

function getInitials(name: string) {
  return name
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
    .split(/[\s_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function LogoutConfirmation({ role }: Props) {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState('');

  const dashboard = dashboardPaths[role];

  // Mengambil identitas akun dari session aktif.
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
            result.error || 'Gagal mengambil data akun.'
          );
        }

        const data = result.data;

        setProfile({
          id: data.id,
          nama: data.nama,
          email: data.email,
          role: data.role,
          avatar_url: data.avatar_url ?? null,
        });
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error('LOAD LOGOUT PROFILE:', err);
          setError(
            err instanceof Error
              ? err.message
              : 'Gagal mengambil data akun.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => controller.abort();
  }, []);

  // Batalkan logout dan kembali ke dashboard aktor.
  function handleCancel() {
    router.push(dashboard);
  }

  // Hapus session login.
  async function handleLogout() {
    try {
      setLoggingOut(true);
      setError('');

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-store',
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || 'Gagal keluar dari akun.'
        );
      }

      router.replace('/');
      router.refresh();
    } catch (err) {
      console.error('LOGOUT ERROR:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Gagal keluar dari akun.'
      );

      setLoggingOut(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        boxSizing: 'border-box',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* KARTU KONFIRMASI */}
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#ffffff',
          borderRadius: '22px',
          padding: '38px 34px',
          boxShadow: '0 8px 25px rgba(80,20,40,0.08)',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      >
        {/* IKON LOGOUT */}
        <div
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: '#fff1f5',
            color: '#a02e59',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <LogOut size={31} />
        </div>

        <h2
          style={{
            color: '#a02e59',
            fontSize: '23px',
            fontWeight: 750,
            margin: '0 0 10px',
          }}
        >
          Yakin ingin keluar?
        </h2>

        <p
          style={{
            color: '#777777',
            fontSize: '13px',
            lineHeight: 1.6,
            margin: '0 0 25px',
          }}
        >
          Sesi {formatRole(role)} akan diakhiri.
          Anda perlu masuk kembali untuk mengakses
          data dan melanjutkan pekerjaan.
        </p>

        {/* INFORMASI AKUN DINAMIS */}
        <div
          style={{
            backgroundColor: '#fff4f7',
            borderRadius: '14px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            textAlign: 'left',
            marginBottom: '18px',
          }}
        >
          {/* AVATAR */}
          <div
            style={{
              width: '45px',
              height: '45px',
              flexShrink: 0,
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              color: '#a02e59',
              border: '1px solid #f2d1dc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              overflow: 'hidden',
            }}
          >
            {loading ? (
              '...'
            ) : profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              getInitials(profile?.nama || '')
            )}
          </div>

          {/* NAMA DAN EMAIL */}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                color: '#a02e59',
                fontSize: '14px',
                fontWeight: 750,
                marginBottom: '4px',
                overflowWrap: 'anywhere',
              }}
            >
              {loading
                ? 'Memuat akun...'
                : profile?.nama || 'Profil tidak tersedia'}
            </div>

            <div
              style={{
                color: '#777777',
                fontSize: '11px',
                overflowWrap: 'anywhere',
              }}
            >
              {profile?.email || ''}
              {profile && ` • ${formatRole(profile.role)}`}
            </div>
          </div>
        </div>

        {/* STATUS KEAMANAN */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '7px',
            color: '#15803d',
            fontSize: '11px',
            marginBottom: '25px',
          }}
        >
          <ShieldCheck size={15} />
          Mode hanya lihat • Tidak ada perubahan data.
        </div>

        {/* PESAN ERROR */}
        {error && (
          <div
            role="alert"
            style={{
              backgroundColor: '#fff0f0',
              color: '#c62828',
              padding: '11px',
              borderRadius: '9px',
              fontSize: '12px',
              marginBottom: '18px',
            }}
          >
            {error}
          </div>
        )}

        {/* TOMBOL */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          <button
            type="button"
            onClick={handleCancel}
            disabled={loggingOut}
            style={{
              minHeight: '47px',
              borderRadius: '25px',
              border: '1px solid #d1d1d1',
              backgroundColor: '#ffffff',
              color: '#444444',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            <X
              size={15}
              style={{
                display: 'inline',
                marginRight: '5px',
                verticalAlign: 'middle',
              }}
            />
            Batal, Tetap di Sini
          </button>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut || loading || !profile}
            style={{
              minHeight: '47px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: '#762344',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '12px',
              cursor:
                loggingOut || loading || !profile
                  ? 'not-allowed'
                  : 'pointer',
              opacity:
                loggingOut || loading || !profile
                  ? 0.6
                  : 1,
            }}
          >
            <LogOut
              size={15}
              style={{
                display: 'inline',
                marginRight: '5px',
                verticalAlign: 'middle',
              }}
            />
            {loggingOut ? 'Keluar...' : 'Ya, Keluar'}
          </button>
        </div>
      </div>

      <p
        style={{
          color: '#87445e',
          fontSize: '11px',
          marginTop: '22px',
          textAlign: 'center',
        }}
      >
        Selalu keluar dari akun saat menggunakan perangkat bersama.
      </p>
    </div>
  );
}
