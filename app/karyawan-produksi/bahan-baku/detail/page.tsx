'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, RotateCcw, AlertTriangle } from 'lucide-react';

interface RiwayatStok {
  waktu: string;
  referensi: string;
  sebelum: string;
  perubahan: string;
  sesudah: string;
  petugas: string;
  jenisAlasan: string;
}

interface DetailBahanBaku {
  id: string;
  nama: string;
  stokTersimpan: string;
  stokMinimum: string;
  selisihMinimum: string;
  satuan: string;
  lokasi: string;
  kedaluwarsa: string;
  kondisi: 'Layak pakai' | 'Perhatian';
  stokRendah: boolean;
  stokSebelum: string;
  dipakai: string;
  stokAkhir: string;
  referensiProduksi: string;
  petugasWaktu: string;
  sumberMaster: string;
  stokTerakhirDicatatOleh: string;
  waktuPembaruanTerakhir: string;
  saldoAwalRentang: string;
  riwayat: RiwayatStok[];
  catatanSaldo: string;
}

const DATA_DETAIL_BAHAN: Record<string, DetailBahanBaku> = {
  'BB-001': {
    id: 'BB-001',
    nama: 'Tepung Terigu',
    stokTersimpan: '125 kg',
    stokMinimum: '50 kg',
    selisihMinimum: '+75 kg',
    satuan: 'kg',
    lokasi: 'Rak A-01',
    kedaluwarsa: '20 Des 2026',
    kondisi: 'Layak pakai',
    stokRendah: false,
    stokSebelum: '150 kg',
    dipakai: '25 kg',
    stokAkhir: '125 kg',
    referensiProduksi: 'PRD-261024-01 • Donat Cokelat',
    petugasWaktu: 'Siti Rahmah • 24 Okt 2026, 09.30 WIB',
    sumberMaster: 'Data bahan • admin',
    stokTerakhirDicatatOleh: 'Siti Rahmah',
    waktuPembaruanTerakhir: '24 Oktober 2026, 09.30 WIB',
    saldoAwalRentang: '150 kg',
    riwayat: [
      {
        waktu: '24 Okt 2026\n09.30 WIB',
        referensi: 'PRD-261024-01',
        sebelum: '150 kg',
        perubahan: '-25 kg',
        sesudah: '125 kg',
        petugas: 'Siti Rahmah',
        jenisAlasan: 'Pemakaian\nPemakaian tepung terigu untuk produksi Donat Cokelat.',
      },
    ],
    catatanSaldo: '✓ Saldo konsisten: 150 kg – 25 kg = 125 kg. Pemakaian di atas sudah dicatat; jangan dikurangi ulang.',
  },
  'BB-002': {
    id: 'BB-002',
    nama: 'Gula Pasir',
    stokTersimpan: '60 kg',
    stokMinimum: '25 kg',
    selisihMinimum: '+35 kg',
    satuan: 'kg',
    lokasi: 'Rak A-02',
    kedaluwarsa: '10 Mar 2027',
    kondisi: 'Layak pakai',
    stokRendah: false,
    stokSebelum: '65 kg',
    dipakai: '5 kg',
    stokAkhir: '60 kg',
    referensiProduksi: 'PRD-261024-02 • Donat Gula',
    petugasWaktu: 'Siti Rahmah • 24 Okt 2026, 11.00 WIB',
    sumberMaster: 'Data bahan • admin',
    stokTerakhirDicatatOleh: 'Siti Rahmah',
    waktuPembaruanTerakhir: '24 Oktober 2026, 11.00 WIB',
    saldoAwalRentang: '65 kg',
    riwayat: [
      {
        waktu: '24 Okt 2026\n11.00 WIB',
        referensi: 'PRD-261024-02',
        sebelum: '65 kg',
        perubahan: '-5 kg',
        sesudah: '60 kg',
        petugas: 'Siti Rahmah',
        jenisAlasan: 'Pemakaian\nPemakaian gula pasir untuk adonan Donat Gula.',
      },
    ],
    catatanSaldo: '✓ Saldo konsisten: 65 kg – 5 kg = 60 kg. Pemakaian di atas sudah dicatat; jangan dikurangi ulang.',
  },
  'BB-003': {
    id: 'BB-003',
    nama: 'Mentega',
    stokTersimpan: '8 kg',
    stokMinimum: '15 kg',
    selisihMinimum: '-7 kg',
    satuan: 'kg',
    lokasi: 'Pendingin B-01',
    kedaluwarsa: '02 Nov 2026',
    kondisi: 'Layak pakai',
    stokRendah: true,
    stokSebelum: '10 kg',
    dipakai: '2 kg',
    stokAkhir: '8 kg',
    referensiProduksi: 'PRD-261024-02 • Donat Gula',
    petugasWaktu: 'Siti Rahmah • 24 Okt 2026, 12.05 WIB',
    sumberMaster: 'Data bahan • admin',
    stokTerakhirDicatatOleh: 'Siti Rahmah',
    waktuPembaruanTerakhir: '24 Oktober 2026, 12.05 WIB',
    saldoAwalRentang: '12 kg',
    riwayat: [
      {
        waktu: '23 Okt 2026\n14.35 WIB',
        referensi: 'PRD-261023-03',
        sebelum: '12 kg',
        perubahan: '-2 kg',
        sesudah: '10 kg',
        petugas: 'Siti Rahmah',
        jenisAlasan: 'Pemakaian\nPemakaian mentega untuk produksi Donat Keju.',
      },
      {
        waktu: '24 Okt 2026\n12.05 WIB',
        referensi: 'PRD-261024-02',
        sebelum: '10 kg',
        perubahan: '-2 kg',
        sesudah: '8 kg',
        petugas: 'Siti Rahmah',
        jenisAlasan: 'Pemakaian\nPemakaian mentega untuk produksi Donat Gula.',
      },
    ],
    catatanSaldo: '✓ Saldo konsisten: 12 kg – 2 kg – 2 kg = 8 kg. Pemakaian di atas sudah dicatat; jangan dikurangi ulang.',
  },
  'BB-004': {
    id: 'BB-004',
    nama: 'Cokelat Batang',
    stokTersimpan: '6 kg',
    stokMinimum: '10 kg',
    selisihMinimum: '-4 kg',
    satuan: 'kg',
    lokasi: 'Rak B-02',
    kedaluwarsa: '18 Des 2026',
    kondisi: 'Layak pakai',
    stokRendah: true,
    stokSebelum: '10 kg',
    dipakai: '4 kg',
    stokAkhir: '6 kg',
    referensiProduksi: 'PRD-261024-01 • Donat Cokelat',
    petugasWaktu: 'Siti Rahmah • 24 Okt 2026, 10.15 WIB',
    sumberMaster: 'Data bahan • admin',
    stokTerakhirDicatatOleh: 'Siti Rahmah',
    waktuPembaruanTerakhir: '24 Oktober 2026, 10.15 WIB',
    saldoAwalRentang: '10 kg',
    riwayat: [
      {
        waktu: '24 Okt 2026\n10.15 WIB',
        referensi: 'PRD-261024-01',
        sebelum: '10 kg',
        perubahan: '-4 kg',
        sesudah: '6 kg',
        petugas: 'Siti Rahmah',
        jenisAlasan: 'Pemakaian\nPemakaian cokelat batang untuk isian Donat Cokelat.',
      },
    ],
    catatanSaldo: '✓ Saldo konsisten: 10 kg – 4 kg = 6 kg. Pemakaian di atas sudah dicatat; jangan dikurangi ulang.',
  },
  'BB-005': {
    id: 'BB-005',
    nama: 'Telur',
    stokTersimpan: '30 kg',
    stokMinimum: '15 kg',
    selisihMinimum: '+15 kg',
    satuan: 'kg',
    lokasi: 'Pendingin B-02',
    kedaluwarsa: '30 Okt 2026',
    kondisi: 'Layak pakai',
    stokRendah: false,
    stokSebelum: '34 kg',
    dipakai: '4 kg',
    stokAkhir: '30 kg',
    referensiProduksi: 'PRD-261024-01 • Donat Cokelat',
    petugasWaktu: 'Siti Rahmah • 24 Okt 2026, 08.45 WIB',
    sumberMaster: 'Data bahan • admin',
    stokTerakhirDicatatOleh: 'Siti Rahmah',
    waktuPembaruanTerakhir: '24 Oktober 2026, 08.45 WIB',
    saldoAwalRentang: '34 kg',
    riwayat: [
      {
        waktu: '24 Okt 2026\n08.45 WIB',
        referensi: 'PRD-261024-01',
        sebelum: '34 kg',
        perubahan: '-4 kg',
        sesudah: '30 kg',
        petugas: 'Siti Rahmah',
        jenisAlasan: 'Pemakaian\nPemakaian telur untuk adonan roti.',
      },
    ],
    catatanSaldo: '✓ Saldo konsisten: 34 kg – 4 kg = 30 kg. Pemakaian di atas sudah dicatat; jangan dikurangi ulang.',
  },
  'BB-006': {
    id: 'BB-006',
    nama: 'Keju Cheddar',
    stokTersimpan: '18 kg',
    stokMinimum: '10 kg',
    selisihMinimum: '+8 kg',
    satuan: 'kg',
    lokasi: 'Pendingin B-01',
    kedaluwarsa: '15 Nov 2026',
    kondisi: 'Layak pakai',
    stokRendah: false,
    stokSebelum: '21 kg',
    dipakai: '3 kg',
    stokAkhir: '18 kg',
    referensiProduksi: 'PRD-261024-03 • Donat Keju',
    petugasWaktu: 'Siti Rahmah • 24 Okt 2026, 13.00 WIB',
    sumberMaster: 'Data bahan • admin',
    stokTerakhirDicatatOleh: 'Siti Rahmah',
    waktuPembaruanTerakhir: '24 Oktober 2026, 13.00 WIB',
    saldoAwalRentang: '21 kg',
    riwayat: [
      {
        waktu: '24 Okt 2026\n13.00 WIB',
        referensi: 'PRD-261024-03',
        sebelum: '21 kg',
        perubahan: '-3 kg',
        sesudah: '18 kg',
        petugas: 'Siti Rahmah',
        jenisAlasan: 'Pemakaian\nPemakaian keju cheddar parut untuk Donat Keju.',
      },
    ],
    catatanSaldo: '✓ Saldo konsisten: 21 kg – 3 kg = 18 kg. Pemakaian di atas sudah dicatat; jangan dikurangi ulang.',
  },
  'BB-007': {
    id: 'BB-007',
    nama: 'Susu Bubuk',
    stokTersimpan: '12 kg',
    stokMinimum: '5 kg',
    selisihMinimum: '+7 kg',
    satuan: 'kg',
    lokasi: 'Rak A-03',
    kedaluwarsa: '12 Jan 2027',
    kondisi: 'Layak pakai',
    stokRendah: false,
    stokSebelum: '13 kg',
    dipakai: '1 kg',
    stokAkhir: '12 kg',
    referensiProduksi: 'PRD-261024-01 • Donat Cokelat',
    petugasWaktu: 'Siti Rahmah • 24 Okt 2026, 09.00 WIB',
    sumberMaster: 'Data bahan • admin',
    stokTerakhirDicatatOleh: 'Siti Rahmah',
    waktuPembaruanTerakhir: '24 Oktober 2026, 09.00 WIB',
    saldoAwalRentang: '13 kg',
    riwayat: [
      {
        waktu: '24 Okt 2026\n09.00 WIB',
        referensi: 'PRD-261024-01',
        sebelum: '13 kg',
        perubahan: '-1 kg',
        sesudah: '12 kg',
        petugas: 'Siti Rahmah',
        jenisAlasan: 'Pemakaian\nPemakaian susu bubuk untuk adonan.',
      },
    ],
    catatanSaldo: '✓ Saldo konsisten: 13 kg – 1 kg = 12 kg. Pemakaian di atas sudah dicatat; jangan dikurangi ulang.',
  },
  'BB-008': {
    id: 'BB-008',
    nama: 'Ragi Instan',
    stokTersimpan: '2 kg',
    stokMinimum: '1 kg',
    selisihMinimum: '+1 kg',
    satuan: 'kg',
    lokasi: 'Rak A-03',
    kedaluwarsa: '28 Feb 2027',
    kondisi: 'Layak pakai',
    stokRendah: false,
    stokSebelum: '2.5 kg',
    dipakai: '0.5 kg',
    stokAkhir: '2 kg',
    referensiProduksi: 'PRD-261024-01 • Donat Cokelat',
    petugasWaktu: 'Siti Rahmah • 24 Okt 2026, 08.30 WIB',
    sumberMaster: 'Data bahan • admin',
    stokTerakhirDicatatOleh: 'Siti Rahmah',
    waktuPembaruanTerakhir: '24 Oktober 2026, 08.30 WIB',
    saldoAwalRentang: '2.5 kg',
    riwayat: [
      {
        waktu: '24 Okt 2026\n08.30 WIB',
        referensi: 'PRD-261024-01',
        sebelum: '2.5 kg',
        perubahan: '-0.5 kg',
        sesudah: '2 kg',
        petugas: 'Siti Rahmah',
        jenisAlasan: 'Pemakaian\nPemakaian ragi instan pengembang adonan.',
      },
    ],
    catatanSaldo: '✓ Saldo konsisten: 2.5 kg – 0.5 kg = 2 kg. Pemakaian di atas sudah dicatat; jangan dikurangi ulang.',
  },
};

function DetailBahanBakuContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 'BB-003';

  const detail = DATA_DETAIL_BAHAN[id] || DATA_DETAIL_BAHAN['BB-003'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
            Data Bahan Baku &gt; <span style={{ color: '#b0525e', fontWeight: 'bold' }}>Detail Bahan Baku</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Detail Bahan Baku
          </h2>
        </div>
        <div
          style={{
            backgroundColor: '#e6f4ea',
            color: '#137333',
            padding: '6px 14px',
            borderRadius: '16px',
            fontSize: '11px',
            fontWeight: 'bold',
          }}
        >
          Data tersimpan
        </div>
      </div>

      {/* KARTU STATISTIK 3 KOLOM */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        
        {/* KARTU 1: STOK TERSIMPAN */}
        <div style={cardStatStyle}>
          <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
            Stok tersimpan • {detail.nama}
          </div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>
            {detail.stokTersimpan}
          </div>
          <div style={{ fontSize: '11px', color: '#888888', marginTop: '4px' }}>
            {detail.id} • stok terkini
          </div>
        </div>

        {/* KARTU 2: STOK MINIMUM */}
        <div style={cardStatStyle}>
          <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
            Stok minimum
          </div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>
            {detail.stokMinimum}
          </div>
          <div style={{ fontSize: '11px', color: '#888888', marginTop: '4px' }}>
            Batas minimum dari master bahan
          </div>
        </div>

        {/* KARTU 3: SELISIH DARI MINIMUM */}
        <div style={cardStatStyle}>
          <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
            Selisih dari minimum
          </div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>
            {detail.selisihMinimum}
          </div>
          <div style={{ fontSize: '11px', color: '#888888', marginTop: '4px' }}>
            {detail.stokRendah ? 'Stok rendah • perlu perhatian admin' : 'Stok aman • berada di atas minimum'}
          </div>
        </div>

      </div>

      {/* BANNER PERHATIAN STOK RENDAH */}
      {detail.stokRendah && (
        <div
          style={{
            backgroundColor: '#fff7ed',
            borderRadius: '12px',
            padding: '14px 18px',
            border: '1px solid #ffedd5',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <AlertTriangle size={18} color="#c2410c" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#c2410c' }}>
              Stok {detail.nama.toLowerCase()} di bawah minimum
            </div>
            <div style={{ fontSize: '11px', color: '#9a3412', marginTop: '2px' }}>
              Stok tersimpan {detail.stokTersimpan}, lebih rendah dari minimum {detail.stokMinimum}. Laporkan kebutuhan kepada admin; jangan mengganti bahan tanpa persetujuan.
            </div>
          </div>
        </div>
      )}

      {/* TAMPILAN 2 KOLOM */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* KOLOM KIRI (IDENTITAS & PEMAKAIAN TERAKHIR) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* KARTU IDENTITAS BAHAN */}
          <div style={cardBoxStyle}>
            <h3 style={sectionTitleStyle}>
              Identitas bahan • hanya baca
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
              <div>
                <div style={labelTitleStyle}>Kode bahan</div>
                <div style={valueContentStyle}>{detail.id}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Nama bahan</div>
                <div style={valueContentStyle}>{detail.nama}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Satuan</div>
                <div style={valueContentStyle}>{detail.satuan}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid #f0f0f0', paddingTop: '14px' }}>
              <div>
                <div style={labelTitleStyle}>Stok minimum</div>
                <div style={valueContentStyle}>{detail.stokMinimum}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Lokasi</div>
                <div style={valueContentStyle}>{detail.lokasi}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Kedaluwarsa</div>
                <div style={valueContentStyle}>{detail.kedaluwarsa}</div>
              </div>
            </div>

            <div style={{ fontSize: '10px', color: '#999999', marginTop: '16px' }}>
              Data master dikelola admin. Karyawan produksi hanya melihat bahan dan memperbarui stok untuk pemakaian atau koreksi operasional.
            </div>
          </div>

          {/* KARTU PEMAKAIAN TERAKHIR */}
          <div style={cardBoxStyle}>
            <h3 style={sectionTitleStyle}>
              Pemakaian terakhir (tersimpan)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
              <div>
                <div style={labelTitleStyle}>Stok sebelum</div>
                <div style={valueContentStyle}>{detail.stokSebelum}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Dipakai</div>
                <div style={valueContentStyle}>{detail.dipakai}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Stok akhir</div>
                <div style={valueContentStyle}>{detail.stokAkhir}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid #f0f0f0', paddingTop: '14px' }}>
              <div>
                <div style={labelTitleStyle}>Referensi produksi</div>
                <div style={valueContentStyle}>{detail.referensiProduksi}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Petugas / waktu</div>
                <div style={valueContentStyle}>{detail.petugasWaktu}</div>
              </div>
            </div>
          </div>

        </div>

        {/* KOLOM KANAN (KONDISI BAHAN & METADATA) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* KONDISI BAHAN */}
          <div style={cardBoxStyle}>
            <h3 style={sectionTitleStyle}>Kondisi bahan</h3>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <span style={badgeGreenStyle}>{detail.kondisi}</span>
              {detail.stokRendah && <span style={badgeYellowStyle}>Stok rendah</span>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '8px' }}>
              <span style={{ color: '#777777' }}>Kedaluwarsa</span>
              <span style={{ fontWeight: 'bold', color: '#333333' }}>{detail.kedaluwarsa}</span>
            </div>

            <div style={{ fontSize: '10px', color: '#666666', lineHeight: 1.5 }}>
              Simpan di {detail.lokasi}. Gunakan bahan dengan tanggal kedaluwarsa terdekat dan periksa kondisi sebelum produksi.
            </div>
          </div>

          {/* METADATA PERSEDIAAN */}
          <div style={cardBoxStyle}>
            <h3 style={sectionTitleStyle}>Metadata persediaan</h3>

            <div style={{ marginBottom: '12px' }}>
              <div style={labelTitleStyle}>Sumber master</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333333', textAlign: 'right' }}>
                {detail.sumberMaster}
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={labelTitleStyle}>Stok terakhir dicatat oleh</div>
              <div style={valueContentStyle}>{detail.stokTerakhirDicatatOleh}</div>
            </div>

            <div>
              <div style={labelTitleStyle}>Waktu pembaruan terakhir</div>
              <div style={valueContentStyle}>{detail.waktuPembaruanTerakhir}</div>
            </div>

            <div style={{ fontSize: '10px', color: '#999999', marginTop: '16px', lineHeight: 1.4 }}>
              Saldo tersimpan hingga 24 Oktober 2026, 13.00 WIB.<br />
              Data master hanya baca.
            </div>
          </div>

        </div>

      </div>

      {/* RIWAYAT PERGERAKAN STOK */}
      <div style={cardBoxStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ ...sectionTitleStyle, margin: 0 }}>
              Riwayat pergerakan stok
            </h3>
            <div style={{ fontSize: '11px', color: '#777777', marginTop: '2px' }}>
              {detail.riwayat.length} pergerakan terakhir • 23–24 Oktober 2026
            </div>
          </div>

          <span style={{ backgroundColor: '#fdf0ee', color: '#b0525e', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
            Saldo awal rentang: {detail.saldoAwalRentang}
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf0ee', color: '#b0525e', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px', borderRadius: '8px 0 0 8px' }}>Waktu</th>
              <th style={{ padding: '10px 14px' }}>Referensi produksi</th>
              <th style={{ padding: '10px 14px' }}>Sebelum</th>
              <th style={{ padding: '10px 14px' }}>Perubahan</th>
              <th style={{ padding: '10px 14px' }}>Sesudah</th>
              <th style={{ padding: '10px 14px' }}>Petugas</th>
              <th style={{ padding: '10px 14px', borderRadius: '0 8px 8px 0' }}>Jenis / alasan</th>
            </tr>
          </thead>
          <tbody>
            {detail.riwayat.map((r, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '12px 14px', whiteSpace: 'pre-line', color: '#333333' }}>
                  {r.waktu}
                </td>
                <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#444444' }}>
                  {r.referensi}
                </td>
                <td style={{ padding: '12px 14px', color: '#555555' }}>{r.sebelum}</td>
                <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#dc3545' }}>
                  {r.perubahan}
                </td>
                <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#333333' }}>
                  {r.sesudah}
                </td>
                <td style={{ padding: '12px 14px', color: '#555555' }}>{r.petugas}</td>
                <td style={{ padding: '12px 14px', whiteSpace: 'pre-line', color: '#555555' }}>
                  {r.jenisAlasan}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '10px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', marginTop: '16px' }}>
          {detail.catatanSaldo}
        </div>
      </div>

      {/* FOOTER TOMBOL AKSI */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
        <Link
          href="/karyawan-produksi/bahan-baku"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#ffffff',
            border: '1px solid #cccccc',
            borderRadius: '10px',
            color: '#b0525e',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Data Bahan Baku</span>
        </Link>

        <Link
          href={`/karyawan-produksi/bahan-baku/perbarui?id=${detail.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#b0525e',
            borderRadius: '10px',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          <RotateCcw size={16} />
          <span>Perbarui Stok</span>
        </Link>
      </div>

    </div>
  );
}

const cardStatStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
};

const cardBoxStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px 24px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#b0525e',
  margin: '0 0 14px 0',
  fontWeight: 'bold',
};

const labelTitleStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#888888',
  marginBottom: '2px',
};

const valueContentStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 'bold',
  color: '#333333',
};

const badgeGreenStyle: React.CSSProperties = {
  backgroundColor: '#e6f4ea',
  color: '#137333',
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: 'bold',
};

const badgeYellowStyle: React.CSSProperties = {
  backgroundColor: '#fff3cd',
  color: '#856404',
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: 'bold',
};

export default function DetailBahanBakuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailBahanBakuContent />
    </Suspense>
  );
}