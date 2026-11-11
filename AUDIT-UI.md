# Audit visual dan pemetaan UI

Arsip input memuat 67 screenshot bernomor Screenshot (377) sampai Screenshot (443). Contact-sheet menunjukkan empat kelompok antarmuka berbasis peran: halaman autentikasi, Admin (Plum Violet), Karyawan Produksi (violet), Supplier (rose), dan Owner (violet). Struktur sidebar, tabel, kartu ringkasan, formulir, serta dialog konfirmasi yang sudah ada dipertahankan.

## Perbaikan yang diterapkan
- Mengganti autentikasi frontend hardcoded menjadi `/api/auth/login` dan sesi HTTP-only.
- Header Admin mengambil nama, peran, dan avatar dari `/api/auth/me`.
- Halaman Data Pesanan, Bahan Baku, Hasil Produksi, Pemesanan Bahan Baku, dan Manajemen Pengguna mengambil daftar dari API; fallback data lama hanya dipakai sebelum respons API tiba.
- Kapasitas Admin mengambil data `/api/kapasitas` dan menyimpan perubahan melalui PATCH.
- Jalur gambar produk di kode menggunakan aset PNG yang tersedia di `public/`.

## Batas audit
Screenshot disediakan sebagai referensi visual; tidak ada file desain Figma atau spesifikasi ukuran interaksi terpisah. Perubahan visual sengaja diminimalkan. Beberapa halaman tambah/edit/hapus lama masih perlu dipindahkan dari navigasi berbasis query string ke pemanggilan API langsung agar seluruh form UI tersambung end-to-end. API CRUD dasarnya sudah tersedia untuk data utama.
