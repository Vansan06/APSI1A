'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Check, ArrowLeft } from 'lucide-react';

export default function DetailPesananSupplierPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const [isPB025Processed, setIsPB025Processed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedState = localStorage.getItem('pb025_processed');
    if (storedState === 'true') {
      setIsPB025Processed(true);
    }
  }, []);

  // Base Data Model
  const isPB025 = id === 'PB-025';
  const currentStatus = isPB025 
    ? (isPB025Processed ? 'Diproses' : 'Pesanan baru') 
    : id === 'PB-024' ? 'Diproses' : 'Dikirim';

  const statusTerima = isPB025
    ? (isPB025Processed ? 'Diterima' : 'Belum diterima')
    : 'Diterima';

  const bahanName = isPB025 ? 'Tepung terigu' : id === 'PB-024' ? 'Gula pasir' : 'Margarin';
  const jumlahVal = isPB025 ? '50' : id === 'PB-024' ? '25' : '20';

  const handleTerimaDanProses = () => {
    setShowModal(true);
  };

  const handleSelesai = () => {
    if (isPB025) {
      localStorage.setItem('pb025_processed', 'true');
      setIsPB025Processed(true);
    }
    setShowModal(false);
    router.push('/supplier/pesanan');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Breadcrumb Header + Tombol Kembali */}
      <div 
        style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '12px', 
          padding: '10px 20px', 
          fontSize: '12px', 
          color: '#6b21a8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <Link href="/supplier/pesanan" style={{ color: '#6b21a8', textDecoration: 'none' }}>Pesanan Bahan Baku</Link> / Detail Pesanan
        </div>

        {/* Tombol Kembali */}
        <Link
          href="/supplier/pesanan"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            backgroundColor: '#ffffff',
            border: '1px solid #6b21a8',
            borderRadius: '20px',
            color: '#6b21a8',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Pesanan Bahan Baku</span>
        </Link>
      </div>

      {/* Main Info Card */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f3e8ff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>{id}</h2>
            <span style={{
              backgroundColor: currentStatus === 'Pesanan baru' ? '#f3e8ff' : currentStatus === 'Diproses' ? '#fef7e0' : '#e6f4ea',
              color: currentStatus === 'Pesanan baru' ? '#6b21a8' : currentStatus === 'Diproses' ? '#b45309' : '#137333',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              {currentStatus}
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#888' }}>Data contoh</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '12px' }}>
          <div>
            <div style={{ color: '#888' }}>Tanggal pesanan</div>
            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>25 Okt 2026</div>
          </div>
          <div>
            <div style={{ color: '#888' }}>Pemesan / tujuan</div>
            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#6b21a8' }}>DFO Donat</div>
          </div>
          <div>
            <div style={{ color: '#888' }}>Jumlah jenis bahan</div>
            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>1 jenis bahan baku</div>
          </div>
          <div>
            <div style={{ color: '#888' }}>Status penerimaan pesanan</div>
            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#6b21a8' }}>{statusTerima}</div>
          </div>
        </div>
      </div>

      {/* Grid Rincian & Pemrosesan */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        {/* Rincian Bahan Baku */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h4 style={{ color: '#6b21a8', margin: '0 0 16px 0', fontWeight: 'bold' }}>Rincian Bahan Baku</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3e8ff', color: '#581c87', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px' }}>Bahan baku</th>
                <th style={{ padding: '8px 12px' }}>Jumlah</th>
                <th style={{ padding: '8px 12px' }}>Satuan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px 12px', fontWeight: 'bold', color: '#6b21a8' }}>{bahanName}</td>
                <td style={{ padding: '10px 12px', fontWeight: 'bold' }}>{jumlahVal}</td>
                <td style={{ padding: '10px 12px' }}>kg</td>
              </tr>
            </tbody>
          </table>
          <div style={{ textAlign: 'right', marginTop: '16px', fontWeight: 'bold', fontSize: '13px', color: '#333' }}>
            Total jumlah dipesan: <span style={{ color: '#6b21a8' }}>{jumlahVal} kg</span>
          </div>
        </div>

        {/* Status Pemrosesan */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h4 style={{ color: '#6b21a8', margin: '0 0 16px 0', fontWeight: 'bold' }}>Status Pemrosesan</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6b21a8', fontWeight: 'bold' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#6b21a8' }}></div>
              <div>Pesanan baru <span style={{ fontSize: '10px', color: '#888', fontWeight: 'normal' }}>(25 Okt 2026 • {statusTerima})</span></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: currentStatus === 'Diproses' || currentStatus === 'Dikirim' ? '#b45309' : '#888', fontWeight: currentStatus === 'Diproses' ? 'bold' : 'normal' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: currentStatus === 'Diproses' || currentStatus === 'Dikirim' ? '#b45309' : 'transparent', border: currentStatus === 'Diproses' || currentStatus === 'Dikirim' ? 'none' : '2px solid #ccc' }}></div>
              <div>Diproses</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: currentStatus === 'Dikirim' ? '#137333' : '#888', fontWeight: currentStatus === 'Dikirim' ? 'bold' : 'normal' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: currentStatus === 'Dikirim' ? '#137333' : 'transparent', border: currentStatus === 'Dikirim' ? 'none' : '2px solid #ccc' }}></div>
              <div>Dikirim</div>
            </div>
          </div>
        </div>

      </div>

      {/* Grid Informasi Pengiriman & Catatan Pesanan */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', fontSize: '12px' }}>
          <h4 style={{ color: '#6b21a8', margin: '0 0 12px 0', fontWeight: 'bold' }}>Informasi Pengiriman</h4>
          <div style={{ color: '#888', marginBottom: '12px' }}>Detail pengiriman untuk pesanan ini:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div><span style={{ color: '#888' }}>Tujuan:</span><br /><strong>DFO Donat</strong></div>
            <div><span style={{ color: '#888' }}>Alamat pengiriman:</span><br /><strong>Jl. Sukajadi No. 45, Bandung</strong></div>
            <div><span style={{ color: '#888' }}>Tanggal kirim:</span><br /><strong>{currentStatus === 'Dikirim' ? '25 Okt 2026' : 'Belum tersedia'}</strong></div>
            <div><span style={{ color: '#888' }}>Nomor resi:</span><br /><strong>{currentStatus === 'Dikirim' ? 'JNE88291029' : 'Belum diisi'}</strong></div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', fontSize: '12px' }}>
          <h4 style={{ color: '#6b21a8', margin: '0 0 12px 0', fontWeight: 'bold' }}>Catatan Pesanan</h4>
          <div style={{ color: '#888', marginBottom: '12px' }}>Catatan dari pemesan: <strong>Mohon dikirim tepat waktu</strong></div>
          <div style={{ backgroundColor: '#f3e8ff', padding: '12px', borderRadius: '8px', color: '#581c87' }}>
            <strong>Stok {bahanName}: Available</strong><br />
            Stok dicatat terpisah dan diperbarui oleh supplier.
          </div>
        </div>

      </div>

      {/* Bottom Process Action Card - HANYA MUNCUL JIKA PB-025 & BELUM DIPROSES */}
      {isPB025 && !isPB025Processed && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div>
            <h5 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6b21a8', fontWeight: 'bold' }}>Pesanan belum diterima</h5>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Terima pesanan untuk melanjutkan ke status Diproses. Setelah itu, lengkapi detail pengiriman sebelum bahan dikirim.</p>
          </div>
          <button onClick={handleTerimaDanProses} style={{ padding: '12px 24px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            Terima & Proses Pesanan
          </button>
        </div>
      )}

      {/* Modal Notifikasi Berhasil Diedit */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', width: '380px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#6b21a8', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={28} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '20px', color: '#6b21a8', margin: '0 0 8px 0', fontWeight: 'bold' }}>Berhasil diedit</h3>
            <p style={{ fontSize: '13px', color: '#666', margin: '0 0 24px 0' }}>Perubahan berhasil disimpan.</p>
            <button onClick={handleSelesai} style={{ width: '100%', padding: '12px', backgroundColor: '#581c87', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
              Selesai
            </button>
          </div>
        </div>
      )}

    </div>
  );
}