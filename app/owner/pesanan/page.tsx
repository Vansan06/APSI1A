import Link from 'next/link';

const PESANAN_LIST = [
  { id: 'PSN-1025-107', tgl: '25 Okt 2026', jenis: 'Kotak donat', status: 'Dikemas', pelanggan: 'Ibu Rani', total: '192.000' },
  { id: 'PSN-1025-108', tgl: '25 Okt 2026', jenis: 'Kotak donat', status: 'Dikemas', pelanggan: 'Bapak Adi', total: '96.000' },
  { id: 'PSN-1025-109', tgl: '25 Okt 2026', jenis: 'Kotak donat', status: 'Dikemas', pelanggan: 'Kantor Sejahtera', total: '480.000' },
  { id: 'PSN-1025-110', tgl: '25 Okt 2026', jenis: 'Kotak donat', status: 'Diproses', pelanggan: 'Ibu Dewi', total: '48.000' },
  { id: 'PSN-1025-111', tgl: '25 Okt 2026', jenis: 'Kotak donat', status: 'Diproses', pelanggan: 'Bapak Rizal', total: '288.000' },
  { id: 'PSN-1025-106', tgl: '25 Okt 2026', jenis: 'Kotak donat', status: 'Selesai', pelanggan: 'Ibu Maya', total: '96.000' },
];

export default function PesananOwnerPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <h3 style={{ fontSize: '18px', color: '#a02e59', margin: '0 0 6px 0', fontWeight: 'bold' }}>Daftar pesanan</h3>
      <p style={{ fontSize: '12px', color: '#777', margin: '0 0 16px 0' }}>Daftar data pesanan pelanggan • Seluruh nilai dalam Rupiah</p>

      {/* Tab Filter Button */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button style={{ padding: '8px 18px', backgroundColor: '#a02e59', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>Semua (124)</button>
        <button style={{ padding: '8px 18px', backgroundColor: '#ffffff', color: '#a02e59', border: '1px solid #a02e59', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>Produksi (22)</button>
        <button style={{ padding: '8px 18px', backgroundColor: '#ffffff', color: '#a02e59', border: '1px solid #a02e59', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>Pengemasan (18)</button>
        <button style={{ padding: '8px 18px', backgroundColor: '#ffffff', color: '#a02e59', border: '1px solid #a02e59', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>Selesai (84)</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: '#e8b2c4', color: '#702643', textAlign: 'left' }}>
            <th style={{ padding: '10px 16px', borderRadius: '6px 0 0 6px' }}>ID Pesanan</th>
            <th style={{ padding: '10px 16px' }}>Tanggal Pesanan</th>
            <th style={{ padding: '10px 16px' }}>Jenis Pesanan</th>
            <th style={{ padding: '10px 16px' }}>Status</th>
            <th style={{ padding: '10px 16px' }}>Nama Pelanggan</th>
            <th style={{ padding: '10px 16px' }}>Total Biaya</th>
            <th style={{ padding: '10px 16px', borderRadius: '0 6px 6px 0' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {PESANAN_LIST.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #f0d5de' }}>
              <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#702643' }}>{p.id}</td>
              <td style={{ padding: '12px 16px', color: '#666' }}>{p.tgl}</td>
              <td style={{ padding: '12px 16px' }}>{p.jenis}</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{
                  backgroundColor: p.status === 'Dikemas' ? '#fef7e0' : p.status === 'Diproses' ? '#e8f0fe' : '#e6f4ea',
                  color: p.status === 'Dikemas' ? '#b45309' : p.status === 'Diproses' ? '#1a73e8' : '#137333',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {p.status}
                </span>
              </td>
              <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{p.pelanggan}</td>
              <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#a02e59' }}>Rp{p.total}</td>
              <td style={{ padding: '12px 16px' }}>
                <Link 
                  href={`/owner/pesanan/${p.id}`} 
                  style={{ 
                    padding: '6px 14px', 
                    border: '1px solid #a02e59', 
                    borderRadius: '20px', 
                    color: '#a02e59', 
                    textDecoration: 'none', 
                    fontSize: '12px', 
                    fontWeight: 'bold' 
                  }}
                >
                  Lihat Detail Pesanan
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}