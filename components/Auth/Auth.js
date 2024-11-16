import React from 'react';
import './Auth.css';
import Login from './Login';
import Register from './Register';
import Account from './Account';
import UpdatePassword from './UpdatePassword';
import Navigation from './Navigation/Navigation';
import { profile } from '../../utils/profile';
import dynamic from 'next/dynamic';

dynamic;
async function Auth() {
  const user = await profile();
  // console.log(user);
  if (user)
    return (
      <>
        <Navigation id={0} />
        <div className='Flex-Auth container'>
          <Account user={user} />
          <div className='line'></div>
          <UpdatePassword user={user} />
        </div>
      </>
    );

  return (
    <div className='Flex-Auth container'>
      <Login />
      <div className='line'></div>

      <Register />
    </div>
  );
}

export default Auth;
