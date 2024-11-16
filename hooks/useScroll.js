'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const useScroll = () => {
  const [Scroll, setScroll] = useState({ x: 0, y: 0 });
  const handleResize = () => {
    try {
      setScroll({ x: scrollX, y: scrollY });
    } catch (error) {}
  };
  useMemo(() => {
    if (typeof window !== 'undefined') {
      window?.addEventListener('scroll', handleResize);
      return () => {
        window?.removeEventListener('scroll', handleResize);
      };
    }
  }, []);

  return { ...Scroll };
};

export { useScroll };
