CREATE TABLE IF NOT EXISTS "akun_pengguna" (
  "id" VARCHAR(30) PRIMARY KEY,
  "nama" VARCHAR(100) NOT NULL,
  "email" VARCHAR(150) NOT NULL UNIQUE,
  "password_hash" VARCHAR(255) NOT NULL,
  "role" VARCHAR(30) NOT NULL,
  "ref_id" VARCHAR(20),
  "avatar_url" VARCHAR(500),
  "aktif" BOOLEAN NOT NULL DEFAULT true,
  "akses_terakhir" TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL
);
CREATE TABLE IF NOT EXISTS "hasil_produksi" (
  "id" VARCHAR(30) PRIMARY KEY,
  "id_produk" VARCHAR(20) NOT NULL REFERENCES "produk"("id_produk") ON DELETE RESTRICT ON UPDATE CASCADE,
  "tanggal" DATE NOT NULL,
  "jumlah_target" INTEGER NOT NULL,
  "jumlah_berhasil" INTEGER NOT NULL,
  "jumlah_ditolak" INTEGER NOT NULL DEFAULT 0,
  "catatan_mutu" TEXT,
  "id_karyawan" VARCHAR(20),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "hasil_produksi_tanggal_idx" ON "hasil_produksi"("tanggal");
CREATE INDEX IF NOT EXISTS "hasil_produksi_produk_idx" ON "hasil_produksi"("id_produk");
CREATE TABLE IF NOT EXISTS "kapasitas_harian" (
  "tanggal" DATE PRIMARY KEY,
  "kapasitas_total" INTEGER NOT NULL DEFAULT 800,
  "kapasitas_terpakai" INTEGER NOT NULL DEFAULT 0,
  "jam_operasional" VARCHAR(50),
  "updated_at" TIMESTAMP(3) NOT NULL
);
