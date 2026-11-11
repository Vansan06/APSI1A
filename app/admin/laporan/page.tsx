'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface DokumenLaporan {
  id: string;
  jenis: string;
  periode: string;
  diperbarui: string;
  format: string;
}

const DOKUMEN_LIST: DokumenLaporan[] = [
  {
    id: '1',
    jenis: 'Laporan Penjualan',
    periode: '01–24 Okt 2026',
    diperbarui: '24 Okt • 13.00 WIB',
    format: 'PDF / XLS',
  },
  {
    id: '2',
    jenis: 'Laporan Persediaan & Pembelian',
    periode: '01–24 Okt 2026',
    diperbarui: '24 Okt • 13.00 WIB',
    format: 'PDF / XLS',
  },
  {
    id: '3',
    jenis: 'Laporan Produksi & Mutu',
    periode: '01–24 Okt 2026',
    diperbarui: '24 Okt • 13.00 WIB',
    format: 'PDF / XLS',
  },
];

export default function AdminLaporanPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER UTAMA */}
      <div>
        <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: '0 0 4px 0', fontWeight: 'bold' }}>
          Laporan
        </h2>
        <div style={{ fontSize: '12px', color: '#777777' }}>
          Ringkasan kinerja operasional &bull; Periode 1–24 Oktober 2026.
        </div>
      </div>

      {/* BANNER 2 OPSI PEMBUATAN LAPORAN */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '20px', alignItems: 'center' }}>
          
          <div>
            <h3 style={{ fontSize: '16px', color: '#333333', margin: '0 0 6px 0', fontWeight: 'bold' }}>
              Pembuatan laporan
            </h3>
            <p style={{ fontSize: '12px', color: '#666666', margin: 0, lineHeight: 1.5 }}>
              Pilih jenis laporan yang ingin dibuat, lihat periode, dan unduh dokumen hasilnya.
            </p>
          </div>

          {/* CARD 1: BUAT LAPORAN HARIAN */}
          <div style={{ border: '1px solid #f3e8ff', borderRadius: '12px', padding: '16px', backgroundColor: '#faf5ff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333333' }}>Buat Laporan Harian</div>
                <div style={{ fontSize: '11px', color: '#777777', marginTop: '2px' }}>Periode: pilih tanggal laporan</div>
              </div>
              <div style={iconBadgeStyle}>
                <TrendingUp size={16} color="#6b21a8" />
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#666666', marginBottom: '14px', lineHeight: 1.4 }}>
              Ringkasan penjualan, pembelian, produksi, dan mutu untuk tanggal yang dipilih.
            </div>
            <Link
              href="/admin/laporan/harian"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                backgroundColor: '#6b21a8',
                color: '#ffffff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: 'bold',
              }}
            >
              <Download size={14} />
              <span>Buat Laporan Harian</span>
            </Link>
          </div>

          {/* CARD 2: BUAT LAPORAN BULANAN */}
          <div style={{ border: '1px solid #f3e8ff', borderRadius: '12px', padding: '16px', backgroundColor: '#faf5ff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333333' }}>Buat Laporan Bulanan</div>
                <div style={{ fontSize: '11px', color: '#777777', marginTop: '2px' }}>Periode: 1–24 Oktober 2026</div>
              </div>
              <div style={iconBadgeStyle}>
                <TrendingUp size={16} color="#6b21a8" />
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#666666', marginBottom: '14px', lineHeight: 1.4 }}>
              Ringkasan kinerja operasional untuk periode bulan ini, siap diunduh sebagai PDF/XLS.
            </div>
            <Link
              href="/admin/laporan/bulanan"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                backgroundColor: '#6b21a8',
                color: '#ffffff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: 'bold',
              }}
            >
              <Download size={14} />
              <span>Buat Laporan Bulanan</span>
            </Link>
          </div>

        </div>
      </div>

      {/* 3 KARTU RINGKASAN CAPAIAN */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        
        {/* PENJUALAN */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Penjualan</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333333', margin: '4px 0' }}>
              Rp42.600.000
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>36 pesanan &bull; +12,4% vs periode lalu</div>
          </div>
          <div style={iconBadgeStyle}>
            <TrendingUp size={20} color="#6b21a8" />
          </div>
        </div>

        {/* PEMBELIAN BAHAN */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Pembelian bahan</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333333', margin: '4px 0' }}>
              Rp18.450.000
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>12 pesanan pembelian</div>
          </div>
          <div style={iconBadgeStyle}>
            <ShoppingCart size={20} color="#6b21a8" />
          </div>
        </div>

        {/* HASIL LOLOS MUTU */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Hasil lolos mutu</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333333', margin: '4px 0' }}>
              5.620 unit
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>24 batch &bull; Tingkat mutu 98.5%</div>
          </div>
          <div style={iconBadgeStyle}>
            <Package size={20} color="#6b21a8" />
          </div>
        </div>

      </div>

      {/* GRID GRAFIK PENJUALAN PER MINGGU & PRODUK TERLARIS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '20px' }}>
        
        {/* GRAFIK PENJUALAN PER MINGGU */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '15px', color: '#333333', margin: '0 0 4px 0', fontWeight: 'bold' }}>
            Penjualan per minggu
          </h3>
          <div style={{ fontSize: '10px', color: '#888888', marginBottom: '24px' }}>15 jt</div>

          {/* SIMULASI BAR CHART */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '140px', paddingBottom: '8px', borderBottom: '1px solid #e2e8f0' }}>
            {/* MINGGU 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#6b21a8' }}>8,4 jt</span>
              <div style={{ width: '40px', height: '65px', backgroundColor: '#d8b4fe', borderRadius: '6px 6px 0 0' }} />
              <span style={{ fontSize: '10px', color: '#666' }}>01–07 Okt</span>
            </div>
            {/* MINGGU 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#6b21a8' }}>10,2 jt</span>
              <div style={{ width: '40px', height: '80px', backgroundColor: '#c084fc', borderRadius: '6px 6px 0 0' }} />
              <span style={{ fontSize: '10px', color: '#666' }}>08–14 Okt</span>
            </div>
            {/* MINGGU 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#6b21a8' }}>11,8 jt</span>
              <div style={{ width: '40px', height: '95px', backgroundColor: '#a855f7', borderRadius: '6px 6px 0 0' }} />
              <span style={{ fontSize: '10px', color: '#666' }}>15–21 Okt</span>
            </div>
            {/* MINGGU 4 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#6b21a8' }}>12,2 jt</span>
              <div style={{ width: '40px', height: '100px', backgroundColor: '#6b21a8', borderRadius: '6px 6px 0 0' }} />
              <span style={{ fontSize: '10px', color: '#666' }}>22–24 Okt</span>
            </div>
          </div>
          <div style={{ fontSize: '10px', color: '#888888', marginTop: '10px' }}>
            Dalam rupiah &bull; Minggu terakhir berjalan hingga 24 Oktober 2026
          </div>
        </div>

        {/* PRODUK TERLARIS */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '15px', color: '#333333', margin: '0 0 16px 0', fontWeight: 'bold' }}>
            Produk terlaris
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* DONAT COKELAT */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/donat-cokelat.png" alt="Donat Cokelat" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>Donat Cokelat</div>
                  <div style={{ fontSize: '10px', color: '#777' }}>2.100 pcs</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b21a8' }}>Rp16.800.000</div>
            </div>

            {/* DONAT KEJU */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/donat-keju.png" alt="Donat Keju" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>Donat Keju</div>
                  <div style={{ fontSize: '10px', color: '#777' }}>1.400 pcs</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b21a8' }}>Rp12.600.000</div>
            </div>

            {/* DONAT GULA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/donat-gula.png" alt="Donat Gula" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>Donat Gula</div>
                  <div style={{ fontSize: '10px', color: '#777' }}>900 pcs</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b21a8' }}>Rp10.800.000</div>
            </div>

            {/* DONAT STROBERI */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/donat-stroberi.png" alt="Donat Stroberi" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>Donat Stroberi</div>
                  <div style={{ fontSize: '10px', color: '#777' }}>300 pcs</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b21a8' }}>Rp2.400.000</div>
            </div>

          </div>
        </div>

      </div>

      {/* TABEL DOKUMEN LAPORAN */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Dokumen laporan
          </h3>
          <span style={{ fontSize: '11px', color: '#888' }}>3 data</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
              <th style={{ padding: '10px 12px', borderRadius: '6px 0 0 6px' }}>Jenis laporan</th>
              <th style={{ padding: '10px 12px' }}>Periode</th>
              <th style={{ padding: '10px 12px' }}>Diperbarui</th>
              <th style={{ padding: '10px 12px' }}>Format</th>
              <th style={{ padding: '10px 12px', borderRadius: '0 6px 6px 0', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {DOKUMEN_LIST.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #fdf2f8' }}>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#333' }}>{item.jenis}</td>
                <td style={{ padding: '12px', color: '#333' }}>{item.periode}</td>
                <td style={{ padding: '12px', color: '#333' }}>{item.diperbarui}</td>
                <td style={{ padding: '12px', color: '#333' }}>{item.format}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <button
                    onClick={() => alert(`Mengunduh ${item.jenis}...`)}
                    style={{ background: 'none', border: 'none', color: '#6b21a8', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Unduh
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION FOOTER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '11px', color: '#888888' }}>
          <div>Menampilkan 1–3 dari 3 data</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button disabled style={{ border: 'none', background: 'none', cursor: 'not-allowed', color: '#ccc' }}>
              <ChevronLeft size={16} />
            </button>
            <span style={{ backgroundColor: '#6b21a8', color: '#ffffff', width: '22px', height: '22px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              1
            </span>
            <button disabled style={{ border: 'none', background: 'none', cursor: 'not-allowed', color: '#ccc' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

const statCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const iconBadgeStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  backgroundColor: '#f3e8ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};