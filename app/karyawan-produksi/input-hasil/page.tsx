'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Pencil,
  CheckCircle2,
  Info,
  Upload,
  Save,
  Check,
  Eye,
} from 'lucide-react';

interface BatchItem {
  idBatch: string;
  produk: string;
  gambar: string;
  selesai: string;
  total: number;
  lolos: number;
  ditolak: number;
  petugas: string;
  status: 'Tersimpan';
}

const RIWAYAT_HARI_INI: BatchItem[] = [
  {
    idBatch: 'PRD-261024-03',
    produk: 'Donat Keju',
    gambar: '/donat-keju.png',
    selesai: '14.30 WIB',
    total: 170,
    lolos: 168,
    ditolak: 2,
    petugas: 'Siti Rahmah',
    status: 'Tersimpan',
  },
  {
    idBatch: 'PRD-261024-02',
    produk: 'Donat Gula',
    gambar: '/donat-gula.png',
    selesai: '12.00 WIB',
    total: 150,
    lolos: 148,
    ditolak: 2,
    petugas: 'Siti Rahmah',
    status: 'Tersimpan',
  },
  {
    idBatch: 'PRD-261024-01',
    produk: 'Donat Cokelat',
    gambar: '/donat-cokelat.png',
    selesai: '10.00 WIB',
    total: 250,
    lolos: 246,
    ditolak: 4,
    petugas: 'Siti Rahmah',
    status: 'Tersimpan',
  },
];

