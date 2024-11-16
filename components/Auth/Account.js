'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { citys } from '../../utils/citys';

function Account({ user }) {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ values: user });
  // console.log(user);
  const updateProfile = (post_data) => {
    toast.loading("S'inscrire", { id: 'register' });
    axios
      .post('/api/profile', post_data)
      .then(({ data }) => {
        if (
          data?.code === 'existing_user_login' ||
          data?.code === 'existing_user_email'
        )
          toast.error(data?.message || '', { id: 'register' });
        else {
          toast.success('succès' || '', { id: 'register' });
        }
      })
      .catch((err) => toast.error('error' || '', { id: 'register' }));
  };
  return (
    <form
      className='Login Register'
      action=''
      onSubmit={handleSubmit(updateProfile)}
    >
      <h3>Account details</h3>
      <p></p>
      <div className='input-container'>
        <label htmlFor=''>User name*</label>
        <input
          disabled
          {...register('username', {
            required: { message: 'Entrez votre username', value: true },
          })}
          className={errors?.username ? 'err' : ''}
          type='text'
        />
        <div className='err'>{errors?.username?.message}</div>
      </div>
      <div className='input-container'>
        <label htmlFor=''>E-mail address*</label>
        <input
          disabled
          {...register('email', {
            required: { message: 'Entrez votre adresse e-mail', value: true },
          })}
          className={errors?.email ? 'err' : ''}
          type='email'
        />
        <div className='err'>{errors?.email?.message}</div>
      </div>
      <div className='input-container'>
        <label htmlFor=''>Numéro de téléphone*</label>
        <input
          {...register('phone', {
            required: {
              message: 'Entrez votre Numéro de téléphone*',
              value: true,
            },
          })}
          className={errors?.phone ? 'err' : ''}
          type='text'
        />
        <div className='err'>{errors?.phone?.message}</div>
      </div>
      <div className='input-container'>
        <label htmlFor=''>Nom*</label>
        <input
          {...register('first_name', {
            required: { message: 'Entrez votre Nom', value: true },
          })}
          className={errors?.first_name ? 'err' : ''}
          type='text'
        />
        <div className='err'>{errors?.first_name?.message}</div>
      </div>
      <div className='input-container'>
        <label htmlFor=''>Prénom*</label>
        <input
          {...register('last_name', {
            required: { message: 'Entrez votre Prénom', value: true },
          })}
          className={errors?.last_name ? 'err' : ''}
          type='text'
        />
        <div className='err'>{errors?.last_name?.message}</div>
      </div>
      <div className='input-container'>
        <label htmlFor=''>Ville*</label>
        <select
          {...register('city', { required: true })}
          className={errors?.city ? 'err' : ''}
        >
          {citys?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div className='err'>{errors?.city?.message}</div>
      </div>
      <div className='input-container'>
        <label htmlFor=''>Adresse*</label>
        <textarea
          {...register('address_1', {
            required: { message: 'Entrez votre Adresse', value: true },
          })}
          className={errors?.address_1 ? 'err' : ''}
        />
        <div className='err'>{errors?.address_1?.message}</div>
      </div>
      <div className='input-container'>
        <label htmlFor=''>CODE POSTAL*</label>
        <input
          {...register('postcode', {
            required: { message: 'Entrez votre CODE POSTAL', value: true },
          })}
          className={errors?.postcode ? 'err' : ''}
          placeholder='CODE POSTAL'
        />
        <div className='err'>{errors?.postcode?.message}</div>
      </div>

      <button>SAVE CHANGES</button>
    </form>
  );
}

export default Account;
