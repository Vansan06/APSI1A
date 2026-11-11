'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

export default function KetersediaanBahanBakuPage() {
  const router = useRouter();
  const [selectedBahan, setSelectedBahan] = useState('Tepung terigu');
  const [jumlah, setJumlah] = useState('150');
  const [status, setStatus] = useState('Tersedia');
  const [catatan, setCatatan] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '12px 20px', fontSize: '14px', fontWeight: 'bold', color: '#6b21a8' }}>
        Kelola Ketersediaan Bahan Baku
      </div>

      {/* Tabel Daftar Bahan Baku */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>Daftar Bahan Baku</h3>
          <span style={{ fontSize: '11px', color: '#888', backgroundColor: '#f3e8ff', padding: '4px 12px', borderRadius: '12px' }}>3 jenis • Semua tersedia</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3e8ff', color: '#581c87', textAlign: 'left' }}>
              <th style={{ padding: '10px 16px' }}>Bahan baku</th>
              <th style={{ padding: '10px 16px' }}>Jumlah tersedia</th>
              <th style={{ padding: '10px 16px' }}>Status</th>
              <th style={{ padding: '10px 16px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #fafafa' }}>
              <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#6b21a8' }}>Tepung terigu</td>
              <td style={{ padding: '12px 16px' }}>150 kg</td>
              <td style={{ padding: '12px 16px' }}><span style={{ backgroundColor: '#f3e8ff', color: '#6b21a8', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Tersedia</span></td>
              <td style={{ padding: '12px 16px' }}>
                <button onClick={() => { setSelectedBahan('Tepung terigu'); setJumlah('150'); }} style={{ padding: '6px 16px', border: '1px solid #6b21a8', borderRadius: '20px', color: '#6b21a8', backgroundColor: selectedBahan === 'Tepung terigu' ? '#f3e8ff' : '#ffffff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {selectedBahan === 'Tepung terigu' ? 'Dipilih' : 'Perbarui'}
                </button>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #fafafa' }}>
              <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#6b21a8' }}>Gula pasir</td>
              <td style={{ padding: '12px 16px' }}>100 kg</td>
              <td style={{ padding: '12px 16px' }}><span style={{ backgroundColor: '#f3e8ff', color: '#6b21a8', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Tersedia</span></td>
              <td style={{ padding: '12px 16px' }}>
                <button onClick={() => { setSelectedBahan('Gula pasir'); setJumlah('100'); }} style={{ padding: '6px 16px', border: '1px solid #6b21a8', borderRadius: '20px', color: '#6b21a8', backgroundColor: selectedBahan === 'Gula pasir' ? '#f3e8ff' : '#ffffff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {selectedBahan === 'Gula pasir' ? 'Dipilih' : 'Perbarui'}
                </button>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #fafafa' }}>
              <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#6b21a8' }}>Margarin</td>
              <td style={{ padding: '12px 16px' }}>60 kg</td>
              <td style={{ padding: '12px 16px' }}><span style={{ backgroundColor: '#f3e8ff', color: '#6b21a8', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Tersedia</span></td>
              <td style={{ padding: '12px 16px' }}>
                <button onClick={() => { setSelectedBahan('Margarin'); setJumlah('60'); }} style={{ padding: '6px 16px', border: '1px solid #6b21a8', borderRadius: '20px', color: '#6b21a8', backgroundColor: selectedBahan === 'Margarin' ? '#f3e8ff' : '#ffffff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {selectedBahan === 'Margarin' ? 'Dipilih' : 'Perbarui'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: '11px', color: '#888', marginTop: '12px' }}>Pilih bahan untuk memperbarui jumlah dan status ketersediaannya.</div>
      </div>

      {/* Form Perbarui Ketersediaan */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '16px', color: '#6b21a8', marginBottom: '16px', fontWeight: 'bold' }}>Perbarui Ketersediaan</h3>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '6px' }}>Bahan baku</label>
              <select value={selectedBahan} onChange={(e) => setSelectedBahan(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}>
                <option value="Tepung terigu">Tepung terigu</option>
                <option value="Gula pasir">Gula pasir</option>
                <option value="Margarin">Margarin</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '6px' }}>Catatan pasokan (opsional)</label>
              <input type="text" value={catatan} onChange={(e) => setCatatan(e.target.value)} placeholder="Tambahkan informasi kesiapan atau jadwal pasokan" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <span style={{ fontSize: '10px', color: '#888', marginTop: '4px', display: 'block' }}>Gunakan satuan kilogram. Pastikan jumlah sesuai stok yang siap dipasok.</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '6px' }}>Jumlah tersedia (kg)</label>
              <input type="number" value={jumlah} onChange={(e) => setJumlah(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '6px' }}>Status ketersediaan</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}>
                <option value="Tersedia">Tersedia</option>
                <option value="Terbatas">Terbatas</option>
                <option value="Habis">Habis</option>
              </select>
            </div>
          </div>

          <div style={{ backgroundColor: '#f3e8ff', padding: '12px 16px', borderRadius: '8px', fontSize: '11px', color: '#581c87', marginBottom: '20px' }}>
            Jumlah stok dicatat terpisah dari pesanan. Stok tidak berkurang otomatis saat pesanan diproses.
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
              Simpan Ketersediaan
            </button>
            <button type="button" onClick={() => router.push('/supplier')} style={{ padding: '10px 24px', border: '1px solid #cccccc', borderRadius: '20px', color: '#555', backgroundColor: '#ffffff', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
              Batal
            </button>
          </div>
        </form>
      </div>

      {/* Modal Sukses */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', width: '380px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#6b21a8', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={28} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '20px', color: '#6b21a8', margin: '0 0 8px 0', fontWeight: 'bold' }}>Berhasil diedit</h3>
            <p style={{ fontSize: '13px', color: '#666', margin: '0 0 24px 0' }}>Perubahan berhasil disimpan.</p>
            <button onClick={() => setShowModal(false)} style={{ width: '100%', padding: '12px', backgroundColor: '#581c87', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
              Selesai
            </button>
          </div>
        </div>
      )}

    </div>
  );
}