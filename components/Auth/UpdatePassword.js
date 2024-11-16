'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function UpdatePassword({ user }) {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ values: user });

  const signup = (post_data) => {
    if (watch('newPassword') !== watch('confirmPassword')) return;
    toast.loading('Changement de mot de passe', { id: 'register' });
    axios
      .post('/api/update_password', post_data)
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
    <form className='Login Register' action='' onSubmit={handleSubmit(signup)}>
      <h3>Password change</h3>
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
        <label htmlFor=''>Nouveau mot de passe*</label>
        <input
          {...register('newPassword', {
            required: {
              message: 'Entrez votre Nouveau mot de passe',
              value: true,
            },
          })}
          className={errors?.newPassword ? 'err' : ''}
          type='password'
          autoComplete='new-password'
        />
        <div className='err'>{errors?.newPassword?.message}</div>
      </div>
      <div className='input-container'>
        <label htmlFor=''>Confirmer le mot de passe*</label>
        <input
          {...register('confirmPassword', {
            required: {
              message: 'Entrez votre Confirmer le mot de passe',
              value: true,
            },
          })}
          className={errors?.confirmPassword ? 'err' : ''}
          type='password'
          autoComplete='new-password'
        />
        <div className='err'>
          {errors?.confirmPassword?.message ||
            (watch('newPassword') !== watch('confirmPassword') &&
              'le mot de passe de confirmation ne correspond pas')}
        </div>
      </div>
      <button>SAVE CHANGES</button>
    </form>
  );
}

export default UpdatePassword;
