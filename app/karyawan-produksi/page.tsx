'use client';

import React from 'react';
import Link from 'next/link';

export default function HomeProduksiPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px 24px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '18px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
          Ringkasan Home Page Produksi
        </h2>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '15px', color: '#b0525e', margin: '0 0 16px 0', fontWeight: 'bold' }}>
          Ringkasan Operasional
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          <Link href="/karyawan-produksi/pesanan-masuk" style={{ textDecoration: 'none' }}>
            <div style={cardStyle}>
              <div style={cardTitleStyle}>Pesanan masuk</div>
              <div style={cardBigValueStyle}>4</div>
              <div style={cardSubStyle}>1 pesanan sedang diproduksi</div>
            </div>
          </Link>

          <Link href="/karyawan-produksi/kapasitas-produksi" style={{ textDecoration: 'none' }}>
            <div style={cardStyle}>
              <div style={cardTitleStyle}>Kebutuhan produksi</div>
              <div style={cardBigValueStyle}>520 unit</div>
              <div style={cardSubStyle}>470 pcs roti/kue + 50 pak cookies</div>
            </div>
          </Link>

          <Link href="/karyawan-produksi/kapasitas-produksi" style={{ textDecoration: 'none' }}>
            <div style={cardStyle}>
              <div style={cardTitleStyle}>Kapasitas produksi</div>
              <div style={cardBigValueStyle}>800 unit</div>
              <div style={cardSubStyle}>Rencana 620 unit, sisa 180 unit</div>
            </div>
          </Link>

          <Link href="/karyawan-produksi/resep" style={{ textDecoration: 'none' }}>
            <div style={cardStyle}>
              <div style={cardTitleStyle}>Resep aktif</div>
              <div style={cardBigValueStyle}>4</div>
              <div style={cardSubStyle}>Donat Cokelat, Donat Keju, Brownies & Cookies</div>
            </div>
          </Link>

          <Link href="/karyawan-produksi/bahan-baku" style={{ textDecoration: 'none' }}>
            <div style={cardStyle}>
              <div style={cardTitleStyle}>Bahan baku aktif</div>
              <div style={cardBigValueStyle}>8</div>
              <div style={cardSubStyle}>2 item stok rendah: Mentega & Cokelat Batang</div>
            </div>
          </Link>

          <Link href="/karyawan-produksi/riwayat-produksi" style={{ textDecoration: 'none' }}>
            <div style={cardStyle}>
              <div style={cardTitleStyle}>Hasil produksi hari ini</div>
              <div style={cardBigValueStyle}>400 pcs</div>
              <div style={cardSubStyle}>2 kelompok selesai, 98.5% lolos</div>
            </div>
          </Link>

          <Link href="/karyawan-produksi/pesanan-masuk" style={{ textDecoration: 'none' }}>
            <div style={cardStyle}>
              <div style={cardTitleStyle}>Jadwal berjalan</div>
              <div style={cardBigValueStyle}>1</div>
              <div style={cardSubStyle}>Donat Keju 12.30–14.30, target 170 pcs</div>
            </div>
          </Link>

          <Link href="/karyawan-produksi/input-hasil" style={{ textDecoration: 'none' }}>
            <div style={cardStyle}>
              <div style={cardTitleStyle}>Prioritas hari ini</div>
              <div style={cardBigValueStyle}>3</div>
              <div style={cardSubStyle}>Selesaikan Donat Keju, catat hasil, laporkan stok</div>
            </div>
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={panelStyle}>
          <h4 style={panelTitleStyle}>Pesanan & Kapasitas Produksi</h4>
          <div style={rowStyle}><span>Pesanan masuk</span><strong>4</strong></div>
          <div style={rowStyle}><span>Pesanan sedang diproduksi</span><strong>1</strong></div>
          <div style={rowStyle}><span>Kebutuhan produksi</span><strong>520 unit</strong></div>
          <div style={rowStyle}><span>Kapasitas produksi</span><strong>800 unit</strong></div>
          <div style={rowStyle}><span>Sisa kapasitas</span><strong>180 unit</strong></div>
          <div style={noteStyle}>
            <strong>Catatan</strong><br />
            1 pesanan sedang diproduksi. Kapasitas produksi masih tersisa 180 unit untuk menampung tambahan pesanan atau stok.
          </div>
        </div>

        <div style={panelStyle}>
          <h4 style={panelTitleStyle}>Resep & Bahan Baku</h4>
          <div style={rowStyle}><span>Resep aktif</span><strong>4</strong></div>
          <div style={rowStyle}><span>Bahan baku aktif</span><strong>8</strong></div>
          <div style={rowStyle}><span>Bahan baku stok rendah</span><strong>2 item</strong></div>
          <div style={rowStyle}><span>Bahan baku kritis</span><strong style={{ color: '#b0525e' }}>Mentega & Cokelat Batang</strong></div>
          <div style={noteStyle}>
            <strong>Catatan</strong><br />
            2 bahan baku perlu restock: Mentega 8 kg (minimum 15 kg) dan Cokelat Batang 6 kg (minimum 10 kg). Stok masih cukup untuk jadwal hari ini.
          </div>
        </div>

        <div style={panelStyle}>
          <h4 style={panelTitleStyle}>Hasil Produksi</h4>
          <div style={rowStyle}><span>Hasil produksi hari ini</span><strong>400 pcs</strong></div>
          <div style={rowStyle}><span>Kelompok produksi selesai</span><strong>2</strong></div>
          <div style={rowStyle}><span>Total lolos</span><strong>394 pcs</strong></div>
          <div style={rowStyle}><span>Total ditolak</span><strong>6 pcs</strong></div>
          <div style={rowStyle}><span>Persentase lolos</span><strong style={{ color: '#2e7d32' }}>98,5%</strong></div>
          <div style={noteStyle}>
            <strong>Catatan</strong><br />
            2 kelompok produksi selesai: Donat Cokelat 250 pcs / 246 lolos / 4 ditolak dan Donat Gula 150 pcs / 148 lolos / 2 ditolak.
          </div>
        </div>

        <div style={panelStyle}>
          <h4 style={panelTitleStyle}>Riwayat Produksi</h4>
          <div style={rowStyle}><span>Jadwal berjalan</span><strong>1</strong></div>
          <div style={rowStyle}><span>Jadwal terjadwal</span><strong>1</strong></div>
          <div style={rowStyle}><span>Pengguna aktif</span><strong>Siti Rahmah</strong></div>
          <div style={rowStyle}><span>Jadwal berjalan</span><strong>Donat Keju 12.30–14.30</strong></div>
          <div style={rowStyle}><span>Jadwal terjadwal</span><strong>Cookies 14.30–16.00</strong></div>
          <div style={noteStyle}>
            <strong>Catatan</strong><br />
            Jadwal berjalan: Donat Keju 12.30–14.30, target 170 pcs. Jadwal terjadwal: Cookies 14.30–16.00, target 50 pak.
          </div>
        </div>
      </div>

    </div>
  );
}

const cardStyle: React.CSSProperties = { backgroundColor: '#fdf0ee', border: '1px solid #f9d8d4', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' };
const cardTitleStyle: React.CSSProperties = { fontSize: '11px', color: '#777777' };
const cardBigValueStyle: React.CSSProperties = { fontSize: '20px', fontWeight: 'bold', color: '#b0525e', margin: '4px 0 2px 0' };
const cardSubStyle: React.CSSProperties = { fontSize: '10px', color: '#666666', lineHeight: 1.3 };
const panelStyle: React.CSSProperties = { backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '10px' };
const panelTitleStyle: React.CSSProperties = { fontSize: '15px', color: '#b0525e', margin: '0 0 4px 0', fontWeight: 'bold' };
const rowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#444444', padding: '4px 0', borderBottom: '1px dashed #f0f0f0' };
const noteStyle: React.CSSProperties = { backgroundColor: '#fdf0ee', borderRadius: '8px', padding: '10px 12px', fontSize: '11px', color: '#555555', marginTop: '8px', lineHeight: 1.4 };