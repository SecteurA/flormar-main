'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Register() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const signup = (post_data) => {
    toast.loading("S'inscrire", { id: 'register' });
    axios
      .post('/api/auth', post_data)
      .then(({ data }) => {
        if (
          data?.code === 'existing_user_login' ||
          data?.code === 'existing_user_email'
        )
          toast.error(data?.message || '', { id: 'register' });
        else {
          toast.loading('Se Connecter', { id: 'register' });
          axios.post('/api/login', post_data).then(({ data }) => {
            if (data?.data?.token) {
              Cookies.set('token', data?.data?.token);

              toast.remove('register');
              window?.location.reload();
            }
          });
          // toast.success('Compte créé avec succès' || '', { id: 'register' });
        }
      })
      .catch((err) => toast.error('error' || '', { id: 'register' }));
  };
  return (
    <form className='Login Register' action='' onSubmit={handleSubmit(signup)}>
      <h3>S'inscrire</h3>
      <p>
        Vous pouvez remplir le formulaire ci-dessous et devenir rapidement
        membre et commencer vos achats !
      </p>
      <div className='input-container'>
        <label htmlFor=''>User name*</label>
        <input
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
          {...register('meta.phone', {
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
        <label htmlFor=''>Mot de passe*</label>
        <input
          {...register('password', {
            required: { message: 'entrez votre mot de passe', value: true },
          })}
          className={errors?.password ? 'err' : ''}
          type='password'
          autoComplete='new-password'
        />
        <div className='err'>{errors?.password?.message}</div>
      </div>

      <button>S'inscrire</button>
    </form>
  );
}

export default Register;
