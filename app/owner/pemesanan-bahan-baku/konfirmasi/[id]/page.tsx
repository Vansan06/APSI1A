'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function KonfirmasiPersetujuanPOPage() {
  const router = useRouter();

  const handleSetujui = () => {
    router.push('/owner/pemesanan-bahan-baku/PO-026-025');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Breadcrumb Header */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '10px 20px', fontSize: '12px', color: '#a02e59' }}>
        <Link href="/owner/pemesanan-bahan-baku" style={{ color: '#a02e59', textDecoration: 'none' }}>← Kembali ke Detail</Link> / Konfirmasi Persetujuan Bahan Baku
      </div>

      {/* Card Header PO */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f0d5de', paddingBottom: '16px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '22px', color: '#a02e59', margin: 0 }}>PO-026-025</h2>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#555', marginTop: '2px' }}>PT Sumber Pangan</div>
          </div>
          <span style={{ backgroundColor: '#fef7e0', color: '#b45309', padding: '4px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
            Menunggu
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '13px' }}>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Tanggal pesanan</div>
            <div style={{ fontWeight: 'bold' }}>25 Oktober 2026</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Estimasi tiba</div>
            <div style={{ fontWeight: 'bold' }}>27 Oktober 2026</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Pengiriman</div>
            <div style={{ fontWeight: 'bold' }}>Estimasi 2 hari</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Kode supplier</div>
            <div style={{ fontWeight: 'bold' }}>SUP-001</div>
          </div>
        </div>
      </div>

      {/* Card Rincian Item PO */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h4 style={{ color: '#a02e59', margin: '0 0 16px 0', fontSize: '15px' }}>Rincian pesanan bahan baku</h4>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fbebf0', color: '#702643', textAlign: 'left' }}>
              <th style={{ padding: '10px 16px' }}>Bahan baku</th>
              <th style={{ padding: '10px 16px' }}>Jumlah</th>
              <th style={{ padding: '10px 16px' }}>Harga satuan</th>
              <th style={{ padding: '10px 16px' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #fafafa' }}>
              <td style={{ padding: '12px 16px' }}>Tepung terigu protein tinggi</td>
              <td style={{ padding: '12px 16px' }}>50 kg</td>
              <td style={{ padding: '12px 16px' }}>Rp14.000/kg</td>
              <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>Rp700.000</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #fafafa' }}>
              <td style={{ padding: '12px 16px' }}>Gula pasir</td>
              <td style={{ padding: '12px 16px' }}>50 kg</td>
              <td style={{ padding: '12px 16px' }}>Rp16.000/kg</td>
              <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>Rp800.000</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #fafafa' }}>
              <td style={{ padding: '12px 16px' }}>Susu bubuk</td>
              <td style={{ padding: '12px 16px' }}>25 kg</td>
              <td style={{ padding: '12px 16px' }}>Rp58.000/kg</td>
              <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>Rp1.450.000</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '2px solid #f0d5de' }}>
          <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Total PO • 3 jenis bahan baku</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>Rp2.950.000</span>
        </div>
      </div>

      {/* Card Aksi Persetujuan */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h4 style={{ color: '#a02e59', margin: '0 0 16px 0', fontSize: '15px' }}>Setujui pesanan bahan baku ini?</h4>
        
        <div style={{ backgroundColor: '#fff5f7', padding: '14px 18px', borderRadius: '10px', fontSize: '12px', color: '#702643', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>✓</span>
          <span>Saya sudah meninjau detail pesanan PO-026-025, supplier PT Sumber Pangan, seluruh item, jumlah, harga, estimasi pengiriman, dan total Rp2.950.000. Saya memberikan persetujuan atas pesanan ini.</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/owner/pemesanan-bahan-baku" style={{ padding: '10px 24px', border: '1px solid #a02e59', borderRadius: '20px', color: '#a02e59', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
            ← Kembali ke Detail
          </Link>
          <button 
            onClick={handleSetujui}
            style={{ padding: '10px 28px', backgroundColor: '#a02e59', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Ya, Setujui Pesanan
          </button>
        </div>
      </div>

    </div>
  );
}
