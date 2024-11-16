'use client';
import './Auth.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function ContactForm() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const updateProfile = (post_data) => {
    toast.loading('Envoyer', { id: 'register' });
    axios
      .post('/api/contact', post_data)
      .then(({ data }) => {
        if (data?.code === 'existing_user_login')
          toast.error(data?.message || '', { id: 'register' });
        else {
          toast.success('succès' || '', { id: 'register' });
        }
      })
      .catch((err) => toast.error('error' || '', { id: 'register' }));
  };

  return (
    <div className='Flex-Auth container'>
      <form
        style={{ maxWidth: 1000, margin: 'auto', width: '100%' }}
        className='Login Register'
        action=''
        onSubmit={handleSubmit(updateProfile)}
      >
        <h3>Contactez-nous</h3>
        <p style={{ fontSize: 20 }}>
          Service disponible du Lundi au Vendredi de 8h30 jusqu’à 17h00 :
          05223-02451
        </p>
        <div className='input-container'>
          <label htmlFor=''>Nom*</label>
          <input
            {...register('name', {
              required: { message: 'Entrez votre name', value: true },
            })}
            className={errors?.name ? 'err' : ''}
            type='text'
          />
          <div className='err'>{errors?.name?.message}</div>
        </div>
        <div className='input-container'>
          <label htmlFor=''>E-mail address*</label>
          <input
            {...register('email', {
              required: { message: 'Entrez votre adresse e-mail', value: true },
            })}
            className={errors?.email ? 'err' : ''}
            type='email'
          />
          <div className='err'>{errors?.email?.message}</div>
        </div>
        <div className='input-container'>
          <label htmlFor=''>Subject*</label>
          <input
            {...register('subject', {
              required: {
                message: 'Entrez votre Subject*',
                value: true,
              },
            })}
            className={errors?.subject ? 'err' : ''}
            type='text'
          />
          <div className='err'>{errors?.subject?.message}</div>
        </div>

        <div className='input-container'>
          <label htmlFor=''>Message*</label>
          <textarea
            {...register('message', {
              required: { message: 'Entrez votre Message', value: true },
            })}
            className={errors?.message ? 'err' : ''}
          />
          <div className='err'>{errors?.message?.message}</div>
        </div>

        <button>Envoyer</button>
      </form>
    </div>
  );
}

export default ContactForm;
