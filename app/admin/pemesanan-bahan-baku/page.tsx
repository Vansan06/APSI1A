'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Plus, Check, Wallet, Truck, PackageCheck, AlertTriangle, Edit3 } from 'lucide-react';

export interface PemesananItem {
  id: string; // Nomor PO e.g. PO-261024-01
  tanggal: string;
  supplier: string;
  bahanBaku: string;
  jumlah: string;
  total: string;
  estimasiTiba: string;
  status: 'Dikonfirmasi' | 'Dikirim' | 'Diterima';
  tujuan: string;
  catatanStatus: string;
}

export const PEMESANAN_LIST: PemesananItem[] = [
  {
    id: 'PO-261024-01',
    tanggal: '24 Okt 2026',
    supplier: 'PT Prima Dairy',
    bahanBaku: 'Mentega',
    jumlah: '20 kg',
    total: 'Rp1.600.000',
    estimasiTiba: '25 Okt 2026',
    status: 'Dikirim',
    tujuan: 'DFO Donat',
    catatanStatus: 'Pesanan sedang dalam perjalanan oleh pihak supplier (PT Prima Dairy). Kontak: Rina Wijaya.',
  },
  {
    id: 'PO-261024-02',
    tanggal: '24 Okt 2026',
    supplier: 'CV Cokelat Nusantara',
    bahanBaku: 'Cokelat batang',
    jumlah: '20 kg',
    total: 'Rp1.400.000',
    estimasiTiba: '26 Okt 2026',
    status: 'Dikonfirmasi',
    tujuan: 'DFO Donat',
    catatanStatus: 'Pesanan telah dikonfirmasi oleh supplier dan sedang disiapkan untuk pengiriman.',
  },
  {
    id: 'PO-261023-01',
    tanggal: '23 Okt 2026',
    supplier: 'CV Sumber Pangan',
    bahanBaku: 'Tepung terigu',
    jumlah: '100 kg',
    total: 'Rp1.200.000',
    estimasiTiba: '25 Okt 2026',
    status: 'Dikirim',
    tujuan: 'DFO Donat',
    catatanStatus: 'Pesanan sedang dikirim oleh CV Sumber Pangan.',
  },
  {
    id: 'PO-261022-01',
    tanggal: '22 Okt 2026',
    supplier: 'UD Ternak Makmur',
    bahanBaku: 'Telur',
    jumlah: '30 kg',
    total: 'Rp840.000',
    estimasiTiba: '23 Okt 2026',
    status: 'Diterima',
    tujuan: 'DFO Donat',
    catatanStatus: 'Bahan baku telah diterima di gudang dan tercatat pada persediaan.',
  },
];

export default function AdminPemesananBahanBakuPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [poRows, setPoRows] = useState<PemesananItem[]>(PEMESANAN_LIST);
  useEffect(() => {
    fetch("/api/pemesanan-bahan-baku").then(r=>r.json()).then(r=>{
      if(r.success) setPoRows(r.data.map((p:any)=>({id:p.id_pengadaan,tanggal:new Date(p.tanggal_pesanan).toLocaleDateString("id-ID"),supplier:p.supplier?.nama_supplier||"-",bahanBaku:p.detail_pesanan_bahan_baku?.map((d:any)=>d.bahan_baku?.nama_bahan).join(", ")||"-",jumlah:p.detail_pesanan_bahan_baku?.reduce((s:number,d:any)=>s+Number(d.jumlah),0)+"",total:"Rp"+Number(p.total_biaya||0).toLocaleString("id-ID"),estimasiTiba:"-",status:p.status==="Menunggu Supplier"?"Dikonfirmasi":p.status==="Diterima"?"Diterima":"Dikirim",tujuan:"DFO Donat",catatanStatus:p.status})));
    }).catch(console.error);
  }, []);


  const notifyType = searchParams.get('notify');
  const [selectedId, setSelectedId] = useState<string>('PO-261024-01');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');

  const activeItem = poRows.find((p) => p.id === selectedId) || poRows[0];

  useEffect(() => {
    if (notifyType === 'simpan') {
      setModalTitle('Berhasil disimpan');
      setModalDesc('Data pemesanan bahan baku berhasil disimpan.');
      setShowModal(true);
    } else if (notifyType === 'edit') {
      setModalTitle('Berhasil diedit');
      setModalDesc('Data pemesanan bahan baku berhasil diedit.');
      setShowModal(true);
    } else if (notifyType === 'hapus') {
      setModalTitle('Berhasil dihapus');
      setModalDesc('Data pemesanan bahan baku berhasil dihapus.');
      setShowModal(true);
    }
  }, [notifyType]);

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/admin/pemesanan-bahan-baku');
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Dikirim') {
      return { bg: '#e0f2fe', color: '#0369a1' };
    }
    if (status === 'Dikonfirmasi') {
      return { bg: '#fef3c7', color: '#b45309' };
    }
    return { bg: '#e6f4ea', color: '#137333' }; // Diterima
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* HEADER UTAMA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Pemesanan Bahan Baku
          </h2>
        </div>
      </div>

      {/* 3 KARTU STATISTIK ATAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Pembelian Oktober</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>
              Rp18.450.000
            </div>
            <div style={{ fontSize: '10px', color: '#888888' }}>12 pesanan pembelian</div>
          </div>
          <div style={iconBadgeStyle}><Wallet size={20} color="#6b21a8" /></div>
        </div>

        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Belum diterima</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>
              3 pesanan
            </div>
            <div style={{ fontSize: '10px', color: '#888888' }}>Nilai berjalan Rp4.200.000</div>
          </div>
          <div style={iconBadgeStyle}><Truck size={20} color="#6b21a8" /></div>
        </div>

        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Diterima bulan ini</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>
              9 pesanan
            </div>
            <div style={{ fontSize: '10px', color: '#888888' }}>Bahan sudah masuk persediaan</div>
          </div>
          <div style={iconBadgeStyle}><PackageCheck size={20} color="#6b21a8" /></div>
        </div>
      </div>

      {/* TABEL DAFTAR PEMESANAN */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>Daftar pemesanan</h3>
          <span style={{ fontSize: '11px', color: '#888' }}>12 data</span>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Cari nomor PO atau supplier..."
            style={{ flex: 1, padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', outline: 'none' }}
          />
          <select style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
            <option>Oktober 2026</option>
          </select>
          <select style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
            <option>Semua status</option>
            <option>Dikonfirmasi</option>
            <option>Dikirim</option>
            <option>Diterima</option>
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
              <th style={{ padding: '10px 12px', borderRadius: '6px 0 0 6px' }}>Nomor / tanggal</th>
              <th style={{ padding: '10px 12px' }}>Supplier / bahan</th>
              <th style={{ padding: '10px 12px' }}>Total</th>
              <th style={{ padding: '10px 12px' }}>Estimasi tiba</th>
              <th style={{ padding: '10px 12px' }}>Status</th>
              <th style={{ padding: '10px 12px', borderRadius: '0 6px 6px 0' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {poRows.map((item) => {
              const badge = getStatusBadge(item.status);
              const isSelected = item.id === selectedId;
              return (
                <tr
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  style={{
                    borderBottom: '1px solid #fdf2f8',
                    backgroundColor: isSelected ? '#faf5ff' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>{item.id}</div>
                    <div style={{ fontSize: '10px', color: '#777' }}>{item.tanggal}</div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>{item.supplier}</div>
                    <div style={{ fontSize: '10px', color: '#777' }}>{item.bahanBaku} • {item.jumlah}</div>
                  </td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#333' }}>{item.total}</td>
                  <td style={{ padding: '12px', color: '#333' }}>{item.estimasiTiba}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ backgroundColor: badge.bg, color: badge.color, padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                      <Link href={`/admin/pemesanan-bahan-baku/${item.id}`} style={{ color: '#6b21a8', textDecoration: 'none', fontWeight: '500' }}>
                        Lihat Detail Pemesanan
                      </Link>
                      <Link href={`/admin/pemesanan-bahan-baku/${item.id}/edit`} style={{ color: '#6b21a8', textDecoration: 'none', fontWeight: '500' }}>
                        Edit
                      </Link>
                      <Link href={`/admin/pemesanan-bahan-baku/${item.id}/hapus`} style={{ color: '#b91c1c', textDecoration: 'none', fontWeight: '500' }}>
                        Hapus
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* DETAIL PREVIEW PANEL TERILIHAT DI HALAMAN UTAMA (SESUAI GAMBAR REFERENSI SUPPLIER) */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f3e8ff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Detail Pesanan • {activeItem.id}
          </h3>
          <span style={{ backgroundColor: getStatusBadge(activeItem.status).bg, color: getStatusBadge(activeItem.status).color, padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
            {activeItem.status}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Tanggal pesanan</div>
            <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{activeItem.tanggal}</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Pemesanan / tujuan</div>
            <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{activeItem.tujuan}</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Bahan baku</div>
            <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{activeItem.bahanBaku}</div>
          </div>
          <div>
            <div style={{ color: '#777', fontSize: '11px' }}>Jumlah dipesan</div>
            <div style={{ fontWeight: 'bold', color: '#333', marginTop: '2px' }}>{activeItem.jumlah}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#faf5ff', padding: '12px 16px', borderRadius: '8px', fontSize: '12px', color: '#555', marginBottom: '16px' }}>
          {activeItem.catatanStatus}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Link href={`/admin/pemesanan-bahan-baku/${activeItem.id}/edit`} style={{ padding: '8px 20px', backgroundColor: '#6b21a8', color: '#ffffff', borderRadius: '16px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Edit3 size={14} /> Edit Pemesanan
          </Link>
        </div>
      </div>

      {/* BANNER PERINGATAN BISA DIPESAN KEMBALI */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
        <AlertTriangle size={20} color="#b45309" />
        <div>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>Prioritas pengadaan: mentega dan cokelat</div>
          <div style={{ fontSize: '11px', color: '#666' }}>Kedua bahan berada di bawah stok minimum. Pastikan jumlah dan mutu bahan sesuai sebelum mencatat penerimaan.</div>
        </div>
      </div>

      {/* TOMBOL BUAT PEMESANAN */}
      <div>
        <Link
          href="/admin/pemesanan-bahan-baku/tambah"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#6b21a8',
            color: '#ffffff',
            borderRadius: '20px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 'bold',
          }}
        >
          <Plus size={16} />
          <span>Buat Pemesanan</span>
        </Link>
      </div>

      {/* MODAL NOTIFIKASI BERHASIL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', width: '380px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#6b21a8', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={28} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '20px', color: '#6b21a8', margin: '0 0 8px 0', fontWeight: 'bold' }}>{modalTitle}</h3>
            <p style={{ fontSize: '13px', color: '#666', margin: '0 0 24px 0' }}>{modalDesc}</p>
            <button onClick={handleCloseModal} style={{ width: '100%', padding: '12px', backgroundColor: '#581c87', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
              Selesai
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

const statCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const iconBadgeStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  backgroundColor: '#f3e8ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};