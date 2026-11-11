'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Info, Save, Upload } from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';

export default function TambahHasilProduksiPage() {
  const router = useRouter();

  // Form State
  const [tanggal, setTanggal] = useState('24 Oktober 2026');
  const [sif, setSif] = useState('Pagi • 08.00–16.00');
  const [idBatch, setIdBatch] = useState('PRD-261024-03');
  const [produkNama] = useState('Donat Keju');
  const [produkGambar] = useState('/donat-keju.png');

  const [jumlahTotal, setJumlahTotal] = useState('170');
  const [lolosMutu, setLolosMutu] = useState('168');
  const [ditolak, setDitolak] = useState('2');
  const [catatan, setCatatan] = useState('168 pcs lolos: 150 untuk pesanan Kafe Senja dan 18 untuk stok.');
  const [alasanPenolakan, setAlasanPenolakan] = useState('2 pcs bentuk tidak sesuai standar (pinggiran tidak rata).');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Kembali ke Riwayat Produksi dengan notif sukses
    router.push('/karyawan-produksi/riwayat-produksi?notif=disimpan');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* MODAL SUKSES */}
      <SuccessModal
        isOpen={isModalOpen}
        title="Berhasil disimpan"
        desc="Data hasil produksi berhasil disimpan."
        onClose={handleModalClose}
      />

      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
            Riwayat Produksi &gt; <span style={{ color: '#b0525e', fontWeight: 'bold' }}>Tambah Hasil</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Tambah hasil produksi
          </h2>
        </div>

        <span style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '6px 14px', borderRadius: '16px', fontSize: '11px', fontWeight: 'bold' }}>
          Draft baru — belum disimpan
        </span>
      </div>

      {/* TAMPILAN 2 KOLOM */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
        
        {/* PANEL KIRI: FORMULIR */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <h3 style={{ fontSize: '14px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Formulir hasil produksi
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>ID Batch / kode produksi *</label>
              <select value={idBatch} onChange={(e) => setIdBatch(e.target.value)} style={inputStyle}>
                <option value="PRD-261024-03">PRD-261024-03</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Produk • otomatis</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', backgroundColor: '#fdf0ee', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                  <Image src={produkGambar} alt={produkNama} fill style={{ objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#444444' }}>{produkNama}</span>
                <Lock size={14} color="#888888" style={{ marginLeft: 'auto' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Target produksi • otomatis</label>
              <input type="text" value="170 pcs" readOnly style={{ ...inputStyle, backgroundColor: '#fdf0ee' }} />
            </div>
            <div>
              <label style={labelStyle}>Satuan • otomatis</label>
              <input type="text" value="pcs" readOnly style={{ ...inputStyle, backgroundColor: '#fdf0ee' }} />
            </div>
            <div>
              <label style={labelStyle}>Petugas • otomatis</label>
              <input type="text" value="Siti Rahmah" readOnly style={{ ...inputStyle, backgroundColor: '#fdf0ee' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Jam mulai *</label>
              <input type="text" defaultValue="12.30" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Jam selesai *</label>
              <input type="text" defaultValue="14.30" style={inputStyle} />
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '4px 0' }} />

          <h3 style={{ fontSize: '14px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Hasil dan pemeriksaan mutu
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Total hasil (pcs) *</label>
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

          <div style={{ fontSize: '11px', color: '#137333', fontWeight: 'bold' }}>
            ✓ Jumlah sesuai: {lolosMutu} lolos + {ditolak} ditolak = {jumlahTotal} pcs.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Catatan hasil produksi</label>
              <textarea rows={3} value={catatan} onChange={(e) => setCatatan(e.target.value)} style={{ ...inputStyle, fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={labelStyle}>Alasan penolakan *</label>
              <textarea rows={3} value={alasanPenolakan} onChange={(e) => setAlasanPenolakan(e.target.value)} style={{ ...inputStyle, fontFamily: 'inherit' }} required />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Foto hasil produksi (opsional)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', color: '#555555' }}>
                <Upload size={14} />
                <span>Unggah Foto</span>
              </button>
              <span style={{ fontSize: '11px', color: '#888888' }}>Foto belum diunggah • JPG/PNG, maks. 2 MB.</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <Link href="/karyawan-produksi/riwayat-produksi" style={{ padding: '10px 24px', backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '8px', color: '#555555', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
              Batal
            </Link>
            <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#b0525e', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Save size={14} />
              <span>Simpan</span>
            </button>
          </div>

        </div>

        {/* PANEL KANAN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={cardRightStyle}>
            <h4 style={{ fontSize: '13px', color: '#b0525e', margin: '0 0 10px 0', fontWeight: 'bold' }}>Sedang diisi (draft)</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                <Image src={produkGambar} alt={produkNama} fill style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{produkNama}</div>
                <div style={{ fontSize: '10px', color: '#888888' }}>{idBatch}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
              <span>Total hasil</span>
              <span style={{ fontWeight: 'bold' }}>{jumlahTotal} pcs</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
              <span>Lolos mutu</span>
              <span style={{ fontWeight: 'bold', color: '#137333' }}>{lolosMutu} pcs</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '12px' }}>
              <span>Ditolak</span>
              <span style={{ fontWeight: 'bold', color: '#dc3545' }}>{ditolak} pcs</span>
            </div>

            <div style={{ backgroundColor: '#fff3cd', borderRadius: '8px', padding: '10px', fontSize: '10px', color: '#856404' }}>
              Hanya preview, belum masuk rekap dan stok. Setelah disimpan, stok bertambah {lolosMutu} pcs lolos mutu.
            </div>
          </div>

          <div style={cardRightStyle}>
            <h4 style={{ fontSize: '13px', color: '#b0525e', margin: '0 0 10px 0', fontWeight: 'bold' }}>Ketentuan pencatatan</h4>
            <div style={{ fontSize: '11px', color: '#555555', lineHeight: 1.5 }}>
              Total hasil = lolos mutu + ditolak. Alasan penolakan wajib diisi jika ada produk ditolak.
            </div>
          </div>

        </div>

      </form>

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