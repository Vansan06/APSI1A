
'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Plus,
  Check,
  Truck,
  ShoppingCart,
  Clock,
  Info,
} from 'lucide-react';

export interface SupplierItem {
  id: string;
  namaPerusahaan: string;
  namaKontak: string;
  bahanUtama: string;
  telepon: string;
  kota: string;
  status: 'Aktif' | 'Nonaktif';
}

export const SUPPLIER_LIST: SupplierItem[] = [
  {
    id: 'SUP-001',
    namaPerusahaan: 'CV Sumber Pangan',
    namaKontak: 'Budiman',
    bahanUtama: 'Tepung, gula, ragi',
    telepon: '0812-3456-7801',
    kota: 'Bandung',
    status: 'Aktif',
  },
  {
    id: 'SUP-002',
    namaPerusahaan: 'PT Prima Dairy',
    namaKontak: 'Rina Wijaya',
    bahanUtama: 'Mentega, keju, susu',
    telepon: '0812-3456-7802',
    kota: 'Bandung',
    status: 'Aktif',
  },
  {
    id: 'SUP-003',
    namaPerusahaan: 'CV Cokelat Nusantara',
    namaKontak: 'Andi Saputra',
    bahanUtama: 'Cokelat batang',
    telepon: '0812-3456-7803',
    kota: 'Cimahi',
    status: 'Aktif',
  },
  {
    id: 'SUP-004',
    namaPerusahaan: 'UD Ternak Makmur',
    namaKontak: 'Eko Prasetyo',
    bahanUtama: 'Telur',
    telepon: '0812-3456-7804',
    kota: 'Lembang',
    status: 'Aktif',
  },
];

// =====================================================
// KOMPONEN UTAMA SUPPLIER
// =====================================================

function AdminDataSupplierContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const notifyType = searchParams.get('notify');

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');

  useEffect(() => {
    if (notifyType === 'simpan') {
      setModalTitle('Berhasil disimpan');
      setModalDesc('Data supplier berhasil disimpan.');
      setShowModal(true);
    } else if (notifyType === 'edit') {
      setModalTitle('Berhasil diedit');
      setModalDesc('Data supplier berhasil diedit.');
      setShowModal(true);
    } else if (notifyType === 'hapus') {
      setModalTitle('Berhasil dihapus');
      setModalDesc('Data supplier berhasil dihapus.');
      setShowModal(true);
    }
  }, [notifyType]);

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/admin/supplier');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* HEADER UTAMA */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h2 style={{
            fontSize: '24px',
            color: '#6b21a8',
            margin: 0,
            fontWeight: 'bold',
          }}>
            Data Supplier
          </h2>
        </div>
      </div>

      {/* 3 KARTU STATISTIK */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}>

        {/* CARD 1 */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>
              Supplier aktif
            </div>

            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#6b21a8',
              margin: '4px 0',
            }}>
              4 mitra
            </div>

            <div style={{ fontSize: '10px', color: '#888888' }}>
              Seluruh kontak terverifikasi
            </div>
          </div>

          <div style={iconBadgeStyle}>
            <Truck size={20} color="#6b21a8" />
          </div>
        </div>

        {/* CARD 2 */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>
              Pesanan berjalan
            </div>

            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#6b21a8',
              margin: '4px 0',
            }}>
              3 pesanan
            </div>

            <div style={{ fontSize: '10px', color: '#888888' }}>
              2 dikirim, 1 dikonfirmasi
            </div>
          </div>

          <div style={iconBadgeStyle}>
            <ShoppingCart size={20} color="#6b21a8" />
          </div>
        </div>

        {/* CARD 3 */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>
              Rata-rata pengiriman
            </div>

            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#6b21a8',
              margin: '4px 0',
            }}>
              2 hari
            </div>

            <div style={{ fontSize: '10px', color: '#888888' }}>
              Dari 12 pengiriman bulan ini
            </div>
          </div>

          <div style={iconBadgeStyle}>
            <Clock size={20} color="#6b21a8" />
          </div>
        </div>

      </div>

      {/* DAFTAR SUPPLIER */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}>
          <h3 style={{
            fontSize: '16px',
            color: '#6b21a8',
            margin: 0,
            fontWeight: 'bold',
          }}>
            Daftar supplier
          </h3>

          <span style={{ fontSize: '11px', color: '#888' }}>
            4 data
          </span>
        </div>

        {/* SEARCH DAN FILTER */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px',
        }}>
          <input
            type="text"
            placeholder="Cari nama supplier atau bahan..."
            style={{
              flex: 1,
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              outline: 'none',
            }}
          />

          <select style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '12px',
          }}>
            <option>Semua bahan</option>
          </select>

          <select style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '12px',
          }}>
            <option>Aktif</option>
            <option>Nonaktif</option>
          </select>
        </div>

        {/* TABEL SUPPLIER */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '12px',
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#fdf2f8',
                color: '#86198f',
                textAlign: 'left',
              }}>
                <th style={{ padding: '10px 12px' }}>Supplier</th>
                <th style={{ padding: '10px 12px' }}>Bahan utama</th>
                <th style={{ padding: '10px 12px' }}>Kontak</th>
                <th style={{ padding: '10px 12px' }}>Kota</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
                <th style={{ padding: '10px 12px' }}>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {SUPPLIER_LIST.map((item) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: '1px solid #fdf2f8' }}
                >
                  <td style={{ padding: '12px' }}>
                    <div style={{
                      fontWeight: 'bold',
                      color: '#333',
                    }}>
                      {item.namaPerusahaan}
                    </div>

                    <div style={{
                      fontSize: '10px',
                      color: '#777',
                    }}>
                      {item.id} • {item.namaKontak}
                    </div>
                  </td>

                  <td style={{ padding: '12px', color: '#333' }}>
                    {item.bahanUtama}
                  </td>

                  <td style={{ padding: '12px', color: '#333' }}>
                    {item.telepon}
                  </td>

                  <td style={{ padding: '12px', color: '#333' }}>
                    {item.kota}
                  </td>

                  <td style={{ padding: '12px' }}>
                    <span style={{
                      backgroundColor: item.status === 'Aktif'
                        ? '#e6f4ea'
                        : '#fef3c7',
                      color: item.status === 'Aktif'
                        ? '#137333'
                        : '#b45309',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                    }}>
                      {item.status}
                    </span>
                  </td>

                  <td style={{ padding: '12px' }}>
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      fontSize: '11px',
                      whiteSpace: 'nowrap',
                    }}>
                      <Link
                        href={`/admin/supplier/${item.id}`}
                        style={actionLinkStyle}
                      >
                        Lihat Detail Supplier
                      </Link>

                      <Link
                        href={`/admin/supplier/${item.id}/edit`}
                        style={actionLinkStyle}
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/admin/supplier/${item.id}/hapus`}
                        style={actionLinkStyle}
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
      </div>

      {/* BANNER INFORMASI PENGIRIMAN */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#f3e8ff',
            color: '#6b21a8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Info size={16} />
          </div>

          <div>
            <div style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333',
            }}>
              Pengiriman terdekat • PT Prima Dairy
            </div>

            <div style={{
              fontSize: '11px',
              color: '#666',
              marginTop: '2px',
            }}>
              20 kg mentega dijadwalkan tiba 25 Oktober 2026
              melalui PO-261024-01. Kontak: Rina Wijaya.
            </div>
          </div>
        </div>

        <Link
          href="/admin/supplier/SUP-002"
          style={{
            fontSize: '11px',
            color: '#6b21a8',
            border: '1px solid #6b21a8',
            padding: '6px 16px',
            borderRadius: '20px',
            textDecoration: 'none',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
          }}
        >
          Lihat Detail Supplier
        </Link>
      </div>

      {/* TOMBOL TAMBAH SUPPLIER */}
      <div>
        <Link
          href="/admin/supplier/tambah"
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
          <span>Tambah Supplier</span>
        </Link>
      </div>

      {/* MODAL NOTIFIKASI */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '32px',
            width: '380px',
            maxWidth: '90%',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
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
              justifyContent: 'center',
            }}>
              <Check size={28} strokeWidth={3} />
            </div>

            <h3 style={{
              fontSize: '20px',
              color: '#6b21a8',
              margin: '0 0 8px 0',
              fontWeight: 'bold',
            }}>
              {modalTitle}
            </h3>

            <p style={{
              fontSize: '13px',
              color: '#666',
              margin: '0 0 24px 0',
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
                cursor: 'pointer',
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

// =====================================================
// STYLE
// =====================================================

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

const actionLinkStyle: React.CSSProperties = {
  color: '#6b21a8',
  textDecoration: 'none',
  fontWeight: '500',
};

// =====================================================
// SUSPENSE WRAPPER - PERBAIKAN BUILD NEXT.JS
// =====================================================

export default function AdminDataSupplierPage() {
  return (
    <Suspense
      fallback={
        <div style={{
          padding: '24px',
          color: '#6b21a8',
          fontFamily: 'system-ui, sans-serif',
        }}>
          Memuat data supplier...
        </div>
      }
    >
      <AdminDataSupplierContent />
    </Suspense>
  );
}
