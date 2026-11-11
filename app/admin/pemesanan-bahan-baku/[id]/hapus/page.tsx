'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle, Trash2 } from 'lucide-react';

export default function HapusPemesananBahanBakuAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'PO-261024-01';

  const handleConfirmHapus = () => {
    router.push('/admin/pemesanan-bahan-baku?notify=hapus');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Pemesanan Bahan Baku &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Konfirmasi Hapus</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Konfirmasi Hapus Pemesanan
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Periksa kembali detail pesanan {id} sebelum menghapus dari sistem.
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

      <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <AlertTriangle size={20} color="#dc2626" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#991b1b', marginBottom: '4px' }}>
            Hapus pemesanan ini?
          </div>
          <div style={{ fontSize: '11px', color: '#b91c1c', lineHeight: 1.4 }}>
            Data pemesanan {id} akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
        <button type="button" onClick={() => router.push('/admin/pemesanan-bahan-baku')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
          Batal
        </button>
        <button type="button" onClick={handleConfirmHapus} style={{ padding: '10px 24px', backgroundColor: '#b91c1c', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Trash2 size={16} /> Konfirmasi Hapus
        </button>
      </div>

    </div>
  );
}