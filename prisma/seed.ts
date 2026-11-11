import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { hashPassword } from "../lib/password";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL belum diatur.");

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Identitas role dibuat terlebih dahulu agar ref_id akun konsisten.
  await prisma.admin.upsert({
    where: { id_admin: "ADM-001" },
    update: {},
    create: { id_admin: "ADM-001" },
  });
  await prisma.owner.upsert({
    where: { id_owner: "OWN-001" },
    update: {},
    create: { id_owner: "OWN-001", id_admin: "ADM-001" },
  });
  await prisma.supplier.upsert({
    where: { id_supplier: "SUP-001" },
    update: {},
    create: {
      id_supplier: "SUP-001",
      nama_supplier: "Supplier Umum",
      username: "supplier",
      email: "supplier@dfo.local",
      alamat: "Belum diatur",
      id_admin: "ADM-001",
      id_owner: "OWN-001",
    },
  });
  await prisma.karyawan_produksi.upsert({
    where: { id_karyawan: "KRY-001" },
    update: {},
    create: { id_karyawan: "KRY-001", id_admin: "ADM-001" },
  });

  const accounts = [
    { id: "USR-ADMIN-001", nama: "Administrator D.FO", email: "admin@dfo.local", password: "Admin123!", role: "admin", ref_id: "ADM-001" },
    { id: "USR-OWNER-001", nama: "Owner D.FO", email: "owner@dfo.local", password: "Owner123!", role: "owner", ref_id: "OWN-001" },
    { id: "USR-SUP-001", nama: "Supplier D.FO", email: "supplier@dfo.local", password: "Supplier123!", role: "supplier", ref_id: "SUP-001" },
    { id: "USR-KRY-001", nama: "Karyawan Produksi", email: "produksi@dfo.local", password: "Produksi123!", role: "karyawan produksi", ref_id: "KRY-001" },
  ];
  for (const account of accounts) {
    await prisma.akun_pengguna.upsert({
      where: { email: account.email },
      update: {
        nama: account.nama,
        role: account.role,
        ref_id: account.ref_id,
        aktif: true,
      },
      create: {
        id: account.id,
        nama: account.nama,
        email: account.email,
        password_hash: hashPassword(account.password),
        role: account.role,
        ref_id: account.ref_id,
        aktif: true,
      },
    });
  }

  const products = [
    { id_produk: "PRD-001", nama_produk: "Donat Cokelat", harga_jual: "8000", jumlah_target: 100, jumlah_berhasil: 0, gambar_url: "/donat-cokelat.png", id_admin: "ADM-001", id_owner: "OWN-001" },
    { id_produk: "PRD-002", nama_produk: "Donat Gula", harga_jual: "6000", jumlah_target: 100, jumlah_berhasil: 0, gambar_url: "/donat-gula.png", id_admin: "ADM-001", id_owner: "OWN-001" },
    { id_produk: "PRD-003", nama_produk: "Donat Keju", harga_jual: "9000", jumlah_target: 100, jumlah_berhasil: 0, gambar_url: "/donat-keju.png", id_admin: "ADM-001", id_owner: "OWN-001" },
    { id_produk: "PRD-004", nama_produk: "Donat Stroberi", harga_jual: "9000", jumlah_target: 100, jumlah_berhasil: 0, gambar_url: "/donat-stroberi.png", id_admin: "ADM-001", id_owner: "OWN-001" },
  ];
  for (const product of products) {
    await prisma.produk.upsert({
      where: { id_produk: product.id_produk },
      update: { nama_produk: product.nama_produk, harga_jual: product.harga_jual, gambar_url: product.gambar_url },
      create: product,
    });
  }

  await prisma.kapasitas_harian.upsert({
    where: { tanggal: new Date(new Date().toISOString().slice(0, 10)) },
    update: {},
    create: { tanggal: new Date(new Date().toISOString().slice(0, 10)), kapasitas_total: 800, kapasitas_terpakai: 0, jam_operasional: "08:00-17:00" },
  });

  console.log("Seed selesai: 4 role, 4 akun demo, 4 produk, kapasitas harian.");
  console.log("Password demo tercantum di README. Ganti setelah login pertama.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
