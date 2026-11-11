'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';

interface EditPemesananRecord {
  kode: string;
  supplier: string;
  bahanBaku: string;
  jumlah: string;
  totalBiaya: string;
  status: string;
  estimasiTiba: string;
}

const ALL_EDIT_PEMESANAN: Record<string, EditPemesananRecord> = {
  'PO-261024-01': {
    kode: 'PO-261024-01',
    supplier: 'PT Prima Dairy',
    bahanBaku: 'Mentega',
    jumlah: '20 kg',
    totalBiaya: 'Rp1.600.000',
    status: 'Dikirim',
    estimasiTiba: '2026-10-25',
  },
  'PO-261024-02': {
    kode: 'PO-261024-02',
    supplier: 'CV Cokelat Nusantara',
    bahanBaku: 'Cokelat batang',
    jumlah: '20 kg',
    totalBiaya: 'Rp1.400.000',
    status: 'Dikonfirmasi',
    estimasiTiba: '2026-10-26',
  },
  'PO-261023-01': {
    kode: 'PO-261023-01',
    supplier: 'CV Sumber Pangan',
    bahanBaku: 'Tepung terigu',
    jumlah: '100 kg',
    totalBiaya: 'Rp1.200.000',
    status: 'Dikirim',
    estimasiTiba: '2026-10-25',
  },
  'PO-261022-01': {
    kode: 'PO-261022-01',
    supplier: 'UD Ternak Makmur',
    bahanBaku: 'Telur',
    jumlah: '30 kg',
    totalBiaya: 'Rp840.000',
    status: 'Diterima',
    estimasiTiba: '2026-10-23',
  },
};

export default function EditPemesananBahanBakuAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'PO-261024-01';

  const initialData = ALL_EDIT_PEMESANAN[id] || ALL_EDIT_PEMESANAN['PO-261024-01'];

  const [supplier, setSupplier] = useState(initialData.supplier);
  const [bahanBaku, setBahanBaku] = useState(initialData.bahanBaku);
  const [jumlah, setJumlah] = useState(initialData.jumlah);
  const [status, setStatus] = useState(initialData.status);
  const [estimasiTiba, setEstimasiTiba] = useState(initialData.estimasiTiba);

  useEffect(() => {
    const data = ALL_EDIT_PEMESANAN[id] || ALL_EDIT_PEMESANAN['PO-261024-01'];
    setSupplier(data.supplier);
    setBahanBaku(data.bahanBaku);
    setJumlah(data.jumlah);
    setStatus(data.status);
    setEstimasiTiba(data.estimasiTiba);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/pemesanan-bahan-baku?notify=edit');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Pemesanan Bahan Baku &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Edit Pemesanan</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Edit Pemesanan Bahan Baku
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Perbarui data {id}, lalu simpan perubahan Anda.
          </div>
        </div>

        <Link
          href="/admin/pemesanan-bahan-baku"
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
          <span>Kembali ke Pemesanan</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '15px', color: '#6b21a8', margin: '0 0 16px 0', fontWeight: 'bold' }}>Informasi Pemesanan</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Nomor PO</label>
              <input type="text" value={id} disabled style={{ ...inputStyle, backgroundColor: '#f3f4f6', cursor: 'not-allowed' }} />
            </div>
            <div>
              <label style={labelStyle}>Supplier *</label>
              <input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} style={inputStyle} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Bahan baku *</label>
              <input type="text" value={bahanBaku} onChange={(e) => setBahanBaku(e.target.value)} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Jumlah *</label>
              <input type="text" value={jumlah} onChange={(e) => setJumlah(e.target.value)} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Status *</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle} required>
                <option value="Dikonfirmasi">Dikonfirmasi</option>
                <option value="Dikirim">Dikirim</option>
                <option value="Diterima">Diterima</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>* Wajib diisi. Periksa kembali data sebelum menyimpan.</div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={() => router.push('/admin/pemesanan-bahan-baku')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
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