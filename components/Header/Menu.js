'use client';
import React from 'react';
import Icon from '../Icon';
import Link from 'next/link';
import Image from 'next/image';
import Wishes from '../Cart/Wishes';
import { useParams } from 'next/navigation';
import Cookies from 'js-cookie';

function Menu({
  tags = [],
  menu = [],
  ShoLi = -1,
  setShoLi = () => {},
  close_li = () => {},
  ShowHover,
}) {
  const { id, sub_id } = useParams();

  return (
    <menu>
      {ShoLi > -1 && (
        <li className='name'>
          <button title='back' onClick={close_li}>
            <Icon name={'chevron-left'} />
          </button>
          <Link
            className={id === menu[ShoLi]?.slug ? 'active' : ''}
            href={menu[ShoLi]?.url?.replace('https://admin.flormar.ma', '')}
          >
            {ShoLi === 0 ? (
              <Link
                href={`/search?tag=${tags?.map((item) => item?.id)?.join(',')}`}
              >
                Collections
              </Link>
            ) : (
              menu[ShoLi]?.title
            )}
          </Link>
          <span />
        </li>
      )}
      <ul className={ShoLi > -1 ? 'active' : ''}>
        {menu?.map((item, i) => (
          <li
            key={i}
            onClick={() => item?.children?.length > 0 && setShoLi(i)}
            className={item?.children?.length > 0 ? 'has-children' : ''}
          >
            <Link
              className={item?.slug && id === item?.slug ? 'active' : ''}
              href={item?.url?.replace('https://admin.flormar.ma', '')}
            >
              {item?.title}
            </Link>
            <button className={item?.slug && id === item?.slug ? 'active' : ''}>
              {item?.title}
            </button>

            {ShowHover && item?.children?.length > 0 && (
              <div className={`sub-menu ${ShoLi === i ? 'active' : ''}`}>
                <ul>
                  {item?.children?.map((it, j) => (
                    <li
                      key={j}
                      onClick={() => {
                        // setShowMenu(false);
                        setShoLi(-1);
                        close_li();
                      }}
                    >
                      <Link
                        className={sub_id === it?.slug ? 'active' : ''}
                        href={it?.url?.replace('https://admin.flormar.ma', '')}
                      >
                        {it?.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {item?.image && (
                  <Image
                    height={350}
                    width={500}
                    loading={'lazy'}
                    alt=''
                    src={`${item?.image}`}
                  />
                )}
              </div>
            )}
          </li>
        ))}
        {/* test start tag */}
        {tags && (
          <>
            <li
              className='has-children'
              onClick={() => {
                setShoLi(0);
              }}
            >
              <Link
                href={`/search?tag=${tags?.map((item) => item?.id)?.join(',')}`}
              >
                Collections
              </Link>
              <button
                className=''
                onClick={() => {
                  setShoLi(0);
                }}
              >
                Collections
              </button>
              <div className={`sub-menu ${ShoLi === 0 ? 'active' : ''}`}>
                {true && (
                  <ul>
                    {tags
                      ?.sort((a, b) => a.id - b.id)
                      ?.filter((item) => item?.description !== 'hide')
                      ?.map((item) => (
                        <li
                          key={item?.id}
                          onClick={() => {
                            // setShowMenu(false);
                            close_li();
                          }}
                        >
                          <Link className={''} href={`/search?tag=${item?.id}`}>
                            {item?.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
                <Image
                  height={350}
                  width={500}
                  loading={'lazy'}
                  alt=''
                  src={`http://admin.flormar.ma/wp-content/uploads/2023/01/visuel-site-collection.jpg`}
                />
              </div>
            </li>

            {/* bonnes affaires tag */}
            <li className=' '>
              <Link href={`/search?tag=4129`}>Bonnes Affaires</Link>
              <button
                className=''
                onClick={() => {
                  setShoLi(0);
                }}
              >
                Bonnes Affaires
              </button>
            </li>
          </>
        )}
        {/* test end tag */}
        <li className='wishes-list'>
          <Wishes />
        </li>

        {Cookies.get('token') && (
          <>
            <li>
              <Link href={'/orders'}>orders</Link>
            </li>
            <li
              onClick={() => {
                Cookies.remove('token');
                window.location.reload();
              }}
            >
              Se deconnecter
            </li>
          </>
        )}
        {/* <li className='bottom-mobile-menu'>
          <Link href={`/magasins`}>
            {' '}
            <Icon name={'store'} /> Magasins
          </Link>
        </li> */}
      </ul>
    </menu>
  );
}

export default Menu;
