'use client';
import React, { useContext, useState } from 'react';
import './CheckOut.css';
import Icon from '../../components/Icon';

import Payment from './Payment';
import Shipping from './Shipping';
import Customer from './Customer';
import ChechoutRight from './ChechoutRight';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cart from '../../components/Cart/Cart';

function CheckOut({ payment_method, user = {} }) {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const list = [
    '01 INFORMATIONS CLIENT',
    '02 CODE PROMO',
    '03 SÉLECTION DU PAIEMENT',
  ];
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    values: {
      billing: { country: 'Maroc', ...user, politique: false },
    },
  });

  console.log(errors);
  const createOrder = () => {
    let values = { ...getValues(), shipping: getValues()?.billing };
    setLoading(true);
    axios
      .post(`/api/checkout`, values)
      .then(({ data }) => {
        if (data.payment_method === 'cmi') router.push(`/payment/${data?.id}`);
        else {
          router.push(`/success`);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <div className='CheckOut'>
      <div className='body'>
        <div className='container'>
          <ul className='header-app'>
            {list?.map((l, i) => (
              <li key={i} className={i === selected ? 'active' : ''}>
                {l}
              </li>
            ))}
          </ul>
          {selected === 0 && (
            <Customer
              setSelected={setSelected}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              setValue={setValue}
            />
          )}
          {selected === 1 && <Shipping {...{ watch, register, setValue }} />}
          {selected === 2 && (
            <Payment
              payment_method={payment_method}
              setValue={setValue}
              register={register}
              watch={watch}
              errors={errors}
            />
          )}
          <div className='buttons'>
            {selected > 0 && (
              <button
                className='no-bg'
                onClick={() => setSelected((s) => s - 1)}
              >
                <Icon name={'arrow'} /> Return
              </button>
            )}
            <div></div>

            {!loading ? (
              <button
                type='submit'
                form='customer'
                onClick={() => {
                  if (
                    selected === 2 &&
                    watch('payment_method') &&
                    watch('politique')
                  )
                    createOrder();
                  else if (selected === 1 && watch('shipping_lines')) {
                    setSelected(2);
                  }
                }}
              >
                {selected === 2 ? 'Commander' : 'Continue'}
              </button>
            ) : (
              <svg
                width={24}
                height={24}
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  className='spinner_hzlK'
                  x={1}
                  y={1}
                  width={6}
                  height={22}
                />
                <rect
                  className='spinner_hzlK spinner_koGT'
                  x={9}
                  y={1}
                  width={6}
                  height={22}
                />
                <rect
                  className='spinner_hzlK spinner_YF1u'
                  x={17}
                  y={1}
                  width={6}
                  height={22}
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      <ChechoutRight {...{ selected, setValue, getValues, watch }} />
    </div>
  );
}

export default CheckOut;
