'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Lock, Info, Save, CheckCircle2 } from 'lucide-react';

interface UbahItem {
  idBatch: string;
  produk: string;
  gambar: string;
  alasanAwal: string;
  catatanAwal: string;
  total: number;
  lolos: number;
  ditolak: number;
  tanggal: string;
  sif: string;
  petugas: string;
  fasilitas: string;
}

const MASTER_UBAH_DATA: Record<string, UbahItem> = {
  'PRD-261024-02': {
    idBatch: 'PRD-261024-02',
    produk: 'Donat Gula',
    gambar: '/donat-gula.png',
    alasanAwal: 'Taburan gula halus tidak merata',
    catatanAwal: 'Memperjelas catatan pemeriksaan mutu gula halus.',
    total: 150,
    lolos: 148,
    ditolak: 2,
    tanggal: '24 Oktober 2026',
    sif: 'Pagi',
    petugas: 'Siti Rahmah',
    fasilitas: 'Oven utama',
  },
  'PRD-261024-01': {
    idBatch: 'PRD-261024-01',
    produk: 'Donat Cokelat',
    gambar: '/donat-cokelat.png',
    alasanAwal: 'Permukaan terlalu matang',
    catatanAwal: '4 Donat Cokelat ditolak karena permukaan terlalu matang.',
    total: 250,
    lolos: 246,
    ditolak: 4,
    tanggal: '24 Oktober 2026',
    sif: 'Pagi',
    petugas: 'Siti Rahmah',
    fasilitas: 'Oven utama',
  },
  'PRD-261023-04': {
    idBatch: 'PRD-261023-04',
    produk: 'Donat Stroberi',
    gambar: '/donat-stroberi.png',
    alasanAwal: 'Tidak ada penolakan',
    catatanAwal: 'Seluruh batch Donat Stroberi lolos uji mutu.',
    total: 50,
    lolos: 50,
    ditolak: 0,
    tanggal: '23 Oktober 2026',
    sif: 'Pagi',
    petugas: 'Siti Rahmah',
    fasilitas: 'Oven utama',
  },
  'PRD-261023-03': {
    idBatch: 'PRD-261023-03',
    produk: 'Donat Keju',
    gambar: '/donat-keju.png',
    alasanAwal: 'Pinggiran tidak rata',
    catatanAwal: 'Hasil lolos 168 pcs: 150 untuk pesanan Kafe Senja dan 18 untuk stok.',
    total: 170,
    lolos: 168,
    ditolak: 2,
    tanggal: '23 Oktober 2026',
    sif: 'Pagi',
    petugas: 'Siti Rahmah',
    fasilitas: 'Oven utama',
  },
  'PRD-261023-02': {
    idBatch: 'PRD-261023-02',
    produk: 'Donat Gula',
    gambar: '/donat-gula.png',
    alasanAwal: 'Ukuran kempes/underproofed',
    catatanAwal: '149 pcs lolos mutu dipacking sesuai instruksi.',
    total: 150,
    lolos: 149,
    ditolak: 1,
    tanggal: '23 Oktober 2026',
    sif: 'Pagi',
    petugas: 'Siti Rahmah',
    fasilitas: 'Oven utama',
  },
  'PRD-261023-01': {
    idBatch: 'PRD-261023-01',
    produk: 'Donat Cokelat',
    gambar: '/donat-cokelat.png',
    alasanAwal: 'Toping cokelat berantakan',
    catatanAwal: '248 pcs Donat Cokelat tersimpan aman di gudang.',
    total: 250,
    lolos: 248,
    ditolak: 2,
    tanggal: '23 Oktober 2026',
    sif: 'Pagi',
    petugas: 'Siti Rahmah',
    fasilitas: 'Oven utama',
  },
};

function UbahHasilProduksiContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 'PRD-261024-01';
  const item = MASTER_UBAH_DATA[id] || MASTER_UBAH_DATA['PRD-261024-01'];

  // State Dinamis Form
  const [isSaved, setIsSaved] = useState(false);
  const [catatanHasil, setCatatanHasil] = useState(item.catatanAwal);
  const [alasanPenolakanDraft, setAlasanPenolakanDraft] = useState(item.alasanAwal);
  const [alasanPerubahan, setAlasanPerubahan] = useState('Memperjelas catatan pemeriksaan mutu');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
            Riwayat Produksi &gt; <span style={{ color: '#b0525e', fontWeight: 'bold' }}>Ubah Hasil Produksi</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Ubah Hasil Produksi
          </h2>
        </div>

        {isSaved ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '6px 14px', borderRadius: '16px', fontSize: '11px', fontWeight: 'bold' }}>
              Berhasil diperbarui
            </span>
            <span style={{ fontSize: '11px', color: '#777777' }}>
              24 Oktober 2026 • 13.11 WIB
            </span>
          </div>
        ) : (
          <span style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '6px 14px', borderRadius: '16px', fontSize: '11px', fontWeight: 'bold' }}>
            Draft — belum disimpan
          </span>
        )}
      </div>

      {/* BANNER NOTIFIKASI SUKSES (SETELAH SIMPAN) */}
      {isSaved && (
        <div style={{ backgroundColor: '#e6f4ea', border: '1px solid #ceead6', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CheckCircle2 size={18} color="#137333" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#137333' }}>
              Hasil produksi berhasil diperbarui
            </div>
            <div style={{ fontSize: '11px', color: '#137333', marginTop: '2px' }}>
              Koreksi alasan penolakan tersimpan pada 24 Oktober 2026, 13.11 WIB oleh Siti Rahmah. Stok produk jadi tidak berubah karena jumlah lolos tetap {item.lolos} pcs.
            </div>
          </div>
        </div>
      )}

      {/* TAMPILAN 1: FORMULIR UBAH (DRAFT MODE) */}
      {!isSaved ? (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
          
          {/* PANEL KIRI: FORMULIR */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <h3 style={{ fontSize: '14px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
              Formulir perubahan hasil produksi
            </h3>

            {/* BARIS DATA LOCK HANYA BACA */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>ID Batch / Kode produksi • hanya baca</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" value={item.idBatch} readOnly style={{ ...inputStyle, backgroundColor: '#fdf0ee', cursor: 'not-allowed' }} />
                  <Lock size={14} color="#888888" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Produk • hanya baca</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', backgroundColor: '#fdf0ee', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                    <Image src={item.gambar} alt={item.produk} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#444444' }}>{item.produk}</span>
                  <Lock size={14} color="#888888" style={{ marginLeft: 'auto' }} />
                </div>
              </div>
            </div>

            <div style={{ fontSize: '10px', color: '#888888', marginTop: '-10px' }}>
              Kode dan produk tetap terikat pada hasil tersimpan; tidak dapat diganti saat koreksi.
            </div>

            {/* RINGKASAN DATA HANYA BACA */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '10px', fontSize: '11px' }}>
              <div>
                <span style={{ color: '#888888' }}>Tanggal produksi</span>
                <div style={{ fontWeight: 'bold', color: '#333333' }}>{item.tanggal}</div>
              </div>
              <div>
                <span style={{ color: '#888888' }}>Sif / petugas</span>
                <div style={{ fontWeight: 'bold', color: '#333333' }}>{item.sif} • {item.petugas}</div>
              </div>
              <div>
                <span style={{ color: '#888888' }}>Fasilitas / target</span>
                <div style={{ fontWeight: 'bold', color: '#333333' }}>{item.fasilitas} • {item.total} pcs</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Jam mulai *</label>
                <input type="text" defaultValue="08.00" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Jam selesai *</label>
                <input type="text" defaultValue="10.00" style={inputStyle} />
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '4px 0' }} />

            {/* ANGKA PRODUKSI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Total hasil (pcs) *</label>
                <input type="text" defaultValue={item.total.toString()} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Lolos mutu (pcs) *</label>
                <input type="text" defaultValue={item.lolos.toString()} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Ditolak (pcs) *</label>
                <input type="text" defaultValue={item.ditolak.toString()} style={inputStyle} />
              </div>
            </div>

            <div style={{ fontSize: '11px', color: '#137333', fontWeight: 'bold' }}>
              ✓ Validasi lolos: {item.lolos} lolos + {item.ditolak} ditolak = {item.total} pcs (sesuai).
            </div>

            {/* CATATAN & ALASAN */}
            <div>
              <label style={labelStyle}>Catatan hasil produksi</label>
              <textarea
                rows={2}
                value={catatanHasil}
                onChange={(e) => setCatatanHasil(e.target.value)}
                style={{ ...inputStyle, fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={labelStyle}>Alasan penolakan *</label>
              <input
                type="text"
                value={alasanPenolakanDraft}
                onChange={(e) => setAlasanPenolakanDraft(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Alasan perubahan *</label>
              <input
                type="text"
                value={alasanPerubahan}
                onChange={(e) => setAlasanPerubahan(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            {/* HIGHLIGHT INFOS */}
            <div style={{ backgroundColor: '#e8f0fe', borderRadius: '10px', padding: '12px 14px', display: 'flex', gap: '10px', fontSize: '10px', color: '#1a73e8' }}>
              <Info size={16} style={{ flexShrink: 0 }} />
              <div>
                <strong>Kalkulasi penyesuaian stok saat Perbarui</strong><br />
                Lolos mutu tersimpan: {item.lolos} pcs | Draft: {item.lolos} pcs. Selisih stok gudang produk jadi: 0 pcs.
              </div>
            </div>

            {/* TOMBOL BATAL & SIMPAN */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
              <Link href="/karyawan-produksi/riwayat-produksi" style={{ padding: '10px 24px', backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '8px', color: '#555555', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                Batal
              </Link>
              <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#b0525e', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Save size={14} />
                <span>Perbarui Hasil Produksi</span>
              </button>
            </div>

          </div>

          {/* PANEL KANAN: DRAFT VS TERSIMPAN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={cardRightStyle}>
              <h4 style={{ fontSize: '13px', color: '#b0525e', margin: '0 0 12px 0', fontWeight: 'bold' }}>
                Tersimpan vs draft<br />
                <span style={{ fontSize: '11px', color: '#888888' }}>ID Batch {item.idBatch} • {item.produk}</span>
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px', gap: '8px', fontSize: '11px', borderBottom: '1px solid #f0f0f0', paddingBottom: '6px', marginBottom: '6px', fontWeight: 'bold', color: '#888888' }}>
                <span>Jumlah (pcs)</span>
                <span>Tersimpan</span>
                <span>Draft</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px', gap: '8px', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ color: '#555555' }}>Total hasil</span>
                <span style={{ fontWeight: 'bold' }}>{item.total}</span>
                <span style={{ fontWeight: 'bold' }}>{item.total}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px', gap: '8px', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ color: '#555555' }}>Lolos mutu</span>
                <span style={{ fontWeight: 'bold', color: '#137333' }}>{item.lolos}</span>
                <span style={{ fontWeight: 'bold', color: '#137333' }}>{item.lolos}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px', gap: '8px', fontSize: '11px', marginBottom: '12px' }}>
                <span style={{ color: '#555555' }}>Ditolak</span>
                <span style={{ fontWeight: 'bold', color: '#dc3545' }}>{item.ditolak}</span>
                <span style={{ fontWeight: 'bold', color: '#dc3545' }}>{item.ditolak}</span>
              </div>

              <div style={{ backgroundColor: '#fff3cd', borderRadius: '8px', padding: '10px', fontSize: '10px', color: '#856404', lineHeight: 1.4 }}>
                <strong>Catatan diperjelas • selisih stok 0 pcs</strong><br />
                Jumlah, waktu, dan mutu tidak berubah. Hanya alasan penolakan dan catatan diperjelas.
              </div>
            </div>

            <div style={cardRightStyle}>
              <h4 style={{ fontSize: '13px', color: '#b0525e', margin: '0 0 10px 0', fontWeight: 'bold' }}>Petugas dan waktu perbarui</h4>
              <div style={{ fontSize: '11px', color: '#555555', marginBottom: '4px' }}>Petugas koreksi: <strong>Siti Rahmah</strong></div>
              <div style={{ fontSize: '11px', color: '#555555' }}>Draft disiapkan: <strong>24 Oktober 2026, 13.10 WIB</strong></div>
            </div>
          </div>

        </form>
      ) : (
        /* TAMPILAN 2: SETELAH DIPERBARUI */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* HASIL PRODUKSI SETELAH DIPERBARUI */}
            <div style={cardRightStyle}>
              <h3 style={{ fontSize: '15px', color: '#b0525e', margin: '0 0 12px 0', fontWeight: 'bold' }}>
                Hasil produksi setelah diperbarui
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                  <Image src={item.gambar} alt={item.produk} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#333333' }}>{item.produk}</div>
                  <div style={{ fontSize: '10px', color: '#888888' }}>ID Batch {item.idBatch}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', fontSize: '11px', marginBottom: '14px' }}>
                <div>
                  <span style={{ color: '#888888' }}>Tanggal / sif</span>
                  <div style={{ fontWeight: 'bold', color: '#333333' }}>{item.tanggal} • {item.sif}</div>
                </div>
                <div>
                  <span style={{ color: '#888888' }}>Waktu produksi</span>
                  <div style={{ fontWeight: 'bold', color: '#333333' }}>08.00–10.00 WIB</div>
                </div>
                <div>
                  <span style={{ color: '#888888' }}>Petugas / fasilitas</span>
                  <div style={{ fontWeight: 'bold', color: '#333333' }}>{item.petugas} • {item.fasilitas}</div>
                </div>
              </div>

              {/* PERUBAHAN SEBELUM DAN SESUDAH */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '14px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#b0525e', margin: '0 0 10px 0' }}>
                  Perubahan sebelum dan sesudah
                </h4>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#fdf0ee', color: '#b0525e', textAlign: 'left' }}>
                      <th style={{ padding: '8px' }}>Data</th>
                      <th style={{ padding: '8px' }}>Sebelum</th>
                      <th style={{ padding: '8px' }}>Sesudah tersimpan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '8px' }}>Total hasil</td>
                      <td style={{ padding: '8px' }}>{item.total} pcs</td>
                      <td style={{ padding: '8px', fontWeight: 'bold' }}>{item.total} pcs</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px' }}>Lolos mutu</td>
                      <td style={{ padding: '8px', color: '#137333' }}>{item.lolos} pcs</td>
                      <td style={{ padding: '8px', fontWeight: 'bold', color: '#137333' }}>{item.lolos} pcs</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px' }}>Ditolak</td>
                      <td style={{ padding: '8px', color: '#dc3545' }}>{item.ditolak} pcs</td>
                      <td style={{ padding: '8px', fontWeight: 'bold', color: '#dc3545' }}>{item.ditolak} pcs</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px' }}>Alasan penolakan</td>
                      <td style={{ padding: '8px' }}>{item.alasanAwal}</td>
                      <td style={{ padding: '8px', fontWeight: 'bold', color: '#b0525e' }}>{alasanPenolakanDraft}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIWAYAT PENCATATAN BATCH */}
            <div style={cardRightStyle}>
              <h4 style={{ fontSize: '13px', color: '#b0525e', margin: '0 0 10px 0', fontWeight: 'bold' }}>Riwayat pencatatan batch</h4>
              <div style={{ fontSize: '11px', color: '#555555', lineHeight: 1.5 }}>
                • {item.tanggal} — {item.petugas}: Hasil awal disimpan ({item.total} total, {item.lolos} lolos, {item.ditolak} ditolak).<br />
                • 24 Okt 2026 • 13.11 WIB — {item.petugas}: Alasan penolakan diperjelas. Jumlah hasil dan stok tetap.
              </div>
            </div>

          </div>

          {/* PANEL KANAN SETELAH SIMPAN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={cardRightStyle}>
              <h4 style={{ fontSize: '13px', color: '#b0525e', margin: '0 0 10px 0', fontWeight: 'bold' }}>Jejak koreksi tersimpan</h4>
              <div style={{ fontSize: '11px', color: '#555555', marginBottom: '4px' }}>Petugas koreksi: <strong>Siti Rahmah</strong></div>
              <div style={{ fontSize: '11px', color: '#555555', marginBottom: '4px' }}>Waktu perbarui: <strong>24 Oktober 2026, 13.11 WIB</strong></div>
              <div style={{ fontSize: '11px', color: '#555555' }}>Alasan perubahan: <strong>{alasanPerubahan}</strong></div>
            </div>

            <div style={cardRightStyle}>
              <h4 style={{ fontSize: '13px', color: '#b0525e', margin: '0 0 10px 0', fontWeight: 'bold' }}>Penyesuaian stok produk jadi</h4>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#b0525e', marginBottom: '4px' }}>0 pcs</div>
              <div style={{ fontSize: '10px', color: '#888888' }}>Total tetap {item.total} pcs. Tidak ada penambahan/pengurangan stok.</div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Link href="/karyawan-produksi/riwayat-produksi" style={{ flex: 1, padding: '10px', backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '8px', color: '#555555', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>
                Kembali ke Riwayat
              </Link>
              <Link href={`/karyawan-produksi/riwayat-produksi/detail?id=${item.idBatch}`} style={{ flex: 1, padding: '10px', backgroundColor: '#b0525e', borderRadius: '8px', color: '#ffffff', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>
                Lihat Detail
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#444444',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  fontSize: '12px',
  outline: 'none',
  boxSizing: 'border-box',
  color: '#333333',
  backgroundColor: '#ffffff',
};

const cardRightStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
};

// EXPORT DEFAULT UTAMA DENGAN SUSPENSE UNTUK MENGHINDARI EROR
export default function UbahHasilProduksiPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UbahHasilProduksiContent />
    </Suspense>
  );
}