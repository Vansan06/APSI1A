'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, BookOpen, Info } from 'lucide-react';

interface ProdukDetailRecord {
  kode: string;
  nama: string;
  kategori: string;
  satuan: string;
  hargaJual: string;
  stokTersedia: string;
  status: string;
  resepName: string;
  resepDesc: string;
  imageSrc: string; // Menggunakan gambar beresolusi tinggi (versi 2)
}

const DETAIL_PRODUK_MAP: Record<string, ProdukDetailRecord> = {
  'PRD-001': {
    kode: 'PRD-001',
    nama: 'Donat Cokelat',
    kategori: 'Donat',
    satuan: 'per pcs',
    hargaJual: 'Rp8.000',
    stokTersedia: '60 pcs',
    status: 'Aktif',
    resepName: 'Resep Donat Cokelat',
    resepDesc: 'Acuan bahan baku untuk produksi Donat Cokelat.',
    imageSrc: '/donat-cokelat2.png',
  },
  'PRD-002': {
    kode: 'PRD-002',
    nama: 'Donat Keju',
    kategori: 'Donat',
    satuan: 'per pcs',
    hargaJual: 'Rp9.000',
    stokTersedia: '40 pcs',
    status: 'Aktif',
    resepName: 'Resep Donat Keju',
    resepDesc: 'Acuan bahan baku untuk produksi Donat Keju.',
    imageSrc: '/donat-keju2.png',
  },
  'PRD-003': {
    kode: 'PRD-003',
    nama: 'Donat Gula',
    kategori: 'Donat',
    satuan: 'per pcs',
    hargaJual: 'Rp12.000',
    stokTersedia: '45 pcs',
    status: 'Aktif',
    resepName: 'Resep Donat Gula',
    resepDesc: 'Acuan bahan baku untuk produksi Donat Gula.',
    imageSrc: '/donat-gula2.png',
  },
  'PRD-004': {
    kode: 'PRD-004',
    nama: 'Donat Stroberi',
    kategori: 'Donat',
    satuan: 'per pcs',
    hargaJual: 'Rp11.800',
    stokTersedia: '20 pcs',
    status: 'Aktif',
    resepName: 'Resep Donat Stroberi',
    resepDesc: 'Acuan bahan baku untuk produksi Donat Stroberi.',
    imageSrc: '/donat-stroberi2.png',
  },
};

export default function DetailProdukAdminPage() {
  const params = useParams();
  const id = (params?.id as string) || 'PRD-001';
  const data = DETAIL_PRODUK_MAP[id] || DETAIL_PRODUK_MAP['PRD-001'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Produk &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Detail Produk</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Detail Produk
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Informasi lengkap {data.nama}. Data ditampilkan dalam mode baca-saja.
          </div>
        </div>

        <Link
          href="/admin/produk"
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
          <span>Kembali ke Data Produk</span>
        </Link>
      </div>

      {/* GRID KONTEN DETAIL PRODUK */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
        
        {/* LEFT INFORMASI PRODUK & RESEP */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={cardStyle}>
            <h3 style={titleStyle}>Informasi produk</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px' }}>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Kode produk</div>
                <div style={{ fontWeight: 'bold', color: '#6b21a8', fontSize: '14px', marginTop: '2px' }}>{data.kode}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Nama produk</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.nama}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Kategori</div>
                <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{data.kategori}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Satuan</div>
                <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{data.satuan}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Harga jual</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.hargaJual}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Stok tersedia</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.stokTersedia}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px', marginBottom: '4px' }}>Status produk</div>
                <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                  {data.status}
                </span>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={titleStyle}>Resep terhubung</h3>
            <div style={{ backgroundColor: '#fcf4ff', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#f3e8ff', color: '#6b21a8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#6b21a8', fontSize: '13px' }}>{data.resepName}</div>
                  <div style={{ fontSize: '11px', color: '#777' }}>{data.resepDesc}</div>
                </div>
              </div>
              <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                Terhubung
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT FOTO PRODUK CARD (MENGGUNAKAN GAMBAR DENGAN NOMOR 2) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={cardStyle}>
            <h3 style={titleStyle}>Foto produk</h3>
            <img
              src={data.imageSrc}
              alt={data.nama}
              style={{ width: '100%', height: '220px', borderRadius: '12px', objectFit: 'cover', backgroundColor: '#f3e8ff', marginBottom: '12px' }}
            />
            <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px' }}>{data.nama}</div>
            <div style={{ fontSize: '11px', color: '#777' }}>{data.kode} • {data.kategori} • {data.satuan}</div>
          </div>
        </div>

      </div>

      {/* ALERT INFO BOX */}
      <div style={{ backgroundColor: '#f3e8ff', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#581c87' }}>
        <Info size={18} color="#6b21a8" style={{ flexShrink: 0 }} />
        <div>
          <strong>Stok diperbarui dari hasil produksi:</strong> Produk yang lolos pemeriksaan mutu otomatis tercatat sebagai stok. Alokasi pesanan dipisahkan dari stok siap jual.
        </div>
      </div>

      {/* BOTTOM ACTION */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
        <Link href="/admin/produk" style={{ padding: '10px 24px', backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '20px', color: '#555', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>
          Kembali
        </Link>
      </div>

    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
};

const titleStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#6b21a8',
  margin: '0 0 16px 0',
  fontWeight: 'bold',
};