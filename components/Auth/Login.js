'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

function Login() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const login = (data) => {
    toast.loading('Se Connecter', { id: 'register' });
    axios
      .post('/api/login', data)
      .then(({ data }) => {
        if (data?.data?.token) {
          Cookies.set('token', data?.data?.token);
          toast.remove('register');
          window?.location.reload();
        } else if (data?.code)
          toast.error(data?.message?.replace(/<[^>]+>/g, '') || '', {
            id: 'register',
          });
      })
      .catch((err) => toast.error('error' || '', { id: 'register' }));
  };
  return (
    <form className='Login' action='' onSubmit={handleSubmit(login)}>
      <h3>Se Connecter</h3>
      <div className='input-container'>
        <label htmlFor=''>E-mail address</label>
        <input
          {...register('username', {
            required: { message: 'Entrez votre adresse e-mail', value: true },
          })}
          className={errors?.username ? 'err' : ''}
          type='text'
        />
        <div className='err'>{errors?.username?.message}</div>
      </div>
      <div className='input-container'>
        <label htmlFor=''>Password</label>
        <input
          {...register('password', {
            required: { message: 'entrez votre mot de passe', value: true },
          })}
          className={errors?.password ? 'err' : ''}
          type='password'
        />
        <div className='err'>{errors?.password?.message}</div>
      </div>
      <Link href='/'>Avez-vous oublié votre mot de passe?</Link>
      <button>Se Connecter</button>
    </form>
  );
}

export default Login;
