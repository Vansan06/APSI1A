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
