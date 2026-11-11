'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export type PesananItem = {
  id: string;
  tgl: string;
  bahan: string;
  jumlah: string;
  status: 'Pesanan baru' | 'Diproses' | 'Dikirim';
};

const DEFAULT_PESANAN: PesananItem[] = [
  { id: 'PB-025', tgl: '25 Okt 2026', bahan: 'Tepung terigu', jumlah: '50 kg', status: 'Pesanan baru' },
  { id: 'PB-024', tgl: '24 Okt 2026', bahan: 'Gula pasir', jumlah: '25 kg', status: 'Diproses' },
  { id: 'PB-023', tgl: '24 Okt 2026', bahan: 'Margarin', jumlah: '20 kg', status: 'Dikirim' },
];

export default function PesananBahanBakuSupplierPage() {
  const [pesananList, setPesananList] = useState<PesananItem[]>(DEFAULT_PESANAN);

  useEffect(() => {
    const storedState = localStorage.getItem('pb025_processed');
    if (storedState === 'true') {
      setPesananList((prev) =>
        prev.map((p) => (p.id === 'PB-025' ? { ...p, status: 'Diproses' } : p))
      );
    }
  }, []);

  const countBaru = pesananList.filter((p) => p.status === 'Pesanan baru').length;
  const countDiproses = pesananList.filter((p) => p.status === 'Diproses').length;
  const countDikirim = pesananList.filter((p) => p.status === 'Dikirim').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '12px 20px', fontSize: '14px', fontWeight: 'bold', color: '#6b21a8' }}>
        Kelola Pesanan Bahan Baku
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>Daftar Pesanan</h3>
          <span style={{ fontSize: '11px', color: '#888', backgroundColor: '#f3e8ff', padding: '4px 12px', borderRadius: '12px' }}>{pesananList.length} pesanan aktif</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '12px', backgroundColor: '#f3e8ff', color: '#6b21a8', fontWeight: 'bold' }}>
            {countBaru} Pesanan baru
          </span>
          <span style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '12px', backgroundColor: '#fef7e0', color: '#b45309', fontWeight: 'bold' }}>
            {countDiproses} Diproses
          </span>
          <span style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '12px', backgroundColor: '#e6f4ea', color: '#137333', fontWeight: 'bold' }}>
            {countDikirim} Dikirim
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3e8ff', color: '#581c87', textAlign: 'left' }}>
              <th style={{ padding: '10px 16px' }}>No. pesanan</th>
              <th style={{ padding: '10px 16px' }}>Tanggal</th>
              <th style={{ padding: '10px 16px' }}>Bahan baku</th>
              <th style={{ padding: '10px 16px' }}>Jumlah</th>
              <th style={{ padding: '10px 16px' }}>Status</th>
              <th style={{ padding: '10px 16px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pesananList.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #fafafa' }}>
                <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#6b21a8' }}>{p.id}</td>
                <td style={{ padding: '12px 16px' }}>{p.tgl}</td>
                <td style={{ padding: '12px 16px' }}>{p.bahan}</td>
                <td style={{ padding: '12px 16px' }}>{p.jumlah}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    backgroundColor: p.status === 'Pesanan baru' ? '#f3e8ff' : p.status === 'Diproses' ? '#fef7e0' : '#e6f4ea',
                    color: p.status === 'Pesanan baru' ? '#6b21a8' : p.status === 'Diproses' ? '#b45309' : '#137333',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <Link href={`/supplier/pesanan/${p.id}`} style={{ padding: '6px 14px', border: '1px solid #6b21a8', borderRadius: '20px', color: '#6b21a8', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                    Lihat Detail Pesanan
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
