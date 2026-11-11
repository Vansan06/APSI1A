'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Plus, Check, Boxes, AlertTriangle, Wallet } from 'lucide-react';

export interface BahanBakuItem {
  id: string; // Kode e.g. BB-001
  nama: string;
  supplier: string;
  stok: string;
  minimum: string;
  hargaSatuan: string;
  kondisi: 'Aman' | 'Stok rendah';
}

export const BAHAN_BAKU_LIST: BahanBakuItem[] = [
  {
    id: 'BB-001',
    nama: 'Tepung Terigu',
    supplier: 'CV Sumber Pangan',
    stok: '125 kg',
    minimum: '50 kg',
    hargaSatuan: 'Rp12.000 / kg',
    kondisi: 'Aman',
  },
  {
    id: 'BB-002',
    nama: 'Gula Pasir',
    supplier: 'CV Sumber Pangan',
    stok: '60 kg',
    minimum: '25 kg',
    hargaSatuan: 'Rp17.000 / kg',
    kondisi: 'Aman',
  },
  {
    id: 'BB-003',
    nama: 'Mentega',
    supplier: 'PT Prima Dairy',
    stok: '8 kg',
    minimum: '15 kg',
    hargaSatuan: 'Rp80.000 / kg',
    kondisi: 'Stok rendah',
  },
  {
    id: 'BB-004',
    nama: 'Cokelat Batang',
    supplier: 'PT Cokelat Nusantara',
    stok: '6 kg',
    minimum: '10 kg',
    hargaSatuan: 'Rp70.000 / kg',
    kondisi: 'Stok rendah',
  },
  {
    id: 'BB-005',
    nama: 'Telur',
    supplier: 'Ternak Makmur',
    stok: '30 kg',
    minimum: '15 kg',
    hargaSatuan: 'Rp28.000 / kg',
    kondisi: 'Aman',
  },
  {
    id: 'BB-006',
    nama: 'Keju Cheddar',
    supplier: 'PT Prima Dairy',
    stok: '18 kg',
    minimum: '10 kg',
    hargaSatuan: 'Rp95.000 / kg',
    kondisi: 'Aman',
  },
];

