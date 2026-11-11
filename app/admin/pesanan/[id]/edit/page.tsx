'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';

interface EditDataRecord {
  pelanggan: string;
  produk: string;
  kodeProduk: string;
  tglPesanan: string;
  waktuPengambilan: string;
  kuantitas: string;
  hargaSatuan: string;
  total: string;
  statusPesanan: string;
  statusPembayaran: string;
  metodePembayaran: string;
  catatan: string;
  imageSrc: string;
}

const ALL_EDIT_DATA: Record<string, EditDataRecord> = {
  'PSN-261024-01': {
    pelanggan: 'Toko Sari',
    produk: 'Donat Cokelat',
    kodeProduk: 'PRD-001 • per pcs',
    tglPesanan: '2026-10-24',
    waktuPengambilan: '14:00',
    kuantitas: '200',
    hargaSatuan: 'Rp8.000',
    total: 'Rp1.600.000',
    statusPesanan: 'Siap dikirim',
    statusPembayaran: 'Lunas',
    metodePembayaran: 'Transfer bank',
    catatan: '200 Donat Cokelat siap diambil pukul 14.00. Pembayaran lunas melalui transfer bank.',
    imageSrc: '/donat-cokelat.png',
  },
  'PSN-261024-02': {
    pelanggan: 'Kafe Senja',
    produk: 'Donat Keju',
    kodeProduk: 'PRD-002 • per pcs',
    tglPesanan: '2026-10-24',
    waktuPengambilan: '15:30',
    kuantitas: '150',
    hargaSatuan: 'Rp9.000',
    total: 'Rp1.350.000',
    statusPesanan: 'Diproduksi',
    statusPembayaran: 'Lunas',
    metodePembayaran: 'Transfer bank',
    catatan: '150 Donat Keju diproses pada batch produksi 2.',
    imageSrc: '/donat-keju.png',
  },
  'PSN-261024-03': {
    pelanggan: 'Dina Lestari',
    produk: 'Donat Gula',
    kodeProduk: 'PRD-003 • per pcs',
    tglPesanan: '2026-10-24',
    waktuPengambilan: '11:00',
    kuantitas: '120',
    hargaSatuan: 'Rp12.000',
    total: 'Rp1.440.000',
    statusPesanan: 'Siap dikirim',
    statusPembayaran: 'Lunas',
    metodePembayaran: 'Tunai',
    catatan: 'Pembayaran tunai saat pengambilan di outlet.',
    imageSrc: '/donat-gula.png',
  },
  'PSN-261024-04': {
    pelanggan: 'Bima Pratama',
    produk: 'Donat Stroberi',
    kodeProduk: 'PRD-004 • per pcs',
    tglPesanan: '2026-10-24',
    waktuPengambilan: '16:00',
    kuantitas: '50',
    hargaSatuan: 'Rp11.800',
    total: 'Rp590.000',
    statusPesanan: 'Menunggu bayar',
    statusPembayaran: 'Belum lunas',
    metodePembayaran: 'Transfer bank',
    catatan: 'Konfirmasi bukti transfer sebelum diproses.',
    imageSrc: '/donat-stroberi.png',
  },
};

