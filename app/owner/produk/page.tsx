import Link from 'next/link';
import Image from 'next/image';

const PRODUK_LIST = [
  { id: 'PRD-001', nama: 'Donat Cokelat', harga: 'Rp8.000 per buah', status: 'Aktif', gambar: '/donat-cokelat.png' },
  { id: 'PRD-002', nama: 'Donat Keju', harga: 'Rp9.000 per buah', status: 'Aktif', gambar: '/donat-keju.png' },
  { id: 'PRD-003', nama: 'Donat Gula', harga: 'Rp12.000 per buah', status: 'Aktif', gambar: '/donat-gula.png' },
  { id: 'PRD-004', nama: 'Donat Stroberi', harga: 'Rp11.800 per buah', status: 'Aktif', gambar: '/donat-stroberi.png' },
];

export default function DataProdukOwner() {
  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', color: '#777' }}>Total produk</div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#a02e59' }}>{PRODUK_LIST.length}</div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: '#e8b2c4', color: '#702643', textAlign: 'left' }}>
            <th style={{ padding: '10px 16px', borderRadius: '6px 0 0 6px' }}>Kode produk</th>
            <th style={{ padding: '10px 16px' }}>Nama produk</th>
            <th style={{ padding: '10px 16px' }}>Harga jual</th>
            <th style={{ padding: '10px 16px' }}>Status</th>
            <th style={{ padding: '10px 16px', borderRadius: '0 6px 6px 0' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {PRODUK_LIST.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #f0d5de' }}>
              <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#702643' }}>{p.id}</td>
              <td style={{ padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', color: '#a02e59' }}>
                  <Image 
                    src={p.gambar} 
                    alt={p.nama} 
                    width={28} 
                    height={28} 
                    style={{ borderRadius: '4px', objectFit: 'cover' }} 
                  />
                  {p.nama}
                </div>
              </td>
              <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#a02e59' }}>{p.harga}</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                  {p.status}
                </span>
              </td>
              <td style={{ padding: '12px 16px' }}>
                <Link href={`/owner/produk/${p.id}`} style={{ padding: '6px 16px', border: '1px solid #a02e59', borderRadius: '20px', color: '#a02e59', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                  Lihat Detail Produk
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}