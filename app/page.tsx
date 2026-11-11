import Link from 'next/link';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: '24px',
        boxSizing: 'border-box',
      }}
    >
      {/* Container Utama / Hero Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '880px',
          minHeight: '460px',
          borderRadius: '20px',
          background: 'linear-gradient(105deg, #ac3562 0%, #e8b2c4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '48px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          boxSizing: 'border-box',
        }}
      >
        {/* Sisi Kiri: Teks & Tombol */}
        <div
          style={{
            flex: 1,
            maxWidth: '420px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: 1.35,
              marginBottom: '36px',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Welcome to Information System Production DFO Donat
          </h1>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link
              href="/login"
              style={{
                padding: '12px 32px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: 700,
                textDecoration: 'none',
                backgroundColor: '#ffffff',
                color: '#9e2a54',
                display: 'inline-block',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap',
              }}
            >
              Log In
            </Link>

            <Link
              href="/signup"
              style={{
                padding: '12px 32px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: 700,
                textDecoration: 'none',
                backgroundColor: '#a02e59',
                color: '#ffffff',
                display: 'inline-block',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap',
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Sisi Kanan: Arch Container & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: '260px',
              height: '370px',
              backgroundColor: 'rgba(232, 155, 178, 0.75)',
              borderTopLeftRadius: '130px',
              borderTopRightRadius: '130px',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            <Image
              src="/logo-dfo.png"
              alt="D.FO Donat Logo"
              width={200}
              height={200}
              priority
              style={{
                objectFit: 'contain',
                maxWidth: '100%',
                height: 'auto',
                mixBlendMode: 'multiply',
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}