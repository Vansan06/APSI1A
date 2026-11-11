import Link from 'next/link';

export default function PemesananBahanBakuOwnerPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Box Utama Daftar Pemesanan */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '18px', color: '#a02e59', marginBottom: '16px' }}>Daftar pemesanan</h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#e8b2c4', color: '#702643', textAlign: 'left' }}>
              <th style={{ padding: '10px 16px', borderRadius: '6px 0 0 6px' }}>Supplier / PO</th>
              <th style={{ padding: '10px 16px' }}>Bahan baku</th>
              <th style={{ padding: '10px 16px' }}>Jumlah</th>
              <th style={{ padding: '10px 16px' }}>Harga satuan</th>
              <th style={{ padding: '10px 16px' }}>Subtotal</th>
              <th style={{ padding: '10px 16px' }}>Total PO</th>
              <th style={{ padding: '10px 16px' }}>Status</th>
              <th style={{ padding: '10px 16px', borderRadius: '0 6px 6px 0' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f0d5de', verticalAlign: 'top' }}>
              <td style={{ padding: '16px' }}>
                <div style={{ fontWeight: 'bold', color: '#702643' }}>PO-026-025</div>
                <div style={{ color: '#a02e59', fontWeight: 'bold' }}>PT Sumber Pangan</div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>25 Okt 2026 • tiba 27 Okt 2026</div>
              </td>
              <td style={{ padding: '16px' }}>
                <div>Tepung terigu protein tinggi</div>
                <div style={{ marginTop: '4px' }}>Gula pasir</div>
                <div style={{ marginTop: '4px' }}>Susu bubuk</div>
              </td>
              <td style={{ padding: '16px' }}>
                <div>50 kg</div>
                <div style={{ marginTop: '4px' }}>50 kg</div>
                <div style={{ marginTop: '4px' }}>25 kg</div>
              </td>
              <td style={{ padding: '16px' }}>
                <div>Rp14.000/kg</div>
                <div style={{ marginTop: '4px' }}>Rp16.000/kg</div>
                <div style={{ marginTop: '4px' }}>Rp58.000/kg</div>
              </td>
              <td style={{ padding: '16px', fontWeight: 'bold' }}>
                <div>Rp700.000</div>
                <div style={{ marginTop: '4px' }}>Rp800.000</div>
                <div style={{ marginTop: '4px' }}>Rp1.450.000</div>
              </td>
              <td style={{ padding: '16px', fontWeight: 'bold', color: '#a02e59', fontSize: '14px' }}>
                Rp2.950.000
              </td>
              <td style={{ padding: '16px' }}>
                <span style={{ backgroundColor: '#fef7e0', color: '#b45309', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                  Menunggu
                </span>
              </td>
              <td style={{ padding: '16px' }}>
                <Link 
                  href="/owner/pemesanan-bahan-baku/konfirmasi/PO-026-025" 
                  style={{ padding: '8px 16px', border: '1px solid #a02e59', borderRadius: '20px', color: '#a02e59', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' }}
                >
                  Lihat Detail PO
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Card Total Seluruh PO */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', width: '300px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '12px', color: '#777', fontWeight: 'bold' }}>Total seluruh PO</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59', marginTop: '4px' }}>Rp2.950.000</div>
      </div>

    </div>
  );
}
