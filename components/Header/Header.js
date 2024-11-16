'use client';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import Icon from '../Icon';
import { useScroll } from '../../hooks/useScroll';
import './Header.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import Cart from '../Cart/Cart';
import Wishes from '../Cart/Wishes';
import Image from 'next/image';
import Menu from './Menu';
import SearchHeader from './SearchHeader';

function Header({ menu, categories, tags }) {
  const [ShoLi, setShoLi] = useState(-1);
  const [ShowMenu, setShowMenu] = useState(false);
  const [ShowSearch, setShowSearch] = useState(false);
  const [ShowHover, setShowHover] = useState(false);

  // const menu = [
  //   {
  //     name: 'Teint',
  //     list: [
  //       'Bb und Cc Cream',
  //       'Blush',
  //       'Bronzer',
  //       'Concealer',
  //       'Contour',
  //       'Foundation',
  //       'Makeup Fixer',
  //       'Powder',
  //       'Primer',
  //       'All Products',
  //     ],
  //     img: 'Teint.png',
  //   },
  //   {
  //     name: 'Yeux',
  //     list: [
  //       'Eye Pencil',
  //       'Eye Primer',
  //       'Eyebrow Mascara And Eyebrow Shadow',
  //       'Eyeshadow',
  //       'Mascara',
  //       'Eyeliner & Dipliner',
  //       'All Products',
  //     ],
  //     img: 'Yeux.jpg',
  //   },
  //   {
  //     name: 'Lèvres',
  //     list: ['Lip Balm', 'Lip Gloss', 'Lipstick', 'All Products'],
  //     img: 'Lèvres.png',
  //   },
  //   {
  //     name: 'Ongles',
  //     list: ['Nail Care', 'Nail Polish', 'Nail Polish Remover', 'All Products'],
  //     img: 'Ongles.png',
  //   },
  //   {
  //     name: 'Soins',
  //     list: ['Face Care', 'Hand&Body Care', 'Perfume', 'All Products'],
  //     img: 'Soins.png',
  //   },
  //   {
  //     name: 'Accessories',
  //     list: ['Eye Accessory', 'Nail Accessory', 'All Products'],
  //     img: 'Accessoires.png',
  //   },
  //   { name: 'Vegan', img: 'vegan.jpg' },
  //   {
  //     name: 'Magasins',
  //     img: 'mapsflormarmorocco.jpg',
  //   },
  // ];

  const params = useParams();
  const [MenuFix, setMenuFix] = useState(false);
  const { y } = useScroll();
  useEffect(() => {
    if (y > 250 && !MenuFix) setMenuFix(true);
    else if (y < 250 && MenuFix) setMenuFix(false);
  }, [y]);

  const close_li = () => {
    setShoLi(-1);
  };

  useEffect(() => {
    setShowHover(false);
    close_li();
    setShowMenu(false);
    const timer = setTimeout(() => {
      setShowHover(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [params]);

  return (
    <div>
      <div
        className={` header ${!ShowMenu && MenuFix ? 'scroll' : ''} ${
          ShowSearch ? 'show-search' : ''
        }`}
      >
        <div className='container'>
          <button className='menu-button' onClick={() => setShowMenu(true)}>
            <span />
            <span />
            <span />
          </button>
          <Link className='logo' href={'/'} shallow>
            <img
              priority='true'
              height={44}
              width={180}
              src='/logo.svg'
              alt=''
            />
            <img
              priority='true'
              height={44}
              width={40}
              src='/mobilelogo.svg'
              alt=''
            />
          </Link>
          <div className={`menu    ${ShowMenu ? 'active' : ''}`}>
            <div className='flex'>
              <Image
                priority='true'
                height={40}
                width={40}
                src='/mobilelogo.svg'
                alt=''
              />
              <button
                onClick={() => {
                  setShowMenu(false);
                  close_li();
                }}
              >
                <Icon name={'close'} />
              </button>
            </div>
          </div>
          <Menu
            ShowHover={ShowHover}
            setShoLi={setShoLi}
            menu={menu}
            ShoLi={ShoLi}
            close_li={close_li}
            tags={tags}
          />
          <Suspense>
            <SearchHeader {...{ categories }} />
          </Suspense>
          <div className='header-right'>
            <button
              className='show-search'
              onClick={() => setShowSearch((s) => !s)}
            >
              <Icon name={!ShowSearch ? 'search' : 'close'} />
            </button>
            <Link
              style={{ color: '#000' }}
              href={'/auth'}
              className='show-user'
              shallow
            >
              <Icon name={'user'} />
            </Link>
            <Wishes />
            <Cart />
          </div>
        </div>
      </div>
      {ShowMenu && (
        <div className='overlay' onClick={() => setShowMenu(false)}></div>
      )}
      <div className={`menu  ${ShowMenu ? 'active' : ''}`}>
        <div className='flex'>
          <Link shallow className='logo' href={'/'}>
            <img width={50} height={50} src='/mobilelogo.svg' alt='' />
          </Link>
          <button
            onClick={() => {
              setShowMenu(false);
              close_li();
            }}
          >
            <Icon name={'close'} />
          </button>
        </div>
        <Menu
          ShowHover={ShowHover}
          setShoLi={setShoLi}
          menu={menu}
          ShoLi={ShoLi}
          close_li={close_li}
          tags={tags}
        />
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0 })}
        className={`back-to-top  ${MenuFix ? 'active' : ''}`}
      >
        <Icon name={'arrow-up'} />
      </button>
    </div>
  );
}

export default Header;
