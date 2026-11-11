'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit3, Info } from 'lucide-react';

interface SupplierDetailRecord {
  kode: string;
  namaPerusahaan: string;
  namaKontak: string;
  telepon: string;
  email: string;
  kota: string;
  alamat: string;
  status: string;
  bahanDipasok: string;
  estimasiPengiriman: string;
}

const DETAIL_SUPPLIER_MAP: Record<string, SupplierDetailRecord> = {
  'SUP-001': {
    kode: 'SUP-001',
    namaPerusahaan: 'CV Sumber Pangan',
    namaKontak: 'Budiman',
    telepon: '0812-3456-7801',
    email: 'Belum diisi',
    kota: 'Bandung',
    alamat: 'Belum diisi',
    status: 'Aktif',
    bahanDipasok: 'Tepung, gula, ragi',
    estimasiPengiriman: 'Belum diisi',
  },
  'SUP-002': {
    kode: 'SUP-002',
    namaPerusahaan: 'PT Prima Dairy',
    namaKontak: 'Rina Wijaya',
    telepon: '0812-3456-7802',
    email: 'kontak@primadairy.com',
    kota: 'Bandung',
    alamat: 'Jl. Industri No. 45, Bandung',
    status: 'Aktif',
    bahanDipasok: 'Mentega, keju, susu',
    estimasiPengiriman: '2 hari',
  },
  'SUP-003': {
    kode: 'SUP-003',
    namaPerusahaan: 'CV Cokelat Nusantara',
    namaKontak: 'Andi Saputra',
    telepon: '0812-3456-7803',
    email: 'info@cokelatnusantara.co.id',
    kota: 'Cimahi',
    alamat: 'Jl. Raya Cimahi No. 12',
    status: 'Aktif',
    bahanDipasok: 'Cokelat batang',
    estimasiPengiriman: '3 hari',
  },
  'SUP-004': {
    kode: 'SUP-004',
    namaPerusahaan: 'UD Ternak Makmur',
    namaKontak: 'Eko Prasetyo',
    telepon: '0812-3456-7804',
    email: 'ternakmakmur@gmail.com',
    kota: 'Lembang',
    alamat: 'Lembang, Bandung Barat',
    status: 'Aktif',
    bahanDipasok: 'Telur',
    estimasiPengiriman: '1 hari',
  },
};

export default function DetailSupplierAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'SUP-001';
  const data = DETAIL_SUPPLIER_MAP[id] || DETAIL_SUPPLIER_MAP['SUP-001'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Supplier &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Detail Supplier</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Detail Supplier
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Lihat identitas, kontak, dan bahan yang dipasok oleh {data.namaPerusahaan}.
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

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
        
        {/* LEFT CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={cardStyle}>
            <h3 style={titleStyle}>Identitas dan kontak</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px', marginBottom: '16px' }}>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Kode supplier</div>
                <div style={{ fontWeight: 'bold', color: '#6b21a8', fontSize: '14px', marginTop: '2px' }}>{data.kode}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Nama perusahaan</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.namaPerusahaan}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px', marginBottom: '16px' }}>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Nama kontak</div>
                <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{data.namaKontak}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Telepon</div>
                <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{data.telepon}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px' }}>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Email</div>
                <div style={{ fontWeight: 'bold', color: data.email === 'Belum diisi' ? '#888' : '#333', marginTop: '2px' }}>{data.email}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Kota</div>
                <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{data.kota}</div>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={titleStyle}>Alamat dan pasokan</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px', marginBottom: '16px' }}>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Alamat</div>
                <div style={{ fontWeight: 'bold', color: data.alamat === 'Belum diisi' ? '#888' : '#333', marginTop: '2px' }}>{data.alamat}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px', marginBottom: '4px' }}>Status</div>
                <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                  {data.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px' }}>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Bahan yang dipasok</div>
                <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{data.bahanDipasok}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Estimasi pengiriman</div>
                <div style={{ fontWeight: 'bold', color: data.estimasiPengiriman === 'Belum diisi' ? '#888' : '#333', marginTop: '2px' }}>{data.estimasiPengiriman}</div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT CARDS SUMMARY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={cardStyle}>
            <div style={{ fontSize: '12px', color: '#777' }}>Ringkasan data</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>{data.namaPerusahaan}</div>
            <div style={{ fontSize: '11px', color: '#777', marginBottom: '8px' }}>{data.kode} • {data.kota}</div>
            <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
              {data.status}
            </span>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
              <Info size={16} /> Informasi belum lengkap
            </div>
            <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
              Alamat, email, dan estimasi pengiriman belum tersedia. Lengkapi melalui Edit Supplier setelah dikonfirmasi.
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', borderLeft: '4px solid #6b21a8', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
              <Info size={16} /> Kontak utama
            </div>
            <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
              {data.namaKontak} • {data.telepon}. Gunakan kontak ini untuk mengonfirmasi kebutuhan bahan dan pengiriman.
            </div>
          </div>

        </div>

      </div>

      <div style={{ fontSize: '11px', color: '#777', marginTop: '8px' }}>
        Informasi ditampilkan dalam mode baca saja.
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <Link href="/admin/supplier" style={{ padding: '10px 24px', backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '20px', color: '#555', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>
          Kembali
        </Link>
        <button onClick={() => router.push(`/admin/supplier/${id}/edit`)} style={{ padding: '10px 24px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Edit3 size={16} /> Edit Supplier
        </button>
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