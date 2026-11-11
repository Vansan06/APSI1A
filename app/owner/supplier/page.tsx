import Link from 'next/link';

const SUPPLIER_LIST = [
  { id: 'SUP-001', nama: 'PT Sumber Pangan', pasokan: 'Tepung & gula', kontak: 'Budi', hp: '0812-1111-2345', waktu: '2 hari', status: 'Aktif' },
  { id: 'SUP-002', nama: 'CV Manis Jaya', pasokan: 'Cokelat & keju', kontak: 'Sari', hp: '0813-2222-3456', waktu: '1 hari', status: 'Aktif' },
  { id: 'SUP-010', nama: 'CV Susu Makmur', pasokan: 'Susu & olahan', kontak: 'Rina', hp: '0812-4567-8901', waktu: '2 hari', status: 'Baru' },
  { id: 'SUP-011', nama: 'Toko Rasa Nusantara', pasokan: 'Perisa & pelapis', kontak: 'Dedi', hp: '0813-6789-0123', waktu: '1 hari', status: 'Baru' },
];

export default function DataSupplierOwnerPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
      <h3 style={{ fontSize: '18px', color: '#a02e59', marginBottom: '16px', fontWeight: 'bold' }}>Daftar supplier</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: '#e8b2c4', color: '#702643', textAlign: 'left' }}>
            <th style={{ padding: '10px 16px', borderRadius: '6px 0 0 6px' }}>Kode / Nama supplier</th>
            <th style={{ padding: '10px 16px' }}>Jenis pasokan</th>
            <th style={{ padding: '10px 16px' }}>Kontak utama</th>
            <th style={{ padding: '10px 16px' }}>Waktu kirim</th>
            <th style={{ padding: '10px 16px' }}>Status</th>
            <th style={{ padding: '10px 16px', borderRadius: '0 6px 6px 0' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {SUPPLIER_LIST.map((s) => (
            <tr key={s.id} style={{ borderBottom: '1px solid #f0d5de' }}>
              <td style={{ padding: '12px 16px' }}>
                <div style={{ fontWeight: 'bold', color: '#702643' }}>{s.id}</div>
                <div style={{ color: '#a02e59', fontWeight: 'bold' }}>{s.nama}</div>
              </td>
              <td style={{ padding: '12px 16px' }}>{s.pasokan}</td>
              <td style={{ padding: '12px 16px' }}>{s.kontak} · {s.hp}</td>
              <td style={{ padding: '12px 16px' }}>{s.waktu}</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{
                  backgroundColor: s.status === 'Baru' ? '#fef7e0' : '#e6f4ea',
                  color: s.status === 'Baru' ? '#b45309' : '#137333',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {s.status}
                </span>
              </td>
              <td style={{ padding: '12px 16px' }}>
                {/* DIBUAT DINAMIS BERDASARKAN s.id */}
                <Link 
                  href={`/owner/supplier/${s.id}`} 
                  style={{ padding: '6px 14px', border: '1px solid #a02e59', borderRadius: '20px', color: '#a02e59', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}
                >
                  Lihat Detail Supplier
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}