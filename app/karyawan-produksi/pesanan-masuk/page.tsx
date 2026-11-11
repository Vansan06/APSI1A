'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Search,
  ShoppingBag,
  ClipboardList,
  Factory,
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
} from 'lucide-react';

export interface PesananItem {
  id: string;
  waktu: string;
  pelanggan: string;
  produk: string;
  gambar: string;
  jumlah: string;
  tenggat: string;
  status: 'Siap dikemas' | 'Diproduksi' | 'Siap Produksi';
  catatan?: string;
  jadwalProduksi?: string;
}

const DAFTAR_PESANAN: PesananItem[] = [
  {
    id: 'PSN-261024-01',
    waktu: '24 Okt • 08.15',
    pelanggan: 'Toko Sari',
    produk: 'Donat Cokelat',
    gambar: '/donat-cokelat.png',
    jumlah: '200 pcs',
    tenggat: '14.00 WIB',
    status: 'Siap dikemas',
    catatan: 'Kemasan dus isi 10 pcs, tambahkan stiker logo Toko Sari.',
  },
  {
    id: 'PSN-261024-02',
    waktu: '24 Okt • 09.10',
    pelanggan: 'Kafe Senja',
    produk: 'Donat Keju',
    gambar: '/donat-keju.png',
    jumlah: '150 pcs',
    tenggat: '15.00 WIB',
    status: 'Diproduksi',
    catatan: 'Tanpa tambahan topping • Kemasan satuan. Alokasi produksi 170 pcs: 150 pcs untuk pesanan dan 20 pcs untuk stok.',
    jadwalProduksi: '12.30–14.30 WIB',
  },
  {
    id: 'PSN-261024-03',
    waktu: '24 Okt • 10.00',
    pelanggan: 'Dina Lestari',
    produk: 'Donat Gula',
    gambar: '/donat-gula.png',
    jumlah: '120 pcs',
    tenggat: '14.30 WIB',
    status: 'Siap dikemas',
    catatan: 'Gula halus terpisah dalam wadah kecil.',
  },
  {
    id: 'PSN-261024-04',
    waktu: '24 Okt • 10.45',
    pelanggan: 'Bima Pratama',
    produk: 'Donat Stroberi',
    gambar: '/donat-stroberi.png',
    jumlah: '50 pcs',
    tenggat: '16.00 WIB',
    status: 'Siap Produksi',
    catatan: 'Donat stroberi glaze.',
    jadwalProduksi: '14.30–16.00 WIB',
  },
];

