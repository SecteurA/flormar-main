'use client';
import React, { useEffect, useState } from 'react';
import '../parfumerie/page.css';
import Link from 'next/link';
import Icon from '../../components/Icon';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const page = () => {
  const [step, setStep] = useState();
  const { handleSubmit, register } = useForm();

  const send = (data) => {
    setStep(1);
    axios
      .post('/api/contact', data)
      .then((d) => {
        setStep(2);
      })
      .catch((err) => {
        setStep(3);
        console.log(err);
      });
  };

  return (
    <div className='container page'>
      <div className='formbold-main-wrapper'>
        <h1>Contactez-nous</h1>
        <div>
          <p>Service disponible du Lundi au Vendredi de 8h30 jusqu’à 17h00 :</p>
          <a href='tel:+212522302451'>05223-02451</a>
        </div>

        <div className='formbold-form-wrapper'>
          <form onSubmit={handleSubmit(send)}>
            <div className='formbold-mb-3'>
              <label htmlFor='prénom' className='formbold-form-label'>
                {' '}
                Nom et prénom :*
              </label>
              <input
                {...register('name')}
                type='text'
                required
                placeholder='Nom et prénom '
                className='formbold-form-input'
              />
            </div>

            <div className='formbold-input-flex'>
              <div className='formbold-mb-3'>
                <label htmlFor='email' className='formbold-form-label'>
                  {' '}
                  Email*{' '}
                </label>
                <input
                  {...register('email')}
                  type='email'
                  required
                  id='email'
                  placeholder='example@email.com'
                  className='formbold-form-input'
                />
              </div>
              <div className='formbold-mb-3 formbold-input-wrapp'>
                <label htmlFor='phone' className='formbold-form-label'>
                  Téléphone :{' '}
                </label>
                <div>
                  <input
                    {...register('téléphone')}
                    type='text'
                    id='téléphone'
                    placeholder='Téléphone'
                    className='formbold-form-input'
                  />
                </div>
              </div>
            </div>
            <div className='formbold-mb-3'>
              <label className='formbold-form-label'>Subject :*</label>
              <input
                {...register('subject')}
                type='text'
                placeholder='Subject'
                required
                className='formbold-form-input'
              />
            </div>
            <div>
              <label htmlFor='message' className='formbold-form-label'>
                Message :*
              </label>
              <textarea
                rows={6}
                {...register('message')}
                placeholder='...'
                id='message'
                className='formbold-form-input'
                defaultValue={''}
              />
            </div>

            <br />
            <button className='formbold-btn'>
              Envoyer maintenant{' '}
              {step === 1 ? (
                <Icon name={'download'} />
              ) : step === 2 ? (
                <Icon name='upload' />
              ) : step === 3 ? (
                <Icon name='error' />
              ) : (
                <></>
              )}
            </button>
          </form>
        </div>
        {/* <img src='image1.jpg' /> */}
      </div>
    </div>
  );
};

export default page;
