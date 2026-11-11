'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Mail,
  User,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';

type SignupForm = {
  email: string;
  name: string;
  phone: string;
  password: string;
  role: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<SignupForm>({
    email: '',
    name: '',
    phone: '',
    password: '',
    role: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMessage(result.error || 'Pendaftaran gagal. Silakan coba lagi.');
        return;
      }

      setShowModal(true);
    } catch (error) {
      console.error('Signup request failed:', error);
      setErrorMessage(
        'Tidak dapat terhubung ke server. Periksa koneksi dan coba kembali.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelesai = () => {
    setShowModal(false);
    router.replace('/login?registered=1');
  };

  return (
    <main className="signup-container">
      <div className="signup-card">
        {/* Sisi Kiri: Arch Container Logo */}
        <div className="content-left">
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

        {/* Sisi Kanan: Form Sign Up */}
        <div className="content-right">
          <h1 className="signup-title">Create Account</h1>

          <form onSubmit={handleSubmit} className="signup-form">
            {/* Field Email */}
            <div className="form-group">
              <span className="input-label">Email</span>
              <div className="input-wrapper">
                <Mail className="input-icon-svg" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  maxLength={150}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Field Name */}
            <div className="form-group">
              <span className="input-label">Name</span>
              <div className="input-wrapper">
                <User className="input-icon-svg" size={18} />
                <input
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Field Phone No */}
            <div className="form-group">
              <span className="input-label">Phone no</span>
              <div className="input-wrapper">
                <Smartphone className="input-icon-svg" size={18} />
                <input
                  type="tel"
                  placeholder="Enter your phone no"
                  autoComplete="tel"
                  required
                  maxLength={30}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
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
                  placeholder="Enter your password (min. 8 characters)"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  maxLength={128}
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

            {/* Field Role */}
            <div className="form-group">
              <span className="input-label">Role</span>
              <div className="input-wrapper">
                <User className="input-icon-svg" size={18} />
                <select
                  required
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Enter your role
                  </option>
                  <option value="Supplier">Supplier</option>
                  <option value="Owner">Owner</option>
                  <option value="Admin">Admin</option>
                  <option value="Karyawan Produksi">Karyawan Produksi</option>
                </select>
              </div>
            </div>

            {errorMessage && (
              <p role="alert" aria-live="polite" className="signup-error">
                {errorMessage}
              </p>
            )}

            {/* Tombol Create Account */}
            <button
              type="submit"
              className="btn-submit"
              disabled={submitting}
            >
              {submitting ? 'Creating account...' : 'Create Account'}
            </button>

            <div className="divider-text">- or -</div>

            <p className="login-link-text">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Modal hanya ditampilkan setelah API mengonfirmasi akun tersimpan */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-icon-check">✓</div>
            <h2>Berhasil disimpan</h2>
            <p>
              Akun berhasil dibuat. Silakan masuk menggunakan email dan
              password yang baru Anda daftarkan.
            </p>
            <button className="btn-modal-close" onClick={handleSelesai}>
              Lanjut ke Sign in
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
