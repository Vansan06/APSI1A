
import React, { Suspense } from 'react';
import SupplierLayoutClient from './SupplierLayoutClient';

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e9d5ff',
            color: '#6b21a8',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 'bold',
          }}
        >
          Memuat halaman Supplier...
        </div>
      }
    >
      <SupplierLayoutClient>
        {children}
      </SupplierLayoutClient>
    </Suspense>
  );
}
