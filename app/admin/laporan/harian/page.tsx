'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  Download,
  Info,
  X
} from 'lucide-react';

export default function BuatLaporanHarianPage() {
  const [tanggal, setTanggal] = useState('24 Oktober 2026');
  const [formatUnduhan, setFormatUnduhan] = useState<'PDF' | 'XLSX'>('PDF');
  const [isUnduhSuccess, setIsUnduhSuccess] = useState(false);

  const handleBuatLaporan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnduhSuccess(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & BACK BUTTON */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '11px', color: '#777777' }}>
          Laporan &bull; Buat Laporan Harian
        </div>
        <Link
          href="/admin/laporan"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            backgroundColor: '#ffffff',
            color: '#6b21a8',
            border: '1px solid #d8b4fe',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Laporan</span>
        </Link>
      </div>

      <div>
        <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: '0 0 4px 0', fontWeight: 'bold' }}>
          Buat Laporan Harian
        </h2>
        <div style={{ fontSize: '12px', color: '#777777' }}>
          Pilih tanggal, cakupan, dan format. Tinjau hasil sebelum mengunduh laporan.
        </div>
      </div>

      {/* BANNER NOTIFIKASI SUKSES UNDUH (TAMPIL SAAT IS_UNDUH_SUCCESS = TRUE) */}
      {isUnduhSuccess && (
        <div style={{ backgroundColor: '#e6f4ea', border: '1px solid #ceead6', borderRadius: '16px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle2 size={24} color="#137333" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#137333' }}>
                Laporan berhasil diunduh
              </div>
              <div style={{ fontSize: '11px', color: '#137333', marginTop: '2px' }}>
                laporan-harian-2026-10-24.{formatUnduhan.toLowerCase()} &bull; Tanggal unduh: 24 Oktober 2026 &bull; Format: {formatUnduhan}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsUnduhSuccess(false)}
            style={{ padding: '6px 14px', border: '1px solid #ceead6', borderRadius: '8px', backgroundColor: '#ffffff', color: '#137333', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Tutup
          </button>
        </div>
      )}

      {/* MAIN LAYOUT 2 KOLOM */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', alignItems: 'start' }}>
        
        {/* KOLOM KIRI: FORM PENGATURAN LAPORAN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '15px', color: '#333333', margin: '0 0 16px 0', fontWeight: 'bold' }}>
              Pengaturan laporan
            </h3>
            <div style={{ fontSize: '11px', color: '#777', marginBottom: '14px' }}>Tentukan periode dan isi dokumen.</div>

            <form onSubmit={handleBuatLaporan} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Tanggal laporan *</label>
                <select 
                  value={tanggal} 
                  onChange={(e) => setTanggal(e.target.value)}
                  style={inputStyle}
                >
                  <option>24 Oktober 2026</option>
                  <option>23 Oktober 2026</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Cakupan laporan *</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#333', marginTop: '4px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked /> Penjualan
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked /> Pembelian
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked /> Produksi
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked /> Persediaan
                  </label>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Format unduhan *</label>
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setFormatUnduhan('PDF')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: formatUnduhan === 'PDF' ? '2px solid #6b21a8' : '1px solid #e2e8f0',
                      backgroundColor: formatUnduhan === 'PDF' ? '#faf5ff' : '#fff',
                      color: formatUnduhan === 'PDF' ? '#6b21a8' : '#333',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormatUnduhan('XLSX')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: formatUnduhan === 'XLSX' ? '2px solid #6b21a8' : '1px solid #e2e8f0',
                      backgroundColor: formatUnduhan === 'XLSX' ? '#faf5ff' : '#fff',
                      color: formatUnduhan === 'XLSX' ? '#6b21a8' : '#333',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    XLSX
                  </button>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  backgroundColor: '#6b21a8',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                <FileText size={16} />
                <span>Buat Laporan</span>
              </button>
            </form>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', gap: '10px' }}>
            <Info size={18} color="#6b21a8" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333' }}>Catatan kelengkapan</div>
              <div style={{ fontSize: '10px', color: '#666', marginTop: '2px', lineHeight: 1.4 }}>
                Rekap pembelian dan persediaan untuk tanggal ini belum tersedia, bukan bernilai nol.
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: PRATINJAU LAPORAN HARIAN */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', color: '#333333', margin: '0 0 2px 0', fontWeight: 'bold' }}>
                Pratinjau laporan harian
              </h3>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#6b21a8', marginTop: '4px' }}>
                24 Oktober 2026
              </div>
              <div style={{ fontSize: '10px', color: '#888' }}>Ringkasan operasional harian &bull; Seluruh cakupan</div>
            </div>
            <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold' }}>
              Sudah dibuat
            </span>
          </div>

          {/* 3 STATS IN PREVIEW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: '#faf5ff', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '10px', color: '#777' }}>Penjualan</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: '2px 0' }}>Rp4.980.000</div>
              <div style={{ fontSize: '9px', color: '#888' }}>4 pesanan</div>
            </div>
            <div style={{ backgroundColor: '#faf5ff', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '10px', color: '#777' }}>Produk dipesan</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: '2px 0' }}>520 produk</div>
              <div style={{ fontSize: '9px', color: '#888' }}>Total produk pada pesanan</div>
            </div>
            <div style={{ backgroundColor: '#faf5ff', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '10px', color: '#777' }}>Hasil lolos mutu</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: '2px 0' }}>394 pcs</div>
              <div style={{ fontSize: '9px', color: '#888' }}>Dari 400 pcs • 6 ditolak</div>
            </div>
          </div>

          {/* TABEL CAKUPAN / INDIKATOR */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '16px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
                <th style={{ padding: '8px 10px', borderRadius: '6px 0 0 6px' }}>Cakupan / indikator</th>
                <th style={{ padding: '8px 10px' }}>Ringkasan</th>
                <th style={{ padding: '8px 10px', borderRadius: '0 6px 6px 0' }}>Nilai / hasil</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #fdf2f8' }}>
                <td style={{ padding: '10px', fontWeight: '500' }}>Penjualan</td>
                <td style={{ padding: '10px', color: '#555' }}>4 pesanan</td>
                <td style={{ padding: '10px', color: '#333', fontWeight: 'bold' }}>Rp4.980.000</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #fdf2f8' }}>
                <td style={{ padding: '10px', fontWeight: '500' }}>Produk dipesan</td>
                <td style={{ padding: '10px', color: '#555' }}>Jumlah pesanan produk</td>
                <td style={{ padding: '10px', color: '#333', fontWeight: 'bold' }}>520 produk</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #fdf2f8' }}>
                <td style={{ padding: '10px', fontWeight: '500' }}>Produksi</td>
                <td style={{ padding: '10px', color: '#555' }}>400 pcs hasil total</td>
                <td style={{ padding: '10px', color: '#333', fontWeight: 'bold' }}>394 lolos • 6 ditolak</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #fdf2f8' }}>
                <td style={{ padding: '10px', fontWeight: '500' }}>Mutu</td>
                <td style={{ padding: '10px', color: '#555' }}>Tingkat kelulusan</td>
                <td style={{ padding: '10px', color: '#333', fontWeight: 'bold' }}>98,5%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #fdf2f8' }}>
                <td style={{ padding: '10px', fontWeight: '500' }}>Pembelian</td>
                <td style={{ padding: '10px', color: '#555' }}>Rekap periode</td>
                <td style={{ padding: '10px', color: '#777' }}>Belum tersedia</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #fdf2f8' }}>
                <td style={{ padding: '10px', fontWeight: '500' }}>Persediaan</td>
                <td style={{ padding: '10px', color: '#555' }}>Rekap periode</td>
                <td style={{ padding: '10px', color: '#777' }}>Belum tersedia</td>
              </tr>
            </tbody>
          </table>

          {/* DOWNLOAD ACTION BOX */}
          <div style={{ backgroundColor: '#faf5ff', border: '1px solid #f3e8ff', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333' }}>
                laporan-harian-2026-10-24.{formatUnduhan.toLowerCase()}
              </div>
              <div style={{ fontSize: '10px', color: '#777', marginTop: '2px' }}>
                {formatUnduhan} &bull; 24 Oktober 2026
              </div>
            </div>
            <button
              onClick={() => setIsUnduhSuccess(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#6b21a8',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              <Download size={14} />
              <span>Unduh Laporan</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 'bold',
  color: '#555555',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  fontSize: '12px',
  backgroundColor: '#ffffff',
  color: '#333',
  outline: 'none',
  boxSizing: 'border-box',
};