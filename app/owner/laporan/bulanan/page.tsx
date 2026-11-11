'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Download, CheckCircle } from 'lucide-react';

export default function LaporanBulananOwnerPage() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header Bar Navigation & Download Button */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/owner/laporan" style={{ padding: '8px 20px', border: '1px solid #a02e59', color: '#a02e59', borderRadius: '20px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
            Laporan Harian
          </Link>
          <Link href="/owner/laporan/bulanan" style={{ padding: '8px 20px', backgroundColor: '#a02e59', color: '#ffffff', borderRadius: '20px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
            Laporan Bulanan
          </Link>
        </div>

        <button 
          onClick={() => setDownloadSuccess(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#a02e59', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          <Download size={16} /> Unduh PDF
        </button>
      </div>

      {/* Grid Metrics Bulanan */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>Total pesanan</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#a02e59' }}>3.240</div>
          <div style={{ fontSize: '10px', color: '#888' }}>Seluruh pesanan selesai</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>Donat terjual</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#a02e59' }}>24.960</div>
          <div style={{ fontSize: '10px', color: '#888' }}>Dari 26.000 buah diproduksi</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>Nilai penjualan</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>Rp199,68 jt</div>
          <div style={{ fontSize: '10px', color: '#888' }}>Naik 8% dari Agustus 2026</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>Biaya bahan</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>Rp79,87 jt</div>
          <div style={{ fontSize: '10px', color: '#888' }}>40% dari nilai penjualan</div>
        </div>
      </div>

      {/* Visual Chart & Kinerja */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px' }}>
        
        {/* Visual Bar Chart Penjualan Per Periode */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ color: '#a02e59', margin: '0 0 4px 0', fontWeight: 'bold' }}>Penjualan per periode</h4>
          <p style={{ fontSize: '11px', color: '#777', margin: '0 0 20px 0' }}>Dalam juta Rupiah • Periode terakhir mencakup 9 hari</p>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '140px', borderBottom: '2px solid #f0d5de', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#a02e59' }}>44.80</span>
              <div style={{ width: '45px', height: '80px', backgroundColor: '#a02e59', borderRadius: '4px 4px 0 0' }}></div>
              <span style={{ fontSize: '10px', color: '#777' }}>1–7 Sep</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#a02e59' }}>45.92</span>
              <div style={{ width: '45px', height: '85px', backgroundColor: '#a02e59', borderRadius: '4px 4px 0 0' }}></div>
              <span style={{ fontSize: '10px', color: '#777' }}>8–14 Sep</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#a02e59' }}>47.04</span>
              <div style={{ width: '45px', height: '90px', backgroundColor: '#a02e59', borderRadius: '4px 4px 0 0' }}></div>
              <span style={{ fontSize: '10px', color: '#777' }}>15–21 Sep</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#a02e59' }}>61.92</span>
              <div style={{ width: '45px', height: '115px', backgroundColor: '#a02e59', borderRadius: '4px 4px 0 0' }}></div>
              <span style={{ fontSize: '10px', color: '#777' }}>22–30 Sep</span>
            </div>
          </div>
        </div>

        {/* Kinerja Bulan Ini */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ color: '#a02e59', margin: '0 0 12px 0', fontWeight: 'bold' }}>Kinerja bulan ini</h4>
          <div style={{ fontSize: '12px', color: '#555', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>Pembanding: Agustus 2026</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Pertumbuhan penjualan</span>
              <span style={{ backgroundColor: '#fbebf0', color: '#a02e59', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', fontSize: '11px' }}>+8,0%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <span>Produk terlaris</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', color: '#a02e59' }}>
                <Image 
                  src="/donat-cokelat.png" 
                  alt="Donat Cokelat" 
                  width={20} 
                  height={20} 
                  style={{ borderRadius: '4px', objectFit: 'cover' }} 
                />
                Donat Cokelat
              </div>
            </div>
            <div style={{ fontSize: '10px', color: '#777' }}>6.240 buah • 25% dari total terjual</div>
            <div>Tingkat penjualan produksi: <strong>96%</strong></div>
            <div style={{ marginTop: '4px', fontWeight: 'bold', color: '#a02e59' }}>
              Selisih penjualan & bahan: Rp119.808.000
            </div>
          </div>
        </div>

      </div>

      {/* Tabel Rekap Produksi & Biaya Bulanan */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h4 style={{ color: '#a02e59', margin: '0 0 16px 0', fontWeight: 'bold' }}>Rekap produksi dan biaya</h4>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fbebf0', color: '#702643', textAlign: 'left' }}>
              <th style={{ padding: '10px 16px', borderRadius: '6px 0 0 6px' }}>Periode</th>
              <th style={{ padding: '10px 16px' }}>Pesanan</th>
              <th style={{ padding: '10px 16px' }}>Produksi</th>
              <th style={{ padding: '10px 16px' }}>Terjual</th>
              <th style={{ padding: '10px 16px' }}>Penjualan</th>
              <th style={{ padding: '10px 16px' }}>Biaya bahan</th>
              <th style={{ padding: '10px 16px', borderRadius: '0 6px 6px 0' }}>Selisih</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #fafafa' }}>
              <td style={{ padding: '10px 16px' }}>1–7 September</td>
              <td style={{ padding: '10px 16px' }}>728</td>
              <td style={{ padding: '10px 16px' }}>5.830</td>
              <td style={{ padding: '10px 16px' }}>5.600</td>
              <td style={{ padding: '10px 16px' }}>44.800.000</td>
              <td style={{ padding: '10px 16px' }}>17.920.000</td>
              <td style={{ padding: '10px 16px', fontWeight: 'bold' }}>26.880.000</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #fafafa' }}>
              <td style={{ padding: '10px 16px' }}>8–14 September</td>
              <td style={{ padding: '10px 16px' }}>745</td>
              <td style={{ padding: '10px 16px' }}>5.980</td>
              <td style={{ padding: '10px 16px' }}>5.740</td>
              <td style={{ padding: '10px 16px' }}>45.920.000</td>
              <td style={{ padding: '10px 16px' }}>18.368.000</td>
              <td style={{ padding: '10px 16px', fontWeight: 'bold' }}>27.552.000</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #fafafa' }}>
              <td style={{ padding: '10px 16px' }}>15–21 September</td>
              <td style={{ padding: '10px 16px' }}>763</td>
              <td style={{ padding: '10px 16px' }}>6.130</td>
              <td style={{ padding: '10px 16px' }}>5.880</td>
              <td style={{ padding: '10px 16px' }}>47.040.000</td>
              <td style={{ padding: '10px 16px' }}>18.816.000</td>
              <td style={{ padding: '10px 16px', fontWeight: 'bold' }}>28.224.000</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #fafafa' }}>
              <td style={{ padding: '10px 16px' }}>22–30 September</td>
              <td style={{ padding: '10px 16px' }}>1.004</td>
              <td style={{ padding: '10px 16px' }}>8.060</td>
              <td style={{ padding: '10px 16px' }}>7.740</td>
              <td style={{ padding: '10px 16px' }}>61.920.000</td>
              <td style={{ padding: '10px 16px' }}>24.768.000</td>
              <td style={{ padding: '10px 16px', fontWeight: 'bold' }}>37.152.000</td>
            </tr>
            <tr style={{ backgroundColor: '#fff5f7', fontWeight: 'bold' }}>
              <td style={{ padding: '12px 16px' }}>Total September</td>
              <td style={{ padding: '12px 16px' }}>3.240</td>
              <td style={{ padding: '12px 16px' }}>26.000</td>
              <td style={{ padding: '12px 16px' }}>24.960</td>
              <td style={{ padding: '12px 16px', color: '#a02e59' }}>199.680.000</td>
              <td style={{ padding: '12px 16px', color: '#a02e59' }}>79.872.000</td>
              <td style={{ padding: '12px 16px', color: '#a02e59' }}>119.808.000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Toast Alert Berhasil Diunduh */}
      {downloadSuccess && (
        <div style={{ backgroundColor: '#e6f4ea', border: '1px solid #b7e1cd', color: '#137333', borderRadius: '12px', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={20} />
            <div>
              <strong style={{ fontSize: '13px' }}>Laporan bulanan berhasil diunduh</strong>
              <div style={{ fontSize: '11px', opacity: 0.9 }}>laporan-bulanan-2026-09.pdf • Periode 1–30 September 2026</div>
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