'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Check,
  Boxes,
  AlertTriangle,
  Wallet,
  Search,
  RefreshCw,
  Info,
} from 'lucide-react';

// ======================================================
// TIPE DATA
// ======================================================

export interface BahanBakuItem {
  id: string;
  nama: string;
  supplier: string;
  stok: string;
  minimum: string;
  hargaSatuan: string;
  kondisi: 'Aman' | 'Stok rendah';
}

interface BahanBakuApi {
  id_bahan_baku: string | number;
  nama_bahan?: string | null;
  stok_tersedia?: number | string | null;
  stok_minimal?: number | string | null;
  harga_satuan?: number | string | null;
  supplier?: {
    nama_supplier?: string | null;
  } | string | null;
}

interface ApiResponse {
  success: boolean;
  data?: BahanBakuApi[];
  error?: string;
}

type FilterKondisi = 'Semua kondisi' | 'Aman' | 'Stok rendah';

// ======================================================
// DATA FALLBACK
// Data ini ditampilkan jika API gagal diakses.
// ======================================================

export const BAHAN_BAKU_LIST: BahanBakuItem[] = [
  {
    id: 'BB-001',
    nama: 'Tepung Terigu',
    supplier: 'CV Sumber Pangan',
    stok: '125 kg',
    minimum: '50 kg',
    hargaSatuan: 'Rp12.000 / kg',
    kondisi: 'Aman',
  },
  {
    id: 'BB-002',
    nama: 'Gula Pasir',
    supplier: 'CV Sumber Pangan',
    stok: '60 kg',
    minimum: '25 kg',
    hargaSatuan: 'Rp17.000 / kg',
    kondisi: 'Aman',
  },
  {
    id: 'BB-003',
    nama: 'Mentega',
    supplier: 'PT Prima Dairy',
    stok: '8 kg',
    minimum: '15 kg',
    hargaSatuan: 'Rp80.000 / kg',
    kondisi: 'Stok rendah',
  },
  {
    id: 'BB-004',
    nama: 'Cokelat Batang',
    supplier: 'PT Cokelat Nusantara',
    stok: '6 kg',
    minimum: '10 kg',
    hargaSatuan: 'Rp70.000 / kg',
    kondisi: 'Stok rendah',
  },
  {
    id: 'BB-005',
    nama: 'Telur',
    supplier: 'Ternak Makmur',
    stok: '30 kg',
    minimum: '15 kg',
    hargaSatuan: 'Rp28.000 / kg',
    kondisi: 'Aman',
  },
  {
    id: 'BB-006',
    nama: 'Keju Cheddar',
    supplier: 'PT Prima Dairy',
    stok: '18 kg',
    minimum: '10 kg',
    hargaSatuan: 'Rp95.000 / kg',
    kondisi: 'Aman',
  },
];

// ======================================================
// FUNGSI BANTU
// ======================================================

function formatAngka(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}

function formatRupiah(value: number): string {
  return `Rp${formatAngka(value)}`;
}

/**
 * Mengubah teks seperti:
 * "125 kg"       -> 125
 * "Rp12.000/kg"  -> 12000
 * "12,5 kg"      -> 12.5
 */
function getNumber(value: string): number {
  const cleaned = value
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  const result = Number(cleaned);
  return Number.isFinite(result) ? result : 0;
}

function getNumericValue(value: number | string | null | undefined): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === 'string') {
    return getNumber(value);
  }

  return 0;
}

// ======================================================
// MAPPING DATA API KE FORMAT TABEL
// ======================================================

function mapBahanBaku(item: BahanBakuApi): BahanBakuItem {
  const stok = getNumericValue(item.stok_tersedia);
  const minimum = getNumericValue(item.stok_minimal);
  const harga = getNumericValue(item.harga_satuan);

  const supplier =
    typeof item.supplier === 'string'
      ? item.supplier
      : item.supplier?.nama_supplier || '-';

  return {
    id: String(item.id_bahan_baku),
    nama: item.nama_bahan || '-',
    supplier,
    stok: `${formatAngka(stok)} kg`,
    minimum: `${formatAngka(minimum)} kg`,
    hargaSatuan: `${formatRupiah(harga)} / kg`,
    kondisi: stok <= minimum ? 'Stok rendah' : 'Aman',
  };
}

// ======================================================
// KOMPONEN HALAMAN
// ======================================================

