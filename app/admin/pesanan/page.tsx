'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Plus, Check } from 'lucide-react';

export interface PesananItem {
  id: string;
  waktu: string;
  pelanggan: string;
  produk: string;
  jumlah: string;
  total: string;
  status: 'Siap dikirim' | 'Diproduksi' | 'Menunggu bayar';
  imageSrc: string;
}

export const PESANAN_DATA_LIST: PesananItem[] = [
  {
    id: 'PSN-261024-01',
    waktu: '24 Okt • 08.15',
    pelanggan: 'Toko Sari',
    produk: 'Donat Cokelat',
    jumlah: '200 pcs',
    total: 'Rp1.600.000',
    status: 'Siap dikirim',
    imageSrc: '/donat-cokelat.png',
  },
  {
    id: 'PSN-261024-02',
    waktu: '24 Okt • 09.10',
    pelanggan: 'Kafe Senja',
    produk: 'Donat Keju',
    jumlah: '150 pcs',
    total: 'Rp1.350.000',
    status: 'Diproduksi',
    imageSrc: '/donat-keju.png',
  },
  {
    id: 'PSN-261024-03',
    waktu: '24 Okt • 10.00',
    pelanggan: 'Dina Lestari',
    produk: 'Donat Gula',
    jumlah: '120 pcs',
    total: 'Rp1.440.000',
    status: 'Siap dikirim',
    imageSrc: '/donat-gula.png',
  },
  {
    id: 'PSN-261024-04',
    waktu: '24 Okt • 10.45',
    pelanggan: 'Bima Pratama',
    produk: 'Donat Stroberi',
    jumlah: '50 pcs',
    total: 'Rp590.000',
    status: 'Menunggu bayar',
    imageSrc: '/donat-stroberi.png',
  },
];

export default function AdminDataPesananPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pesananRows, setPesananRows] = useState<PesananItem[]>(PESANAN_DATA_LIST);
  useEffect(() => {
    fetch("/api/pesanan").then(r=>r.json()).then(r=>{
      if(r.success) setPesananRows(r.data.map((o:any)=>({id:o.id_pesanan,waktu:new Date(o.tanggal_pesanan).toLocaleDateString("id-ID"),pelanggan:o.nama_pelanggan||"-",produk:o.detail_pesanan_produk?.map((d:any)=>d.produk?.nama_produk).join(", ")||"-",jumlah:o.detail_pesanan_produk?.reduce((s:number,d:any)=>s+d.jumlah,0)+" pcs",total:"Rp"+Number(o.total_biaya_pesanan||0).toLocaleString("id-ID"),status:o.status||"Diproses",imageSrc:"/donat-cokelat.png"})));
    }).catch(console.error);
  }, []);


  const notifyType = searchParams.get('notify');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');

  useEffect(() => {
    if (notifyType === 'simpan') {
      setModalTitle('Berhasil disimpan');
      setModalDesc('Data berhasil disimpan.');
      setShowModal(true);
    } else if (notifyType === 'edit') {
      setModalTitle('Berhasil diedit');
      setModalDesc('Data berhasil diedit.');
      setShowModal(true);
    } else if (notifyType === 'hapus') {
      setModalTitle('Berhasil dihapus');
      setModalDesc('Data berhasil dihapus.');
      setShowModal(true);
    }
  }, [notifyType]);

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/admin/pesanan');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* HEADER UTAMA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Data Pesanan
          </h2>
        </div>
      </div>

      {/* 3 KARTU STATISTIK ATAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div style={statCardStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777' }}>Pesanan hari ini</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b21a8' }}>4</div>
            <div style={{ fontSize: '10px', color: '#888' }}>24 Oktober 2026</div>
          </div>
        </div>

        <div style={statCardStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777' }}>Nilai pesanan</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b21a8' }}>Rp4.980.000</div>
            <div style={{ fontSize: '10px', color: '#888' }}>Total 520 produk dipesan</div>
          </div>
        </div>

        <div style={statCardStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777' }}>Siap dikirim</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b21a8' }}>2 pesanan</div>
            <div style={{ fontSize: '10px', color: '#888' }}>Pengiriman mulai pukul 14.00</div>
          </div>
        </div>
      </div>

      {/* TABEL DAFTAR PESANAN */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>Daftar pesanan</h3>
          <span style={{ fontSize: '11px', color: '#888' }}>4 data</span>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Cari nomor pesanan atau pelanggan..."
            style={{ flex: 1, padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', outline: 'none' }}
          />
          <select style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
            <option>Semua status</option>
            <option>Siap dikirim</option>
            <option>Diproduksi</option>
            <option>Menunggu bayar</option>
          </select>
          <select style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
            <option>24 Okt 2026</option>
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
              <th style={{ padding: '10px 12px', borderRadius: '6px 0 0 6px' }}>Pesanan</th>
              <th style={{ padding: '10px 12px' }}>Pelanggan / produk</th>
              <th style={{ padding: '10px 12px' }}>Jumlah</th>
              <th style={{ padding: '10px 12px' }}>Total</th>
              <th style={{ padding: '10px 12px' }}>Status</th>
              <th style={{ padding: '10px 12px', borderRadius: '0 6px 6px 0' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pesananRows.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #fdf2f8' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 'bold', color: '#6b21a8' }}>{item.id}</div>
                  <div style={{ fontSize: '10px', color: '#888' }}>{item.waktu}</div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={item.imageSrc}
                      alt={item.produk}
                      style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover', backgroundColor: '#f3e8ff' }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#333' }}>{item.pelanggan}</div>
                      <div style={{ fontSize: '10px', color: '#777' }}>{item.produk}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px', color: '#333' }}>{item.jumlah}</td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#333' }}>{item.total}</td>
                <td style={{ padding: '12px' }}>
                  <span style={getStatusBadgeStyle(item.status)}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                    <Link href={`/admin/pesanan/${item.id}`} style={{ color: '#6b21a8', textDecoration: 'none', fontWeight: '500' }}>
                      Lihat Detail Pesanan
                    </Link>
                    <Link href={`/admin/pesanan/${item.id}/edit`} style={{ color: '#6b21a8', textDecoration: 'none', fontWeight: '500' }}>
                      Edit
                    </Link>
                    <Link href={`/admin/pesanan/${item.id}/hapus`} style={{ color: '#6b21a8', textDecoration: 'none', fontWeight: '500' }}>
                      Hapus
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* INFO CARD BANNER BOTTOM */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b21a8' }}>
            Pengiriman berikutnya • Toko Sari
          </div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
            200 Donat Cokelat siap diambil pukul 14.00. Pembayaran lunas melalui transfer bank.
          </div>
        </div>
        <Link href="/admin/pesanan/PSN-261024-01" style={{ fontSize: '11px', color: '#6b21a8', border: '1px solid #6b21a8', padding: '6px 14px', borderRadius: '16px', textDecoration: 'none', fontWeight: 'bold' }}>
          Lihat Detail Pesanan
        </Link>
      </div>

      {/* TOMBOL TAMBAH PESANAN */}
      <div>
        <Link
          href="/admin/pesanan/tambah"
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
          <span>Tambah Pesanan</span>
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
};

function getStatusBadgeStyle(status: string): React.CSSProperties {
  if (status === 'Siap dikirim') {
    return { backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  } else if (status === 'Diproduksi') {
    return { backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  } else {
    return { backgroundColor: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
  }
}