export type StatusPemesanan =
  | 'Menunggu Persetujuan Owner'
  | 'Menunggu Konfirmasi Supplier'
  | 'Disetujui Owner'
  | 'Ditolak Owner'
  | 'Diterima Supplier'
  | 'Dikirim';

export type PemesananBahanBaku = {
  id: string;
  supplier: string;
  bahanBaku: string;
  jumlah: string;
  totalHarga: number;
  status: StatusPemesanan;
  tanggalPesan: string;
  dibuatOleh: string;
  disetujuiOleh: string | null;
};

const PEMESANAN_DATABASE: PemesananBahanBaku[] = [
  {
    id: 'PO-20261024-01',
    supplier: 'PT Prima Dairy',
    bahanBaku: 'Mentega',
    jumlah: '20 kg',
    totalHarga: 2400000,
    status: 'Menunggu Persetujuan Owner',
    tanggalPesan: '2026-10-24',
    dibuatOleh: 'Admin',
    disetujuiOleh: null,
  },
  {
    id: 'PO-20261024-02',
    supplier: 'CV Cokelat Nusantara',
    bahanBaku: 'Cokelat Batang',
    jumlah: '15 kg',
    totalHarga: 1800000,
    status: 'Menunggu Konfirmasi Supplier',
    tanggalPesan: '2026-10-24',
    dibuatOleh: 'Admin',
    disetujuiOleh: 'Owner',
  },
];

export function getPemesananDatabase() {
  return PEMESANAN_DATABASE;
}

export function createNomorPemesanan() {
  return `PO-${Date.now()}`;
}
