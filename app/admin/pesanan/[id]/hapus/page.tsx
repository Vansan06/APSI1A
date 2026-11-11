'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle, Trash2 } from 'lucide-react';

export default function HapusPesananAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'PSN-261024-01';

  const handleConfirmHapus = () => {
    router.push('/admin/pesanan?notify=hapus');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* BREADCRUMB & HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>
            Data Pesanan &gt; <span style={{ color: '#6b21a8', fontWeight: 'bold' }}>Hapus Pesanan</span>
          </div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Hapus Pesanan
          </h2>
          <div style={{ fontSize: '12px', color: '#777' }}>
            Tinjau ringkasan pesanan sebelum mengonfirmasi penghapusan.
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

      {/* BANNER PERINGATAN */}
      <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <AlertTriangle size={20} color="#dc2626" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#991b1b', marginBottom: '4px' }}>
            Yakin ingin menghapus pesanan ini?
          </div>
          <div style={{ fontSize: '11px', color: '#b91c1c', lineHeight: 1.4 }}>
            Pesanan {id} beserta rincian item dan catatannya akan dihapus permanen dari Data Pesanan. Tindakan ini tidak dapat dibatalkan dan tidak memproses pengembalian pembayaran.
          </div>
        </div>
      </div>

      {/* RINGKASAN PESANAN YANG AKAN DIHAPUS */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '15px', color: '#6b21a8', margin: '0 0 16px 0', fontWeight: 'bold' }}>
          Pesanan yang akan dihapus
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '12px', marginBottom: '20px' }}>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Nomor pesanan</div>
            <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>{id}</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Pelanggan</div>
            <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>Toko Sari</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Tanggal pesanan</div>
            <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>24 Oktober 2026</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Waktu pengambilan</div>
            <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px', marginTop: '2px' }}>14.00</div>
          </div>
        </div>

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
              <td style={{ padding: '12px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>🍩</span>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>Donat Cokelat</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>PRD-001 • per pcs</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '12px 10px', color: '#333' }}>200</td>
              <td style={{ padding: '12px 10px', color: '#333' }}>Rp8.000</td>
              <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#333' }}>Rp1.600.000</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f3f4f6', marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: '#777' }}>1 jenis produk • 200 pcs</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
            Total pesanan <span style={{ color: '#6b21a8', fontSize: '18px', marginLeft: '8px' }}>Rp1.600.000</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ color: '#777', fontSize: '11px', marginBottom: '4px' }}>Status pesanan</div>
            <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Siap dikirim</span>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px', marginBottom: '4px' }}>Status pembayaran</div>
            <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Lunas</span>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px', marginBottom: '4px' }}>Metode pembayaran</div>
            <div style={{ fontWeight: 'bold', color: '#333' }}>Transfer bank</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px', fontSize: '11px', color: '#555' }}>
          <strong>Catatan pesanan:</strong><br />
          200 Donat Cokelat siap diambil pukul 14.00. Pembayaran lunas melalui transfer bank.
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <div style={{ fontSize: '11px', color: '#777' }}>
          Pastikan urusan pembayaran dan pengambilan sudah diselesaikan. Pilih Batal untuk mempertahankan pesanan.
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" onClick={() => router.push('/admin/pesanan')} style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '20px', backgroundColor: '#ffffff', color: '#555', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            Batal
          </button>
          <button type="button" onClick={handleConfirmHapus} style={{ padding: '10px 24px', backgroundColor: '#b91c1c', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Trash2 size={16} /> Ya, Hapus Pesanan
          </button>
        </div>
      </div>

    </div>
  );
}