import Link from 'next/link';
import React, { useEffect } from 'react';

function Payment({ payment_method = [], register, setValue, errors, watch }) {
  if (payment_method?.length > 0)
    return (
      <div className='payments-info'>
        <h3>Sélection du paiement</h3>

        <form action='' style={{ flexDirection: 'column' }}>
          {payment_method
            ?.filter((p) => p?.enabled)
            ?.map((p, i) => (
              <div key={i} className='details payment' style={{ width: 600 }}>
                <div>
                  <h4 style={{ position: 'relative' }}>
                    <input
                      type='radio'
                      value={p?.id}
                      name='payment'
                      onClick={() => {
                        setValue('payment_method', p?.id);
                        setValue('payment_method_title', p?.title);
                      }}
                    />{' '}
                    <span className='check'></span>
                    <label htmlFor='free'>{p?.title}</label>{' '}
                  </h4>
                  <p>{p?.description}</p>
                  {p?.id === 'cmi' && (
                    <span className='icons'>
                      <img src='/cb.png' alt='' />
                    </span>
                  )}
                </div>
              </div>
            ))}
          <br />
          <div className='privacy-policy'>
            <p>
              Veuillez lire notre{' '}
              <Link href={'/privacy-policy'}>
                politique de confidentialité.
              </Link>
            </p>
            <div style={{ marginTop: 30 }}>
              <input
                {...register('politique', { required: true })}
                type='checkbox'
                className={`checkbox ${
                  errors?.politique || !watch('politique') ? 'err' : ''
                }`}
                required
              />
              <p>
                J’ai lu et j’accepte les{' '}
                <Link href={'/utilisation-de-cookies'}>
                  conditions générales *
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
}

export default Payment;
