'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    async function initMSW() {
      if (process.env.NODE_ENV === 'development') {
        try {
          const { initMocks } = await import('@/mocks');
          await initMocks();
          console.log('🎭 MSW (Mock Service Worker) is running');
          setMswReady(true);
        } catch (error) {
          console.error('Failed to initialize MSW:', error);
          setMswReady(true); // Continue anyway
        }
      } else {
        setMswReady(true);
      }
    }

    initMSW();
  }, []);

  // In development, wait for MSW to be ready
  if (process.env.NODE_ENV === 'development' && !mswReady) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'system-ui, sans-serif',
      }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎭</div>
          <div>Loading MSW...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
