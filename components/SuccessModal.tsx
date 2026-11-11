'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  title?: string;
  desc?: string;
  onClose: () => void;
}

export default function SuccessModal({
  isOpen,
  title = 'Berhasil disimpan',
  desc = 'Data hasil produksi berhasil disimpan.',
  onClose
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', width: '380px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#fdf0ee', color: '#b0525e', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check size={28} strokeWidth={3} />
        </div>

        <h3 style={{ fontSize: '18px', color: '#b0525e', margin: '0 0 8px 0', fontWeight: 'bold' }}>
          {title}
        </h3>

        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 24px 0', lineHeight: 1.5 }}>
          {desc}
        </p>

        <button 
          onClick={onClose}
          style={{ width: '100%', padding: '12px', backgroundColor: '#b0525e', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Selesai
        </button>
      </div>
    </div>
  );
}