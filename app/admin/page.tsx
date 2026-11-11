'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* RINGKASAN DASHBOARD ADMIN BANNER */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px 24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: '0 0 6px 0', fontWeight: 'bold' }}>
          Ringkasan Dashboard Admin
        </h3>
        <p style={{ margin: 0, fontSize: '12px', color: '#777777' }}>
          Area utama untuk memantau operasional, pengguna, produksi, dan laporan bisnis.
        </p>
      </div>

      {/* SNAPSHOT DATA SUMMARY GRID (3 KOLOM X 4 BARIS) */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ fontSize: '11px', color: '#888888', marginBottom: '16px' }}>
          Snapshot dari data tersimpan pada 24 Oktober 2026 dan periode 1-24 Oktober 2026.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          
          {/* CARD 1: DATA PESANAN */}
          <div style={cardBoxStyle}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Data Pesanan</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>4 pesanan</div>
            <div style={{ fontSize: '11px', color: '#555555' }}>Total Rp4.980.000 • 520 unit • 2 siap dikirim</div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>Pengiriman berikutnya: Toko Sari 200 Donat Cokelat pukul 14.00</div>
          </div>

          {/* CARD 2: DATA PRODUK */}
          <div style={cardBoxStyle}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Data Produk</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>4 produk aktif</div>
            <div style={{ fontSize: '11px', color: '#555555' }}>Stok siap jual 165 unit • Semua produk terhubung resep</div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>Donat Cokelat, Donat Keju, Donat Gula, Donat Stroberi</div>
          </div>

          {/* CARD 3: DATA BAHAN BAKU */}
          <div style={cardBoxStyle}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Data Bahan Baku</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>8 jenis bahan</div>
            <div style={{ fontSize: '11px', color: '#555555' }}>Persediaan Rp6.840.000 • 2 bahan di bawah minimum</div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>Mentega 8 kg dan Cokelat Batang 6 kg perlu perhatian</div>
          </div>

          {/* CARD 4: RESEP */}
          <div style={cardBoxStyle}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Resep</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>4 resep aktif</div>
            <div style={{ fontSize: '11px', color: '#555555' }}>Contoh: Donat Cokelat RSP-001 versi 1.2</div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>100 pcs/adonan • 120 menit • Rp2.680/pcs</div>
          </div>

          {/* CARD 5: DATA SUPPLIER */}
          <div style={cardBoxStyle}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Data Supplier</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>4 supplier aktif</div>
            <div style={{ fontSize: '11px', color: '#555555' }}>3 pesanan berjalan • 2 dikirim • 1 dikonfirmasi</div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>Rata-rata pengiriman 2 hari • Estimasi PT Prima Dairy 25 Okt</div>
          </div>

          {/* CARD 6: PEMESANAN BAHAN BAKU */}
          <Link 
            href="/admin/pemesanan-bahan-baku"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div style={{ ...cardBoxStyle, cursor: 'pointer', border: '1px solid #d8b4fe', transition: 'all 0.2s ease' }}>
              <div style={{ fontSize: '11px', color: '#777777' }}>Pemesanan Bahan Baku</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>12 pesanan</div>
              <div style={{ fontSize: '11px', color: '#555555' }}>Nilai Rp18.450.000 • 9 diterima • 3 belum diterima</div>
              <div style={{ fontSize: '10px', color: '#6b21a8', marginTop: '6px', fontWeight: 'bold' }}>
                Prioritas: mentega dan cokelat &rarr;
              </div>
            </div>
          </Link>

          {/* CARD 7: KAPASITAS PRODUKSI */}
          <div style={cardBoxStyle}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Kapasitas Produksi</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>800 unit/hari</div>
            <div style={{ fontSize: '11px', color: '#555555' }}>Rencana 620 unit • Sisa 180 unit (22.5%)</div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>4 batch: 2 selesai, 1 berjalan, 1 terjadwal</div>
          </div>

          {/* CARD 8: HASIL PRODUKSI (TERKONEKSI KE /admin/hasil-produksi) */}
          <Link 
            href="/admin/hasil-produksi"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div style={{ ...cardBoxStyle, cursor: 'pointer', border: '1px solid #d8b4fe', transition: 'all 0.2s ease' }}>
              <div style={{ fontSize: '11px', color: '#777777' }}>Hasil Produksi</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>400 pcs hari ini</div>
              <div style={{ fontSize: '11px', color: '#555555' }}>394 lolos • 6 ditolak • Mutu 98,5%</div>
              <div style={{ fontSize: '10px', color: '#6b21a8', marginTop: '6px', fontWeight: 'bold' }}>
                2 batch selesai dari rencana produksi &rarr;
              </div>
            </div>
          </Link>

          {/* CARD 9: MANAJEMEN PENGGUNA */}
          <div style={cardBoxStyle}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Manajemen Pengguna</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>6 akun</div>
            <div style={{ fontSize: '11px', color: '#555555' }}>5 aktif • 1 nonaktif • 4 peran tersedia</div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>4 aktif hari ini • Peran: Admin, Produksi, Gudang, Pemilik</div>
          </div>

          {/* CARD 10: LAPORAN */}
          <div style={cardBoxStyle}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Laporan</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>1-24 Okt 2026</div>
            <div style={{ fontSize: '11px', color: '#555555' }}>Penjualan Rp42.600.000 • 36 pesanan</div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>3 dokumen tersedia: Penjualan, Persediaan & Pembelian, Produksi & Mutu</div>
          </div>

          {/* CARD 11: RINGKASAN BULANAN */}
          <div style={cardBoxStyle}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Ringkasan Bulanan</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>5.620 unit</div>
            <div style={{ fontSize: '11px', color: '#555555' }}>Pembelian bahan Rp18.450.000 • 12 pesanan</div>
            <div style={{ fontSize: '10px', color: '#888888', marginTop: '6px' }}>24 batch • Mutu 98.5% • Periode 1-24 Oktober 2026</div>
          </div>

          {/* CARD 12: TINDAK LANJUT */}
          <div style={cardBoxStyle}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Tindak Lanjut</div>
            <div style={{ fontSize: '11px', color: '#555555', marginTop: '6px', lineHeight: 1.5 }}>
              • 2 bahan baku perlu restock (mentega & cokelat)<br />
              • 3 pembelian belum diterima<br />
              • 2 pesanan siap kirim<br />
              • 6 unit ditolak produksi
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

const cardBoxStyle: React.CSSProperties = {
  backgroundColor: '#f3e8ff',
  borderRadius: '12px',
  padding: '16px',
};