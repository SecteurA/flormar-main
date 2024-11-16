import React from 'react';

function Icon({ name }) {
  return (
    <svg className='text-black' style={{ height: '1em', width: '1em' }}>
      <use href={`/icon/icon-font.svg?v=23#${name}`}></use>
    </svg>
  );
}

export default Icon;
