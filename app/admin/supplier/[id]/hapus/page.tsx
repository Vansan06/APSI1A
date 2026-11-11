'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle, Trash2, Info } from 'lucide-react';

interface HapusSupplierRecord {
  kode: string;
  namaPerusahaan: string;
  namaKontak: string;
  telepon: string;
  kota: string;
  bahanDipasok: string;
  emailAlamatEstimasi: string;
  status: string;
  warningText: string;
}

const HAPUS_SUPPLIER_MAP: Record<string, HapusSupplierRecord> = {
  'SUP-001': {
    kode: 'SUP-001',
    namaPerusahaan: 'CV Sumber Pangan',
    namaKontak: 'Budiman',
    telepon: '0812-3456-7801',
    kota: 'Bandung',
    bahanDipasok: 'Tepung, gula, ragi',
    emailAlamatEstimasi: 'Belum diisi',
    status: 'Aktif',
    warningText: 'Supplier ini terhubung dengan bahan BB-001 Tepung Terigu. Periksa keterkaitan bahan dan pesanan pembelian sebelum menghapus. Tindakan ini tidak dapat dibatalkan.',
  },
  'SUP-002': {
    kode: 'SUP-002',
    namaPerusahaan: 'PT Prima Dairy',
    namaKontak: 'Rina Wijaya',
    telepon: '0812-3456-7802',
    kota: 'Bandung',
    bahanDipasok: 'Mentega, keju, susu',
    emailAlamatEstimasi: 'kontak@primadairy.com',
    status: 'Aktif',
    warningText: 'Supplier ini terhubung dengan bahan BB-003 Mentega. Periksa keterkaitan bahan dan pesanan pembelian sebelum menghapus. Tindakan ini tidak dapat dibatalkan.',
  },
  'SUP-003': {
    kode: 'SUP-003',
    namaPerusahaan: 'CV Cokelat Nusantara',
    namaKontak: 'Andi Saputra',
    telepon: '0812-3456-7803',
    kota: 'Cimahi',
    bahanDipasok: 'Cokelat batang',
    emailAlamatEstimasi: 'info@cokelatnusantara.co.id',
    status: 'Aktif',
    warningText: 'Supplier ini terhubung dengan bahan BB-004 Cokelat Batang. Periksa keterkaitan bahan dan pesanan pembelian sebelum menghapus. Tindakan ini tidak dapat dibatalkan.',
  },
  'SUP-004': {
    kode: 'SUP-004',
    namaPerusahaan: 'UD Ternak Makmur',
    namaKontak: 'Eko Prasetyo',
    telepon: '0812-3456-7804',
    kota: 'Lembang',
    bahanDipasok: 'Telur',
    emailAlamatEstimasi: 'ternakmakmur@gmail.com',
    status: 'Aktif',
    warningText: 'Supplier ini terhubung dengan bahan BB-005 Telur. Periksa keterkaitan bahan dan pesanan pembelian sebelum menghapus. Tindakan ini tidak dapat dibatalkan.',
  },
};

export default function HapusSupplierAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'SUP-001';

  const data = HAPUS_SUPPLIER_MAP[id] || HAPUS_SUPPLIER_MAP['SUP-001'];

  const handleConfirmHapus = () => {
    router.push('/admin/supplier?notify=hapus');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Supplier &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Konfirmasi Hapus Supplier</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Konfirmasi Hapus Supplier
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Periksa identitas supplier dan bahan yang dipasok sebelum menghapus.
          </div>
        </div>

        <Link
          href="/admin/supplier"
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
          <span>Kembali ke Data Supplier</span>
        </Link>
      </div>

      {/* BANNER WARNING */}
      <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <AlertTriangle size={20} color="#dc2626" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#991b1b', marginBottom: '4px' }}>
            Hapus supplier ini?
          </div>
          <div style={{ fontSize: '11px', color: '#b91c1c', lineHeight: 1.4 }}>
            {data.warningText}
          </div>
        </div>
      </div>

      {/* RINGKASAN DATA YANG AKAN DIHAPUS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
        
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '15px', color: '#6b21a8', margin: '0 0 16px 0', fontWeight: 'bold' }}>
            Ringkasan data yang akan dihapus
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{data.namaPerusahaan}</div>
              <div style={{ fontSize: '11px', color: '#777' }}>{data.kode} • {data.status}</div>
            </div>
            <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
              {data.status}
            </span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Informasi</th>
                <th style={{ padding: '10px' }}>Nilai</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px', color: '#555' }}>Nama kontak</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.namaKontak}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px', color: '#555' }}>Telepon</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.telepon}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px', color: '#555' }}>Kota</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.kota}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px', color: '#555' }}>Bahan yang dipasok</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.bahanDipasok}</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', color: '#555' }}>Email / alamat / estimasi</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{data.emailAlamatEstimasi}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* RIGHT SIDE WARNING CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
              Sebelum melanjutkan
            </div>
            <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.5 }}>
              Pastikan Anda memilih data yang benar dan tidak lagi membutuhkannya untuk kegiatan operasional.<br /><br />
              Pilih Batal untuk mempertahankan data. Pilih Konfirmasi Hapus hanya setelah memeriksa ringkasan.
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
              <Info size={16} /> Riwayat operasional
            </div>
            <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
              Periksa keterkaitan data sebelum menghapus. Simpan catatan yang masih dibutuhkan untuk laporan.
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <div style={{ fontSize: '11px', color: '#777' }}>
          Data belum dihapus. Konfirmasi diperlukan untuk melanjutkan.
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" onClick={() => router.push('/admin/supplier')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            Batal
          </button>
          <button type="button" onClick={handleConfirmHapus} style={{ padding: '10px 24px', backgroundColor: '#b91c1c', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Trash2 size={16} /> Konfirmasi Hapus
          </button>
        </div>
      </div>

    </div>
  );
}