'use client';
import React, { Fragment, useState } from 'react';
import Icon from '../Icon';
import './Footer.css';
import Link from 'next/link';

function Footer({ menu, categories }) {
  const [Open, setOpen] = useState(null);
  return (
    <div className='Footer'>
      <div className='logo'>
        <img src='/images/Logo F Hap.png' alt='' />
      </div>
      <div className='social'>
        <Icon name={'facebook'} />
        <Icon name={'instagram'} />
        <Icon name={'twitter'} />
      </div>
      <div className={`item ${Open === 1 ? 'open' : 'close'}`}>
        <h5 onClick={() => setOpen(Open === 1 ? null : 1)}>
          CATÉGORIES{' '}
          <button>
            <span></span>
            <span></span>
          </button>
        </h5>
        <ul>
          {menu?.map((item, i) =>
            item?.slug ? (
              <li key={i}>
                <Link href={item?.url?.replace('https://admin.flormar.ma', '')}>
                  {item?.title}
                </Link>
              </li>
            ) : (
              <Fragment key={i} />
            )
          )}
        </ul>
      </div>
      <div className={`item ${Open === 2 ? 'open' : 'close'}`}>
        <h5 onClick={() => setOpen(Open === 2 ? null : 2)}>
          ENTREPRISE{' '}
          <button>
            <span></span>
            <span></span>
          </button>
        </h5>
        <ul>
          <li>
            <Link href='/a-propos-de-nous'>A propos de nous</Link>
          </li>
          <li>
            <Link href='/politiques-des-ressources-humaines'>
              Politiques des ressources Humaines
            </Link>
          </li>
          <li>
            <Link rel='noopener noreferrer' href='/candidature'>
              Candidature Spontanée
            </Link>
          </li>
          {/* <li>
            <a href='/candidature'>Franchise Flormar </a>
          </li> */}
          <li>
            <a href='/parfumerie'>Clients parfumeries </a>
          </li>
        </ul>
      </div>
      <div className={`item ${Open === 3 ? 'open' : 'close'}`}>
        <h5 onClick={() => setOpen(Open === 3 ? null : 3)}>
          AIDE ET CONTACT{' '}
          <button>
            <span></span>
            <span></span>
          </button>
        </h5>
        <ul>
          <li>
            <Link href='/faq'>Foire aux questions FAQ</Link>
          </li>

          <li>
            <Link href='/conditions-generales-de-vente'>
              Conditions Générales de Vente
            </Link>
          </li>
          <li>
            {/* <Link href='/politique-de-retour/'>Politique de retour</Link> */}
            <Link href='/contactez-nous'>Contactez-nous</Link>
          </li>

          <div className='social'>
            <Icon name={'facebook'} />
            <Icon name={'instagram'} />
            <Icon name={'twitter'} />
          </div>
        </ul>
      </div>
      <div className='copyright'>
        Copyright © {new Date().getFullYear()} Flormar
      </div>
    </div>
  );
}

export default Footer;
