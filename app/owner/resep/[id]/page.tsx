import Link from 'next/link';

export default function DetailResepOwnerPage() {
  const komposisi = [
    { nama: 'Tepung terigu', takaran: '1 kg' },
    { nama: 'Gula pasir', takaran: '150 g' },
    { nama: 'Ragi instan', takaran: '20 g' },
    { nama: 'Margarin', takaran: '120 g' },
    { nama: 'Susu bubuk', takaran: '50 g' },
    { nama: 'Cokelat', takaran: '400 g' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '10px 20px', fontSize: '12px', color: '#a02e59' }}>
        <Link href="/owner/resep" style={{ color: '#a02e59', textDecoration: 'none' }}>← Kembali ke Resep</Link> / Detail Resep
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#888' }}>RSP-001</div>
            <h2 style={{ fontSize: '20px', color: '#a02e59', margin: 0 }}>Donat Cokelat</h2>
          </div>
          <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
            Aktif
          </span>
        </div>

        <h4 style={{ color: '#a02e59', marginBottom: '10px' }}>Komposisi bahan · satu adonan</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '20px' }}>
          {komposisi.map((k) => (
            <div key={k.nama} style={{ backgroundColor: '#fff5f7', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#777' }}>{k.nama}</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#a02e59' }}>{k.takaran}</div>
            </div>
          ))}
        </div>

        <h4 style={{ color: '#a02e59', marginBottom: '8px' }}>Langkah produksi</h4>
        <div style={{ backgroundColor: '#fff5f7', padding: '12px 16px', borderRadius: '8px', fontSize: '12px', color: '#702643' }}>
          Campur & uleni 20 menit → fermentasi 45 menit → bentuk 50 buah → goreng 170°C → beri pelapis cokelat.
        </div>
      </div>
    </div>
  );
}