export default function AdminDataBahanBakuPage() {
  const router = useRouter();

  // ----------------------------------------------------
  // STATE DATA
  // ----------------------------------------------------

  const [bahanRows, setBahanRows] =
    useState<BahanBakuItem[]>(BAHAN_BAKU_LIST);

  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>('');

  // ----------------------------------------------------
  // STATE PENCARIAN DAN FILTER
  // ----------------------------------------------------

  const [search, setSearch] = useState<string>('');
  const [filterKondisi, setFilterKondisi] =
    useState<FilterKondisi>('Semua kondisi');

  // ----------------------------------------------------
  // STATE MODAL NOTIFIKASI
  // ----------------------------------------------------

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalDesc, setModalDesc] = useState<string>('');

  // ====================================================
  // AMBIL DATA BAHAN BAKU DARI API
  // ====================================================

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBahanBaku() {
      try {
        setLoading(true);
        setFetchError('');

        const response = await fetch('/api/bahan-baku', {
          method: 'GET',
          cache: 'no-store',
          credentials: 'same-origin',
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Gagal mengambil data. HTTP ${response.status}`);
        }

        const result: ApiResponse = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error(
            result.error || 'Format data API tidak sesuai.'
          );
        }

        const mappedData = result.data
          .filter((item) => item.id_bahan_baku != null)
          .map(mapBahanBaku);

        setBahanRows(mappedData);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Gagal memuat data bahan baku:', error);

          setFetchError(
            error instanceof Error
              ? error.message
              : 'Terjadi kesalahan saat mengambil data.'
          );

          // Jika API gagal, data fallback tetap ditampilkan.
          setBahanRows(BAHAN_BAKU_LIST);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBahanBaku();

    return () => {
      controller.abort();
    };
  }, []);

  // ====================================================
  // NOTIFIKASI QUERY PARAMETER
  //
  // Tidak menggunakan useSearchParams().
  // Parameter dibaca di useEffect sehingga hanya dijalankan
  // di browser setelah komponen terpasang.
  // ====================================================

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const notifyType = params.get('notify');

    if (notifyType === 'simpan') {
      setModalTitle('Berhasil disimpan');
      setModalDesc('Data bahan baku berhasil disimpan.');
      setShowModal(true);
    } else if (notifyType === 'edit') {
      setModalTitle('Berhasil diedit');
      setModalDesc('Data bahan baku berhasil diperbarui.');
      setShowModal(true);
    } else if (notifyType === 'hapus') {
      setModalTitle('Berhasil dihapus');
      setModalDesc('Data bahan baku berhasil dihapus.');
      setShowModal(true);
    }
  }, []);

  // ====================================================
  // TUTUP MODAL
  // ====================================================

  const handleCloseModal = () => {
    setShowModal(false);
    router.replace('/admin/bahan-baku', { scroll: false });
  };

  // ====================================================
  // PENCARIAN DAN FILTER
  // ====================================================

  const filteredRows = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return bahanRows.filter((item) => {
      const cocokSearch =
        item.nama.toLowerCase().includes(keyword) ||
        item.id.toLowerCase().includes(keyword) ||
        item.supplier.toLowerCase().includes(keyword);

      const cocokKondisi =
        filterKondisi === 'Semua kondisi' ||
        item.kondisi === filterKondisi;

      return cocokSearch && cocokKondisi;
    });
  }, [bahanRows, search, filterKondisi]);

  // ====================================================
  // STATISTIK
  // ====================================================

  const jumlahBahan = bahanRows.length;

  const jumlahStokRendah = bahanRows.filter(
    (item) => item.kondisi === 'Stok rendah'
  ).length;

  const nilaiPersediaan = bahanRows.reduce((total, item) => {
    return total + getNumber(item.stok) * getNumber(item.hargaSatuan);
  }, 0);

  // ====================================================
  // TAMPILAN
  // ====================================================

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
      }}
    >
      {/* HEADER HALAMAN */}
      <div>
        <h2
          style={{
            fontSize: '24px',
            color: '#6b21a8',
            margin: 0,
            fontWeight: 'bold',
          }}
        >
          Data Bahan Baku
        </h2>

        <p
          style={{
            fontSize: '12px',
            color: '#888',
            marginTop: '5px',
          }}
        >
          Kelola persediaan bahan baku dan pantau kondisi stok gudang.
        </p>
      </div>

      {/* PESAN ERROR API */}
      {fetchError && (
        <div
          style={{
            backgroundColor: '#fff7ed',
            border: '1px solid #fed7aa',
            color: '#9a3412',
            padding: '12px 16px',
            borderRadius: '10px',
            fontSize: '12px',
          }}
        >
          <strong>Gagal memperbarui data dari server.</strong>
          <div style={{ marginTop: '4px' }}>{fetchError}</div>
          <div style={{ marginTop: '4px' }}>
            Data contoh sementara ditampilkan jika tersedia.
          </div>
        </div>
      )}

      {/* KARTU STATISTIK */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '16px',
        }}
      >
        {/* TOTAL BAHAN */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={statLabelStyle}>Jenis bahan</div>
            <div style={statValueStyle}>{jumlahBahan} bahan</div>
            <div style={statDescStyle}>Tersimpan di gudang utama</div>
          </div>

          <div style={iconBadgeStyle}>
            <Boxes size={20} color="#6b21a8" />
          </div>
        </div>

        {/* STOK RENDAH */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={statLabelStyle}>Di bawah minimum</div>
            <div style={statValueStyle}>{jumlahStokRendah} bahan</div>
            <div style={statDescStyle}>Memerlukan pemesanan ulang</div>
          </div>

          <div
            style={{
              ...iconBadgeStyle,
              backgroundColor: '#fef3c7',
            }}
          >
            <AlertTriangle size={20} color="#b45309" />
          </div>
        </div>

        {/* NILAI PERSEDIAAN */}
        <div style={statCardStyle}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={statLabelStyle}>Nilai persediaan</div>
            <div
              style={{
                ...statValueStyle,
                fontSize: '21px',
                overflowWrap: 'anywhere',
              }}
            >
              {formatRupiah(nilaiPersediaan)}
            </div>
            <div style={statDescStyle}>
              Berdasarkan stok × harga satuan
            </div>
          </div>

          <div style={iconBadgeStyle}>
            <Wallet size={20} color="#6b21a8" />
          </div>
        </div>
      </div>

      {/* TABEL PERSEDIAAN */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        }}
      >
        {/* HEADER TABEL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              color: '#6b21a8',
              margin: 0,
              fontWeight: 'bold',
            }}
          >
            Persediaan bahan baku
          </h3>

          <span
            style={{
              fontSize: '11px',
              color: '#888',
              whiteSpace: 'nowrap',
            }}
          >
            {filteredRows.length} data
          </span>
        </div>

        {/* SEARCH DAN FILTER */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: '180px',
              position: 'relative',
            }}
          >
            <Search
              size={16}
              color="#888"
              style={{
                position: 'absolute',
                left: '12px',
                top: '10px',
              }}
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari kode atau nama bahan..."
              aria-label="Cari bahan baku"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
                outline: 'none',
              }}
            />
          </div>

          <select
            value={filterKondisi}
            onChange={(event) =>
              setFilterKondisi(event.target.value as FilterKondisi)
            }
            aria-label="Filter kondisi stok"
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              backgroundColor: '#fff',
            }}
          >
            <option value="Semua kondisi">Semua kondisi</option>
            <option value="Aman">Aman</option>
            <option value="Stok rendah">Stok rendah</option>
          </select>

          <select
            disabled
            defaultValue="Gudang utama"
            aria-label="Lokasi gudang"
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              backgroundColor: '#f8fafc',
            }}
          >
            <option value="Gudang utama">Gudang utama</option>
          </select>
        </div>

        {/* STATUS LOADING */}
        {loading && (
          <div
            style={{
              padding: '10px 0',
              color: '#777',
              fontSize: '12px',
            }}
          >
            <RefreshCw
              size={14}
              style={{
                display: 'inline',
                marginRight: '6px',
                verticalAlign: 'middle',
              }}
            />
            Memuat data bahan baku...
          </div>
        )}

        {/* TABEL */}
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12px',
              minWidth: '760px',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#fdf2f8',
                  color: '#86198f',
                  textAlign: 'left',
                }}
              >
                <th style={tableHeaderStyle}>Bahan baku</th>
                <th style={tableHeaderStyle}>Stok</th>
                <th style={tableHeaderStyle}>Minimum</th>
                <th style={tableHeaderStyle}>Harga / satuan</th>
                <th style={tableHeaderStyle}>Kondisi</th>
                <th style={tableHeaderStyle}>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '1px solid #fdf2f8',
                  }}
                >
                  <td style={tableCellStyle}>
                    <div
                      style={{
                        fontWeight: 'bold',
                        color: '#333',
                      }}
                    >
                      {item.nama}
                    </div>

                    <div
                      style={{
                        fontSize: '10px',
                        color: '#777',
                        marginTop: '3px',
                      }}
                    >
                      {item.id} • {item.supplier}
                    </div>
                  </td>

                  <td style={tableCellStyle}>{item.stok}</td>
                  <td style={tableCellStyle}>{item.minimum}</td>

                  <td
                    style={{
                      ...tableCellStyle,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.hargaSatuan}
                  </td>

                  <td style={tableCellStyle}>
                    <span style={getKondisiBadgeStyle(item.kondisi)}>
                      {item.kondisi}
                    </span>
                  </td>

                  <td style={tableCellStyle}>
                    <div
                      style={{
                        display: 'flex',
                        gap: '9px',
                        fontSize: '11px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Link
                        href={`/admin/bahan-baku/${encodeURIComponent(item.id)}`}
                        style={actionLinkStyle}
                      >
                        Lihat Detail
                      </Link>

                      <Link
                        href={`/admin/bahan-baku/${encodeURIComponent(item.id)}/edit`}
                        style={actionLinkStyle}
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/admin/bahan-baku/${encodeURIComponent(item.id)}/hapus`}
                        style={{
                          ...actionLinkStyle,
                          color: '#dc2626',
                        }}
                      >
                        Hapus
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {/* DATA KOSONG */}
              {filteredRows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: '28px',
                      textAlign: 'center',
                      color: '#888',
                    }}
                  >
                    {search || filterKondisi !== 'Semua kondisi'
                      ? 'Data tidak ditemukan.'
                      : 'Belum ada data bahan baku.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOMBOL TAMBAH */}
      <div>
        <Link
          href="/admin/bahan-baku/tambah"
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
          <span>Tambah Bahan</span>
        </Link>
      </div>

      {/* INFORMASI PERSEDIAAN */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        }}
      >
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: '#f3e8ff',
            color: '#6b21a8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Info size={17} />
        </div>

        <div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Informasi persediaan
          </div>

          <div
            style={{
              fontSize: '11px',
              color: '#666',
              marginTop: '3px',
            }}
          >
            Stok yang sama dengan atau di bawah stok minimum akan ditandai
            sebagai stok rendah.
          </div>
        </div>
      </div>

      {/* MODAL NOTIFIKASI */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="notification-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '32px',
              width: '380px',
              maxWidth: '100%',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#f3e8ff',
                color: '#6b21a8',
                margin: '0 auto 16px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Check size={28} strokeWidth={3} />
            </div>

            <h3
              id="notification-title"
              style={{
                fontSize: '20px',
                color: '#6b21a8',
                margin: '0 0 8px 0',
                fontWeight: 'bold',
              }}
            >
              {modalTitle}
            </h3>

            <p
              style={{
                fontSize: '13px',
                color: '#666',
                margin: '0 0 24px 0',
              }}
            >
              {modalDesc}
            </p>

            <button
              type="button"
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

// ======================================================
// STYLE
// ======================================================

const statCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  minWidth: 0,
};

const statLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#777777',
};

const statValueStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#6b21a8',
  margin: '4px 0',
};

const statDescStyle: React.CSSProperties = {
  fontSize: '10px',
  color: '#888888',
};

const iconBadgeStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  backgroundColor: '#f3e8ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const tableHeaderStyle: React.CSSProperties = {
  padding: '10px 12px',
};

const tableCellStyle: React.CSSProperties = {
  padding: '12px',
  color: '#333',
};

const actionLinkStyle: React.CSSProperties = {
  color: '#6b21a8',
  textDecoration: 'none',
  fontWeight: '500',
};

function getKondisiBadgeStyle(
  kondisi: BahanBakuItem['kondisi']
): React.CSSProperties {
  if (kondisi === 'Aman') {
    return {
      backgroundColor: '#e6f4ea',
      color: '#137333',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
    };
  }

  return {
    backgroundColor: '#fef3c7',
    color: '#b45309',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  };
}
