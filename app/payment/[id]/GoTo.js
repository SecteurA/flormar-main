'use client';
import React, { useState } from 'react';
import { useEffect } from 'react';

function GoTo() {
  const [Available, setAvailable] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      if (
        document !== undefined &&
        document?.querySelector('#redirectpost') &&
        !Available
      ) {
        document?.querySelector('#redirectpost')?.submit();
        setAvailable(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [Available]);
  return <div></div>;
}

export default GoTo;
