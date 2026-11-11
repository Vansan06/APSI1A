import Image from 'next/image';

export default function HomeOwnerPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Banner Top */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '12px 20px', fontSize: '14px', fontWeight: 'bold', color: '#a02e59' }}>
        Ringkasan Home Page
      </div>

      {/* Ringkasan Operasional Container */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#a02e59', margin: 0, fontWeight: 'bold' }}>Ringkasan Operasional</h3>
          <span style={{ fontSize: '11px', padding: '4px 12px', backgroundColor: '#f3e5eb', color: '#a02e59', borderRadius: '20px', fontWeight: '500' }}>
            Data contoh
          </span>
        </div>

        {/* 8 Grid Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          
          <div style={{ border: '1px solid #e8b2c4', borderRadius: '10px', padding: '12px' }}>
            <div style={{ fontSize: '11px', color: '#777' }}>Produk aktif</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>4</div>
            <div style={{ fontSize: '10px', color: '#888' }}>4 varian donat tersedia untuk produksi</div>
          </div>

          <div style={{ border: '1px solid #e8b2c4', borderRadius: '10px', padding: '12px' }}>
            <div style={{ fontSize: '11px', color: '#777' }}>Bahan baku</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>42</div>
            <div style={{ fontSize: '10px', color: '#888' }}>6 item perlu restock dalam 3 hari</div>
          </div>

          <div style={{ border: '1px solid #e8b2c4', borderRadius: '10px', padding: '12px' }}>
            <div style={{ fontSize: '11px', color: '#777' }}>Resep aktif</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>12</div>
            <div style={{ fontSize: '10px', color: '#888' }}>2 resep baru menunggu persetujuan</div>
          </div>

          <div style={{ border: '1px solid #e8b2c4', borderRadius: '10px', padding: '12px' }}>
            <div style={{ fontSize: '11px', color: '#777' }}>Supplier aktif</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>9</div>
            <div style={{ fontSize: '10px', color: '#888' }}>2 supplier baru menunggu verifikasi</div>
          </div>

          <div style={{ border: '1px solid #e8b2c4', borderRadius: '10px', padding: '12px' }}>
            <div style={{ fontSize: '11px', color: '#777' }}>Pesanan hari ini</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>124</div>
            <div style={{ fontSize: '10px', color: '#888' }}>18 pesanan menunggu pengemasan</div>
          </div>

          <div style={{ border: '1px solid #e8b2c4', borderRadius: '10px', padding: '12px' }}>
            <div style={{ fontSize: '11px', color: '#777' }}>Pemesanan bahan baku</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>3</div>
            <div style={{ fontSize: '10px', color: '#888' }}>2 PO menunggu persetujuan</div>
          </div>

          <div style={{ border: '1px solid #e8b2c4', borderRadius: '10px', padding: '12px' }}>
            <div style={{ fontSize: '11px', color: '#777' }}>Laporan terbaru</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>2</div>
            <div style={{ fontSize: '10px', color: '#888' }}>Harian & bulanan tersedia untuk dilihat</div>
          </div>

          <div style={{ border: '1px solid #e8b2c4', borderRadius: '10px', padding: '12px' }}>
            <div style={{ fontSize: '11px', color: '#777' }}>Prioritas hari ini</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a02e59' }}>5</div>
            <div style={{ fontSize: '10px', color: '#888' }}>2 PO, 2 resep, 1 laporan perlu ditindaklanjuti</div>
          </div>

        </div>
      </div>

      {/* Grid 2x2 Box Details Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* BOX 1: Produk & Bahan Baku */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '16px', color: '#a02e59', marginBottom: '14px', fontWeight: 'bold' }}>Produk & Bahan Baku</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Produk aktif</span>
              <span style={{ fontWeight: 'bold' }}>4</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#555' }}>Produk terlaris</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: '#a02e59' }}>
                <Image 
                  src="/donat-cokelat.png" 
                  alt="Donat Cokelat" 
                  width={24} 
                  height={24} 
                  style={{ borderRadius: '4px', objectFit: 'cover' }} 
                />
                Donat Cokelat
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Bahan baku total</span>
              <span style={{ fontWeight: 'bold' }}>42</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Bahan baku kritis</span>
              <span style={{ fontWeight: 'bold', color: '#702643' }}>6 item</span>
            </div>

            <div style={{ backgroundColor: '#fff5f7', padding: '12px 14px', borderRadius: '8px', marginTop: '6px', fontSize: '11px', color: '#702643', lineHeight: 1.4 }}>
              <strong>Catatan</strong><br />
              6 bahan baku perlu restock dalam 3 hari untuk menjaga produksi Donat Cokelat tetap stabil.
            </div>
          </div>
        </div>

        {/* BOX 2: Resep & Supplier */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '16px', color: '#a02e59', marginBottom: '14px', fontWeight: 'bold' }}>Resep & Supplier</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Resep aktif</span>
              <span style={{ fontWeight: 'bold' }}>12</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Resep menunggu validasi</span>
              <span style={{ fontWeight: 'bold' }}>2</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Supplier aktif</span>
              <span style={{ fontWeight: 'bold' }}>9</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Supplier baru</span>
              <span style={{ fontWeight: 'bold' }}>2</span>
            </div>

            <div style={{ backgroundColor: '#fff5f7', padding: '12px 14px', borderRadius: '8px', marginTop: '6px', fontSize: '11px', color: '#702643', lineHeight: 1.4 }}>
              <strong>Catatan</strong><br />
              2 resep baru menunggu validasi untuk produksi minggu ini. 2 supplier baru menunggu verifikasi pihak berwenang.
            </div>
          </div>
        </div>

        {/* BOX 3: Pesanan & Pemesanan */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '16px', color: '#a02e59', marginBottom: '14px', fontWeight: 'bold' }}>Pesanan & Pemesanan</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Pesanan hari ini</span>
              <span style={{ fontWeight: 'bold' }}>124</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Pesanan menunggu pengemasan</span>
              <span style={{ fontWeight: 'bold' }}>18</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Pemesanan bahan baku</span>
              <span style={{ fontWeight: 'bold' }}>3</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>PO menunggu persetujuan</span>
              <span style={{ fontWeight: 'bold' }}>2</span>
            </div>

            <div style={{ backgroundColor: '#fff5f7', padding: '12px 14px', borderRadius: '8px', marginTop: '6px', fontSize: '11px', color: '#702643', lineHeight: 1.4 }}>
              <strong>Catatan</strong><br />
              2 PO bahan baku menunggu persetujuan Anda untuk menjaga jadwal produksi.
            </div>
          </div>
        </div>

        {/* BOX 4: Laporan */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '16px', color: '#a02e59', marginBottom: '14px', fontWeight: 'bold' }}>Laporan</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Laporan terbaru</span>
              <span style={{ fontWeight: 'bold' }}>2</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Laporan harian</span>
              <span style={{ fontWeight: 'bold' }}>1</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Laporan bulanan</span>
              <span style={{ fontWeight: 'bold' }}>1</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Ringkasan tindak lanjut</span>
              <span style={{ fontWeight: 'bold' }}>5 item</span>
            </div>

            <div style={{ backgroundColor: '#fff5f7', padding: '12px 14px', borderRadius: '8px', marginTop: '6px', fontSize: '11px', color: '#702643', lineHeight: 1.4 }}>
              <strong>Catatan</strong><br />
              Laporan harian dan bulanan tersedia. Tinjau 5 item operasional dan beri persetujuan PO yang menunggu.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}