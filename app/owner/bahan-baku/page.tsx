import Link from 'next/link';

export default function DataBahanBakuOwner() {
  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', color: '#777' }}>Total bahan baku</div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#a02e59' }}>42</div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: '#e8b2c4', color: '#702643', textAlign: 'left' }}>
            <th style={{ padding: '10px 16px' }}>Kode</th>
            <th style={{ padding: '10px 16px' }}>Nama bahan</th>
            <th style={{ padding: '10px 16px' }}>Kategori</th>
            <th style={{ padding: '10px 16px' }}>Satuan</th>
            <th style={{ padding: '10px 16px' }}>Stok</th>
            <th style={{ padding: '10px 16px' }}>Minimum</th>
            <th style={{ padding: '10px 16px' }}>Status</th>
            <th style={{ padding: '10px 16px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #f0d5de' }}>
            <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#702643' }}>BB-001</td>
            <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#a02e59' }}>Tepung terigu protein tinggi</td>
            <td style={{ padding: '12px 16px', color: '#666' }}>Bahan utama</td>
            <td style={{ padding: '12px 16px' }}>kg</td>
            <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>18 kg</td>
            <td style={{ padding: '12px 16px' }}>25 kg</td>
            <td style={{ padding: '12px 16px' }}>
              <span style={{ backgroundColor: '#fef7e0', color: '#b45309', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                Perlu restock
              </span>
            </td>
            <td style={{ padding: '12px 16px' }}>
              <Link href="/owner/bahan-baku/BB-001" style={{ padding: '6px 14px', border: '1px solid #a02e59', borderRadius: '20px', color: '#a02e59', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                Lihat Detail Bahan Baku
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}