export default function InputHasilProduksiPage() {
  // State untuk mengontrol apakah tampilan berupa Form Input atau Hasil Tersimpan
  const [isSaved, setIsSaved] = useState(false);

  // Form State
  const [tanggal, setTanggal] = useState('24 Oktober 2026');
  const [sif, setSif] = useState('Pagi • 08.00–16.00');
  const [idBatch, setIdBatch] = useState('PRD-261024-03');
  const [produkNama, setProdukNama] = useState('Donat Keju');
  const [produkGambar, setProdukGambar] = useState('/donat-keju.png');
  const [jamMulai, setJamMulai] = useState('12.30');
  const [jamSelesai, setJamSelesai] = useState('14.30');

  const [jumlahTotal, setJumlahTotal] = useState('170');
  const [lolosMutu, setLolosMutu] = useState('168');
  const [ditolak, setDitolak] = useState('2');
  const [catatan, setCatatan] = useState('Hasil lolos 168 pcs: 150 untuk pesanan Kafe Senja dan 18 untuk stok.');
  const [alasanPenolakan, setAlasanPenolakan] = useState('2 pcs bentuk tidak sesuai standar (pinggiran tidak rata).');

  // Kalkulasi angka real-time
  const valTotal = parseInt(jumlahTotal) || 0;
  const valLolos = parseInt(lolosMutu) || 0;
  const valDitolak = parseInt(ditolak) || 0;
  const isJumlahSesuai = valLolos + valDitolak === valTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
  };

  const handleResetForm = () => {
    setIsSaved(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER UTAMA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {isSaved && (
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
              Home Page &gt; <span style={{ color: '#b0525e', fontWeight: 'bold' }}>Input Hasil Produksi</span>
            </div>
          )}
          <h2 style={{ fontSize: '24px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Input Hasil Produksi
          </h2>
        </div>

        {isSaved ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '6px 14px', borderRadius: '16px', fontSize: '11px', fontWeight: 'bold' }}>
              Tersimpan
            </span>
            <span style={{ fontSize: '11px', color: '#777777' }}>
              24 Oktober 2026 • 14.30 WIB
            </span>
          </div>
        ) : (
          <span style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '6px 14px', borderRadius: '16px', fontSize: '11px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Pencil size={12} />
            Draft — belum disimpan
          </span>
        )}
      </div>

      {/* BANNER NOTIFIKASI SUKSES (HANYA MUNCUL JIKA HASIL TERSIMPAN) */}
      {isSaved && (
        <div style={{ backgroundColor: '#e6f4ea', border: '1px solid #ceead6', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CheckCircle2 size={18} color="#137333" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#137333' }}>
              Data hasil produksi berhasil disimpan
            </div>
            <div style={{ fontSize: '11px', color: '#137333', marginTop: '2px' }}>
              {idBatch} disimpan pada 24 Oktober 2026, 14.30 WIB oleh Siti Rahmah. Sebanyak {lolosMutu} pcs Donat Keju lolos mutu telah masuk stok produk jadi.
            </div>
          </div>
        </div>
      )}

      {/* TAMPILAN 1: FORMULIR INPUT HASIL PRODUKSI (DRAFT MODE) */}
      {!isSaved ? (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
          
          {/* PANEL KIRI: FORMULIR INPUT */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* SUB-SECTION 1: FORMULIR HASIL PRODUKSI */}
            <div>
              <h3 style={sectionTitleStyle}>Formulir hasil produksi</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Tanggal produksi *</label>
                  <select value={tanggal} onChange={(e) => setTanggal(e.target.value)} style={inputStyle}>
                    <option value="24 Oktober 2026">24 Oktober 2026</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Sif *</label>
                  <select value={sif} onChange={(e) => setSif(e.target.value)} style={inputStyle}>
                    <option value="Pagi • 08.00–16.00">Pagi • 08.00–16.00</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>ID Batch *</label>
                  <select value={idBatch} onChange={(e) => setIdBatch(e.target.value)} style={inputStyle}>
                    <option value="PRD-261024-03">PRD-261024-03</option>
                    <option value="PRD-261024-02">PRD-261024-02</option>
                    <option value="PRD-261024-01">PRD-261024-01</option>
                  </select>
                  <div style={helpTextStyle}>Pilih ID Batch sesuai jadwal produksi Anda hari ini.</div>
                </div>

                <div>
                  <label style={labelStyle}>Produk</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', backgroundColor: '#fdf0ee', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                      <Image src={produkGambar} alt={produkNama} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#444444' }}>{produkNama}</span>
                  </div>
                  <div style={helpTextStyle}>Terisi otomatis dari kode produksi.</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Jam mulai *</label>
                  <input type="text" value={jamMulai} onChange={(e) => setJamMulai(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Jam selesai *</label>
                  <input type="text" value={jamSelesai} onChange={(e) => setJamSelesai(e.target.value)} style={inputStyle} />
                  <div style={helpTextStyle}>Wajib diisi. Catat waktu selesai produksi aktual.</div>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '4px 0' }} />

            {/* SUB-SECTION 2: HASIL DAN PEMERIKSAAN MUTU */}
            <div>
              <h3 style={sectionTitleStyle}>Hasil dan pemeriksaan mutu</h3>

              <div style={{ backgroundColor: '#fdf0ee', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#b0525e' }}>
                <Info size={14} />
                <span>Satuan hasil: pcs (sesuai produk Donat Keju). Masukkan angka bulat. Hanya produk jadi lolos mutu yang masuk stok.</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '10px' }}>
                <div>
                  <label style={labelStyle}>Jumlah produk jadi / total (pcs) *</label>
                  <input type="text" value={jumlahTotal} onChange={(e) => setJumlahTotal(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Lolos mutu (pcs) *</label>
                  <input type="text" value={lolosMutu} onChange={(e) => setLolosMutu(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Ditolak (pcs) *</label>
                  <input type="text" value={ditolak} onChange={(e) => setDitolak(e.target.value)} style={inputStyle} />
                </div>
              </div>

              {isJumlahSesuai && (
                <div style={{ fontSize: '11px', color: '#137333', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={14} />
                  <span>Jumlah sesuai: {valLolos} lolos + {valDitolak} ditolak = {valTotal} pcs.</span>
                </div>
              )}

              {/* DAFTAR PERIKSA MUTU */}
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Daftar periksa mutu</label>
                <div style={{ backgroundColor: '#fdf0ee', borderRadius: '10px', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#444444' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#137333" />
                    <span>Warna produk sesuai standar</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#137333" />
                    <span>Tekstur dan bentuk produk sesuai standar</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#137333" />
                    <span>Produk ditolak telah dipisahkan dari hasil layak jual</span>
                  </div>
                </div>
              </div>

              {/* CATATAN HASIL PRODUKSI */}
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Catatan hasil produksi</label>
                <input type="text" value={catatan} onChange={(e) => setCatatan(e.target.value)} style={inputStyle} />
                <div style={helpTextStyle}>Opsional. Catatan distribusi, kondisi produksi, atau informasi tambahan lainnya.</div>
              </div>

              {/* ALASAN PENOLAKAN */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ ...labelStyle, margin: 0 }}>Alasan penolakan *</label>
                  <span style={{ fontSize: '10px', color: '#b0525e', fontWeight: 'bold' }}>Wajib jika ada ditolak</span>
                </div>
                <input type="text" value={alasanPenolakan} onChange={(e) => setAlasanPenolakan(e.target.value)} style={inputStyle} />
                <div style={{ fontSize: '11px', color: '#137333', fontWeight: 'bold', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={14} />
                  <span>Alasan penolakan sudah diisi.</span>
                </div>
              </div>

              {/* FOTO HASIL PRODUKSI */}
              <div>
                <label style={labelStyle}>Foto hasil produksi</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', color: '#555555', cursor: 'pointer' }}>
                    <Upload size={14} />
                    <span>Unggah Foto</span>
                  </button>
                  <span style={{ fontSize: '11px', color: '#888888' }}>Opsional • JPG/PNG, maks. 2 MB. Foto produk jadi atau kendala.</span>
                </div>
              </div>
            </div>

            {/* TOMBOL BATAL & SIMPAN */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
              <button type="button" style={{ padding: '10px 24px', backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '8px', color: '#555555', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                Batal
              </button>

              <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#b0525e', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Save size={14} />
                <span>Simpan Hasil Produksi</span>
              </button>
            </div>

          </div>

          {/* PANEL KANAN: RINGKASAN DRAFT & PANDUAN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* SEDANG DIISI (DRAFT) */}
            <div style={cardRightStyle}>
              <h4 style={rightSectionTitleStyle}>
                <Pencil size={14} />
                <span>Sedang diisi (draft)</span>
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                  <Image src={produkGambar} alt={produkNama} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#333333' }}>{produkNama}</div>
                  <div style={{ fontSize: '10px', color: '#888888' }}>ID Batch {idBatch} • Sif Pagi • 24 Okt 2026</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666666', marginBottom: '4px' }}>
                <span>Total hasil (draft)</span>
                <span style={{ fontWeight: 'bold', color: '#333333' }}>{valTotal} pcs</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#137333', marginBottom: '4px' }}>
                <span>Lolos mutu (draft)</span>
                <span style={{ fontWeight: 'bold' }}>{valLolos} pcs</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#dc3545', marginBottom: '12px' }}>
                <span>Ditolak (draft)</span>
                <span style={{ fontWeight: 'bold' }}>{valDitolak} pcs</span>
              </div>

              <div style={{ backgroundColor: '#fff3cd', borderRadius: '8px', padding: '10px', fontSize: '10px', color: '#856404', lineHeight: 1.4 }}>
                Angka ini hanya preview. Belum masuk rekap hari ini hingga disimpan. Stok yang ditambahkan hanya {valLolos} pcs lolos mutu.
              </div>
            </div>

            {/* REKAP HARI INI (TERSIMPAN) */}
            <div style={cardRightStyle}>
              <h4 style={rightSectionTitleStyle}>Rekap hari ini (tersimpan)</h4>
              <div style={{ fontSize: '10px', color: '#888888', marginBottom: '12px' }}>24 Oktober 2026 • Sif Pagi</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666666', marginBottom: '6px' }}>
                <span>Total hasil dicatat</span>
                <span style={{ fontWeight: 'bold', color: '#333333' }}>400 pcs</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#137333', marginBottom: '6px' }}>
                <span>Lolos mutu</span>
                <span style={{ fontWeight: 'bold' }}>394 pcs</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#dc3545', marginBottom: '6px' }}>
                <span>Ditolak</span>
                <span style={{ fontWeight: 'bold' }}>6 pcs</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666666', marginBottom: '12px' }}>
                <span>Tingkat kelulusan</span>
                <span style={{ fontWeight: 'bold', color: '#333333' }}>98,5%</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666666', paddingTop: '10px', borderTop: '1px solid #f0f0f0' }}>
                <span>Sesi tersimpan</span>
                <span style={{ fontWeight: 'bold', color: '#1a73e8' }}>2 kelompok</span>
              </div>

              <div style={{ backgroundColor: '#e8f0fe', borderRadius: '8px', padding: '8px 10px', marginTop: '10px', fontSize: '10px', color: '#1a73e8', lineHeight: 1.3 }}>
                Rekap dari 2 kelompok produksi tersimpan hari ini. Draft tidak dihitung.
              </div>
            </div>

            {/* PANDUAN PENGISIAN */}
            <div style={cardRightStyle}>
              <h4 style={rightSectionTitleStyle}>Panduan pengisian</h4>
              <ol style={{ paddingLeft: '16px', margin: 0, fontSize: '11px', color: '#555555', lineHeight: 1.5 }}>
                <li style={{ marginBottom: '6px' }}>
                  Hitung total hasil, lalu pisahkan lolos mutu dan ditolak. Jumlah harus sama: lolos + ditolak = total.
                </li>
                <li>
                  Jika ada produk ditolak, wajib isi alasan penolakan.
                </li>
              </ol>

              <div style={{ backgroundColor: '#fff7ed', borderRadius: '8px', padding: '10px', marginTop: '12px', fontSize: '10px', color: '#c2410c', lineHeight: 1.4 }}>
                Hanya produk jadi lolos mutu yang masuk stok (contoh: 168 pcs dari 170 total). Koreksi hasil tersimpan melalui aksi Ubah pada Riwayat Produksi.
              </div>
            </div>

          </div>

        </form>
      ) : (
        /* TAMPILAN 2: HASIL TERSIMPAN (SUBMITTED SUCCESS STATE) */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
          
          {/* PANEL KIRI: DETAIL HASIL TERSIMPAN & RIWAYAT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* KARTU 1: DATA HASIL PRODUKSI TERSIMPAN */}
            <div style={cardRightStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', color: '#b0525e', margin: '0 0 4px 0', fontWeight: 'bold' }}>
                    Data hasil produksi tersimpan
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 'bold', color: '#333333' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                      <Image src={produkGambar} alt={produkNama} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <span>{produkNama}</span>
                    <span style={{ fontSize: '11px', color: '#888888', fontWeight: 'normal' }}>ID Batch {idBatch}</span>
                  </div>
                </div>

                <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                  Selesai
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '14px' }}>
                <div>
                  <div style={labelTitleStyle}>Tanggal / sif</div>
                  <div style={valueContentStyle}>24 Okt 2026 • Pagi</div>
                </div>
                <div>
                  <div style={labelTitleStyle}>Waktu produksi</div>
                  <div style={valueContentStyle}>12.30–14.30 WIB</div>
                </div>
                <div>
                  <div style={labelTitleStyle}>Target produksi</div>
                  <div style={valueContentStyle}>170 pcs</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid #f0f0f0', paddingTop: '14px', marginBottom: '16px' }}>
                <div>
                  <div style={labelTitleStyle}>Total hasil</div>
                  <div style={valueContentStyle}>{valTotal} pcs</div>
                </div>
                <div>
                  <div style={labelTitleStyle}>Lolos mutu</div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#137333' }}>{valLolos} pcs</div>
                </div>
                <div>
                  <div style={labelTitleStyle}>Ditolak</div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#dc3545' }}>{valDitolak} pcs</div>
                </div>
              </div>

              {/* HIGHLIGHT KELULUSAN */}
              <div style={{ backgroundColor: '#e8f0fe', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Info size={18} color="#1a73e8" />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#1a73e8' }}>
                    Tingkat kelulusan batch 98,8%
                  </div>
                  <div style={{ fontSize: '11px', color: '#555555', marginTop: '2px' }}>
                    168 lolos + 2 ditolak = 170 pcs. Produk ditolak dipisahkan dan tidak menambah stok siap jual.
                  </div>
                </div>
              </div>

              {/* CATATAN & ALASAN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                <div>
                  <span style={{ color: '#888888' }}>Catatan hasil produksi:</span>
                  <div style={{ fontWeight: 'bold', color: '#333333', marginTop: '2px' }}>{catatan}</div>
                </div>
                <div>
                  <span style={{ color: '#888888' }}>Alasan penolakan:</span>
                  <div style={{ fontWeight: 'bold', color: '#333333', marginTop: '2px' }}>{alasanPenolakan}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: '10px', marginTop: '4px' }}>
                  <span style={{ color: '#888888' }}>Foto hasil produksi</span>
                  <span style={{ color: '#888888' }}>Tidak ada foto</span>
                </div>
              </div>
            </div>

            {/* KARTU 2: STOK PRODUK JADI TELAH BERTAMBAH */}
            <div style={cardRightStyle}>
              <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#333333', margin: '0 0 10px 0' }}>
                Stok produk jadi telah bertambah
              </h4>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#137333' }}>
                  +{valLolos} pcs
                </div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333333' }}>
                  {produkNama} • {idBatch}
                  <div style={{ fontSize: '10px', color: '#888888', fontWeight: 'normal' }}>
                    Hanya jumlah lolos mutu yang ditambahkan, bukan total {valTotal} pcs.
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '10px', color: '#888888', borderTop: '1px solid #f0f0f0', paddingTop: '8px' }}>
                Mutasi masuk tercatat 24 Okt 2026. 14.30 WIB • Siti Rahmah. Batch ini sudah disimpan: tidak perlu dicatat ulang.
              </div>
            </div>

            {/* KARTU 3: RIWAYAT HASIL PRODUKSI HARI INI */}
            <div style={cardRightStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '15px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
                    Riwayat hasil produksi hari ini
                  </h3>
                  <div style={{ fontSize: '10px', color: '#888888', marginTop: '2px' }}>
                    24 Oktober 2026 • 3 kelompok produksi tersimpan • Urutan terbaru
                  </div>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fdf0ee', color: '#b0525e', textAlign: 'left' }}>
                    <th style={{ padding: '10px 12px', borderRadius: '6px 0 0 6px' }}>ID Batch / Produk</th>
                    <th style={{ padding: '10px 12px' }}>Selesai</th>
                    <th style={{ padding: '10px 12px' }}>Total</th>
                    <th style={{ padding: '10px 12px' }}>Lolos</th>
                    <th style={{ padding: '10px 12px' }}>Ditolak</th>
                    <th style={{ padding: '10px 12px' }}>Petugas</th>
                    <th style={{ padding: '10px 12px' }}>Status</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right', borderRadius: '0 6px 6px 0' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {RIWAYAT_HARI_INI.map((item) => (
                    <tr key={item.idBatch} style={{ borderBottom: '1px solid #f5f5f5' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '4px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                            <Image src={item.gambar} alt={item.produk} fill style={{ objectFit: 'cover' }} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 'bold', color: '#333333', fontSize: '11px' }}>{item.idBatch}</div>
                            <div style={{ fontSize: '10px', color: '#777777' }}>{item.produk}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px', color: '#555555' }}>{item.selesai}</td>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#333333' }}>{item.total} pcs</td>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#137333' }}>{item.lolos} pcs</td>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#dc3545' }}>{item.ditolak} pcs</td>
                      <td style={{ padding: '12px', color: '#555555' }}>{item.petugas}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <Link href="/karyawan-produksi/riwayat-produksi" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#b0525e', fontWeight: 'bold', textDecoration: 'none' }}>
                          <Eye size={12} />
                          <span>Lihat Detail</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* TOMBOL INPUT BATCH LAIN */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={handleResetForm}
                  style={{
                    padding: '8px 20px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #cccccc',
                    borderRadius: '8px',
                    color: '#555555',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Input Batch Lain
                </button>
              </div>

            </div>

          </div>

          {/* PANEL KANAN: REKAP TERBARU & JEJAK PENYIMPANAN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* REKAP HARI INI (TERSIMPAN TERBARU) */}
            <div style={cardRightStyle}>
              <h4 style={rightSectionTitleStyle}>Rekap hari ini (tersimpan)</h4>
              <div style={{ fontSize: '10px', color: '#888888', marginBottom: '12px' }}>24 Oktober 2026 - 14.30 WIB - Sif Pagi</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666666', marginBottom: '6px' }}>
                <span>Total hasil dicatat</span>
                <span style={{ fontWeight: 'bold', color: '#333333' }}>570 pcs</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#137333', marginBottom: '6px' }}>
                <span>Lolos mutu</span>
                <span style={{ fontWeight: 'bold' }}>562 pcs</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#dc3545', marginBottom: '6px' }}>
                <span>Ditolak</span>
                <span style={{ fontWeight: 'bold' }}>8 pcs</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666666', marginBottom: '12px' }}>
                <span>Tingkat kelulusan</span>
                <span style={{ fontWeight: 'bold', color: '#333333' }}>98,6%</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666666', paddingTop: '10px', borderTop: '1px solid #f0f0f0' }}>
                <span>Sesi tersimpan</span>
                <span style={{ fontWeight: 'bold', color: '#1a73e8' }}>3 kelompok</span>
              </div>

              <div style={{ fontSize: '10px', color: '#888888', marginTop: '10px' }}>
                Termasuk Donat Keju yang disimpan pukul 14.30 WIB.
              </div>
            </div>

            {/* JEJAK PENYIMPANAN */}
            <div style={cardRightStyle}>
              <h4 style={rightSectionTitleStyle}>Jejak penyimpanan</h4>

              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px', fontSize: '11px', marginBottom: '6px' }}>
                <span style={{ color: '#888888' }}>Petugas</span>
                <span style={{ fontWeight: 'bold', color: '#333333' }}>Siti Rahmah</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px', fontSize: '11px', marginBottom: '6px' }}>
                <span style={{ color: '#888888' }}>Waktu simpan</span>
                <span style={{ fontWeight: 'bold', color: '#333333' }}>24 Oktober 2026, 14.30 WIB</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px', fontSize: '11px', marginBottom: '12px' }}>
                <span style={{ color: '#888888' }}>Referensi</span>
                <span style={{ fontWeight: 'bold', color: '#333333' }}>{idBatch}</span>
              </div>

              <div style={{ fontSize: '10px', color: '#888888', lineHeight: 1.4 }}>
                Hasil tersimpan di Riwayat Produksi. Jika diperlukan, koreksi melalui aksi Ubah pada hasil yang sama.
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* STYLES HELPER */
const sectionTitleStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#b0525e',
  margin: '0 0 14px 0',
  fontWeight: 'bold',
};

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

const helpTextStyle: React.CSSProperties = {
  fontSize: '10px',
  color: '#888888',
  marginTop: '4px',
};

const cardRightStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
};

const rightSectionTitleStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#b0525e',
  margin: '0 0 12px 0',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
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