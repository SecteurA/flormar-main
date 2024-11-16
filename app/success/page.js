'use client';
import React, { useContext, useEffect } from 'react';
import './success.css';
import Link from 'next/link';
import { Context } from '../ContextLayout';

function page() {
  const { cart, setCart } = useContext(Context);
  useEffect(() => {
    setCart({});
  }, []);
  return (
    <div style={{ padding: ' 100px 0' }}>
      <div className='container'>
        <div className='row'>
          <div className='col-12 '>
            <div className='message-box'>
              <div className='success-container'>
                <br />
                <img src='/logo.svg' alt />
                <br />
                <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                  <hr /> <div />
                  <br />
                  <h1 className='monserrat-font' style={{ color: 'Grey' }}>
                    Nous vous remercions de votre commande
                  </h1>
                  <br />
                  <div className='confirm-green-box'>
                    <br />
                    <h5>CONFIRMATION DE COMMANDE</h5>
                    <p>Votre commande a été réussie !</p>
                    <p>
                      Merci d'avoir choisi Flormar. Vous allez bientôt recevoir
                      un email de confirmation.
                    </p>
                  </div>
                  <br />
                  <Link
                    href={'/'}
                    id='create-btn'
                    className='btn btn-ouioui-secondary margin-left-5px'
                  >
                    Retour à la boutique
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
