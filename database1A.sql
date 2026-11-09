-- =========================================================
-- STRUKTUR TABEL (DATABASE SCHEMAS)
-- =========================================================

CREATE TABLE admin (
    id_admin VARCHAR(20) PRIMARY KEY
);

CREATE TABLE owner (
    id_owner VARCHAR(20) PRIMARY KEY,
    id_admin VARCHAR(20) NOT NULL REFERENCES admin(id_admin)
);

CREATE TABLE supplier (
    id_supplier VARCHAR(20) PRIMARY KEY,
    nama_supplier VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    alamat VARCHAR(255),
    id_admin VARCHAR(20) REFERENCES admin(id_admin),
    id_owner VARCHAR(20) REFERENCES owner(id_owner)
);

CREATE TABLE karyawan_produksi (
    id_karyawan VARCHAR(20) PRIMARY KEY,
    id_admin VARCHAR(20) REFERENCES admin(id_admin)
);

CREATE TABLE produk (
    id_produk VARCHAR(20) PRIMARY KEY,
    jumlah_target INTEGER NOT NULL DEFAULT 0 CHECK (jumlah_target >= 0),
    jumlah_berhasil INTEGER NOT NULL DEFAULT 0 CHECK (jumlah_berhasil >= 0),
    nama_produk VARCHAR(100) NOT NULL,
    harga_jual NUMERIC(15,2) NOT NULL CHECK (harga_jual >= 0),
    id_admin VARCHAR(20) REFERENCES admin(id_admin),
    id_owner VARCHAR(20) REFERENCES owner(id_owner)
);

CREATE TABLE pesanan_produk (
    id_pesanan VARCHAR(20) PRIMARY KEY,
    tanggal_pesanan DATE NOT NULL,
    jenis_pesanan VARCHAR(30),
    status VARCHAR(30) NOT NULL,
    nama_pelanggan VARCHAR(100) NOT NULL,
    total_biaya_pesanan NUMERIC(15,2) NOT NULL DEFAULT 0 CHECK (total_biaya_pesanan >= 0),
    id_admin VARCHAR(20) REFERENCES admin(id_admin),
    id_owner VARCHAR(20) REFERENCES owner(id_owner)
);

CREATE TABLE detail_pesanan_produk (
    id_pesanan VARCHAR(20) NOT NULL REFERENCES pesanan_produk(id_pesanan) ON DELETE CASCADE,
    id_produk VARCHAR(20) NOT NULL REFERENCES produk(id_produk),
    jumlah INTEGER NOT NULL CHECK (jumlah > 0),
    harga_satuan NUMERIC(15,2) NOT NULL CHECK (harga_satuan >= 0),
    PRIMARY KEY (id_pesanan, id_produk)
);

CREATE TABLE bahan_baku (
    id_bahan_baku VARCHAR(20) PRIMARY KEY,
    nama_bahan VARCHAR(100) NOT NULL,
    stok_tersedia NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (stok_tersedia >= 0),
    stok_minimal NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (stok_minimal >= 0),
    harga_satuan NUMERIC(12,2) NOT NULL CHECK (harga_satuan >= 0),
    id_owner VARCHAR(20) REFERENCES owner(id_owner)
);

CREATE TABLE pesanan_bahan_baku (
    id_pengadaan VARCHAR(20) PRIMARY KEY,
    status VARCHAR(30) NOT NULL,
    tanggal_pesanan DATE NOT NULL,
    total_biaya NUMERIC(15,2) NOT NULL DEFAULT 0 CHECK (total_biaya >= 0),
    persetujuan_owner VARCHAR(20),
    jumlah_pesanan INTEGER NOT NULL DEFAULT 0 CHECK (jumlah_pesanan >= 0),
    id_owner VARCHAR(20) REFERENCES owner(id_owner),
    id_admin VARCHAR(20) REFERENCES admin(id_admin),
    id_supplier VARCHAR(20) NOT NULL REFERENCES supplier(id_supplier)
);

CREATE TABLE detail_pesanan_bahan_baku (
    id_pengadaan VARCHAR(20) NOT NULL REFERENCES pesanan_bahan_baku(id_pengadaan) ON DELETE CASCADE,
    id_bahan_baku VARCHAR(20) NOT NULL REFERENCES bahan_baku(id_bahan_baku),
    jumlah NUMERIC(12,2) NOT NULL CHECK (jumlah > 0),
    harga_satuan NUMERIC(12,2) NOT NULL CHECK (harga_satuan >= 0),
    PRIMARY KEY (id_pengadaan, id_bahan_baku)
);

CREATE TABLE resep_standar (
    id_resep VARCHAR(20) PRIMARY KEY,
    nama_resep VARCHAR(100) NOT NULL,
    porsi_standar INTEGER NOT NULL CHECK (porsi_standar > 0),
    petunjuk_pembuatan INTEGER,
    id_admin VARCHAR(20) REFERENCES admin(id_admin),
    id_owner VARCHAR(20) REFERENCES owner(id_owner),
    id_produk VARCHAR(20) NOT NULL REFERENCES produk(id_produk)
);

