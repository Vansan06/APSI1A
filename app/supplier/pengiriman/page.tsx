'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

export default function InformasiPengirimanSupplierPage() {
  const router = useRouter();
  const [tglKirim, setTglKirim] = useState('2026-10-25');
  const [estTiba, setEstTiba] = useState('2026-10-26');
  const [kurir, setKurir] = useState('JNE Express');
  const [resi, setResi] = useState('JNE88291029');
  const [catatan, setCatatan] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '12px 20px', fontSize: '14px', fontWeight: 'bold', color: '#6b21a8' }}>
        Kelola Pengiriman Bahan Baku
      </div>

      {/* Tabel Daftar Pengiriman */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>Daftar Pengiriman</h3>
          <span style={{ fontSize: '11px', color: '#888', backgroundColor: '#f3e8ff', padding: '4px 12px', borderRadius: '12px' }}>1 pengiriman berjalan</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3e8ff', color: '#581c87', textAlign: 'left' }}>
              <th style={{ padding: '10px 16px' }}>No. pesanan</th>
              <th style={{ padding: '10px 16px' }}>Bahan baku</th>
              <th style={{ padding: '10px 16px' }}>Tujuan</th>
              <th style={{ padding: '10px 16px' }}>Status pengiriman</th>
              <th style={{ padding: '10px 16px' }}>Estimasi tiba</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #fafafa' }}>
              <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#6b21a8' }}>PB-023</td>
              <td style={{ padding: '12px 16px' }}>Margarin • 20 kg</td>
              <td style={{ padding: '12px 16px' }}>DFO Donat</td>
              <td style={{ padding: '12px 16px' }}><span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Dikirim</span></td>
              <td style={{ padding: '12px 16px' }}>26 Okt 2026</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #fafafa' }}>
              <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#6b21a8' }}>PB-024</td>
              <td style={{ padding: '12px 16px' }}>Gula pasir • 25 kg</td>
              <td style={{ padding: '12px 16px' }}>DFO Donat</td>
              <td style={{ padding: '12px 16px' }}><span style={{ backgroundColor: '#f3e8ff', color: '#6b21a8', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Belum dikirim</span></td>
              <td style={{ padding: '12px 16px', color: '#888' }}>Belum diisi</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Form Menginput Detail Pengiriman */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>Menginput Detail Pengiriman • PB-024</h3>
              <span style={{ backgroundColor: '#fef7e0', color: '#b45309', padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Dipproses</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '6px' }}>Tanggal pengiriman</label>
                  <input type="date" value={tglKirim} onChange={(e) => setTglKirim(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '6px' }}>Estimasi tiba</label>
                  <input type="date" value={estTiba} onChange={(e) => setEstTiba(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '6px' }}>Kurir / pengangkut</label>
                  <input type="text" value={kurir} onChange={(e) => setKurir(e.target.value)} placeholder="Nama jasa atau pengangkut" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '6px' }}>Nomor resi (opsional)</label>
                  <input type="text" value={resi} onChange={(e) => setResi(e.target.value)} placeholder="Masukkan nomor resi" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '6px' }}>Catatan pengiriman (opsional)</label>
                <input type="text" value={catatan} onChange={(e) => setCatatan(e.target.value)} placeholder="Tambahkan informasi pengiriman" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              </div>

              <div style={{ fontSize: '11px', color: '#888', marginBottom: '20px' }}>Menyimpan detail tidak mengubah status PB-024 menjadi Dikirim.</div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#6b21a8', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Simpan Detail Pengiriman
                </button>
                <button type="button" onClick={() => router.push('/supplier')} style={{ padding: '10px 24px', border: '1px solid #cccccc', borderRadius: '20px', color: '#555', backgroundColor: '#ffffff', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Batal
                </button>
              </div>
            </form>
          </div>

          {/* Right Info Box */}
          <div style={{ backgroundColor: '#f3e8ff', borderRadius: '12px', padding: '16px', fontSize: '12px', color: '#555', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ color: '#6b21a8', fontSize: '14px' }}>PB-023</strong>
              <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>Dikirim</span>
            </div>
            <div>Margarin • 20 kg</div>
            <div>Tujuan: DFO Donat</div>
            <div>Dikirim 25 Okt 2026</div>
            <div>Estimasi tiba 26 Okt 2026</div>
            <hr style={{ border: 'none', borderTop: '1px solid #e9d5ff', margin: '4px 0' }} />
            <div style={{ color: '#888', fontSize: '11px' }}>
              PB-024 • Gula pasir, 25 kg ke DFO Donat. Belum dikirim; detail pengiriman perlu dilengkapi.
            </div>
          </div>

        </div>
      </div>

      {/* Modal Sukses Disimpan */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', width: '380px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#6b21a8', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={28} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '20px', color: '#6b21a8', margin: '0 0 8px 0', fontWeight: 'bold' }}>Berhasil disimpan</h3>
            <p style={{ fontSize: '13px', color: '#666', margin: '0 0 24px 0' }}>Data berhasil disimpan.</p>
            <button onClick={() => setShowModal(false)} style={{ width: '100%', padding: '12px', backgroundColor: '#581c87', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
              Selesai
            </button>
          </div>
        </div>
      )}

    </div>
  );
}