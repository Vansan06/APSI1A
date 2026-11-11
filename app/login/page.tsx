
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrorModal(false);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMessage(
          result.error || 'Email atau password tidak valid'
        );
        setShowErrorModal(true);
        return;
      }

      const destinations: Record<string, string> = {
        admin: '/admin',
        owner: '/owner',
        supplier: '/supplier',
        'karyawan produksi': '/karyawan-produksi',
      };

      router.replace(destinations[result.data.role] || '/');
    } catch {
      setErrorMessage(
        'Tidak dapat terhubung ke server. Coba kembali.'
      );
      setShowErrorModal(true);
    }
  };

  return (
    <main className="login-container">
      <div className="login-card">

        {/* SISI KIRI: FORM LOGIN */}
        <div className="content-left-login">
          <h1 className="login-title">Welcome</h1>

          <form onSubmit={handleSubmit} className="login-form">

            {/* EMAIL */}
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
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* PASSWORD */}
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
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff
                      className="input-icon-svg toggle-icon"
                      size={18}
                    />
                  ) : (
                    <Eye
                      className="input-icon-svg toggle-icon"
                      size={18}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* TOMBOL LOGIN */}
            <button type="submit" className="btn-submit">
              Log in
            </button>

            {/* SIGN UP */}
            <p className="signup-link-text">
              Don&apos;t have an account?{' '}
              <Link href="/signup">Sign up</Link>
            </p>

          </form>
        </div>

        {/* SISI KANAN: LOGO D.FO */}
        <div className="content-right-login">
          <div className="arch-container">

            <div className="logo-image-wrapper">
              <Image
                src="/logo-dfo.png"
                alt="Logo D.FO"
                width={250}
                height={250}
                priority
                className="brand-logo"
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>

          </div>
        </div>

      </div>

      {/* MODAL ERROR */}
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
