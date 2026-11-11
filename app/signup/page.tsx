'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Import ikon Lucide React
import { 
  Mail,        // Ikon Email
  User,        // Ikon Name & Role
  Smartphone,  // Ikon Phone no
  Lock,        // Ikon Password
  Eye,         // Ikon Tampil Password
  EyeOff       // Ikon Sembunyikan Password
} from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    role: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  // Navigasi kembali ke Welcome Page saat mengklik Selesai
  const handleSelesai = () => {
    setShowModal(false);
    router.push('/');
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
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Field Password */}
            <div className="form-group">
              <span className="input-label">Password</span>
              <div className="input-wrapper">
                <Lock className="input-icon-svg" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
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

            {/* Field Role (Dropdown) */}
            <div className="form-group">
              <span className="input-label">Role</span>
              <div className="input-wrapper">
                <User className="input-icon-svg" size={18} />
                <select 
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="" disabled>Enter your role</option>
                  <option value="Supplier">Supplier</option>
                  <option value="Owner">Owner</option>
                  <option value="Admin">Admin</option>
                  <option value="Karyawan Produksi">Karyawan Produksi</option>
                </select>
              </div>
            </div>

            {/* Tombol Create Account */}
            <button type="submit" className="btn-submit">
              Create Account
            </button>

            <div className="divider-text">- or -</div>

            <p className="login-link-text">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>

          </form>
        </div>

      </div>

      {/* Pop-up Modal Berhasil Disimpan */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-icon-check">✓</div>
            <h2>Berhasil disimpan</h2>
            <p>Data berhasil disimpan.</p>
            <button 
              className="btn-modal-close"
              onClick={handleSelesai}
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </main>
  );
}