export default function PesananMasukPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua status');
  const [filterTanggal, setFilterTanggal] = useState('24 Okt 2026');

  const filteredPesanan = DAFTAR_PESANAN.filter((p) => {
    const matchSearch =
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pelanggan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.produk.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus =
      filterStatus === 'Semua status' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* BARIS ATAS */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ fontSize: '24px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
          Pesanan Masuk
        </h2>
        <Link
          href="/karyawan-produksi/kapasitas-produksi"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            color: '#b0525e',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <Calendar size={14} />
          <span>Lihat Detail Jadwal Produksi</span>
        </Link>
      </div>

      {/* KARTU STATISTIK 3 KOLOM */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div style={cardStatStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
              Pesanan hari ini
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>
              4 pesanan
            </div>
            <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>
              24 Oktober 2026
            </div>
          </div>
          <div style={iconBadgeStyle}>
            <ShoppingBag size={20} color="#b0525e" />
          </div>
        </div>

        <div style={cardStatStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
              Kebutuhan pesanan
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>
              520 unit
            </div>
            <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>
              520 pcs roti/kue
            </div>
          </div>
          <div style={iconBadgeStyle}>
            <ClipboardList size={20} color="#b0525e" />
          </div>
        </div>

        <div style={cardStatStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>
              Sedang diproduksi
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>
              1 pesanan
            </div>
            <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>
              Donat Keju • selesai pukul 14.30
            </div>
          </div>
          <div style={iconBadgeStyle}>
            <Factory size={20} color="#b0525e" />
          </div>
        </div>
      </div>

      {/* TABEL DAFTAR PESANAN PRODUKSI */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h3 style={{ fontSize: '16px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Daftar pesanan produksi
          </h3>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', width: '280px' }}>
              <Search
                size={14}
                color="#aaaaaa"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Cari nomor pesanan, pelanggan, atau produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={selectStyle}
            >
              <option value="Semua status">Semua status</option>
              <option value="Siap dikemas">Siap dikemas</option>
              <option value="Diproduksi">Diproduksi</option>
              <option value="Siap Produksi">Siap Produksi</option>
            </select>

            <select
              value={filterTanggal}
              onChange={(e) => setFilterTanggal(e.target.value)}
              style={selectStyle}
            >
              <option value="24 Okt 2026">24 Okt 2026</option>
            </select>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf0ee', color: '#b0525e', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', borderRadius: '8px 0 0 8px' }}>Pesanan</th>
              <th style={{ padding: '12px 14px' }}>Pelanggan / produk</th>
              <th style={{ padding: '12px 14px' }}>Jumlah</th>
              <th style={{ padding: '12px 14px' }}>Tenggat</th>
              <th style={{ padding: '12px 14px', borderRadius: '0 8px 8px 0' }}>Status produksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPesanan.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '14px' }}>
                  <div style={{ fontWeight: 'bold', color: '#333333' }}>{item.id}</div>
                  <div style={{ fontSize: '10px', color: '#888888', marginTop: '2px' }}>
                    {item.waktu}
                  </div>
                </td>
                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: '#fcdcd9',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={item.gambar}
                        alt={item.produk}
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#333333' }}>{item.pelanggan}</div>
                      <div style={{ fontSize: '11px', color: '#777777' }}>{item.produk}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px', fontWeight: 'bold', color: '#444444' }}>
                  {item.jumlah}
                </td>
                <td style={{ padding: '14px', color: '#444444' }}>{item.tenggat}</td>
                <td style={{ padding: '14px' }}>
                  <span style={getStatusBadgeStyle(item.status)}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINASI BATASTABEL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '16px',
            fontSize: '11px',
            color: '#777777',
          }}
        >
          <span>Menampilkan 1–{filteredPesanan.length} dari {DAFTAR_PESANAN.length} data</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button style={pageButtonStyle} disabled>
              <ChevronLeft size={14} />
            </button>
            <button style={{ ...pageButtonStyle, backgroundColor: '#b0525e', color: '#ffffff' }}>
              1
            </button>
            <button style={pageButtonStyle} disabled>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* KARTU SEDANG DIPRODUKSI */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h4 style={{ fontSize: '14px', color: '#b0525e', margin: '0 0 8px 0', fontWeight: 'bold' }}>
              Sedang Diproduksi
            </h4>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#333333' }}>
              PSN-261024-02 • Kafe Senja
            </div>
            <div style={{ fontSize: '12px', color: '#666666', marginTop: '4px' }}>
              150 Donat Keju • Tanpa tambahan topping • Kemasan satuan
            </div>
            <div style={{ fontSize: '11px', color: '#777777', marginTop: '4px' }}>
              Alokasi produksi 170 pcs: 150 pcs untuk pesanan dan 20 pcs untuk stok. Pastikan hasil lolos mutu dicatat sebelum dikemas.
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                display: 'inline-block',
                backgroundColor: '#e8f0fe',
                color: '#1a73e8',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              1 pesanan aktif
            </span>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#333333' }}>
              12.30–14.30 WIB
            </div>
            <div style={{ fontSize: '11px', color: '#777777', marginTop: '2px' }}>
              Penanggung jawab: Siti Rahmah
            </div>
            <div style={{ marginTop: '8px' }}>
              <span style={getStatusBadgeStyle('Diproduksi')}>Diproduksi</span>
            </div>
          </div>
        </div>
      </div>

      {/* KARTU ANTREAN SIAP PRODUKSI */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <h4 style={{ fontSize: '14px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Antrean Siap Produksi
          </h4>
          <span
            style={{
              backgroundColor: '#fef3c7',
              color: '#d97706',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 'bold',
            }}
          >
            1 pesanan menunggu
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fffbeb', color: '#b45309', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px' }}>Pesanan</th>
              <th style={{ padding: '8px 12px' }}>Pelanggan / produk</th>
              <th style={{ padding: '8px 12px' }}>Jumlah</th>
              <th style={{ padding: '8px 12px' }}>Jadwal produksi</th>
              <th style={{ padding: '8px 12px' }}>Tenggat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', fontWeight: 'bold', color: '#333333' }}>
                PSN-261024-04
                <div style={{ fontSize: '10px', color: '#888888', fontWeight: 'normal' }}>
                  24 Okt • 10.45
                </div>
              </td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#fcdcd9',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src="/donat-stroberi.png"
                      alt="Donat Stroberi"
                      fill
                      style={{ objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#333333' }}>Bima Pratama</div>
                    <div style={{ fontSize: '10px', color: '#777777' }}>Donat Stroberi</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>50 pcs</td>
              <td style={{ padding: '12px', fontWeight: 'bold', color: '#444444' }}>
                14.30–16.00 WIB
              </td>
              <td style={{ padding: '12px', color: '#444444' }}>16.00 WIB</td>
            </tr>
          </tbody>
        </table>

        <div
          style={{
            backgroundColor: '#fff7ed',
            borderRadius: '10px',
            padding: '10px 14px',
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            color: '#c2410c',
          }}
        >
          <Clock size={14} />
          <span>
            Produksi Donat Stroberi dijadwalkan mulai pukul 14.30 WIB, setelah pesanan Donat Keju selesai. Siapkan bahan baku sebelum giliran dimulai.
          </span>
        </div>
      </div>

      {/* BANNER PRIORITAS PENGEMASAN */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '16px 24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#fdf0ee',
            color: '#b0525e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Info size={18} />
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#333333' }}>
            Prioritas pengemasan • Toko Sari
          </div>
          <div style={{ fontSize: '11px', color: '#666666', marginTop: '2px' }}>
            200 Donat Cokelat telah tersedia dari hasil lolos mutu. Selesaikan pengemasan sebelum pengambilan pukul 14.00.
          </div>
        </div>
      </div>
    </div>
  );
}

/* HELPER STYLES */
const cardStatStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const iconBadgeStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  backgroundColor: '#fdf0ee',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const selectStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  fontSize: '12px',
  color: '#444444',
  backgroundColor: '#ffffff',
  outline: 'none',
};

const pageButtonStyle: React.CSSProperties = {
  width: '28px',
  height: '28px',
  borderRadius: '6px',
  border: '1px solid #e2e8f0',
  backgroundColor: '#ffffff',
  color: '#555555',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '12px',
};

function getStatusBadgeStyle(status: PesananItem['status']): React.CSSProperties {
  switch (status) {
    case 'Siap dikemas':
      return {
        backgroundColor: '#e6f4ea',
        color: '#137333',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-block',
      };
    case 'Diproduksi':
      return {
        backgroundColor: '#e8f0fe',
        color: '#1a73e8',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-block',
      };
    case 'Siap Produksi':
      return {
        backgroundColor: '#fff3cd',
        color: '#856404',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-block',
      };
    default:
      return {};
  }
}