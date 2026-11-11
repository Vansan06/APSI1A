This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## API alur pemesanan bahan baku

API berikut mengimplementasikan alur tiga aktor dari permission matrix:

1. **Admin** membuat pesanan (`POST /api/pemesanan-bahan-baku`) atau mengubah detail sebelum persetujuan (`PUT`).
2. **Owner** meninjau (`GET /api/persetujuan`) lalu menyetujui atau menolak (`PATCH`).
3. **Supplier** melihat pesanan (`GET /api/pemesanan-bahan-baku`) dan menerima pesanan yang telah disetujui (`PATCH`).

Contoh body untuk membuat pesanan:

```json
{
  "supplier": "PT Prima Dairy",
  "bahanBaku": "Mentega",
  "jumlah": "20 kg",
  "totalHarga": 2400000
}
```

Setiap request harus mengirim header `x-user-role` (`Admin`, `Owner`, atau `Supplier`) sesuai aktornya. Header ini hanya simulasi otorisasi untuk aplikasi praktikum; ganti dengan autentikasi sesi/token server sebelum digunakan di lingkungan produksi. Data API saat ini disimpan di memori proses dan akan kembali ke data awal ketika server dimulai ulang.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Reactive API & database setup

The application now uses PostgreSQL through Prisma 7 and the `@prisma/adapter-pg` driver. Copy `.env.example` to `.env` and set `DATABASE_URL` plus a unique `SESSION_SECRET` (32+ random characters). Do not commit `.env`.

```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

For an existing database created from the original schema, apply the added migration in `prisma/migrations/20261111200000_reactive_operations/migration.sql` (or use `npx prisma migrate deploy` after registering the migration history).

Create the initial role accounts by setting `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_OWNER_EMAIL`, `SEED_OWNER_PASSWORD`, `SEED_PRODUKSI_EMAIL`, `SEED_PRODUKSI_PASSWORD`, `SEED_SUPPLIER_EMAIL`, and `SEED_SUPPLIER_PASSWORD` in the local environment, then run:

```bash
npm run db:seed
npm run dev
```

### API overview
- `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- CRUD `/api/pengguna`, `/api/produk`, `/api/pesanan`, `/api/bahan-baku`
- PO `/api/pemesanan-bahan-baku` and `/api/pemesanan-bahan-baku/:id/persetujuan`
- Operations `/api/kapasitas`, `/api/hasil-produksi`
- Reporting `/api/laporan/harian`, `/api/laporan/bulanan`

Authentication uses an HTTP-only signed session cookie. Roles: `admin`, `karyawan produksi`, `supplier`, and `owner`. Stock receipt, order reservation, and production posting run in Prisma transactions. Product ready stock is represented by `produk.jumlah_berhasil`; production capacity consumption is based on batch target / ordered units.

### Notes / operational assumptions
- PO status `Diterima` posts the PO detail quantities to raw-material stock. The status is checked before posting to avoid duplicate receipt.
- A production batch increases ready-to-sell quantity by `jumlah_berhasil`, records rejected units and a quality note, and consumes daily capacity by `jumlah_target`.
- An MTO order reserves ready-to-sell product and daily capacity when created.
- The existing schema does not contain a separate stock ledger or customer shipment workflow. For audit-grade reversals, implement a stock-movement ledger before allowing arbitrary status rollback.
- The account model is separate from legacy role tables. Link account IDs to legacy role records in a future migration if reports need per-role foreign-key attribution.
