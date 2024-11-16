import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useCart } from '../../hooks/useCart';
import { Context } from '../ContextLayout';

function Shipping({ watch, setValue }) {
  const { register, handleSubmit } = useForm({
    values: { code: watch('coupon_lines')?.[0]?.code || '' },
  });
  const {
    cart,
    addToCart,
    ShowCart,
    setShowCart,
    removeFromCart,
    ProductsCart,
    LoadingCart,
    total,
    items_length,
    setLoadingCart,
    CartData,
    Gifts,
    getGifts,
  } = useContext(Context);
  useEffect(() => {
    let total = 0;
    switch (watch('billing.city')) {
      case 'CASABLANCA':
        total = 20;
        break;
      case 'BOUSKOURA':
        total = 25;
        break;
      case 'DAR BOUAZZA':
        total = 25;
        break;
      default:
        total = 30;
    }
    setValue('shipping_lines', [
      {
        method_id: 'free_shipping',
        method_title: 'Standart Delevery',
        total: total?.toFixed(2),
      },
    ]);
  }, [watch('billing.city')]);
  const [Message, setMessage] = useState({ type: 'success', text: '' });
  const check_coupon = ({ code }) => {
    toast.loading('', { id: 'promo' });
    axios
      .get('/api/coupon?code=' + code)
      .then(({ data }) => {
        console.log(moment(data?.date_expires).diff(moment(), 'days'));
        setValue('coupon_lines', null);
        if (data?.amount && data?.code) {
          if (moment(data?.date_expires).diff(moment()) <= 0)
            setMessage({
              type: 'err',
              text: ` Ce code promo est expiré.`,
            });
          else if (Number(data?.minimum_amount || 0) > total)
            setMessage({
              type: 'err',
              text: `Vous ne pouvez pas utiliser ce coupon car votre total est inférieur au montant minimum requis(${data?.minimum_amount}dh).`,
            });
          else {
            setMessage({
              type: 'success',
              text: `-${Math.floor(data?.amount)}${
                data?.discount_type === 'percent' ? '%' : ' dh'
              } sur votre commande
            `,
            });

            setValue('coupon_lines', data);
          }
        }
      })
      .catch((err) =>
        setMessage({
          type: 'err',
          text: `Le code promo « ${code} » n’existe pas !`,
        })
      )
      .finally(() => toast.remove('promo'));
  };

  return (
    <div>
      <h3> Avez-vous un code promo</h3>
      <form
        action=''
        id='customer'
        style={{ maxWidth: 500 }}
        onSubmit={handleSubmit(check_coupon)}
      >
        <div className='input-container'>
          {/* <label htmlFor=''>Code promo</label> */}
          <input type='text' {...register('code')} placeholder='Code promo' />
          {Message?.text && (
            <div className={`message ${Message?.type}`}>{Message?.text}</div>
          )}
          <button
            style={{
              border: 'solid 1px #e45a80',
              height: 54,
              color: '#e45a80',
              fontWeight: 'bold',
              borderRadius: 3,
              cursor: 'pointer',
            }}
          >
            Appliquer le code promo
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <h3>Informations sur la livraison</h3>
      <form action=''>
        <div className='details'>
          <div>
            <p>
              {watch('billing.first_name')} {watch('billing.last_name')}
            </p>
            <p>{watch('billing.address_1')} </p>
            <p>{watch('billing.city')}</p>
            <p>{watch('billing.postcode')}</p>
            <p>Tel: {watch('billing.phone')}</p>
          </div>
          <img src='/images/map.jpg' alt='' />
        </div>
      </form>
      <h3>Mode de livraison</h3>
      <form action=''>
        <div className='flex-details'>
          <div className='details'>
            <div>
              <h4>
                {/* <input
                  onClick={() => select_shipping()}
                  value='free_shipping'
                  type='radio'
                  name='shipping'
                  id='free'
                />{' '}
                <span className='check'></span> */}
                <label htmlFor='free'> Standart Delevery</label>{' '}
                <span>
                  {watch('shipping_lines')?.length > 0
                    ? watch('shipping_lines')[0]?.total
                    : '0.00'}
                </span>
              </h4>

              <p>{watch('billing.address_1')} </p>
              <p>{watch('billing.city')}</p>
              <p>{watch('billing.postcode')}</p>
              <p>Tel: {watch('billing.phone')}</p>
            </div>
          </div>
          {/* <div className='details'>
            <div>
              <h4>
                <input
                  onClick={() =>
                    setValue('shipping_lines', [
                      {
                        method_id: 'flat_rate',
                        method_title: 'Fast Delevery',
                        total: '50.00',
                      },
                    ])
                  }
                  value='flat_rate'
                  type='radio'
                  name='shipping'
                  id='fast'
                />{' '}
                <span className='check'></span>
                <label htmlFor='fast'>Fast Delevery</label> <span>50 dh</span>
              </h4>
              <p>{watch('billing.address_1')} </p>
              <p>{watch('billing.city')}</p>
              <p>{watch('billing.postcode')}</p>
              <p>Tel: {watch('billing.phone')}</p>
            </div>
          </div> */}
        </div>
      </form>
    </div>
  );
}

export default Shipping;
