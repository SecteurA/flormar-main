'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // console.error('Error occurred:', error);
  }, [error]);

  return (
    <div
      style={{ textAlign: 'center', paddingTop: '7rem', paddingBottom: '6rem' }}
    >
      <h2
        style={{
          // paddingTop: '7rem',
          paddingBottom: '1rem',
        }}
      >
        Oups! Une erreur s'est produite.
      </h2>

      <div
        style={{
          display: 'flex',
          gap: '3rem',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: '2rem',
          paddingBottom: '3rem',
        }}
      >
        {/* Reloads the current page */}
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '18px 32px',
            backgroundColor: '#E45A80',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Ressayer
        </button>

        {/* Navigates back to the home page */}
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '18px 32px',
            backgroundColor: 'pink',
            color: 'black',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Accueil
        </button>
      </div>
      {/* Error Image */}
      <Image
        src='/404.png'
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        width={1000}
        height={0}
        alt='page error'
      />
    </div>
  );
}
