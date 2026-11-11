'use client';

import React from 'react';
import Link from 'next/link';
import { LogOut, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function LogoutPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 120px)',
        gap: '20px'
      }}
    >
      {/* KARTU KONFIRMASI LOG OUT */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '40px 36px',
          width: '100%',
          maxWidth: '460px',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#fdf0ee',
            color: '#b0525e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}
        >
          <LogOut size={28} />
        </div>

        <h3 style={{ fontSize: '20px', color: '#b0525e', margin: '0 0 10px 0', fontWeight: 'bold' }}>
          Yakin ingin keluar?
        </h3>
        <p style={{ fontSize: '12px', color: '#666666', margin: '0 0 24px 0', lineHeight: 1.5 }}>
          Sesi Home Page Karyawan Produksi akan diakhiri. Anda perlu masuk kembali untuk mengakses data dan melanjutkan pekerjaan.
        </p>

        <div
          style={{
            backgroundColor: '#fdf0ee',
            borderRadius: '16px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
            textAlign: 'left'
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              color: '#b0525e',
              fontWeight: 'bold',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            SR
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#333333' }}>
              Siti Rahmah
            </div>
            <div style={{ fontSize: '11px', color: '#777777' }}>
              sitirahmah@gmail.com • Karyawan Produksi
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            color: '#2e7d32',
            fontSize: '11px',
            fontWeight: 'bold',
            marginBottom: '28px'
          }}
        >
          <CheckCircle2 size={16} />
          <span>Semua hasil produksi telah tersimpan.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {/* BATAL: Kembali ke Home Page Karyawan Produksi */}
          <Link
            href="/karyawan-produksi"
            style={{
              padding: '12px 16px',
              backgroundColor: '#ffffff',
              border: '1px solid #cccccc',
              borderRadius: '10px',
              color: '#555555',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Batal, Tetap di Sini
          </Link>

          {/* YA: Ke Welcome Page / Login */}
          <Link
            href="/"
            style={{
              padding: '12px 16px',
              backgroundColor: '#b0525e',
              borderRadius: '10px',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={16} />
            <span>Ya, Keluar</span>
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b0525e', fontSize: '11px' }}>
        <ShieldAlert size={14} />
        <span>Selalu keluar dari akun saat menggunakan perangkat bersama.</span>
      </div>
    </div>
  );
}