export default function EditPesananAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'PSN-261024-01';

  const initialData = ALL_EDIT_DATA[id] || ALL_EDIT_DATA['PSN-261024-01'];

  const [pelanggan, setPelanggan] = useState(initialData.pelanggan);
  const [tglPesanan, setTglPesanan] = useState(initialData.tglPesanan);
  const [waktuPengambilan, setWaktuPengambilan] = useState(initialData.waktuPengambilan);
  const [kuantitas, setKuantitas] = useState(initialData.kuantitas);
  const [statusPesanan, setStatusPesanan] = useState(initialData.statusPesanan);
  const [statusPembayaran, setStatusPembayaran] = useState(initialData.statusPembayaran);
  const [metodePembayaran, setMetodePembayaran] = useState(initialData.metodePembayaran);
  const [catatan, setCatatan] = useState(initialData.catatan);

  useEffect(() => {
    const data = ALL_EDIT_DATA[id] || ALL_EDIT_DATA['PSN-261024-01'];
    setPelanggan(data.pelanggan);
    setTglPesanan(data.tglPesanan);
    setWaktuPengambilan(data.waktuPengambilan);
    setKuantitas(data.kuantitas);
    setStatusPesanan(data.statusPesanan);
    setStatusPembayaran(data.statusPembayaran);
    setMetodePembayaran(data.metodePembayaran);
    setCatatan(data.catatan);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/pesanan?notify=edit');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Pesanan &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Edit Pesanan</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Edit Pesanan
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Perbarui informasi pesanan {id}, lalu simpan perubahan Anda.
          </div>
        </div>

        <Link
          href="/admin/pesanan"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            border: '1px solid #6b21a8',
            borderRadius: '20px',
            color: '#6b21a8',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Data Pesanan</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* INFORMASI PESANAN */}
        <div style={cardFormStyle}>
          <h3 style={sectionTitleStyle}>Informasi pesanan</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Nomor pesanan *</label>
              <input type="text" value={id} disabled style={{ ...inputStyle, backgroundColor: '#f3f4f6', cursor: 'not-allowed' }} />
            </div>
            <div>
              <label style={labelStyle}>Nama pelanggan *</label>
              <input type="text" value={pelanggan} onChange={(e) => setPelanggan(e.target.value)} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Tanggal pesanan *</label>
              <input type="date" value={tglPesanan} onChange={(e) => setTglPesanan(e.target.value)} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Waktu pengambilan</label>
              <input type="time" value={waktuPengambilan} onChange={(e) => setWaktuPengambilan(e.target.value)} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* ITEM PESANAN */}
        <div style={cardFormStyle}>
          <h3 style={sectionTitleStyle}>Item pesanan</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '16px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Produk</th>
                <th style={{ padding: '10px' }}>Kuantitas (pcs)</th>
                <th style={{ padding: '10px' }}>Harga satuan</th>
                <th style={{ padding: '10px' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={initialData.imageSrc}
                      alt={initialData.produk}
                      style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', backgroundColor: '#f3e8ff' }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#333' }}>{initialData.produk}</div>
                      <div style={{ fontSize: '10px', color: '#888' }}>{initialData.kodeProduk}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '10px' }}>
                  <input type="number" value={kuantitas} onChange={(e) => setKuantitas(e.target.value)} style={{ ...inputStyle, width: '100px' }} />
                </td>
                <td style={{ padding: '10px', color: '#333' }}>{initialData.hargaSatuan}</td>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>{initialData.total}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button type="button" style={{ padding: '8px 16px', border: '1px solid #d8b4fe', borderRadius: '16px', backgroundColor: '#ffffff', color: '#6b21a8', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              + Tambah item
            </button>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
              Total pesanan <span style={{ color: '#6b21a8', fontSize: '18px', marginLeft: '8px' }}>{initialData.total}</span>
            </div>
          </div>
        </div>

        {/* STATUS & CATATAN */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
          <div style={cardFormStyle}>
            <h3 style={sectionTitleStyle}>Status dan pembayaran</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Status pesanan *</label>
                <select value={statusPesanan} onChange={(e) => setStatusPesanan(e.target.value)} style={inputStyle}>
                  <option value="Siap dikirim">Siap dikirim</option>
                  <option value="Diproduksi">Diproduksi</option>
                  <option value="Menunggu bayar">Menunggu bayar</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Status pembayaran *</label>
                <select value={statusPembayaran} onChange={(e) => setStatusPembayaran(e.target.value)} style={inputStyle}>
                  <option value="Lunas">Lunas</option>
                  <option value="Belum lunas">Belum lunas</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Metode pembayaran</label>
                <select value={metodePembayaran} onChange={(e) => setMetodePembayaran(e.target.value)} style={inputStyle}>
                  <option value="Transfer bank">Transfer bank</option>
                  <option value="Tunai">Tunai</option>
                </select>
              </div>
            </div>
          </div>

          <div style={cardFormStyle}>
            <h3 style={sectionTitleStyle}>Catatan pesanan</h3>
            <label style={labelStyle}>Catatan (opsional)</label>
            <textarea rows={3} value={catatan} onChange={(e) => setCatatan(e.target.value)} style={{ ...inputStyle, fontFamily: 'inherit' }} />
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>
            * Wajib diisi. Periksa kembali total dan status sebelum menyimpan.
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={() => router.push('/admin/pesanan')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
              Batal
            </button>
            <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} /> Simpan Perubahan
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}

const cardFormStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#6b21a8',
  margin: '0 0 16px 0',
  fontWeight: 'bold',
};

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
  outline: 'none',
  boxSizing: 'border-box',
};