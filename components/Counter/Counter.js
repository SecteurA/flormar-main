import React, { useState } from 'react';
import './Counter.css';
import Icon from '../Icon';

function Counter({ count = 1, setcount = () => 1 }) {
  return (
    <div className='Counter items'>
      <button onClick={() => setcount(count > 1 ? count - 1 : 1)}>
        <Icon name={'min'} />
      </button>
      <div>{count}</div>
      <button onClick={() => setcount(count + 1)}>
        <Icon name={'add'} />
      </button>
    </div>
  );
}

export default Counter;
