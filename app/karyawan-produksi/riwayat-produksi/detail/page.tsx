'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Edit, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DetailHasilItem {
  idBatch: string;
  produk: string;
  gambar: string;
  tanggal: string;
  waktu: string;
  sif: string;
  petugas: string;
  fasilitas: string;
  target: string;
  totalHasil: string;
  lolosMutu: string;
  ditolak: string;
  tingkatKelulusan: string;
  warnaMutuText: string;
  alasanPenolakan: string;
  catatanHasil: string;
  waktuPencatatan: string;
  pencatatanPetugas: string;
  riwayatAktivitas: {
    waktu: string;
    petugas: string;
    aktivitas: string;
    keterangan: string;
  }[];
}

const DETAIL_DATA_MAP: Record<string, DetailHasilItem> = {
  'PRD-261024-02': {
    idBatch: 'PRD-261024-02',
    produk: 'Donat Gula',
    gambar: '/donat-gula.png',
    tanggal: '24 Oktober 2026',
    waktu: '10.00–12.00 WIB',
    sif: 'Pagi',
    petugas: 'Siti Rahmah',
    fasilitas: 'Oven utama',
    target: '150 pcs',
    totalHasil: '150 pcs',
    lolosMutu: '148 pcs',
    ditolak: '2 pcs',
    tingkatKelulusan: '98,7%',
    warnaMutuText: 'Warna: 148 pcs sesuai; 2 pcs taburan gula tidak merata',
    alasanPenolakan: 'Taburan gula halus tidak merata',
    catatanHasil: 'Donat gula mengembang sempurna. 2 pcs dipisahkan karena taburan gula basah/tidak merata.',
    waktuPencatatan: '24 Okt 2026, 12.00',
    pencatatanPetugas: 'Siti Rahmah • Karyawan Produksi',
    riwayatAktivitas: [
      {
        waktu: '24 Okt 2026 • 12.00',
        petugas: 'Siti Rahmah',
        aktivitas: 'Pencatatan awal',
        keterangan: '150 pcs hasil; 148 lolos dan 2 ditolak. Hasil lolos dicatat masuk gudang produk jadi.',
      },
    ],
  },
  'PRD-261024-01': {
    idBatch: 'PRD-261024-01',
    produk: 'Donat Cokelat',
    gambar: '/donat-cokelat.png',
    tanggal: '24 Oktober 2026',
    waktu: '08.00–10.00 WIB',
    sif: 'Pagi',
    petugas: 'Siti Rahmah',
    fasilitas: 'Oven utama',
    target: '250 pcs',
    totalHasil: '250 pcs',
    lolosMutu: '246 pcs',
    ditolak: '4 pcs',
    tingkatKelulusan: '98,4%',
    warnaMutuText: 'Warna: 246 pcs sesuai; 4 pcs permukaan terlalu matang',
    alasanPenolakan: 'Permukaan terlalu matang',
    catatanHasil: '4 Donat Cokelat ditolak karena permukaan terlalu matang. Sebanyak 246 pcs lolos mutu telah dicatat masuk gudang produk jadi.',
    waktuPencatatan: '24 Okt 2026, 10.00',
    pencatatanPetugas: 'Siti Rahmah • Karyawan Produksi',
    riwayatAktivitas: [
      {
        waktu: '24 Okt 2026 • 10.00',
        petugas: 'Siti Rahmah',
        aktivitas: 'Pencatatan awal',
        keterangan: '250 pcs hasil; 246 lolos dan 4 ditolak. Hasil lolos dicatat masuk gudang produk jadi.',
      },
    ],
  },
  'PRD-261023-04': {
    idBatch: 'PRD-261023-04',
    produk: 'Donat Stroberi',
    gambar: '/donat-stroberi.png',
    tanggal: '23 Oktober 2026',
    waktu: '14.30–16.00 WIB',
    sif: 'Pagi',
    petugas: 'Siti Rahmah',
    fasilitas: 'Oven utama',
    target: '50 pcs',
    totalHasil: '50 pcs',
    lolosMutu: '50 pcs',
    ditolak: '0 pcs',
    tingkatKelulusan: '100%',
    warnaMutuText: 'Warna: 50 pcs mengkilap sempurna',
    alasanPenolakan: 'Tidak ada penolakan',
    catatanHasil: 'Seluruh batch Donat Stroberi lolos uji mutu tanpa cacat produk.',
    waktuPencatatan: '23 Okt 2026, 16.00',
    pencatatanPetugas: 'Siti Rahmah • Karyawan Produksi',
    riwayatAktivitas: [
      {
        waktu: '23 Okt 2026 • 16.00',
        petugas: 'Siti Rahmah',
        aktivitas: 'Pencatatan awal',
        keterangan: '50 pcs hasil; 50 lolos dan 0 ditolak. Seluruh hasil dicatat masuk gudang.',
      },
    ],
  },
  'PRD-261023-03': {
    idBatch: 'PRD-261023-03',
    produk: 'Donat Keju',
    gambar: '/donat-keju.png',
    tanggal: '23 Oktober 2026',
    waktu: '12.30–14.30 WIB',
    sif: 'Pagi',
    petugas: 'Siti Rahmah',
    fasilitas: 'Oven utama',
    target: '170 pcs',
    totalHasil: '170 pcs',
    lolosMutu: '168 pcs',
    ditolak: '2 pcs',
    tingkatKelulusan: '98,8%',
    warnaMutuText: 'Warna: 168 pcs keemasan; 2 pcs pinggiran tidak rata',
    alasanPenolakan: '2 pcs bentuk tidak sesuai standar (pinggiran tidak rata)',
    catatanHasil: 'Hasil lolos 168 pcs: 150 untuk pesanan Kafe Senja dan 18 untuk stok.',
    waktuPencatatan: '23 Okt 2026, 14.30',
    pencatatanPetugas: 'Siti Rahmah • Karyawan Produksi',
    riwayatAktivitas: [
      {
        waktu: '23 Okt 2026 • 14.30',
        petugas: 'Siti Rahmah',
        aktivitas: 'Pencatatan awal',
        keterangan: '170 pcs hasil; 168 lolos dan 2 ditolak. Hasil lolos dicatat masuk gudang.',
      },
    ],
  },
  'PRD-261023-02': {
    idBatch: 'PRD-261023-02',
    produk: 'Donat Gula',
    gambar: '/donat-gula.png',
    tanggal: '23 Oktober 2026',
    waktu: '10.00–12.00 WIB',
    sif: 'Pagi',
    petugas: 'Siti Rahmah',
    fasilitas: 'Oven utama',
    target: '150 pcs',
    totalHasil: '150 pcs',
    lolosMutu: '149 pcs',
    ditolak: '1 pcs',
    tingkatKelulusan: '99,3%',
    warnaMutuText: 'Warna: 149 pcs sesuai; 1 pcs kempes',
    alasanPenolakan: '1 pcs ukuran kempes/underproofed',
    catatanHasil: '149 pcs lolos mutu dipacking sesuai instruksi.',
    waktuPencatatan: '23 Okt 2026, 12.00',
    pencatatanPetugas: 'Siti Rahmah • Karyawan Produksi',
    riwayatAktivitas: [
      {
        waktu: '23 Okt 2026 • 12.00',
        petugas: 'Siti Rahmah',
        aktivitas: 'Pencatatan awal',
        keterangan: '150 pcs hasil; 149 lolos dan 1 ditolak.',
      },
    ],
  },
  'PRD-261023-01': {
    idBatch: 'PRD-261023-01',
    produk: 'Donat Cokelat',
    gambar: '/donat-cokelat.png',
    tanggal: '23 Oktober 2026',
    waktu: '08.00–10.00 WIB',
    sif: 'Pagi',
    petugas: 'Siti Rahmah',
    fasilitas: 'Oven utama',
    target: '250 pcs',
    totalHasil: '250 pcs',
    lolosMutu: '248 pcs',
    ditolak: '2 pcs',
    tingkatKelulusan: '99,2%',
    warnaMutuText: 'Warna: 248 pcs sesuai; 2 pcs cokelat melumer di wadah',
    alasanPenolakan: 'Toping cokelat berantakan',
    catatanHasil: '248 pcs Donat Cokelat tersimpan aman di gudang.',
    waktuPencatatan: '23 Okt 2026, 10.00',
    pencatatanPetugas: 'Siti Rahmah • Karyawan Produksi',
    riwayatAktivitas: [
      {
        waktu: '23 Okt 2026 • 10.00',
        petugas: 'Siti Rahmah',
        aktivitas: 'Pencatatan awal',
        keterangan: '250 pcs hasil; 248 lolos dan 2 ditolak.',
      },
    ],
  },
};

function DetailHasilProduksiContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 'PRD-261024-01';

  const detail = DETAIL_DATA_MAP[id] || DETAIL_DATA_MAP['PRD-261024-01'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
            Riwayat Produksi &gt; <span style={{ color: '#b0525e', fontWeight: 'bold' }}>Detail Hasil Produksi</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Detail Hasil Produksi
          </h2>
        </div>

        <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '6px 14px', borderRadius: '16px', fontSize: '11px', fontWeight: 'bold' }}>
          Data tersimpan
        </span>
      </div>

      {/* KARTU STATISTIK 4 KOLOM */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={cardStatStyle}>
          <div style={labelTitleStyle}>Total hasil</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#b0525e' }}>{detail.totalHasil}</div>
          <div style={{ fontSize: '10px', color: '#888888', marginTop: '2px' }}>Target tercapai: {detail.totalHasil} dari {detail.target}</div>
        </div>

        <div style={cardStatStyle}>
          <div style={labelTitleStyle}>Lolos mutu</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#137333' }}>{detail.lolosMutu}</div>
          <div style={{ fontSize: '10px', color: '#888888', marginTop: '2px' }}>Sudah masuk gudang produk jadi</div>
        </div>

        <div style={cardStatStyle}>
          <div style={labelTitleStyle}>Ditolak</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>{detail.ditolak}</div>
          <div style={{ fontSize: '10px', color: '#888888', marginTop: '2px' }}>Dipisahkan dari hasil layak jual</div>
        </div>

        <div style={cardStatStyle}>
          <div style={labelTitleStyle}>Tingkat kelulusan</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#b0525e' }}>{detail.tingkatKelulusan}</div>
          <div style={{ fontSize: '10px', color: '#888888', marginTop: '2px' }}>{detail.lolosMutu} dari {detail.totalHasil} hasil produksi</div>
        </div>
      </div>

      {/* TAMPILAN 2 KOLOM DETAIL */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'start' }}>
        
        {/* PANEL KIRI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* INFORMASI PRODUKSI */}
          <div style={cardBoxStyle}>
            <h3 style={sectionTitleStyle}>Informasi produksi</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <div style={labelTitleStyle}>Kode produksi</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333333' }}>{detail.idBatch}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                  <Image src={detail.gambar} alt={detail.produk} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#777777' }}>Produk</div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333333' }}>{detail.produk}</div>
                </div>
              </div>

              <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                Selesai
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', borderTop: '1px solid #f0f0f0', paddingTop: '14px' }}>
              <div>
                <div style={labelTitleStyle}>Tanggal produksi</div>
                <div style={valueContentStyle}>{detail.tanggal}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Waktu produksi</div>
                <div style={valueContentStyle}>{detail.waktu}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Sif</div>
                <div style={valueContentStyle}>{detail.sif}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginTop: '12px' }}>
              <div>
                <div style={labelTitleStyle}>Petugas produksi</div>
                <div style={valueContentStyle}>{detail.petugas}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Fasilitas</div>
                <div style={valueContentStyle}>{detail.fasilitas}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Target produksi</div>
                <div style={valueContentStyle}>{detail.target}</div>
              </div>
            </div>
          </div>

          {/* PEMERIKSAAN MUTU DAN CATATAN */}
          <div style={cardBoxStyle}>
            <h3 style={sectionTitleStyle}>Pemeriksaan mutu dan catatan</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '11px', color: '#444444' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: detail.ditolak === '0 pcs' ? '#137333' : '#856404' }}>
                {detail.ditolak === '0 pcs' ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                <span>{detail.warnaMutuText}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#137333' }}>
                <CheckCircle2 size={14} />
                <span>Tekstur dan bentuk hasil lolos sesuai standar</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#137333' }}>
                <CheckCircle2 size={14} />
                <span>{detail.ditolak} ditolak telah dipisahkan dari hasil layak jual</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '12px', marginBottom: '12px' }}>
              <div style={labelTitleStyle}>Alasan penolakan tersimpan</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333333', marginTop: '2px' }}>{detail.alasanPenolakan}</div>
            </div>

            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '12px', marginBottom: '12px' }}>
              <div style={labelTitleStyle}>Catatan hasil produksi</div>
              <div style={{ fontSize: '12px', color: '#333333', marginTop: '2px' }}>{detail.catatanHasil}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888888', borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
              <span>Foto hasil produksi</span>
              <span>Tidak ada lampiran</span>
            </div>
          </div>

        </div>

        {/* PANEL KANAN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* PENCATATAN STOK PRODUK JADI */}
          <div style={cardBoxStyle}>
            <h4 style={sectionTitleStyle}>Pencatatan stok produk jadi</h4>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
              <span style={{ color: '#888888' }}>Hasil lolos dicatat</span>
              <span style={{ fontWeight: 'bold', color: '#137333' }}>{detail.lolosMutu}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '12px' }}>
              <span style={{ color: '#888888' }}>Waktu pencatatan</span>
              <span style={{ fontWeight: 'bold', color: '#333333' }}>{detail.waktuPencatatan}</span>
            </div>

            <div style={{ backgroundColor: '#e6f4ea', borderRadius: '10px', padding: '10px 12px', display: 'flex', gap: '8px', fontSize: '10px', color: '#137333', lineHeight: 1.4 }}>
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
              <div>
                <strong>Sudah tercatat masuk gudang</strong><br />
                Hanya hasil lolos mutu yang masuk stok produk jadi. Membuka detail tidak menambah stok kembali.
              </div>
            </div>
          </div>

          {/* METADATA PENCATATAN */}
          <div style={cardBoxStyle}>
            <h4 style={sectionTitleStyle}>Metadata pencatatan</h4>

            <div style={{ marginBottom: '10px' }}>
              <div style={labelTitleStyle}>Dicatat oleh</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333333' }}>{detail.pencatatanPetugas}</div>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <div style={labelTitleStyle}>Dicatat pada</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333333' }}>{detail.waktuPencatatan} WIB</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', borderTop: '1px solid #f0f0f0', paddingTop: '8px' }}>
              <span style={{ color: '#888888' }}>Versi tersimpan</span>
              <span style={{ fontWeight: 'bold', color: '#333333' }}>Versi awal</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '4px' }}>
              <span style={{ color: '#888888' }}>Perubahan terakhir</span>
              <span style={{ color: '#888888' }}>Belum ada</span>
            </div>
          </div>

        </div>

      </div>

      {/* JEJAK PENCATATAN DAN PERUBAHAN */}
      <div style={cardBoxStyle}>
        <h3 style={sectionTitleStyle}>Jejak pencatatan dan perubahan</h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf0ee', color: '#b0525e', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px', borderRadius: '6px 0 0 6px' }}>Waktu</th>
              <th style={{ padding: '10px 14px' }}>Petugas</th>
              <th style={{ padding: '10px 14px' }}>Aktivitas</th>
              <th style={{ padding: '10px 14px', borderRadius: '0 6px 6px 0' }}>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {detail.riwayatAktivitas.map((act, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '12px 14px', color: '#333333' }}>{act.waktu}</td>
                <td style={{ padding: '12px 14px', color: '#555555' }}>{act.petugas}</td>
                <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#333333' }}>{act.aktivitas}</td>
                <td style={{ padding: '12px 14px', color: '#555555' }}>{act.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ fontSize: '10px', color: '#888888', marginTop: '12px' }}>
          Belum ada koreksi tersimpan. Setiap perubahan akan mencatat petugas, waktu, nilai sebelum/sesudah, dan alasan perubahan.
        </div>
      </div>

      {/* FOOTER TOMBOL AKSI */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
        <Link
          href="/karyawan-produksi/riwayat-produksi"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#ffffff',
            border: '1px solid #cccccc',
            borderRadius: '8px',
            color: '#b0525e',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Riwayat</span>
        </Link>

        <Link
          href={`/karyawan-produksi/riwayat-produksi/ubah?id=${detail.idBatch}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#b0525e',
            borderRadius: '8px',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          <Edit size={16} />
          <span>Ubah Hasil</span>
        </Link>
      </div>

    </div>
  );
}

const cardStatStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '16px 20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
};

const cardBoxStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
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
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#333333',
};

export default function DetailHasilProduksiPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailHasilProduksiContent />
    </Suspense>
  );
}