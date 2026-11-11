import Link from 'next/link';

export default function ResepOwnerPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', color: '#777' }}>Total resep</div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#a02e59' }}>14</div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: '#e8b2c4', color: '#702643', textAlign: 'left' }}>
            <th style={{ padding: '10px 16px' }}>Kode resep</th>
            <th style={{ padding: '10px 16px' }}>Nama resep</th>
            <th style={{ padding: '10px 16px' }}>Produk terkait</th>
            <th style={{ padding: '10px 16px' }}>Hasil</th>
            <th style={{ padding: '10px 16px' }}>Estimasi biaya</th>
            <th style={{ padding: '10px 16px' }}>Status</th>
            <th style={{ padding: '10px 16px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #f0d5de' }}>
            <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#702643' }}>RSP-001</td>
            <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#a02e59' }}>Donat Cokelat</td>
            <td style={{ padding: '12px 16px' }}>PRD-001 · Donat Cokelat</td>
            <td style={{ padding: '12px 16px' }}>50 buah</td>
            <td style={{ padding: '12px 16px', color: '#a02e59' }}>Rp3.200 per buah (tidak termasuk tenaga kerja)</td>
            <td style={{ padding: '12px 16px' }}>
              <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                Aktif
              </span>
            </td>
            <td style={{ padding: '12px 16px' }}>
              <Link href="/owner/resep/RSP-001" style={{ padding: '6px 14px', border: '1px solid #a02e59', borderRadius: '20px', color: '#a02e59', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                Lihat Detail Resep
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
