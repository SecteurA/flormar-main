'use client';
import React, { useEffect, useMemo, useState } from 'react';
import './ImageZoom.css';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';

function ImageZoom({ img = '' }) {
  const [Position, setPosition] = useState({ x: 0, y: 0 });
  const [Loading, setLoading] = useState(true);
  function zoom(e) {
    // if (window?.innerWidth < 560) return;
    var zoomer = e?.currentTarget;
    let offsetX = 0;
    let offsetY = 0;
    e?.nativeEvent?.offsetX
      ? (offsetX = e?.nativeEvent?.offsetX)
      : (offsetX = e?.touches?.[0]?.pageX);
    e?.nativeEvent.offsetY
      ? (offsetY = e?.nativeEvent?.offsetY)
      : (offsetX = e?.touches?.[0]?.pageX);
    let x = (offsetX / zoomer?.offsetWidth) * 100;
    let y = (offsetY / zoomer?.offsetHeight) * 100;
    if ((x !== Position?.x || y !== Position?.y) && window.innerWidth > 720)
      setPosition({ x, y });
  }

  useEffect(() => {
    setLoading(true);
  }, [img]);

  return (
    <figure
      onMouseMove={zoom}
      className='ImageZoom'
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: `${Position.x}% ${Position.y}% `,
      }}
    >
      <Image
        height={1000}
        width={1000}
        src={img}
        data-fancybox='gallery'
        onLoad={() => setLoading(false)}
        alt=''
        priority={true}
        // fetchPriority='high'
      />
    </figure>
  );
}

export default ImageZoom;
