'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Cookies from 'js-cookie';

function Navigation({ id = 0 }) {
  return (
    <div className='Flex-Auth container'>
      <ul className='header-app'>
        <li className={id === 0 ? 'active' : ''}>
          <Link href={'/auth'}>Account details</Link>
        </li>
        <li className={id === 1 ? 'active' : ''}>
          <Link href={'/orders'}>Orders</Link>
        </li>
        <li
          className={id === 2 ? 'active' : ''}
          onClick={() => {
            Cookies.remove('token');
            window.location.reload();
          }}
        >
          Se deconnecter
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