export default function AdminDataBahanBakuPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [bahanRows, setBahanRows] = useState<BahanBakuItem[]>(BAHAN_BAKU_LIST);
  useEffect(() => {
    fetch("/api/bahan-baku").then(r=>r.json()).then(r=>{
      if(r.success) setBahanRows(r.data.map((b:any)=>({id:b.id_bahan_baku,nama:b.nama_bahan||"-",supplier:"-",stok:`${Number(b.stok_tersedia||0)} kg`,minimum:`${Number(b.stok_minimal||0)} kg`,hargaSatuan:`Rp${Number(b.harga_satuan||0).toLocaleString("id-ID")}`,kondisi:Number(b.stok_tersedia||0)<=Number(b.stok_minimal||0)?"Stok rendah":"Aman"})));
    }).catch(console.error);
  }, []);


  const notifyType = searchParams.get('notify');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');

  useEffect(() => {
    if (notifyType === 'simpan') {
      setModalTitle('Berhasil disimpan');
      setModalDesc('Data bahan baku berhasil disimpan.');
      setShowModal(true);
    } else if (notifyType === 'edit') {
      setModalTitle('Berhasil diedit');
      setModalDesc('Data bahan baku berhasil diedit.');
      setShowModal(true);
    } else if (notifyType === 'hapus') {
      setModalTitle('Berhasil dihapus');
      setModalDesc('Data bahan baku berhasil dihapus.');
      setShowModal(true);
    }
  }, [notifyType]);

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/admin/bahan-baku');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* HEADER UTAMA (TANPA TOMBOL EKSPOR) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Data Bahan Baku
          </h2>
        </div>
      </div>

      {/* 3 KARTU STATISTIK ATAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        
        {/* CARD 1: JENIS BAHAN */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Jenis bahan</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>
              8 bahan
            </div>
            <div style={{ fontSize: '10px', color: '#888888' }}>Tersimpan di gudang utama</div>
          </div>
          <div style={iconBadgeStyle}>
            <Boxes size={20} color="#6b21a8" />
          </div>
        </div>

        {/* CARD 2: DI BAWAH MINIMUM */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Di bawah minimum</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>
              2 bahan
            </div>
            <div style={{ fontSize: '10px', color: '#888888' }}>Mentega dan cokelat batang</div>
          </div>
          <div style={{ ...iconBadgeStyle, backgroundColor: '#fef3c7' }}>
            <AlertTriangle size={20} color="#b45309" />
          </div>
        </div>

        {/* CARD 3: NILAI PERSEDIAAN */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Nilai persediaan</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>
              Rp6.840.000
            </div>
            <div style={{ fontSize: '10px', color: '#888888' }}>Berdasarkan harga beli terakhir</div>
          </div>
          <div style={iconBadgeStyle}>
            <Wallet size={20} color="#6b21a8" />
          </div>
        </div>

      </div>

      {/* TABEL PERSEDIAAN BAHAN BAKU */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>Persediaan bahan baku</h3>
          <span style={{ fontSize: '11px', color: '#888' }}>8 data</span>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Cari kode atau nama bahan..."
            style={{ flex: 1, padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', outline: 'none' }}
          />
          <select style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
            <option>Semua kondisi</option>
            <option>Aman</option>
            <option>Stok rendah</option>
          </select>
          <select style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
            <option>Gudang utama</option>
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
              <th style={{ padding: '10px 12px', borderRadius: '6px 0 0 6px' }}>Bahan baku</th>
              <th style={{ padding: '10px 12px' }}>Stok</th>
              <th style={{ padding: '10px 12px' }}>Minimum</th>
              <th style={{ padding: '10px 12px' }}>Harga / satuan</th>
              <th style={{ padding: '10px 12px' }}>Kondisi</th>
              <th style={{ padding: '10px 12px', borderRadius: '0 6px 6px 0' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bahanRows.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #fdf2f8' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>{item.nama}</div>
                  <div style={{ fontSize: '10px', color: '#777' }}>{item.id} • {item.supplier}</div>
                </td>
                <td style={{ padding: '12px', color: '#333' }}>{item.stok}</td>
                <td style={{ padding: '12px', color: '#333' }}>{item.minimum}</td>
                <td style={{ padding: '12px', color: '#333' }}>{item.hargaSatuan}</td>
                <td style={{ padding: '12px' }}>
                  <span style={getKondisiBadgeStyle(item.kondisi)}>
                    {item.kondisi}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                    <Link href={`/admin/bahan-baku/${item.id}`} style={{ color: '#6b21a8', textDecoration: 'none', fontWeight: '500' }}>
                      Lihat Detail Bahan Baku
                    </Link>
                    <Link href={`/admin/bahan-baku/${item.id}/edit`} style={{ color: '#6b21a8', textDecoration: 'none', fontWeight: '500' }}>
                      Edit
                    </Link>
                    <Link href={`/admin/bahan-baku/${item.id}/hapus`} style={{ color: '#6b21a8', textDecoration: 'none', fontWeight: '500' }}>
                      Hapus
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOMBOL TAMBAH BAHAN */}
      <div>
        <Link
          href="/admin/bahan-baku/tambah"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#6b21a8',
            color: '#ffffff',
            borderRadius: '20px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 'bold',
          }}
        >
          <Plus size={16} />
          <span>Tambah Bahan</span>
        </Link>
      </div>

      {/* MODAL NOTIFIKASI BERHASIL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', width: '380px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#6b21a8', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={28} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '20px', color: '#6b21a8', margin: '0 0 8px 0', fontWeight: 'bold' }}>{modalTitle}</h3>
            <p style={{ fontSize: '13px', color: '#666', margin: '0 0 24px 0' }}>{modalDesc}</p>
            <button onClick={handleCloseModal} style={{ width: '100%', padding: '12px', backgroundColor: '#581c87', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
              Selesai
            </button>
          </div>
        </div>
      )}

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
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  backgroundColor: '#f3e8ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function getKondisiBadgeStyle(kondisi: string): React.CSSProperties {
  if (kondisi === 'Aman') {
    return { backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  } else {
    return { backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  }
}