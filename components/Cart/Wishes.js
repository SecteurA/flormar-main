'use client';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import './Cart.css';
import Icon from '../Icon';
import Link from 'next/link';
import { Context } from '../../app/ContextLayout';
import axios from 'axios';
import Image from 'next/image';

function Wishes() {
  const [ShowWishes, setShowWishes] = useState(false);
  const [Products, setProducts] = useState([]);
  const { wishes, setWishes } = useContext(Context);
  const wishes_length = Object?.keys(wishes)?.length;

  useEffect(() => {
    if (wishes_length > 0)
      axios
        .get(`/api/product?include=${Object?.keys(wishes).join(',')}`)
        .then(({ data }) => {
          setProducts(data);
        })
        .catch((err) => console.log(err));
    else setProducts([]);
  }, [wishes]);

  return (
    <>
      <button
        className='show-cart wishes'
        title='wishes'
        onClick={() => setShowWishes(true)}
      >
        <p>Liste de souhaits</p> <Icon name={'heart'} />
        <span>{wishes_length}</span>
      </button>
      {ShowWishes && (
        <div className='Cart'>
          <div className='overlay' onClick={() => setShowWishes(false)}></div>
          <div className='Cart-Container'>
            <div className='top'>
              <h4>Produits ({wishes_length}) </h4>
              <button onClick={() => setShowWishes(false)}>
                <Icon name={'close'} />
              </button>
            </div>
            <div className='products'>
              {Products?.map((p, i) =>
                wishes[p?.id] ? (
                  <div key={i} className='product'>
                    <Link
                      href={`/product/${p?.slug}`}
                      onClick={() => setShowWishes(false)}
                    >
                      <Image
                        height={400}
                        width={400}
                        src={p?.images?.[0]}
                        alt=''
                      />
                    </Link>
                    <div className='body'>
                      <h5>{p?.name}</h5>
                      <span
                        dangerouslySetInnerHTML={{ __html: p?.price_html }}
                      ></span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: p?.description?.slice(0, 100) + '...',
                        }}
                      ></span>
                      {/* 
                      <span>Lorem ipsum dolor sit </span> */}
                      <div className='flex'>
                        <span></span>
                        <button
                          className='close'
                          style={{ color: 'red' }}
                          onClick={() => {
                            let new_wishes = { ...wishes };
                            delete new_wishes[p?.id];
                            setWishes(new_wishes);
                          }}
                        >
                          <Icon name={'trash'} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Fragment key={i}></Fragment>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Wishes;
