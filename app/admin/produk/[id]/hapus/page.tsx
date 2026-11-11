'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle, Trash2, Info } from 'lucide-react';

interface HapusProdukRecord {
  kode: string;
  nama: string;
  kategori: string;
  satuan: string;
  hargaJual: string;
  stokTersedia: string;
  status: string;
  resepName: string;
  imageSrc: string;
}

const HAPUS_PRODUK_MAP: Record<string, HapusProdukRecord> = {
  'PRD-001': {
    kode: 'PRD-001',
    nama: 'Donat Cokelat',
    kategori: 'Donat',
    satuan: 'per pcs',
    hargaJual: 'Rp8.000 per pcs',
    stokTersedia: '60 pcs',
    status: 'Aktif',
    resepName: 'Resep Donat Cokelat',
    imageSrc: '/donat-cokelat.png',
  },
  'PRD-002': {
    kode: 'PRD-002',
    nama: 'Donat Keju',
    kategori: 'Donat',
    satuan: 'per pcs',
    hargaJual: 'Rp9.000 per pcs',
    stokTersedia: '40 pcs',
    status: 'Aktif',
    resepName: 'Resep Donat Keju',
    imageSrc: '/donat-keju.png',
  },
  'PRD-003': {
    kode: 'PRD-003',
    nama: 'Donat Gula',
    kategori: 'Donat',
    satuan: 'per pcs',
    hargaJual: 'Rp12.000 per pcs',
    stokTersedia: '45 pcs',
    status: 'Aktif',
    resepName: 'Resep Donat Gula',
    imageSrc: '/donat-gula.png',
  },
  'PRD-004': {
    kode: 'PRD-004',
    nama: 'Donat Stroberi',
    kategori: 'Donat',
    satuan: 'per pcs',
    hargaJual: 'Rp11.800 per pcs',
    stokTersedia: '20 pcs',
    status: 'Aktif',
    resepName: 'Resep Donat Stroberi',
    imageSrc: '/donat-stroberi.png',
  },
};

export default function HapusProdukAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'PRD-001';

  const data = HAPUS_PRODUK_MAP[id] || HAPUS_PRODUK_MAP['PRD-001'];

  const handleConfirmHapus = async () => {
    const response=await fetch(`/api/produk/${encodeURIComponent(id)}`,{method:"DELETE"});
    if(!response.ok){const result=await response.json();alert(result.error||"Gagal menghapus data.");return;}
    router.push('/admin/produk?notify=hapus');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Produk &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Hapus Produk</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Hapus Produk
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Tinjau ringkasan produk sebelum mengonfirmasi penghapusan dari katalog.
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

      {/* BANNER PERINGATAN HAPUS */}
      <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <AlertTriangle size={20} color="#dc2626" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#991b1b', marginBottom: '4px' }}>
            Yakin ingin menghapus produk ini?
          </div>
          <div style={{ fontSize: '11px', color: '#b91c1c', lineHeight: 1.4 }}>
            Produk {data.kode} — {data.nama} akan dihapus permanen dari Data Produk dan tidak dapat dipilih untuk pesanan baru. Tindakan ini tidak dapat dibatalkan.
          </div>
        </div>
      </div>

      {/* RINGKASAN PRODUK YANG AKAN DIHAPUS */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '15px', color: '#6b21a8', margin: '0 0 16px 0', fontWeight: 'bold' }}>
          Produk yang akan dihapus
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px', alignItems: 'start' }}>
          
          <div>
            <img
              src={data.imageSrc}
              alt={data.nama}
              style={{ width: '100%', height: '200px', borderRadius: '12px', objectFit: 'cover', backgroundColor: '#f3e8ff', marginBottom: '12px' }}
            />
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{data.nama}</div>
            <div style={{ fontSize: '11px', color: '#777' }}>{data.kode} • {data.satuan}</div>
          </div>

          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px', marginBottom: '20px' }}>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Kode produk</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.kode}</div>
              </div>
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Kategori</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{data.kategori}</div>
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
              <div>
                <div style={{ color: '#777', fontSize: '11px' }}>Resep terhubung</div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '13px', marginTop: '2px' }}>{data.resepName}</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#f9fafb', padding: '14px', borderRadius: '10px', fontSize: '11px', color: '#555' }}>
              <strong style={{ color: '#333' }}>Resep tidak ikut dihapus</strong><br />
              Hubungan produk dengan resep dilepas. Riwayat pesanan yang sudah tercatat tetap disimpan.
            </div>
          </div>

        </div>
      </div>

      {/* ALERT STOK TERSEDIA */}
      <div style={{ backgroundColor: '#f3e8ff', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '11px', color: '#581c87' }}>
        <Info size={18} color="#6b21a8" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Masih ada {data.stokTersedia} stok tersedia</div>
          <div>Pastikan stok dan alokasi pesanan sudah diperiksa sebelum menghapus. Jika produk hanya berhenti dijual sementara, pertimbangkan mengubah statusnya menjadi Nonaktif melalui Edit Produk.</div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <div style={{ fontSize: '11px', color: '#777' }}>
          Pilih Batal untuk mempertahankan produk dan kembali tanpa perubahan.
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" onClick={() => router.push('/admin/produk')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            Batal
          </button>
          <button type="button" onClick={handleConfirmHapus} style={{ padding: '10px 24px', backgroundColor: '#b91c1c', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Trash2 size={16} /> Ya, Hapus Produk
          </button>
        </div>
      </div>

    </div>
  );
}