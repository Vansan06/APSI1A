'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

// Data 4 Akun Resmi & Role Masing-Masing
const USERS_DATABASE = [
  {
    email: 'aunurrahman@gmail.com',
    password: 'DonatContoh26',
    role: 'owner',
    redirectUrl: '/owner',
  },
  {
    email: 'enjiputrii@gmail.com',
    password: 'DonatContoh26',
    role: 'admin',
    redirectUrl: '/admin',
  },
  {
    email: 'sitirahmah@gmail.com',
    password: 'DonatContoh26',
    role: 'karyawan produksi',
    redirectUrl: '/karyawan-produksi',
  },
  {
    email: 'budiman@gmail.com',
    password: 'DonatContoh26',
    role: 'supplier',
    redirectUrl: '/supplier',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State untuk Pop-up Error
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Cari user berdasarkan email (case-insensitive)
    const userFound = USERS_DATABASE.find(
      (u) => u.email.toLowerCase() === formData.email.trim().toLowerCase()
    );

    // Jika Email Tidak Ditemukan
    if (!userFound) {
      setErrorMessage('Akun tidak ditemukan');
      setShowErrorModal(true);
      return;
    }

    // 2. Cek Password
    if (userFound.password !== formData.password) {
      setErrorMessage('Password salah');
      setShowErrorModal(true);
      return;
    }

    // 3. Jika Email & Password Benar, Arahkan ke Halaman Role Masing-Masing
    router.push(userFound.redirectUrl);
  };

  return (
    <main className="login-container">
      <div className="login-card">
        {/* Sisi Kiri: Form Input Login */}
        <div className="content-left-login">
          <h1 className="login-title">Welcome</h1>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Field Email */}
            <div className="form-group">
              <span className="input-label">Email</span>
              <div className="input-wrapper">
                <Mail className="input-icon-svg" size={18} />
                <input
                  type="email"
                  placeholder="email@gmail.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Field Password */}
            <div className="form-group">
              <span className="input-label">Password</span>
              <div className="input-wrapper">
                <Lock className="input-icon-svg" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="input-icon-svg toggle-icon" size={18} />
                  ) : (
                    <Eye className="input-icon-svg toggle-icon" size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Tombol Log in */}
            <button type="submit" className="btn-submit">
              Log in
            </button>

            {/* Link ke halaman Sign Up */}
            <p className="signup-link-text">
              Don&apos;t have an account? <Link href="/signup">Sign up</Link>
            </p>
          </form>
        </div>

        {/* Sisi Kanan: Logo Arch Container */}
        <div className="content-right-login">
          <div className="arch-container">
            <div className="logo-image-wrapper">
              <Image
                src="/logo-dfo.png"
                alt="D.FO Donat Logo"
                width={200}
                height={200}
                priority
                className="brand-logo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Modal Error (Akun tidak ditemukan / Password salah) */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-icon-error">
              <AlertCircle size={24} />
            </div>
            <h2>Gagal Login</h2>
            <p>{errorMessage}</p>
            <button
              className="btn-modal-close"
              onClick={() => setShowErrorModal(false)}
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}
    </main>
  );
}