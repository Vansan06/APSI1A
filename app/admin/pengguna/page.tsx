'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  UserCheck, 
  Search, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface PenggunaItem {
  id: string;
  nama: string;
  email: string;
  peran: string;
  aksesTerakhir: string;
  status: 'Aktif' | 'Nonaktif';
}

const PENGGUNA_LIST: PenggunaItem[] = [
  {
    id: '1',
    nama: 'Enji Putri',
    email: 'enjiputri@gmail.com',
    peran: 'Admin',
    aksesTerakhir: '24 Okt • 13.00',
    status: 'Aktif',
  },
  {
    id: '2',
    nama: 'Siti Rahmah',
    email: 'sitirahmah@gmail.com',
    peran: 'Karyawan Produksi',
    aksesTerakhir: '24 Okt • 12.30',
    status: 'Aktif',
  },
  {
    id: '3',
    nama: 'Budiman',
    email: 'budiman@gmail.com',
    peran: 'Supplier',
    aksesTerakhir: '24 Okt • 12.00',
    status: 'Aktif',
  },
  {
    id: '4',
    nama: 'Aunur Rahman',
    email: 'aunurrahman@gmail.com',
    peran: 'Owner',
    aksesTerakhir: '23 Okt • 16.00',
    status: 'Aktif',
  },
];

export default function AdminManajemenPenggunaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [penggunaRows, setPenggunaRows] = useState<PenggunaItem[]>(PENGGUNA_LIST);
  useEffect(() => { fetch("/api/pengguna").then(r=>r.json()).then(r=>{if(r.success)setPenggunaRows(r.data.map((u:any)=>({id:u.id,nama:u.nama,email:u.email,peran:u.role,aksesTerakhir:u.akses_terakhir?new Date(u.akses_terakhir).toLocaleString("id-ID"):"Belum pernah masuk",status:u.aktif?"Aktif":"Nonaktif"})))}).catch(console.error); }, []);
  const [filterPeran, setFilterPeran] = useState('Semua peran');
  const [filterStatus, setFilterStatus] = useState('Semua status');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER UTAMA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
          Manajemen Pengguna
        </h2>
      </div>

      {/* 3 KARTU STATISTIK RINGKASAN */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        
        {/* CARD 1: TOTAL PENGGUNA */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Total pengguna</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#333333', margin: '4px 0' }}>
              4 akun
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>4 aktif</div>
          </div>
          <div style={iconBadgeStyle}>
            <Users size={20} color="#6b21a8" />
          </div>
        </div>

        {/* CARD 2: PERAN TERSEDIA */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Peran tersedia</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#333333', margin: '4px 0' }}>
              4 peran
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>Owner, Admin, Produksi, Supplier</div>
          </div>
          <div style={iconBadgeStyle}>
            <Shield size={20} color="#6b21a8" />
          </div>
        </div>

        {/* CARD 3: AKTIF HARI INI */}
        <div style={statCardStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#777777' }}>Aktif hari ini</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#333333', margin: '4px 0' }}>
              4 akun
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>Terakhir diperbarui 13.00 WIB</div>
          </div>
          <div style={iconBadgeStyle}>
            <UserCheck size={20} color="#6b21a8" />
          </div>
        </div>

      </div>

      {/* TABEL DAFTAR PENGGUNA */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b21a8', margin: 0, fontWeight: 'bold' }}>
            Daftar pengguna
          </h3>
          <span style={{ fontSize: '11px', color: '#888' }}>4 data</span>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} color="#888" style={{ position: 'absolute', left: '12px' }} />
            <input
              type="text"
              placeholder="Cari nama atau email pengguna..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <select 
            value={filterPeran} 
            onChange={(e) => setFilterPeran(e.target.value)}
            style={selectStyle}
          >
            <option>Semua peran</option>
            <option>Admin</option>
            <option>Karyawan Produksi</option>
            <option>Supplier</option>
            <option>Owner</option>
          </select>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={selectStyle}
          >
            <option>Semua status</option>
            <option>Aktif</option>
            <option>Nonaktif</option>
          </select>
        </div>

        {/* TABEL (TANPA KOLOM AKSI) */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fdf2f8', color: '#86198f', textAlign: 'left' }}>
              <th style={{ padding: '10px 12px', borderRadius: '6px 0 0 6px' }}>Pengguna</th>
              <th style={{ padding: '10px 12px' }}>Peran</th>
              <th style={{ padding: '10px 12px' }}>Akses terakhir</th>
              <th style={{ padding: '10px 12px', borderRadius: '0 6px 6px 0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {penggunaRows.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #fdf2f8' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>{item.nama}</div>
                  <div style={{ fontSize: '10px', color: '#777' }}>{item.email}</div>
                </td>
                <td style={{ padding: '12px', color: '#333' }}>{item.peran}</td>
                <td style={{ padding: '12px', color: '#333' }}>{item.aksesTerakhir}</td>
                <td style={{ padding: '12px' }}>
                  <span 
                    style={{ 
                      backgroundColor: '#e6f4ea', 
                      color: '#137333', 
                      padding: '4px 10px', 
                      borderRadius: '12px', 
                      fontSize: '11px', 
                      fontWeight: 'bold' 
                    }}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION FOOTER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '11px', color: '#888888' }}>
          <div>Menampilkan 1–4 dari 4 data</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button disabled style={{ border: 'none', background: 'none', cursor: 'not-allowed', color: '#ccc' }}>
              <ChevronLeft size={16} />
            </button>
            <span style={{ backgroundColor: '#6b21a8', color: '#ffffff', width: '22px', height: '22px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              1
            </span>
            <button disabled style={{ border: 'none', background: 'none', cursor: 'not-allowed', color: '#ccc' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

const statCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const iconBadgeStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  backgroundColor: '#f3e8ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const selectStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  fontSize: '12px',
  backgroundColor: '#ffffff',
  color: '#333',
  outline: 'none',
  cursor: 'pointer',
};