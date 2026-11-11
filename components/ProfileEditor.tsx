
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  ShieldCheck,
  Save,
  X,
  ArrowLeft,
} from 'lucide-react';

type Profile = {
  id: string;
  nama: string;
  email: string;
  phone: string | null;
  alamat: string | null;
  role: string;
  avatar_url: string | null;
  akses_terakhir: string | null;
};

type ProfileEditorProps = {
  role: string;
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid #dce2ec',
  borderRadius: '9px',
  fontSize: '14px',
  color: '#202124',
  outline: 'none',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#374151',
  marginBottom: '7px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '18px',
  padding: '26px',
  boxShadow: '0 3px 12px rgba(0,0,0,0.04)',
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
    .split(/[\s_-]+/)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}

function getDashboardPath(role: string) {
  const normalized = role.toLowerCase().trim();

  if (
    normalized === 'karyawan produksi' ||
    normalized === 'karyawan-produksi'
  ) {
    return '/karyawan-produksi';
  }

  if (normalized === 'admin') return '/admin';
  if (normalized === 'owner') return '/owner';
  if (normalized === 'supplier') return '/supplier';

  return '/';
}

export default function ProfileEditor({
  role,
}: ProfileEditorProps) {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alamat, setAlamat] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dashboardPath = getDashboardPath(role);

  // =====================================================
  // 1. AMBIL DATA PROFIL DARI DATABASE
  // =====================================================

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        setLoading(true);
        setErrorMessage('');

        const response = await fetch('/api/auth/me', {
          method: 'GET',
          cache: 'no-store',
          credentials: 'same-origin',
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(
            result.error || 'Gagal mengambil data profil.'
          );
        }

        const data = result.data as Profile;

        setProfile(data);

        setNama(data.nama ?? '');
        setEmail(data.email ?? '');
        setPhone(data.phone ?? '');

        // Jika alamat kosong, tampilkan string kosong.
        setAlamat(data.alamat ?? '');

      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('LOAD PROFILE ERROR:', error);

          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'Gagal mengambil data profil.'
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

  // =====================================================
  // 2. SIMPAN PERUBAHAN PROFIL KE DATABASE
  // =====================================================

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');
    setSaved(false);

    if (!nama.trim() || nama.trim().length < 2) {
      setErrorMessage(
        'Nama minimal harus berisi 2 karakter.'
      );
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Email tidak boleh kosong.');
      return;
    }

    if (alamat.length > 500) {
      setErrorMessage(
        'Alamat maksimal 500 karakter.'
      );
      return;
    }

    // Validasi password baru jika pengguna ingin menggantinya.
    if (newPassword) {
      if (!currentPassword) {
        setErrorMessage(
          'Masukkan password saat ini.'
        );
        return;
      }

      if (newPassword.length < 8) {
        setErrorMessage(
          'Password baru minimal 8 karakter.'
        );
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessage(
          'Konfirmasi password baru tidak cocok.'
        );
        return;
      }
    } else if (currentPassword || confirmPassword) {
      setErrorMessage(
        'Untuk mengganti password, isi password baru dan konfirmasinya.'
      );
      return;
    }

    try {
      setSaving(true);

      const payload: Record<string, string | null> = {
        nama: nama.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        alamat: alamat.trim() || null,
      };

      // Password hanya dikirim jika pengguna mengubahnya.
      if (newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
        payload.confirmPassword = confirmPassword;
      }

      const response = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(
          result.error || 'Gagal menyimpan perubahan profil.'
        );
      }

      const updated = result.data as Profile;

      // Perbarui tampilan berdasarkan respons database.
      setProfile(updated);
      setNama(updated.nama);
      setEmail(updated.email);
      setPhone(updated.phone ?? '');
      setAlamat(updated.alamat ?? '');

      // Kosongkan form password setelah berhasil.
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setSaved(true);
      setSuccessMessage(
        'Perubahan profil berhasil disimpan ke database.'
      );

    } catch (error) {
      console.error('SAVE PROFILE ERROR:', error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan ketika menyimpan profil.'
      );
    } finally {
      setSaving(false);
    }
  }

  // =====================================================
  // 3. LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#a02e59',
          fontWeight: 'bold',
        }}
      >
        Memuat data profil...
      </div>
    );
  }

  // =====================================================
  // 4. TAMPILAN JIKA PROFIL TIDAK DITEMUKAN
  // =====================================================

  if (!profile) {
    return (
      <div style={cardStyle}>
        <h3 style={{ color: '#a02e59' }}>
          Profil tidak dapat dimuat
        </h3>

        <p style={{ color: '#666' }}>
          {errorMessage || 'Silakan login kembali.'}
        </p>

        <button
          type="button"
          onClick={() => router.push('/')}
          style={{
            padding: '11px 20px',
            border: 'none',
            borderRadius: '20px',
            backgroundColor: '#a02e59',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          Kembali
        </button>
      </div>
    );
  }

  // =====================================================
  // 5. HALAMAN EDIT PROFIL
  // =====================================================

  return (
    <div
      style={{
        width: '100%',
        color: '#333333',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h2
        style={{
          fontSize: '25px',
          fontWeight: 750,
          color: '#a02e59',
          margin: '0 0 20px',
        }}
      >
        Edit Profil
      </h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(230px, 0.8fr) minmax(0, 2.5fr)',
            gap: '22px',
            alignItems: 'start',
          }}
        >
          {/* KOLOM KIRI */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            {/* KARTU PROFIL */}
            <div
              style={{
                ...cardStyle,
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  textAlign: 'left',
                  color: '#a02e59',
                  fontSize: '16px',
                  margin: '0 0 20px',
                }}
              >
                Profil saya
              </h3>

              <div
                style={{
                  width: '98px',
                  height: '98px',
                  margin: '0 auto 18px',
                  borderRadius: '50%',
                  backgroundColor: '#fce9ef',
                  color: '#a02e59',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  overflow: 'hidden',
                }}
              >
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Foto profil"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  getInitials(nama || profile.nama)
                )}
              </div>

              <h3
                style={{
                  color: '#a02e59',
                  fontSize: '19px',
                  margin: '0 0 5px',
                }}
              >
                {nama || profile.nama}
              </h3>

              <p
                style={{
                  color: '#777777',
                  fontSize: '12px',
                  margin: '0 0 12px',
                  wordBreak: 'break-word',
                }}
              >
                {email}
              </p>

              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#fff1f5',
                  color: '#a02e59',
                  borderRadius: '20px',
                  padding: '5px 17px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                }}
              >
                {formatRole(profile.role)}
              </span>
            </div>

            {/* KARTU KEAMANAN */}
            <div style={cardStyle}>
              <h3
                style={{
                  color: '#a02e59',
                  fontSize: '15px',
                  margin: '0 0 18px',
                }}
              >
                Keamanan akun
              </h3>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#15803d',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                }}
              >
                <ShieldCheck size={17} />
                Akun aktif
              </div>

              <p
                style={{
                  fontSize: '12px',
                  color: '#555',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                <strong>Role akun</strong>
                <br />
                {formatRole(profile.role)}
                <br />
                <br />
                <strong>ID Pengguna</strong>
                <br />
                {profile.id}
              </p>

              <p
                style={{
                  fontSize: '11px',
                  color: '#888',
                  lineHeight: 1.6,
                  marginTop: '15px',
                }}
              >
                Jaga kerahasiaan password Anda dan jangan
                membagikan akses akun kepada orang lain.
              </p>
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div style={cardStyle}>
            {/* INFORMASI PRIBADI */}
            <h3
              style={{
                fontSize: '17px',
                color: '#a02e59',
                margin: '0 0 20px',
              }}
            >
              Informasi pribadi
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '18px',
              }}
            >
              {/* NAMA */}
              <div>
                <label style={labelStyle}>
                  <User
                    size={14}
                    style={{
                      display: 'inline',
                      marginRight: '5px',
                    }}
                  />
                  Nama lengkap
                </label>

                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  maxLength={100}
                  required
                  style={inputStyle}
                />
              </div>

              {/* EMAIL */}
              <div>
                <label style={labelStyle}>
                  <Mail
                    size={14}
                    style={{
                      display: 'inline',
                      marginRight: '5px',
                    }}
                  />
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                  maxLength={150}
                  required
                  style={inputStyle}
                />
              </div>

              {/* TELEPON */}
              <div>
                <label style={labelStyle}>
                  <Phone
                    size={14}
                    style={{
                      display: 'inline',
                      marginRight: '5px',
                    }}
                  />
                  Nomor telepon
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Masukkan nomor telepon"
                  maxLength={30}
                  style={inputStyle}
                />
              </div>

              {/* ROLE */}
              <div>
                <label style={labelStyle}>
                  Peran akun
                </label>

                <input
                  type="text"
                  value={formatRole(profile.role)}
                  readOnly
                  style={{
                    ...inputStyle,
                    backgroundColor: '#fff3f6',
                    color: '#a02e59',
                    fontWeight: 'bold',
                    cursor: 'not-allowed',
                  }}
                />

                <small
                  style={{
                    display: 'block',
                    marginTop: '6px',
                    color: '#888',
                    fontSize: '10px',
                  }}
                >
                  Role hanya dapat diubah oleh Admin.
                </small>
              </div>

              {/* ALAMAT - FULL WIDTH */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  <MapPin
                    size={14}
                    style={{
                      display: 'inline',
                      marginRight: '5px',
                    }}
                  />
                  Alamat
                </label>

                <textarea
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Alamat belum diisi. Silakan masukkan alamat lengkap Anda."
                  maxLength={500}
                  rows={4}
                  style={{
                    ...inputStyle,
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '100px',
                    lineHeight: 1.6,
                  }}
                />

                <small
                  style={{
                    color: '#888',
                    fontSize: '10px',
                  }}
                >
                  Alamat dapat dikosongkan dan diperbarui
                  kapan saja. Maksimal 500 karakter.
                </small>
              </div>
            </div>

            {/* PEMBATAS */}
            <div
              style={{
                borderTop: '1px solid #f1d7e0',
                margin: '28px 0',
              }}
            />

            {/* PASSWORD */}
            <h3
              style={{
                fontSize: '17px',
                color: '#a02e59',
                margin: '0 0 5px',
              }}
            >
              Ubah kata sandi
            </h3>

            <p
              style={{
                fontSize: '12px',
                color: '#888',
                margin: '0 0 20px',
              }}
            >
              Kosongkan jika tidak ingin mengubah password.
              Masukkan password saat ini untuk memverifikasi
              perubahan.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '18px',
              }}
            >
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  <Lock
                    size={14}
                    style={{
                      display: 'inline',
                      marginRight: '5px',
                    }}
                  />
                  Kata sandi saat ini
                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  placeholder="Masukkan password saat ini"
                  autoComplete="current-password"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Kata sandi baru
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  placeholder="Minimal 8 karakter"
                  maxLength={128}
                  autoComplete="new-password"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Konfirmasi kata sandi
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Ulangi password baru"
                  maxLength={128}
                  autoComplete="new-password"
                  style={inputStyle}
                />
              </div>
            </div>

            <p
              style={{
                fontSize: '10px',
                color: '#888',
                marginTop: '10px',
              }}
            >
              Password baru harus minimal 8 karakter dan
              konfirmasi harus sama.
            </p>

            {/* PESAN ERROR */}
            {errorMessage && (
              <div
                role="alert"
                style={{
                  marginTop: '20px',
                  padding: '12px 15px',
                  borderRadius: '9px',
                  backgroundColor: '#fff0f0',
                  color: '#c62828',
                  fontSize: '13px',
                }}
              >
                {errorMessage}
              </div>
            )}

            {/* PESAN SUKSES */}
            {successMessage && (
              <div
                role="status"
                style={{
                  marginTop: '20px',
                  padding: '12px 15px',
                  borderRadius: '9px',
                  backgroundColor: '#ecfdf3',
                  color: '#15803d',
                  fontSize: '13px',
                }}
              >
                {successMessage}
              </div>
            )}

            {/* TOMBOL */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '12px',
                marginTop: '30px',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={() => router.push(dashboardPath)}
                disabled={saving}
                style={{
                  padding: '11px 25px',
                  borderRadius: '25px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  color: '#333',
                  fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer',
                }}
              >
                <X
                  size={14}
                  style={{
                    display: 'inline',
                    marginRight: '5px',
                  }}
                />
                Batal
              </button>

              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: '12px 26px',
                  borderRadius: '25px',
                  border: 'none',
                  backgroundColor: '#a02e59',
                  color: '#ffffff',
                  fontWeight: 700,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.7 : 1,
                }}
              >
                <Save
                  size={15}
                  style={{
                    display: 'inline',
                    marginRight: '7px',
                  }}
                />
                {saving
                  ? 'Menyimpan...'
                  : 'Simpan Perubahan'}
              </button>

              {saved && (
                <button
                  type="button"
                  onClick={() => router.push(dashboardPath)}
                  style={{
                    padding: '12px 25px',
                    borderRadius: '25px',
                    border: 'none',
                    backgroundColor: '#15803d',
                    color: '#ffffff',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <ArrowLeft
                    size={14}
                    style={{
                      display: 'inline',
                      marginRight: '6px',
                    }}
                  />
                  Selesai
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
