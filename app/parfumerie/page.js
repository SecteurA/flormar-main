'use client';
import React, { useEffect, useState } from 'react';
import './page.css';
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
      .post('/api/mail', { subject: 'Collaborons ensemble', data })
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
        <h1>Collaborons ensemble !</h1>
        <div>
          <p>
            Rejoignez-nous pour construire un partenariat solide et dynamique.
            Ensemble faisons découvrir nos produits de maquillage de haute
            performance à notre clientèle.
          </p>
          <p>Nous sommes là pour vous accompagner dans votre démarche.</p>
          <p>
            Nous vous invitons à remplir notre formulaire de partenariat. Nous
            apprécions votre collaboration et nous vous contacterons rapidement
            après réception de vos informations.
          </p>
        </div>
        <div className='flex-coll'>
          <img src='/images/pres1.png' alt='' />
          <img src='/images/pres2.png' alt='' />
        </div>
        <div className='formbold-form-wrapper'>
          <form onSubmit={handleSubmit(send)}>
            <div className='formbold-mb-3'>
              <label htmlFor='nom' className='formbold-form-label'>
                {' '}
                Nom de la parfumerie :*{' '}
              </label>
              <input
                {...register('Nom de la parfumerie')}
                type='text'
                required
                placeholder='Nom de la parfumerie'
                className='formbold-form-input'
              />
            </div>
            <div className='formbold-mb-3'>
              <label htmlFor='prénom' className='formbold-form-label'>
                {' '}
                Nom et prénom :*
              </label>
              <input
                {...register('Nom et prénom')}
                type='text'
                required
                placeholder='Nom et prénom '
                className='formbold-form-input'
              />
            </div>
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
            <div className='formbold-input-flex'>
              <div>
                <label className='formbold-form-label'>Ville :*</label>
                <input
                  {...register('ville')}
                  type='text'
                  placeholder='Ville'
                  required
                  className='formbold-form-input'
                />
              </div>
              <div className='formbold-mb-3 formbold-input-wrapp'>
                <label htmlFor='phone' className='formbold-form-label'>
                  Téléphone :*{' '}
                </label>
                <div>
                  <input
                    {...register('téléphone')}
                    type='text'
                    required
                    id='téléphone'
                    placeholder='Téléphone'
                    className='formbold-form-input'
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor='message' className='formbold-form-label'>
                Demande
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
