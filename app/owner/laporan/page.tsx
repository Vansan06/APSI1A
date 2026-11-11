'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Download, CheckCircle } from 'lucide-react';

const LAPORAN_HARIAN_PRODUK = [
  { nama: 'Donat Cokelat', produksi: 250, terjual: 240, sisa: 10, penjualan: 'Rp1.920.000', biaya: 'Rp768.000', gambar: '/donat-cokelat.png' },
  { nama: 'Donat Keju', produksi: 190, terjual: 180, sisa: 10, penjualan: 'Rp1.440.000', biaya: 'Rp558.000', gambar: '/donat-keju.png' },
  { nama: 'Donat Gula', produksi: 160, terjual: 150, sisa: 10, penjualan: 'Rp900.000', biaya: 'Rp360.000', gambar: '/donat-gula.png' },
  { nama: 'Donat Stroberi', produksi: 125, terjual: 120, sisa: 5, penjualan: 'Rp1.080.000', biaya: 'Rp420.000', gambar: '/donat-stroberi.png' },
];

export default function LaporanHarianOwnerPage() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleUnduhPDF = () => {
    setDownloadSuccess(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header Bar Navigation & Download Button */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/owner/laporan" style={{ padding: '8px 20px', backgroundColor: '#a02e59', color: '#ffffff', borderRadius: '20px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
            Laporan Harian
          </Link>
          <Link href="/owner/laporan/bulanan" style={{ padding: '8px 20px', border: '1px solid #a02e59', color: '#a02e59', borderRadius: '20px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
            Laporan Bulanan
          </Link>
        </div>

        <button 
          onClick={handleUnduhPDF}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#a02e59', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          <Download size={16} /> Unduh PDF
        </button>
      </div>

      {/* Grid Stat Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>Pesanan hari ini</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#a02e59' }}>124</div>
          <div style={{ fontSize: '10px', color: '#888' }}>84 selesai • 40 masih berjalan</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>Donat diproduksi</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#a02e59' }}>725</div>
          <div style={{ fontSize: '10px', color: '#888' }}>690 terjual • 35 tersedia</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>Nilai penjualan</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>Rp5.340.000</div>
          <div style={{ fontSize: '10px', color: '#888' }}>Nilai seluruh pesanan hari ini</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>Biaya bahan</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>Rp2.106.000</div>
          <div style={{ fontSize: '10px', color: '#888' }}>Berdasarkan resep produksi</div>
        </div>
      </div>

      {/* Tabel Rincian Produksi & Penjualan Harian */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h4 style={{ color: '#a02e59', margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>Rincian produksi dan penjualan</h4>
        <p style={{ fontSize: '11px', color: '#777', margin: '0 0 16px 0' }}>Jumlah dalam buah • Penjualan belum dikurangi biaya operasional</p>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fbebf0', color: '#702643', textAlign: 'left' }}>
              <th style={{ padding: '10px 16px', borderRadius: '6px 0 0 6px' }}>Produk</th>
              <th style={{ padding: '10px 16px' }}>Diproduksi</th>
              <th style={{ padding: '10px 16px' }}>Terjual</th>
              <th style={{ padding: '10px 16px' }}>Sisa</th>
              <th style={{ padding: '10px 16px' }}>Penjualan</th>
              <th style={{ padding: '10px 16px', borderRadius: '0 6px 6px 0' }}>Biaya bahan</th>
            </tr>
          </thead>
          <tbody>
            {LAPORAN_HARIAN_PRODUK.map((item) => (
              <tr key={item.nama} style={{ borderBottom: '1px solid #fafafa' }}>
                <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#a02e59' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Image 
                      src={item.gambar} 
                      alt={item.nama} 
                      width={24} 
                      height={24} 
                      style={{ borderRadius: '4px', objectFit: 'cover' }} 
                    />
                    {item.nama}
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>{item.produksi}</td>
                <td style={{ padding: '12px 16px' }}>{item.terjual}</td>
                <td style={{ padding: '12px 16px' }}>{item.sisa}</td>
                <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{item.penjualan}</td>
                <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#a02e59' }}>{item.biaya}</td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#fff5f7', fontWeight: 'bold' }}>
              <td style={{ padding: '12px 16px' }}>Total</td>
              <td style={{ padding: '12px 16px' }}>725</td>
              <td style={{ padding: '12px 16px' }}>690</td>
              <td style={{ padding: '12px 16px' }}>35</td>
              <td style={{ padding: '12px 16px', color: '#a02e59' }}>Rp5.340.000</td>
              <td style={{ padding: '12px 16px', color: '#a02e59' }}>Rp2.106.000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Row 2: Pemakaian Bahan Utama & Evaluasi Owner */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ color: '#a02e59', margin: '0 0 12px 0', fontWeight: 'bold' }}>Pemakaian bahan utama</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fbebf0', color: '#702643', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px' }}>Bahan</th>
                <th style={{ padding: '8px 12px' }}>Pemakaian</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '8px 12px' }}>Tepung terigu</td><td style={{ padding: '8px 12px', fontWeight: 'bold' }}>20 kg</td></tr>
              <tr><td style={{ padding: '8px 12px' }}>Gula pasir</td><td style={{ padding: '8px 12px', fontWeight: 'bold' }}>3 kg</td></tr>
              <tr><td style={{ padding: '8px 12px' }}>Cokelat batang</td><td style={{ padding: '8px 12px', fontWeight: 'bold' }}>2 kg</td></tr>
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ color: '#a02e59', margin: '0 0 12px 0', fontWeight: 'bold' }}>Evaluasi owner</h4>
          <div style={{ fontSize: '12px', color: '#555', lineHeight: 1.6 }}>
            <div>Donat Cokelat terlaris: 240 buah (34,8%).</div>
            <div>18 pesanan menunggu pengemasan.</div>
            <div>6 bahan perlu restock dalam 3 hari.</div>
            <div style={{ marginTop: '8px', fontWeight: 'bold', color: '#a02e59', fontSize: '14px' }}>
              Selisih penjualan & bahan: Rp3.234.000
            </div>
          </div>
        </div>

      </div>

      {/* Toast Alert Berhasil Diunduh */}
      {downloadSuccess && (
        <div style={{ backgroundColor: '#e6f4ea', border: '1px solid #b7e1cd', color: '#137333', borderRadius: '12px', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={20} />
            <div>
              <strong style={{ fontSize: '13px' }}>Laporan harian berhasil diunduh</strong>
              <div style={{ fontSize: '11px', opacity: 0.9 }}>laporan-harian-2026-10-25.pdf • Periode 25 Oktober 2026, 00.00-16.00 WIB</div>
            </div>
          </div>
          <button 
            onClick={() => setDownloadSuccess(false)}
            style={{ border: '1px solid #137333', backgroundColor: '#ffffff', color: '#137333', borderRadius: '8px', padding: '4px 12px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Tutup
          </button>
        </div>
      )}

    </div>
  );
}