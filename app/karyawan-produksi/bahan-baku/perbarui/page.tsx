'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Info, AlertTriangle, Save } from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';

interface ItemMasterBahan {
  id: string;
  nama: string;
  satuan: string;
  stokTersimpan: number;
  stokMinimum: number;
  lokasi: string;
  kedaluwarsa: string;
}

const DATA_MASTER_BAHAN: Record<string, ItemMasterBahan> = {
  'BB-001': {
    id: 'BB-001',
    nama: 'Tepung Terigu',
    satuan: 'kg',
    stokTersimpan: 125,
    stokMinimum: 50,
    lokasi: 'Rak A-01',
    kedaluwarsa: '20 Des 2026',
  },
  'BB-002': {
    id: 'BB-002',
    nama: 'Gula Pasir',
    satuan: 'kg',
    stokTersimpan: 60,
    stokMinimum: 25,
    lokasi: 'Rak A-02',
    kedaluwarsa: '10 Mar 2027',
  },
  'BB-003': {
    id: 'BB-003',
    nama: 'Mentega',
    satuan: 'kg',
    stokTersimpan: 8,
    stokMinimum: 15,
    lokasi: 'Pendingin B-01',
    kedaluwarsa: '02 Nov 2026',
  },
  'BB-004': {
    id: 'BB-004',
    nama: 'Cokelat Batang',
    satuan: 'kg',
    stokTersimpan: 6,
    stokMinimum: 10,
    lokasi: 'Rak B-02',
    kedaluwarsa: '18 Des 2026',
  },
  'BB-005': {
    id: 'BB-005',
    nama: 'Telur',
    satuan: 'kg',
    stokTersimpan: 30,
    stokMinimum: 15,
    lokasi: 'Pendingin B-02',
    kedaluwarsa: '30 Okt 2026',
  },
  'BB-006': {
    id: 'BB-006',
    nama: 'Keju Cheddar',
    satuan: 'kg',
    stokTersimpan: 18,
    stokMinimum: 10,
    lokasi: 'Pendingin B-01',
    kedaluwarsa: '15 Nov 2026',
  },
  'BB-007': {
    id: 'BB-007',
    nama: 'Susu Bubuk',
    satuan: 'kg',
    stokTersimpan: 12,
    stokMinimum: 5,
    lokasi: 'Rak A-03',
    kedaluwarsa: '12 Jan 2027',
  },
  'BB-008': {
    id: 'BB-008',
    nama: 'Ragi Instan',
    satuan: 'kg',
    stokTersimpan: 2,
    stokMinimum: 1,
    lokasi: 'Rak A-03',
    kedaluwarsa: '28 Feb 2027',
  },
};

function PerbaruiStokBahanBakuContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 'BB-003';

  const bahan = DATA_MASTER_BAHAN[id] || DATA_MASTER_BAHAN['BB-003'];

  // Form State
  const [jenisPerubahan, setJenisPerubahan] = useState('Pemakaian produksi');
  const [referensiProduksi, setReferensiProduksi] = useState('PRD-261024-03 • Donat Keju');
  const [jumlahPemakaian, setJumlahPemakaian] = useState<string>('0,8');
  const [alasan, setAlasan] = useState(
    `Pemakaian 0,8 kg ${bahan.nama.toLowerCase()} untuk produksi Donat Keju, PRD-261024-03.`
  );

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Perhitungan Nilai Draft Stok
  const valJumlah = parseFloat(jumlahPemakaian.replace(',', '.')) || 0;
  const stokSesudah = Math.max(0, bahan.stokTersimpan - valJumlah);
  const isStokRendah = stokSesudah < bahan.stokMinimum;
  const selisihKurang = (bahan.stokMinimum - stokSesudah).toFixed(1).replace('.', ',');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push('/karyawan-produksi/bahan-baku?notif=disimpan');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* MODAL SUKSES */}
      <SuccessModal
        isOpen={isModalOpen}
        title="Berhasil diedit"
        desc="Perubahan berhasil disimpan."
        onClose={handleModalClose}
      />

      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
            Data Bahan Baku &gt; <span style={{ color: '#b0525e', fontWeight: 'bold' }}>Perbarui Stok Bahan Baku</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Perbarui Stok Bahan Baku
          </h2>
        </div>

        <span
          style={{
            backgroundColor: '#fff3cd',
            color: '#856404',
            padding: '6px 14px',
            borderRadius: '16px',
            fontSize: '11px',
            fontWeight: 'bold',
          }}
        >
          Draft — belum disimpan
        </span>
      </div>

      {/* TAMPILAN 2 KOLOM */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
        
        {/* KOLOM KIRI: FORMULIR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* KARTU IDENTITAS BAHAN */}
          <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>Identitas bahan • hanya baca</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
              <div>
                <div style={labelTitleStyle}>Kode bahan</div>
                <div style={valueContentStyle}>{bahan.id}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Nama bahan</div>
                <div style={valueContentStyle}>{bahan.nama}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Satuan</div>
                <div style={valueContentStyle}>{bahan.satuan}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid #f0f0f0', paddingTop: '14px' }}>
              <div>
                <div style={labelTitleStyle}>Stok minimum</div>
                <div style={valueContentStyle}>{bahan.stokMinimum} {bahan.satuan}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Lokasi</div>
                <div style={valueContentStyle}>{bahan.lokasi}</div>
              </div>
              <div>
                <div style={labelTitleStyle}>Kedaluwarsa</div>
                <div style={valueContentStyle}>{bahan.kedaluwarsa}</div>
              </div>
            </div>

            <div style={{ fontSize: '10px', color: '#888888', marginTop: '16px', lineHeight: 1.4 }}>
              Data master dikelola admin. Karyawan produksi hanya melihat bahan dan memperbarui stok untuk pemakaian, koreksi operasional, atau pencatatan bahan rusak/reject.
            </div>
          </div>

          {/* KARTU FORMULIR PENYESUAIAN */}
          <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>Formulir penyesuaian / pemakaian stok</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelFormStyle}>Tanggal pencatatan</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value="24 Oktober 2026"
                    readOnly
                    style={{ ...inputStyle, backgroundColor: '#fdf0ee', color: '#555555', cursor: 'not-allowed', paddingRight: '36px' }}
                  />
                  <Lock size={14} color="#888888" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label style={labelFormStyle}>Petugas</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value="Siti Rahmah"
                    readOnly
                    style={{ ...inputStyle, backgroundColor: '#fdf0ee', color: '#555555', cursor: 'not-allowed', paddingRight: '36px' }}
                  />
                  <Lock size={14} color="#888888" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelFormStyle}>Jenis perubahan *</label>
              <select
                value={jenisPerubahan}
                onChange={(e) => setJenisPerubahan(e.target.value)}
                style={inputStyle}
              >
                <option value="Pemakaian produksi">Pemakaian produksi</option>
                <option value="Koreksi operasional">Koreksi operasional</option>
                <option value="Bahan rusak/reject">Bahan rusak/reject</option>
              </select>
              <div style={helpTextStyle}>
                Pilih sesuai kebutuhan. Pemakaian dan bahan rusak/reject mengurangi stok; koreksi untuk selisih operasional. Bukan penerimaan barang supplier.
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelFormStyle}>Referensi produksi *</label>
              <select
                value={referensiProduksi}
                onChange={(e) => setReferensiProduksi(e.target.value)}
                style={inputStyle}
              >
                <option value="PRD-261024-03 • Donat Keju">PRD-261024-03 • Donat Keju</option>
                <option value="PRD-261024-01 • Donat Cokelat">PRD-261024-01 • Donat Cokelat</option>
                <option value="PRD-261024-02 • Donat Gula">PRD-261024-02 • Donat Gula</option>
              </select>
              <div style={helpTextStyle}>
                Gunakan referensi produksi (ID Batch) yang sesuai. Pemakaian {jumlahPemakaian} {bahan.satuan} untuk referensi ini belum dicatat.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelFormStyle}>Jumlah pemakaian *</label>
                <input
                  type="text"
                  value={jumlahPemakaian}
                  onChange={(e) => setJumlahPemakaian(e.target.value)}
                  style={inputStyle}
                  required
                />
                <div style={helpTextStyle}>
                  Lebih dari 0 dan maksimal {bahan.stokTersimpan} {bahan.satuan} (stok tersedia).
                </div>
              </div>

              <div>
                <label style={labelFormStyle}>Satuan • dari master</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={bahan.satuan}
                    readOnly
                    style={{ ...inputStyle, backgroundColor: '#fdf0ee', color: '#555555', cursor: 'not-allowed', paddingRight: '36px' }}
                  />
                  <Lock size={14} color="#888888" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelFormStyle}>Alasan / keterangan *</label>
              <textarea
                rows={3}
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }}
                required
              />
              <div style={helpTextStyle}>
                Wajib diisi untuk semua jenis perubahan. Alasan ini disimpan pada jejak stok bersama petugas dan waktu pembaruan.
              </div>
            </div>

            {/* BOX HIGHLIGHT 1: INFORMASI PREVENSI EROR */}
            <div style={{ backgroundColor: '#e8f0fe', borderRadius: '10px', padding: '12px 14px', marginBottom: '12px', display: 'flex', gap: '10px' }}>
              <Info size={16} color="#1a73e8" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#1a73e8' }}>
                  Cegah stok negatif dan pengurangan ganda
                </div>
                <div style={{ fontSize: '10px', color: '#555555', marginTop: '2px', lineHeight: 1.4 }}>
                  Stok akhir harus ≥ 0 kg. Validasi dilakukan saat simpan: jika jumlah melebihi saldo, pembaruan ditolak dan form dikembalikan dengan pesan error. Jangan catat ulang pemakaian yang telah masuk riwayat; gunakan koreksi operasional dengan alasan yang jelas bila ada selisih.
                </div>
              </div>
            </div>

            {/* BOX HIGHLIGHT 2: PERHATIAN STOK RENDAH */}
            {isStokRendah && (
              <div style={{ backgroundColor: '#fff3cd', borderRadius: '10px', padding: '12px 14px', display: 'flex', gap: '10px' }}>
                <AlertTriangle size={16} color="#856404" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#856404' }}>
                    Stok tetap di bawah minimum {bahan.stokMinimum} {bahan.satuan}
                  </div>
                  <div style={{ fontSize: '10px', color: '#666666', marginTop: '2px', lineHeight: 1.4 }}>
                    Pratinjau stok akhir {stokSesudah.toString().replace('.', ',')} {bahan.satuan}, kurang {selisihKurang} {bahan.satuan} dari minimum. Laporkan kebutuhan kepada admin; pembaruan ini bukan penerimaan barang.
                  </div>
                </div>
              </div>
            )}

            {/* TOMBOL BATAL & SIMPAN */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <Link
                href="/karyawan-produksi/bahan-baku"
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cccccc',
                  borderRadius: '8px',
                  color: '#555555',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                Batal
              </Link>

              <button
                type="submit"
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#b0525e',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Save size={14} />
                <span>Simpan Pembaruan</span>
              </button>
            </div>

          </div>

        </div>

        {/* KOLOM KANAN: RINGKASAN STOK, PEMERIKSAAN & JEJAK */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* RINGKASAN STOK (DRAFT) */}
          <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>
              Ringkasan stok (draft)<br />
              <span style={{ fontSize: '15px', color: '#333333' }}>{bahan.nama} • {bahan.id}</span>
            </h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666666', marginBottom: '6px' }}>
              <span>Sebelum (tersimpan)</span>
              <span style={{ fontWeight: 'bold', color: '#333333' }}>{bahan.stokTersimpan} {bahan.satuan}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#dc3545', marginBottom: '12px', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
              <span>Pemakaian (draft)</span>
              <span style={{ fontWeight: 'bold' }}>-{valJumlah.toString().replace('.', ',')} {bahan.satuan}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#555555' }}>Sesudah (draft)</span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#b0525e' }}>
                {stokSesudah.toString().replace('.', ',')} {bahan.satuan}
              </span>
            </div>

            <div style={{ fontSize: '11px', color: '#137333', fontWeight: 'bold', marginBottom: '8px' }}>
              ✓ {bahan.stokTersimpan} {bahan.satuan} – {valJumlah.toString().replace('.', ',')} {bahan.satuan} = {stokSesudah.toString().replace('.', ',')} {bahan.satuan}
            </div>

            {isStokRendah && (
              <span style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '4px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold', display: 'inline-block', marginBottom: '12px' }}>
                Stok rendah
              </span>
            )}

            <div style={{ backgroundColor: '#fff7ed', borderRadius: '10px', padding: '12px', display: 'flex', gap: '8px', fontSize: '10px', color: '#c2410c' }}>
              <Info size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Belum mengubah stok</strong><br />
                Daftar bahan dan Home Page tetap menampilkan {bahan.stokTersimpan} {bahan.satuan}. Stok menjadi {stokSesudah.toString().replace('.', ',')} {bahan.satuan} hanya setelah Simpan Pembaruan.
              </div>
            </div>
          </div>

          {/* PEMERIKSAAN PEMBARUAN */}
          <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>Pemeriksaan pembaruan</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#137333', lineHeight: 1.4 }}>
              <div>
                ✓ Jumlah {jumlahPemakaian} {bahan.satuan} tidak melebihi stok {bahan.stokTersimpan} {bahan.satuan}. Stok akhir tidak negatif.
              </div>
              <div>
                ✓ Pemakaian PRD-261024-03 belum tercatat di jejak stok {bahan.nama}.
              </div>
              <div>
                ✓ Alasan/keterangan telah diisi. Jenis perubahan dipilih.
              </div>
            </div>

            <div style={{ fontSize: '10px', color: '#888888', marginTop: '12px', lineHeight: 1.4, borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
              Jika pemakaian atau reject yang sama sudah tercatat, pembaruan ditolak agar stok tidak dikurangi dua kali. Untuk reject: satuan selalu mengikuti master bahan ({bahan.satuan}), bukan unit buah atau kemasan.
            </div>
          </div>

          {/* JEJAK SETELAH SIMPAN */}
          <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>Jejak setelah simpan</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px', fontSize: '11px', marginBottom: '6px' }}>
              <span style={{ color: '#888888' }}>Petugas</span>
              <span style={{ fontWeight: 'bold', color: '#333333' }}>Siti Rahmah</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px', fontSize: '11px', marginBottom: '6px' }}>
              <span style={{ color: '#888888' }}>Draft disiapkan</span>
              <span style={{ fontWeight: 'bold', color: '#333333' }}>24 Oktober 2026, 13.15 WIB</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px', fontSize: '11px', marginBottom: '12px' }}>
              <span style={{ color: '#888888' }}>Referensi / jenis</span>
              <span style={{ fontWeight: 'bold', color: '#333333' }}>PRD-261024-03 • Pemakaian</span>
            </div>

            <div style={{ fontSize: '10px', color: '#888888', lineHeight: 1.4 }}>
              Belum ada jejak baru. Setelah disimpan, jejak mencatat petugas, waktu simpan, jenis perubahan, alasan wajib, dan saldo {bahan.stokTersimpan} {bahan.satuan} → {stokSesudah.toString().replace('.', ',')} {bahan.satuan}.
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}

const cardStyle: React.CSSProperties = {
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

const labelFormStyle: React.CSSProperties = {
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

const helpTextStyle: React.CSSProperties = {
  fontSize: '10px',
  color: '#888888',
  marginTop: '4px',
  lineHeight: 1.4,
};

export default function PerbaruiStokBahanBakuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PerbaruiStokBahanBakuContent />
    </Suspense>
  );
}