import React from 'react';
import './Info.css';

function Info() {
  return (
    <div className='Info container'>
      <div className='item'>
        <img src='/truk.webp' alt='' />
        <h4>Livraison gratuite</h4>
        <p> livraison gratuite pour les commandes supérieures à 300 Dhs </p>
      </div>
      <div className='item'>
        <img src='/box.webp' alt='' />
        <h4>
          +52 magasins <br /> +60 parfumeries
        </h4>
        {/* <p>Retours faciles sous 30 jours</p> */}
      </div>
      <div className='item'>
        <img src='/lock.webp' alt='' />

        <h4>Paiement 100% sécurisé </h4>
        {/* <p>Paiement sécurisé avec 3D Secure</p> */}
      </div>
      <div className='item'>
        <img src='/phone.webp' alt='' />
        <h4>Support et aide</h4>
        <p>
          +212 5223-02451 Service disponible du Lundi au Vendredi de 08h30
          jusqu’à 17h00
        </p>
      </div>
    </div>
  );
}

export default Info;
