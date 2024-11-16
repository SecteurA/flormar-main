import React from 'react';

function PaymentCard() {
  return (
    <div key={i} className='details payment' style={{ width: 600 }}>
      <div>
        <h4 style={{ position: 'relative' }}>
          <input type='radio' name='shipping' value={'card'} id='card' />{' '}
          <span className='check'></span>
          <label htmlFor='free'> Credit Card</label>{' '}
          <span className='icons'>
            <img src='/icon/master-card.svg' alt='' />
            <img src='/icon/visa.svg' alt='' />
          </span>
        </h4>
        <p>
          Safe money transfer using your bank account. Visa, Maestro, Discover,
          American Express.{' '}
        </p>
        <div className='flex'>
          <div className='input-container'>
            <label htmlFor=''>CARD NUMBER</label>
            <input type='text' placeholder='0000 0000 0000 0000' />
            <span className='err'>required</span>
          </div>

          <div className='input-container' style={{ minWidth: 200 }}>
            <label htmlFor=''>NAME ON CARD</label>
            <input type='text' placeholder='NAME ON CARD' />
            <span className='err'>required</span>
          </div>
          <div className='input-container'>
            <label htmlFor=''>EXPIRY DATE</label>
            <input type='text' placeholder='MM/YY' />
            <span className='err'>required</span>
          </div>
          <div className='input-container'>
            <label htmlFor=''>CVV CODE</label>
            <input type='text' placeholder='***' />
            <span className='err'>required</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentCard;
