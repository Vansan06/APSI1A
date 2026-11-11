'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit3, Info } from 'lucide-react';

interface PemesananDetailRecord {
  kode: string;
  tanggal: string;
  tujuan: string;
  supplier: string;
  bahanBaku: string;
  jumlah: string;
  totalBiaya: string;
  estimasiTiba: string;
  status: string;
  catatanStatus: string;
}

const DETAIL_PEMESANAN_MAP: Record<string, PemesananDetailRecord> = {
  'PO-261024-01': {
    kode: 'PO-261024-01',
    tanggal: '24 Okt 2026',
    tujuan: 'DFO Donat',
    supplier: 'PT Prima Dairy',
    bahanBaku: 'Mentega',
    jumlah: '20 kg',
    totalBiaya: 'Rp1.600.000',
    estimasiTiba: '25 Okt 2026',
    status: 'Dikirim',
    catatanStatus: 'Pesanan belum diterima. Pilih Edit Pemesanan untuk menyesuaikan status atau jumlah saat diterima.',
  },
  'PO-261024-02': {
    kode: 'PO-261024-02',
    tanggal: '24 Okt 2026',
    tujuan: 'DFO Donat',
    supplier: 'CV Cokelat Nusantara',
    bahanBaku: 'Cokelat batang',
    jumlah: '20 kg',
    totalBiaya: 'Rp1.400.000',
    estimasiTiba: '26 Okt 2026',
    status: 'Dikonfirmasi',
    catatanStatus: 'Pesanan telah dikonfirmasi oleh supplier.',
  },
  'PO-261023-01': {
    kode: 'PO-261023-01',
    tanggal: '23 Okt 2026',
    tujuan: 'DFO Donat',
    supplier: 'CV Sumber Pangan',
    bahanBaku: 'Tepung terigu',
    jumlah: '100 kg',
    totalBiaya: 'Rp1.200.000',
    estimasiTiba: '25 Okt 2026',
    status: 'Dikirim',
    catatanStatus: 'Pesanan sedang dikirim oleh CV Sumber Pangan.',
  },
  'PO-261022-01': {
    kode: 'PO-261022-01',
    tanggal: '22 Okt 2026',
    tujuan: 'DFO Donat',
    supplier: 'UD Ternak Makmur',
    bahanBaku: 'Telur',
    jumlah: '30 kg',
    totalBiaya: 'Rp840.000',
    estimasiTiba: '23 Okt 2026',
    status: 'Diterima',
    catatanStatus: 'Bahan baku telah diterima di gudang.',
  },
};

export default function DetailPemesananBahanBakuAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'PO-261024-01';

  const data = DETAIL_PEMESANAN_MAP[id] || DETAIL_PEMESANAN_MAP['PO-261024-01'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Pemesanan Bahan Baku &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Detail Pesanan</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Detail Pesanan • {data.kode}
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Rincian informasi pemesanan bahan baku {data.bahanBaku} ke {data.supplier}.
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

      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{data.supplier}</div>
            <div style={{ fontSize: '11px', color: '#777' }}>PO ID: {data.kode}</div>
          </div>
          <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '6px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
            {data.status}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '12px', marginBottom: '24px' }}>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Tanggal pesanan</div>
            <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{data.tanggal}</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Pemesanan / tujuan</div>
            <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{data.tujuan}</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Bahan baku</div>
            <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{data.bahanBaku}</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Jumlah dipesan</div>
            <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{data.jumlah}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '14px 16px', borderRadius: '8px', fontSize: '12px', color: '#991b1b', marginBottom: '20px' }}>
          {data.catatanStatus}
        </div>

        <div style={{ fontSize: '11px', color: '#777', marginBottom: '20px' }}>
          Setelah pesanan diproses, lengkapi detail pengiriman sebelum bahan dikirim.<br />
          Jumlah stok tersedia tetap dicatat pada menu Ketersediaan Bahan Baku.
        </div>

        {/* OPSIONAL TOMBOL EDIT RESMI */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Link href="/admin/pemesanan-bahan-baku" style={{ padding: '10px 24px', backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '20px', color: '#555', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>
            Kembali
          </Link>
          <button onClick={() => router.push(`/admin/pemesanan-bahan-baku/${id}/edit`)} style={{ padding: '10px 24px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Edit3 size={16} /> Edit Pemesanan
          </button>
        </div>

      </div>

    </div>
  );
}