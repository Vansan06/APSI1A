'use client';

import React from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, Truck } from 'lucide-react';

export default function SupplierHomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* RINGKASAN HOME PAGE HEADER CARD */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '16px 24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        }}
      >
        <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
          Ringkasan Home Page
        </h3>
      </div>

      {/* KARTU STATISTIK 3 KOLOM */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        
        {/* STAT 1: BAHAN BAKU TERSEDIA */}
        <div style={cardStatStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', color: '#555555', fontWeight: 'bold' }}>
              Bahan baku tersedia
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>
              3 jenis
            </div>
            <div style={{ fontSize: '11px', color: '#777777' }}>
              Seluruh bahan siap dipasok
            </div>
          </div>
          <div style={iconBadgeStyle}>
            <Package size={20} color="#6b21a8" />
          </div>
        </div>

        {/* STAT 2: PESANAN AKTIF */}
        <div style={cardStatStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', color: '#555555', fontWeight: 'bold' }}>
              Pesanan aktif
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>
              3 pesanan
            </div>
            <div style={{ fontSize: '11px', color: '#777777' }}>
              1 baru • 1 diproses • 1 dikirim
            </div>
          </div>
          <div style={iconBadgeStyle}>
            <ShoppingCart size={20} color="#6b21a8" />
          </div>
        </div>

        {/* STAT 3: PENGIRIMAN BERJALAN */}
        <div style={cardStatStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', color: '#555555', fontWeight: 'bold' }}>
              Pengiriman berjalan
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>
              1 pengiriman
            </div>
            <div style={{ fontSize: '11px', color: '#777777' }}>
              Estimasi tiba 26 Oktober 2026
            </div>
          </div>
          <div style={iconBadgeStyle}>
            <Truck size={20} color="#6b21a8" />
          </div>
        </div>

      </div>

      {/* TABEL PESANAN BAHAN BAKU TERBARU */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Pesanan Bahan Baku Terbaru
          </h3>
          <Link
            href="/supplier/pesanan"
            style={{
              fontSize: '12px',
              color: '#6b21a8',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
          >
            Semua pesanan
          </Link>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px', borderRadius: '8px 0 0 8px' }}>No. pesanan</th>
              <th style={{ padding: '10px 14px' }}>Tanggal</th>
              <th style={{ padding: '10px 14px' }}>Bahan baku</th>
              <th style={{ padding: '10px 14px' }}>Jumlah</th>
              <th style={{ padding: '10px 14px' }}>Status</th>
              <th style={{ padding: '10px 14px', borderRadius: '0 8px 8px 0' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* ROW 1 */}
            <tr style={{ borderBottom: '1px solid #fdf2f8' }}>
              <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#6b21a8' }}>PB-025</td>
              <td style={{ padding: '12px 14px', color: '#333333' }}>25 Okt 2026</td>
              <td style={{ padding: '12px 14px', color: '#333333' }}>Tepung terigu</td>
              <td style={{ padding: '12px 14px', color: '#333333' }}>50 kg</td>
              <td style={{ padding: '12px 14px' }}>
                <span style={{ backgroundColor: '#fdf2f8', color: '#9d174d', padding: '4px 10px', borderRadius: '8px', fontSize: '11px' }}>
                  Pesanan baru
                </span>
              </td>
              <td style={{ padding: '12px 14px' }}>
                <Link href="/supplier/pesanan/PB-025" style={btnOutlineStyle}>
                  Lihat Detail Pesanan
                </Link>
              </td>
            </tr>

            {/* ROW 2 */}
            <tr style={{ borderBottom: '1px solid #fdf2f8' }}>
              <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#6b21a8' }}>PB-024</td>
              <td style={{ padding: '12px 14px', color: '#333333' }}>24 Okt 2026</td>
              <td style={{ padding: '12px 14px', color: '#333333' }}>Gula pasir</td>
              <td style={{ padding: '12px 14px', color: '#333333' }}>25 kg</td>
              <td style={{ padding: '12px 14px' }}>
                <span style={{ backgroundColor: '#fdf2f8', color: '#9d174d', padding: '4px 10px', borderRadius: '8px', fontSize: '11px' }}>
                  Diproses
                </span>
              </td>
              <td style={{ padding: '12px 14px' }}>
                <Link href="/supplier/pesanan/PB-024" style={btnOutlineStyle}>
                  Lihat Detail Pesanan
                </Link>
              </td>
            </tr>

            {/* ROW 3 */}
            <tr>
              <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#6b21a8' }}>PB-023</td>
              <td style={{ padding: '12px 14px', color: '#333333' }}>24 Okt 2026</td>
              <td style={{ padding: '12px 14px', color: '#333333' }}>Margarin</td>
              <td style={{ padding: '12px 14px', color: '#333333' }}>20 kg</td>
              <td style={{ padding: '12px 14px' }}>
                <span style={{ backgroundColor: '#fdf2f8', color: '#9d174d', padding: '4px 10px', borderRadius: '8px', fontSize: '11px' }}>
                  Dikirim
                </span>
              </td>
              <td style={{ padding: '12px 14px' }}>
                <Link href="/supplier/pesanan/PB-023" style={btnOutlineStyle}>
                  Lihat Detail Pesanan
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DUA KARTU BOTTOM: KETERSEDIAAN BAHAN BAKU & INFORMASI PENGIRIMAN */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'stretch' }}>
        
        {/* KARTU KIRI: KETERSEDIAAN BAHAN BAKU */}
        <div style={cardBottomStyle}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: '0 0 16px 0', fontWeight: 'bold' }}>
            Ketersediaan Bahan Baku
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div style={rowKetersediaanStyle}>
              <span style={{ color: '#333333', fontSize: '12px', fontWeight: '500' }}>Tepung terigu</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: '#555555', fontSize: '12px' }}>150 kg</span>
                <span style={badgeTersediaStyle}>Tersedia</span>
              </div>
            </div>

            <div style={rowKetersediaanStyle}>
              <span style={{ color: '#333333', fontSize: '12px', fontWeight: '500' }}>Gula pasir</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: '#555555', fontSize: '12px' }}>100 kg</span>
                <span style={badgeTersediaStyle}>Tersedia</span>
              </div>
            </div>

            <div style={rowKetersediaanStyle}>
              <span style={{ color: '#333333', fontSize: '12px', fontWeight: '500' }}>Margarin</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: '#555555', fontSize: '12px' }}>60 kg</span>
                <span style={badgeTersediaStyle}>Tersedia</span>
              </div>
            </div>
          </div>

          <Link href="/supplier/ketersediaan" style={btnOutlineStyle}>
            Perbarui Ketersediaan
          </Link>
        </div>

        {/* KARTU KANAN: INFORMASI PENGIRIMAN */}
        <div style={{ ...cardBottomStyle, justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
                Informasi Pengiriman
              </h3>
              <span style={{ backgroundColor: '#fdf2f8', color: '#9d174d', padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '500' }}>
                Dikirim
              </span>
            </div>

            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333333', marginBottom: '6px' }}>
              PB-023 • Margarin, 20 kg
            </div>

            <div style={{ fontSize: '11px', color: '#555555', marginBottom: '4px' }}>
              Tujuan: DFO Donat
            </div>

            <div style={{ fontSize: '11px', color: '#555555', marginBottom: '10px' }}>
              Dikitim 25 Okt • Estimasi tiba 26 Okt 2026
            </div>

            <div style={{ fontSize: '10px', color: '#888888', lineHeight: 1.4, marginBottom: '16px' }}>
              PB-024 sedang diproses. Lengkapi detail pengiriman sebelum bahan baku dikirim.
            </div>
          </div>

          <div>
            <Link href="/supplier/pengiriman" style={btnSolidStyle}>
              Menginput Detail Pengiriman
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

/* STYLES HELPER */
const cardStatStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const iconBadgeStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  backgroundColor: '#ffffff',
  border: '1px solid #f3e8ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const cardBottomStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px 24px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  display: 'flex',
  flexDirection: 'column',
};

const rowKetersediaanStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const badgeTersediaStyle: React.CSSProperties = {
  backgroundColor: '#fdf2f8',
  color: '#9d174d',
  padding: '2px 10px',
  borderRadius: '12px',
  fontSize: '11px',
};

const btnOutlineStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '6px 16px',
  border: '1px solid #6b21a8',
  borderRadius: '8px',
  color: '#6b21a8',
  backgroundColor: '#ffffff',
  fontSize: '11px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
};

const btnSolidStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '8px 16px',
  backgroundColor: '#b0525e',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '11px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
};