CREATE TABLE resep_bahan_baku (
    id_resep VARCHAR(20) NOT NULL REFERENCES resep_standar(id_resep) ON DELETE CASCADE,
    id_bahan_baku VARCHAR(20) NOT NULL REFERENCES bahan_baku(id_bahan_baku),
    jumlah_bahan NUMERIC(12,2) NOT NULL CHECK (jumlah_bahan > 0),
    satuan VARCHAR(30),
    PRIMARY KEY (id_resep, id_bahan_baku)
);

CREATE TABLE penugasan_karyawan_produk (
    id_karyawan VARCHAR(20) NOT NULL REFERENCES karyawan_produksi(id_karyawan),
    id_produk VARCHAR(20) NOT NULL REFERENCES produk(id_produk),
    PRIMARY KEY (id_karyawan, id_produk)
);

CREATE TABLE laporan (
    id_laporan VARCHAR(20) PRIMARY KEY,
    tanggal_generate DATE NOT NULL,
    periode VARCHAR(50),
    id_admin VARCHAR(20) REFERENCES admin(id_admin),
    id_owner VARCHAR(20) REFERENCES owner(id_owner),
    id_produk VARCHAR(20) REFERENCES produk(id_produk)
);

-- INDEXES
CREATE INDEX idx_supplier_admin ON supplier(id_admin);
CREATE INDEX idx_supplier_owner ON supplier(id_owner);
CREATE INDEX idx_produk_owner ON produk(id_owner);
CREATE INDEX idx_pesanan_produk_owner ON pesanan_produk(id_owner);
CREATE INDEX idx_pengadaan_supplier ON pesanan_bahan_baku(id_supplier);
CREATE INDEX idx_bahan_owner ON bahan_baku(id_owner);
CREATE INDEX idx_laporan_produk ON laporan(id_produk);


-- =========================================================
-- PENGISIAN DATA (INSERT STATEMENTS DARI EXCEL NORMALISASI)
-- =========================================================

-- 1. Insert Entitas Master: ADMIN
INSERT INTO admin (id_admin) VALUES
('AD01'),
('AD02'),
('AD03');

-- 2. Insert Entitas Master: OWNER
INSERT INTO owner (id_owner, id_admin) VALUES
('OW01', 'AD01'),
('OW02', 'AD01'),
('OW03', 'AD02');

-- 3. Insert Entitas: SUPPLIER
INSERT INTO supplier (id_supplier, nama_supplier, username, password, email, alamat, id_admin, id_owner) VALUES
('SP01', 'CV Tepung Jaya', 'tepungjaya', '$2b$10$Sp01Aa', 'tepungjaya@mail.com', 'Jl. Siteba No. 5', 'AD01', 'OW01'),
('SP02', 'UD Mentega Padang', 'mentegapdg', '$2b$10$Sp02Bb', 'mentegapdg@mail.com', 'Jl. Pasar Baru No. 8', 'AD01', 'OW01'),
('SP03', 'PT Gula Nusantara', 'gulanusa', '$2b$10$Sp03Cc', 'gulanusa@mail.com', 'Jl. Veteran No. 12', 'AD01', 'OW01');

-- 4. Insert Entitas: KARYAWAN PRODUKSI
INSERT INTO karyawan_produksi (id_karyawan, id_admin) VALUES
('KP01', 'AD01'),
('KP02', 'AD01'),
('KP03', 'AD01');

-- 5. Insert Entitas: PRODUK
INSERT INTO produk (id_produk, jumlah_target, jumlah_berhasil, nama_produk, harga_jual, id_admin, id_owner) VALUES
('PD01', 210, 200, 'Donat Coklat', 6000.00, 'AD01', 'OW01'),
('PD02', 50, 48, 'Puding Karamel', 6000.00, 'AD01', 'OW01'),
('PD03', 190, 176, 'Donat Coklat', 6000.00, 'AD01', 'OW01'),
('PD04', 10, 10, 'Cake Coklat', 85000.00, 'AD01', 'OW01');

-- 6. Insert Transaksi: PESANAN PRODUK
INSERT INTO pesanan_produk (id_pesanan, tanggal_pesanan, jenis_pesanan, status, nama_pelanggan, total_biaya_pesanan, id_admin, id_owner) VALUES
('PS01', '2026-10-10', 'Pre-Order', 'Diterima', 'Rina', 229000.00, 'AD01', 'OW01'),
('PS02', '2026-10-10', 'Pre-Order', 'Ditolak', 'Andi', 2100000.00, 'AD01', 'OW01'),
('PS03', '2026-10-11', 'Pre-Order', 'Diterima', 'Rina', 144000.00, 'AD01', 'OW01'),
('PS04', '2026-10-12', 'Langsung', 'Selesai', 'Maya', 240000.00, 'AD01', 'OW01');

