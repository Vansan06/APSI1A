
'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Plus, Check, Info, Box, Layers, BookOpen } from 'lucide-react';

export interface ProdukItem {
  id: string;
  nama: string;
  kodeSatuan: string;
  kategori: string;
  hargaJual: string;
  stok: string;
  status: 'Aktif' | 'Nonaktif';
  imageSrc: string;
}

export const KATALOG_PRODUK_LIST: ProdukItem[] = [
  {
    id: 'PRD-001',
    nama: 'Donat Cokelat',
    kodeSatuan: 'PRD-001 • per pcs',
    kategori: 'Donat',
    hargaJual: 'Rp8.000',
    stok: '60 pcs',
    status: 'Aktif',
    imageSrc: '/donat-cokelat.png',
  },
  {
    id: 'PRD-002',
    nama: 'Donat Keju',
    kodeSatuan: 'PRD-002 • per pcs',
    kategori: 'Donat',
    hargaJual: 'Rp9.000',
    stok: '40 pcs',
    status: 'Aktif',
    imageSrc: '/donat-keju.png',
  },
  {
    id: 'PRD-003',
    nama: 'Donat Gula',
    kodeSatuan: 'PRD-003 • per pcs',
    kategori: 'Donat',
    hargaJual: 'Rp12.000',
    stok: '45 pcs',
    status: 'Aktif',
    imageSrc: '/donat-gula.png',
  },
  {
    id: 'PRD-004',
    nama: 'Donat Stroberi',
    kodeSatuan: 'PRD-004 • per pcs',
    kategori: 'Donat',
    hargaJual: 'Rp11.800',
    stok: '20 pcs',
    status: 'Aktif',
    imageSrc: '/donat-stroberi.png',
  },
];

// Komponen utama dipisahkan agar useSearchParams
// berada di dalam batas Suspense.
function AdminDataProdukContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

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
    router.push('/admin/produk');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* HEADER UTAMA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Data Produk
          </h2>
        </div>
      </div>

      {/* 3 KARTU STATISTIK ATAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>

        {/* CARD 1 */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Produk aktif</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>
              4 produk
            </div>
            <div style={{ fontSize: '10px', color: '#888888' }}>4 varian donat</div>
          </div>
          <div style={iconBadgeStyle}>
            <Box size={20} color="#6b21a8" />
          </div>
        </div>

        {/* CARD 2 */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Stok siap jual</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>
              165 unit
            </div>
            <div style={{ fontSize: '10px', color: '#888888' }}>Setelah alokasi pesanan hari ini</div>
          </div>
          <div style={iconBadgeStyle}>
            <Layers size={20} color="#6b21a8" />
          </div>
        </div>

        {/* CARD 3 */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Resep terhubung</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b21a8', margin: '4px 0' }}>
              4 dari 4
            </div>
            <div style={{ fontSize: '10px', color: '#888888' }}>Semua produk memiliki resep</div>
          </div>
          <div style={iconBadgeStyle}>
            <BookOpen size={20} color="#6b21a8" />
          </div>
        </div>
      </div>

      {/* KATALOG PRODUK TABLE */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Katalog produk
          </h3>
          <span style={{ fontSize: '11px', color: '#888' }}>4 data</span>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Cari kode atau nama produk..."
            style={{
              flex: 1,
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              outline: 'none'
            }}
          />
          <select style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '12px'
          }}>
            <option>Semua kategori</option>
            <option>Donat</option>
          </select>
          <select style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '12px'
          }}>
            <option>Produk aktif</option>
            <option>Nonaktif</option>
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
              <th style={{ padding: '10px 12px', borderRadius: '6px 0 0 6px' }}>Produk</th>
              <th style={{ padding: '10px 12px' }}>Kategori</th>
              <th style={{ padding: '10px 12px' }}>Harga jual</th>
              <th style={{ padding: '10px 12px' }}>Stok tersedia</th>
              <th style={{ padding: '10px 12px' }}>Status</th>
              <th style={{ padding: '10px 12px', borderRadius: '0 6px 6px 0' }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {KATALOG_PRODUK_LIST.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #fdf2f8' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={item.imageSrc}
                      alt={item.nama}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        objectFit: 'cover',
                        backgroundColor: '#f3e8ff'
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#333' }}>{item.nama}</div>
                      <div style={{ fontSize: '10px', color: '#777' }}>{item.kodeSatuan}</div>
                    </div>
                  </div>
                </td>

                <td style={{ padding: '12px', color: '#333' }}>{item.kategori}</td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#333' }}>{item.hargaJual}</td>
                <td style={{ padding: '12px', color: '#333' }}>{item.stok}</td>

                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: '#e6f4ea',
                    color: '#137333',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {item.status}
                  </span>
                </td>

                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                    <Link
                      href={`/admin/produk/${item.id}`}
                      style={{ color: '#6b21a8', textDecoration: 'none', fontWeight: '500' }}
                    >
                      Lihat Detail Produk
                    </Link>

                    <Link
                      href={`/admin/produk/${item.id}/edit`}
                      style={{ color: '#6b21a8', textDecoration: 'none', fontWeight: '500' }}
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/admin/produk/${item.id}/hapus`}
                      style={{ color: '#6b21a8', textDecoration: 'none', fontWeight: '500' }}
                    >
                      Hapus
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* INFO CARD BANNER */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#f3e8ff',
            color: '#6b21a8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Info size={16} />
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>
              Stok diperbarui dari hasil produksi
            </div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
              Produk yang lolos pemeriksaan mutu otomatis tercatat sebagai stok.
              Alokasi pesanan dipisahkan dari stok siap jual.
            </div>
          </div>
        </div>

        <Link
          href="/admin/hasil-produksi"
          style={{
            fontSize: '11px',
            color: '#6b21a8',
            border: '1px solid #6b21a8',
            padding: '6px 14px',
            borderRadius: '16px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Hasil Produksi
        </Link>
      </div>

      {/* TOMBOL TAMBAH PRODUK */}
      <div>
        <Link
          href="/admin/produk/tambah"
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
            fontWeight: 'bold'
          }}
        >
          <Plus size={16} />
          <span>Tambah Produk</span>
        </Link>
      </div>

      {/* MODAL NOTIFIKASI BERHASIL */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '32px',
            width: '380px',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#f3e8ff',
              color: '#6b21a8',
              margin: '0 auto 16px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Check size={28} strokeWidth={3} />
            </div>

            <h3 style={{
              fontSize: '20px',
              color: '#6b21a8',
              margin: '0 0 8px 0',
              fontWeight: 'bold'
            }}>
              {modalTitle}
            </h3>

            <p style={{
              fontSize: '13px',
              color: '#666',
              margin: '0 0 24px 0'
            }}>
              {modalDesc}
            </p>

            <button
              onClick={handleCloseModal}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#581c87',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrapper ini membuat useSearchParams berada di dalam Suspense.
export default function AdminDataProdukPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '24px', color: '#6b21a8' }}>
          Memuat data produk...
        </div>
      }
    >
      <AdminDataProdukContent />
    </Suspense>
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
