'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Boxes,
  ShieldCheck,
  AlertTriangle,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Info,
  Clock,
} from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';

export interface RiwayatProduksiItem {
  idBatch: string;
  produk: string;
  gambar: string;
  tanggal: string;
  jam: string;
  target: string;
  hasil: string;
  lolos: string;
  ditolak: string;
  petugas: string;
  status: 'Selesai';
}

const DATA_RIWAYAT: RiwayatProduksiItem[] = [
  {
    idBatch: 'PRD-261024-02',
    produk: 'Donat Gula',
    gambar: '/donat-gula.png',
    tanggal: '24 Okt 2026',
    jam: '12.00 WIB',
    target: '150 pcs',
    hasil: '150 pcs',
    lolos: '148 pcs',
    ditolak: '2 pcs',
    petugas: 'Siti Rahmah',
    status: 'Selesai',
  },
  {
    idBatch: 'PRD-261024-01',
    produk: 'Donat Cokelat',
    gambar: '/donat-cokelat.png',
    tanggal: '24 Okt 2026',
    jam: '10.00 WIB',
    target: '250 pcs',
    hasil: '250 pcs',
    lolos: '246 pcs',
    ditolak: '4 pcs',
    petugas: 'Siti Rahmah',
    status: 'Selesai',
  },
  {
    idBatch: 'PRD-261023-04',
    produk: 'Donat Stroberi',
    gambar: '/donat-stroberi.png',
    tanggal: '23 Okt 2026',
    jam: '16.00 WIB',
    target: '50 pcs',
    hasil: '50 pcs',
    lolos: '50 pcs',
    ditolak: '0 pcs',
    petugas: 'Siti Rahmah',
    status: 'Selesai',
  },
  {
    idBatch: 'PRD-261023-03',
    produk: 'Donat Keju',
    gambar: '/donat-keju.png',
    tanggal: '23 Okt 2026',
    jam: '14.30 WIB',
    target: '170 pcs',
    hasil: '170 pcs',
    lolos: '168 pcs',
    ditolak: '2 pcs',
    petugas: 'Siti Rahmah',
    status: 'Selesai',
  },
  {
    idBatch: 'PRD-261023-02',
    produk: 'Donat Gula',
    gambar: '/donat-gula.png',
    tanggal: '23 Okt 2026',
    jam: '12.00 WIB',
    target: '150 pcs',
    hasil: '150 pcs',
    lolos: '149 pcs',
    ditolak: '1 pcs',
    petugas: 'Siti Rahmah',
    status: 'Selesai',
  },
  {
    idBatch: 'PRD-261023-01',
    produk: 'Donat Cokelat',
    gambar: '/donat-cokelat.png',
    tanggal: '23 Okt 2026',
    jam: '10.00 WIB',
    target: '250 pcs',
    hasil: '250 pcs',
    lolos: '248 pcs',
    ditolak: '2 pcs',
    petugas: 'Siti Rahmah',
    status: 'Selesai',
  },
];

function RiwayatProduksiContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const notifParam = searchParams.get('notif');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTanggal, setFilterTanggal] = useState('23-24 Okt 2026');
  const [filterPetugas, setFilterPetugas] = useState('Semua petugas');
  const [filterHasil, setFilterHasil] = useState('Semua hasil');

  // Modal State untuk notifikasi sukses simpan
  const [isModalOpen, setIsModalOpen] = useState(notifParam === 'disimpan');

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Bersihkan parameter notif dari URL
    router.replace('/karyawan-produksi/riwayat-produksi');
  };

  const filteredData = DATA_RIWAYAT.filter((item) => {
    const matchSearch =
      item.idBatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.produk.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* MODAL SUKSES PENYIMPANAN */}
      <SuccessModal
        isOpen={isModalOpen}
        title="Berhasil disimpan"
        desc="Data berhasil disimpan."
        onClose={handleCloseModal}
      />

      {/* BARIS ATAS: TITLE & TOMBOL EKSPOR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
          Riwayat Produksi
        </h2>
        <button
          onClick={() => alert('Ekspor Riwayat berhasil diunduh.')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            color: '#b0525e',
            border: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            cursor: 'pointer',
          }}
        >
          <Download size={14} />
          <span>Ekspor Riwayat</span>
        </button>
      </div>

      {/* KARTU STATISTIK 3 KOLOM */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div style={cardStatStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>Hasil hari ini</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>400 pcs</div>
            <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>2 kelompok produksi selesai</div>
          </div>
          <div style={iconBadgeStyle}>
            <Boxes size={20} color="#b0525e" />
          </div>
        </div>

        <div style={cardStatStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>Lolos mutu</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>394 pcs</div>
            <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>98,5% dari hasil produksi</div>
          </div>
          <div style={iconBadgeStyle}>
            <ShieldCheck size={20} color="#b0525e" />
          </div>
        </div>

        <div style={cardStatStyle}>
          <div>
            <div style={{ fontSize: '11px', color: '#777777', marginBottom: '4px' }}>Tidak lolos mutu</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#b0525e' }}>6 pcs</div>
            <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>Dipisahkan dari stok siap jual</div>
          </div>
          <div style={iconBadgeStyle}>
            <AlertTriangle size={20} color="#b0525e" />
          </div>
        </div>
      </div>

      {/* TABEL RIWAYAT HASIL PRODUKSI */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', color: '#b0525e', margin: 0, fontWeight: 'bold' }}>
            Riwayat hasil produksi
          </h3>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', width: '260px' }}>
              <Search size={14} color="#aaaaaa" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari kode produksi atau nama produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <select value={filterTanggal} onChange={(e) => setFilterTanggal(e.target.value)} style={selectStyle}>
              <option value="23-24 Okt 2026">23–24 Okt 2026</option>
            </select>

            <select value={filterPetugas} onChange={(e) => setFilterPetugas(e.target.value)} style={selectStyle}>
              <option value="Semua petugas">Semua petugas</option>
            </select>

            <select value={filterHasil} onChange={(e) => setFilterHasil(e.target.value)} style={selectStyle}>
              <option value="Semua hasil">Semua hasil</option>
            </select>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf0ee', color: '#b0525e', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', borderRadius: '8px 0 0 8px' }}>Produksi / produk</th>
              <th style={{ padding: '12px 14px' }}>Tanggal</th>
              <th style={{ padding: '12px 14px' }}>Target</th>
              <th style={{ padding: '12px 14px' }}>Hasil</th>
              <th style={{ padding: '12px 14px' }}>Lolos</th>
              <th style={{ padding: '12px 14px' }}>Ditolak</th>
              <th style={{ padding: '12px 14px' }}>Petugas</th>
              <th style={{ padding: '12px 14px' }}>Status</th>
              <th style={{ padding: '12px 14px', textAlign: 'right', borderRadius: '0 8px 8px 0' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.idBatch} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', overflow: 'hidden', position: 'relative', backgroundColor: '#fcdcd9', flexShrink: 0 }}>
                      <Image src={item.gambar} alt={item.produk} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#333333' }}>{item.idBatch}</div>
                      <div style={{ fontSize: '10px', color: '#777777' }}>{item.produk}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px' }}>
                  <div style={{ color: '#333333' }}>{item.tanggal}</div>
                  <div style={{ fontSize: '10px', color: '#888888' }}>{item.jam}</div>
                </td>
                <td style={{ padding: '14px', color: '#555555' }}>{item.target}</td>
                <td style={{ padding: '14px', fontWeight: 'bold', color: '#333333' }}>{item.hasil}</td>
                <td style={{ padding: '14px', fontWeight: 'bold', color: '#137333' }}>{item.lolos}</td>
                <td style={{ padding: '14px', fontWeight: 'bold', color: '#dc3545' }}>{item.ditolak}</td>
                <td style={{ padding: '14px', color: '#555555' }}>{item.petugas}</td>
                <td style={{ padding: '14px' }}>
                  <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', fontSize: '11px', fontWeight: 'bold' }}>
                    <Link href={`/karyawan-produksi/riwayat-produksi/detail?id=${item.idBatch}`} style={{ color: '#b0525e', textDecoration: 'none' }}>
                      Lihat Detail Hasil Produksi
                    </Link>
                    <Link href={`/karyawan-produksi/riwayat-produksi/ubah?id=${item.idBatch}`} style={{ color: '#b0525e', textDecoration: 'none' }}>
                      Edit
                    </Link>
                    <button onClick={() => alert(`Hapus batch ${item.idBatch}`)} style={{ background: 'none', border: 'none', color: '#b0525e', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINASI */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '11px', color: '#777777' }}>
          <span>Menampilkan 1–{filteredData.length} dari {DATA_RIWAYAT.length} data</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button style={pageButtonStyle} disabled><ChevronLeft size={14} /></button>
            <button style={{ ...pageButtonStyle, backgroundColor: '#b0525e', color: '#ffffff' }}>1</button>
            <button style={pageButtonStyle} disabled><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {/* CATATAN MUTU PRD-261024-01 */}
      <div style={{ backgroundColor: '#fff3cd', borderRadius: '16px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertTriangle size={18} color="#856404" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#856404' }}>Catatan mutu • PRD-261024-01</div>
            <div style={{ fontSize: '11px', color: '#666666', marginTop: '2px' }}>
              4 Donat Cokelat ditolak karena permukaan terlalu matang. Sebanyak 246 pcs lolos mutu telah dicatat masuk gudang produk jadi.
            </div>
          </div>
        </div>
        <Link href="/karyawan-produksi/riwayat-produksi/detail?id=PRD-261024-01" style={{ padding: '8px 16px', backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '8px', color: '#555555', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
          Detail Produksi
        </Link>
      </div>

      {/* BANNER INFORMASI CATATAN OTOMATIS */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '14px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#666666' }}>
        <Clock size={16} color="#b0525e" />
        <span>Setiap perubahan hasil yang disimpan akan dicatat secara otomatis: nama petugas, waktu ubah, dan alasan koreksi. Gunakan tombol <strong>Ubah</strong> pada baris yang ingin dikoreksi.</span>
      </div>

      {/* FOOTER KETERANGAN & TOMBOL TAMBAH HASIL */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '10px', color: '#888888' }}>
          Data riwayat produksi tersimpan hingga 24 Oktober 2026, 13.00 WIB. Karyawan produksi dapat melihat dan mengubah hasil yang telah diinput sesuai kebutuhan koreksi.
        </div>
        <Link href="/karyawan-produksi/riwayat-produksi/tambah" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#b0525e', borderRadius: '8px', color: '#ffffff', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
          <Plus size={16} />
          <span>Tambah Hasil</span>
        </Link>
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

export default function RiwayatProduksiPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RiwayatProduksiContent />
    </Suspense>
  );
}