-- 7. Insert Detail Transaksi: DETAIL PESANAN PRODUK
INSERT INTO detail_pesanan_produk (id_pesanan, id_produk, jumlah, harga_satuan) VALUES
('PS01', 'PD01', 24, 6000.00),
('PS01', 'PD04', 1, 85000.00),
('PS02', 'PD01', 350, 6000.00),
('PS03', 'PD02', 12, 6000.00),
('PS03', 'PD01', 12, 6000.00),
('PS04', 'PD03', 40, 6000.00);

-- 8. Insert Entitas: BAHAN BAKU
INSERT INTO bahan_baku (id_bahan_baku, nama_bahan, stok_tersedia, stok_minimal, harga_satuan, id_owner) VALUES
('BB01', 'Tepung Terigu', 10.00, 25.00, 11500.00, 'OW01'),
('BB02', 'Gula Pasir', 5.00, 15.00, 15000.00, 'OW01'),
('BB03', 'Mentega', 3.00, 10.00, 52000.00, 'OW01'),
('BB04', 'Susu Cair', 8.00, 12.00, 18000.00, 'OW01');

-- 9. Insert Transaksi: PESANAN BAHAN BAKU (PENGADAAN)
INSERT INTO pesanan_bahan_baku (id_pengadaan, status, tanggal_pesanan, total_biaya, persetujuan_owner, jumlah_pesanan, id_owner, id_admin, id_supplier) VALUES
('PB01', 'Diproses', '2026-10-12', 875000.00, 'Disetujui', 70, 'OW01', 'AD01', 'SP01'),
('PB02', 'Dikirim', '2026-10-13', 780000.00, 'Disetujui', 15, 'OW01', 'AD01', 'SP02'),
('PB03', 'Selesai', '2026-10-14', 345000.00, 'Disetujui', 30, 'OW01', 'AD01', 'SP01'),
('PB04', 'Menunggu', '2026-10-15', 580000.00, 'Menunggu', 40, 'OW01', 'AD01', 'SP03');

-- 10. Insert Detail Transaksi: DETAIL PESANAN BAHAN BAKU
INSERT INTO detail_pesanan_bahan_baku (id_pengadaan, id_bahan_baku, jumlah, harga_satuan) VALUES
('PB01', 'BB01', 50.00, 11500.00),
('PB01', 'BB02', 20.00, 15000.00),
('PB02', 'BB03', 15.00, 52000.00),
('PB03', 'BB01', 30.00, 11500.00),
('PB04', 'BB02', 40.00, 14500.00);

-- 11. Insert Entitas: RESEP STANDAR
INSERT INTO resep_standar (id_resep, nama_resep, porsi_standar, petunjuk_pembuatan, id_admin, id_owner, id_produk) VALUES
('RS01', 'Resep Donat Coklat', 30, 4, 'AD01', 'OW01', 'PD01'),
('RS02', 'Resep Cake Coklat', 10, 4, 'AD01', 'OW01', 'PD04'),
('RS03', 'Resep Puding Karamel', 20, 3, 'AD01', 'OW01', 'PD02'),
('RS04', 'Resep Cake Vanila', 10, 3, 'AD01', 'OW01', 'PD04');

-- 12. Insert Detail Entitas: RESEP BAHAN BAKU
INSERT INTO resep_bahan_baku (id_resep, id_bahan_baku, jumlah_bahan, satuan) VALUES
('RS01', 'BB01', 1.00, 'kg'),
('RS01', 'BB02', 0.20, 'kg'),
('RS01', 'BB03', 0.15, 'kg'),
('RS02', 'BB01', 2.00, 'kg'),
('RS02', 'BB02', 1.00, 'kg'),
('RS02', 'BB03', 0.50, 'kg'),
('RS03', 'BB02', 0.30, 'kg'),
('RS03', 'BB04', 0.50, 'liter'),
('RS04', 'BB01', 2.00, 'kg'),
('RS04', 'BB02', 0.80, 'kg');

-- 13. Insert Relasi: PENUGASAN KARYAWAN PRODUK
INSERT INTO penugasan_karyawan_produk (id_karyawan, id_produk) VALUES
('KP01', 'PD01'),
('KP03', 'PD01'),
('KP01', 'PD02'),
('KP02', 'PD03'),
('KP02', 'PD04');

-- 14. Insert Entitas: LAPORAN
INSERT INTO laporan (id_laporan, tanggal_generate, periode, id_admin, id_owner, id_produk) VALUES
('LP01', '2026-10-12', '11-10-2026', 'AD01', 'OW01', 'PD01'),
('LP02', '2026-10-13', '12-10-2026', 'AD01', 'OW01', 'PD03'),
('LP03', '2026-10-14', 'Minggu ke-2 Oktober 2026', 'AD01', 'OW01', 'PD01');