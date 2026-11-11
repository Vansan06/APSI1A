'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Info } from 'lucide-react';

interface BahanBakuDetailRecord {
  kode: string;
  nama: string;
  satuan: string;
  supplier: string;
  stokTersedia: string;
  stokMinimum: string;
  hargaSatuan: string;
  statusPersediaan: string;
  selisih: string;
}

const DETAIL_BAHAN_MAP: Record<string, BahanBakuDetailRecord> = {
  'BB-001': {
    kode: 'BB-001',
    nama: 'Tepung Terigu',
    satuan: 'kg',
    supplier: 'CV Sumber Pangan',
    stokTersedia: '125 kg',
    stokMinimum: '50 kg',
    hargaSatuan: 'Rp12.000 / kg',
    statusPersediaan: 'Aman',
    selisih: '75 kg',
  },
  'BB-002': {
    kode: 'BB-002',
    nama: 'Gula Pasir',
    satuan: 'kg',
    supplier: 'CV Sumber Pangan',
    stokTersedia: '60 kg',
    stokMinimum: '25 kg',
    hargaSatuan: 'Rp17.000 / kg',
    statusPersediaan: 'Aman',
    selisih: '35 kg',
  },
  'BB-003': {
    kode: 'BB-003',
    nama: 'Mentega',
    satuan: 'kg',
    supplier: 'PT Prima Dairy',
    stokTersedia: '8 kg',
    stokMinimum: '15 kg',
    hargaSatuan: 'Rp80.000 / kg',
    statusPersediaan: 'Stok rendah',
    selisih: '-7 kg',
  },
  'BB-004': {
    kode: 'BB-004',
    nama: 'Cokelat Batang',
    satuan: 'kg',
    supplier: 'PT Cokelat Nusantara',
    stokTersedia: '6 kg',
    stokMinimum: '10 kg',
    hargaSatuan: 'Rp70.000 / kg',
    statusPersediaan: 'Stok rendah',
    selisih: '-4 kg',
  },
  'BB-005': {
    kode: 'BB-005',
    nama: 'Telur',
    satuan: 'kg',
    supplier: 'Ternak Makmur',
    stokTersedia: '30 kg',
    stokMinimum: '15 kg',
    hargaSatuan: 'Rp28.000 / kg',
    statusPersediaan: 'Aman',
    selisih: '15 kg',
  },
  'BB-006': {
    kode: 'BB-006',
    nama: 'Keju Cheddar',
    satuan: 'kg',
    supplier: 'PT Prima Dairy',
    stokTersedia: '18 kg',
    stokMinimum: '10 kg',
    hargaSatuan: 'Rp95.000 / kg',
    statusPersediaan: 'Aman',
    selisih: '8 kg',
  },
};

export default function DetailBahanBakuAdminPage() {
  const params = useParams();
  const id = (params?.id as string) || 'BB-001';
  const data = DETAIL_BAHAN_MAP[id] || DETAIL_BAHAN_MAP['BB-001'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Bahan Baku &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Detail Bahan Baku</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Detail Bahan Baku
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Informasi persediaan {data.kode} — {data.nama} dalam mode baca-saja.
          </div>
        </div>

        <Link
          href="/admin/bahan-baku"
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
          <span>Kembali ke Data Bahan Baku</span>
        </Link>
      </div>

      {/* GRID KONTEN DETAIL */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
        
        {/* LEFT CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={cardStyle}>
            <h3 style={titleStyle}>Identitas bahan baku</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px' }}>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Kode bahan</div>
                <div style={{ fontWeight: 'bold', color: '#6b21a8', fontSize: '14px', marginTop: '2px' }}>{data.kode}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Nama bahan</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.nama}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Satuan</div>
                <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{data.satuan}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Supplier</div>
                <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{data.supplier}</div>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={titleStyle}>Persediaan dan harga</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px' }}>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Stok tersedia</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.stokTersedia}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Stok minimum</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.stokMinimum}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Harga / satuan</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.hargaSatuan}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px', marginBottom: '4px' }}>Status persediaan</div>
                <span style={getKondisiBadgeStyle(data.statusPersediaan)}>
                  {data.statusPersediaan}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={cardStyle}>
            <div style={{ fontSize: '12px', color: '#777' }}>Ringkasan data</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>{data.nama}</div>
            <div style={{ fontSize: '11px', color: '#777', marginBottom: '8px' }}>{data.kode} • {data.supplier}</div>
            <span style={getKondisiBadgeStyle(data.statusPersediaan)}>{data.statusPersediaan}</span>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
              <Info size={16} /> Status stok
            </div>
            <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
              Stok {data.stokTersedia} berada {data.statusPersediaan === 'Aman' ? 'di atas' : 'di bawah'} batas minimum {data.stokMinimum}. Selisih: {data.selisih}.
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
              <Info size={16} /> Mode baca saja
            </div>
            <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
              Untuk memperbarui identitas, supplier, stok, atau harga, gunakan tombol Edit Bahan Baku.
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
        <Link href="/admin/bahan-baku" style={{ padding: '10px 24px', backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '20px', color: '#555', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>
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

function getKondisiBadgeStyle(kondisi: string): React.CSSProperties {
  if (kondisi === 'Aman') {
    return { backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  } else {
    return { backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  }
}