'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import './Product.css';
import PageLink from '../PageLink/PageLink';
import ImageZoom from '../ImageZoom/ImageZoom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Icon from '../Icon';
import Fancybox from '../FancyBox/FancyBox';
import Counter from '../Counter/Counter';
import Choeson from './Choeson';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../hooks/useCart';
import { Context } from '../../app/ContextLayout';
import formatNumber from '../../utils/formatNumber';

function Product({ product = {}, sku, variations, categories }) {
  const [ShowColors, setShowColors] = useState(false);
  const [orderProdInList, setOrderProdInList] = useState(1);

  const [count, setcount] = useState(1);
  const [Variant, setVariant] = useState({});
  const [Available, setAvailable] = useState(
    product?.stock_status === 'instock'
  );
  const [activeIndex, setActiveIndex] = useState(0); // Track active slide index
  const ref = useRef();

  const { wishes, setWishes } = useContext(Context);
  // console.log({ wishes });
  useEffect(() => {
    setVariant();
    let inf = variations?.find((p) => p?.sku === sku) || product;
    let swatchesProduct =
      product?.variations?.find((p) => p?.sku === sku)?.images?.[0] ||
      product?.images?.[1];
    inf.swatches = swatchesProduct;
    // let color = product?.variations?.find((p) => p?.sku === sku)?.color_hex;
    // inf.color_hex = color;
    // let numberFrontList = product?.variations?.length;
    inf.orderOfProd = 1;

    setAvailable(inf?.stock_status === 'instock');
    setVariant(inf);

    // console.log({ inf });
  }, [product, sku]);

  function removeDash(input) {
    return input?.replace(/-/g, ' ');
  }

  // handle swatches
  function getUnselectedSwatches(prod) {
    // Get the swatches options from the prod attributes
    const swatchesAttribute = prod?.attributes?.find(
      (attr) => attr?.name === 'swatches'
    );

    // If the prod does not have the swatches attribute, return an empty array
    if (!swatchesAttribute) {
      return [];
    }

    const swatchesOptions = swatchesAttribute?.options;

    // Collect all swatches options used in the variations
    const selectedSwatches = prod?.variations
      .map((variation) =>
        variation?.attributes?.find((attr) => attr?.name === 'swatches')
      )
      .filter((attr) => attr !== undefined) // Make sure the swatches attribute exists in the variation
      .map((attr) => removeDash(attr?.option?.toLowerCase())); // Normalize for comparison (lowercase)

    // Find the unselected swatches by comparing all swatches with the selected ones
    const unselectedSwatches = swatchesOptions?.filter(
      (option) => !selectedSwatches?.includes(option?.toLowerCase())
    );

    return unselectedSwatches;
  }

  const category = categories?.find(
    (c) => product?.categories?.includes(c?.name) && c?.parent === 0
  );

  const sub_category = categories?.find(
    (c) => product?.categories?.includes(c?.name) && c?.parent !== 0
  );

  const links = [
    { route: '/', name: 'Accueil' },
    {
      route: `/categorie/${category?.slug}`,
      name: category?.name,
    },
    {
      route: `/categorie/${category?.slug}/${sub_category?.slug}`,
      name: sub_category?.name,
    },
    { name: decodeURIComponent(product?.name) },
  ];

  // const handleScroll = (e) => {
  //   e.preventDefault();
  //   const target = document.getElementById('flormar_product_description');
  //   const offset = 200;

  //   window.scrollTo({
  //     top: target.offsetTop - offset,
  //     behavior: 'smooth',
  //   });
  // };

  // console.log({ Variant });
  if (Variant)
    return (
      <div className='Product '>
        <div className='container'>
          <PageLink links={links} />
          <div className='Product-Images'>
            {/* OLD pagination */}
            {/* <div className='flex'>
              <div className='pagination'></div>
              <Fancybox>
                <Swiper
                  ref={ref}
                  modules={[Pagination]}
                  pagination={{
                    el: '.pagination',
                    clickable: true,
                    renderBullet: (index, className) =>
                      `<img class='${className}' src='${
                        Variant?.images?.filter((_, idx) => idx != 1)?.[index]
                      }' alt='img-${index}' />`,
                  }}
                >
                  {Variant?.images
                    ?.filter((_, idx) => idx != 1)
                    ?.map((im, i) => (
                      <SwiperSlide key={i}>
                        <ImageZoom img={im} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </Fancybox>
            </div> */}

            {/* new pagination images & more optimized */}
            <div className='flex'>
              {/* Custom Pagination */}
              <div className='custom-pagination '>
                {Variant?.images
                  ?.filter((_, idx) => idx !== 1)
                  ?.map((img, index) => (
                    <Image
                      key={index}
                      className={`swiper-pagination-horizontal 
                         ${
                           index === activeIndex
                             ? 'swiper-pagination-bullet-active'
                             : ''
                         }`}
                      width={80}
                      height={100}
                      alt={`img-${index}`}
                      style={{ height: '100px', width: '80px' }}
                      src={img}
                      onClick={() => ref.current.swiper.slideTo(index)} // Change to corresponding slide
                      priority={true}
                      // fetchPriority='high'
                    />
                  ))}
              </div>

              {/* Swiper Component */}
              <Fancybox>
                <Swiper
                  ref={ref}
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  onSlideChange={({ activeIndex }) =>
                    setActiveIndex(activeIndex)
                  } // Update active bullet on slide change
                >
                  {Variant?.images
                    ?.filter((_, idx) => idx !== 1)
                    ?.map((im, i) => (
                      <SwiperSlide key={i}>
                        <ImageZoom img={im} /> {/* Your ImageZoom component */}
                      </SwiperSlide>
                    ))}
                </Swiper>
              </Fancybox>
            </div>

            <div className='Product-right-details'>
              <div className='flex'>
                <h1 dangerouslySetInnerHTML={{ __html: product?.name }}></h1>
              </div>
              <div className='flex' style={{ padding: '10px 0' }}>
                <strong
                  dangerouslySetInnerHTML={{ __html: product?.price_html }}
                ></strong>
              </div>
              {product?.variations?.length > 0 && (
                <div className='select'>
                  <div
                    className={`item colors ${ShowColors ? 'active' : ''}`}
                    onClick={() => setShowColors((c) => !c)}
                    style={{ color: 'black' }}
                  >
                    <span
                      style={{
                        background:
                          // `url('${Variant?.swatches}')` ||
                          // `url('${Variant?.images?.[1]}')` ||
                          // `url('${Variant?.images?.[0]}')` ||
                          // `url('${Variant?.main_image}')` ||
                          '#eee',
                        // Variant?.color_hex
                      }}
                    >
                      {(Variant?.swatches ||
                        Variant?.images?.[1] ||
                        Variant?.images?.[0] ||
                        Variant?.main_image) && (
                        <Image
                          src={
                            Variant?.swatches ||
                            Variant?.images?.[1] ||
                            Variant?.images?.[0] ||
                            Variant?.main_image
                          }
                          width={32}
                          height={32}
                          style={{
                            borderRadius: '50%',
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      )}
                    </span>
                    <p
                    // dangerouslySetInnerHTML={{
                    //   __html:
                    // Variant?.attributes?.filter(
                    //   (a) => a?.slug === 'pa_swatches'
                    // )?.[0]?.option ||
                    // Variant?.name ||
                    // Variant?.sku,
                    // }}
                    >
                      {/* {formatNumber(Variant?.orderOfProd || 1)} {'  '} */}
                      {/* {Variant?.sku?.slice(-2)} */}
                      {Variant?.sku?.split('-')?.pop()}
                      {'  '}
                      {Variant?.type === 'variable'
                        ? getUnselectedSwatches(product)?.[0]
                        : Variant?.attributes?.filter(
                            (a) => a?.slug === 'pa_swatches'
                          )?.[0]?.option ||
                          Variant?.name ||
                          Variant?.sku}
                    </p>

                    <Icon name={'chevron-down'} />
                  </div>
                  <ul className='list-colors'>
                    {
                      // add product to list
                      <a
                        className={`item colors  ${
                          Variant?.sku === product?.sku ? 'active' : ''
                        }`}
                        href={`/product/${product?.slug}?sku=${product?.sku}`}
                      >
                        <span
                          style={{
                            // background: product?.color_hex || '#eee',
                            background:
                              // `url(${product?.images?.[1]})` ||
                              // `url(${product?.images?.[0]})` ||
                              '#eef',
                          }}
                        >
                          {(product?.images?.[1] || product?.images?.[0]) && (
                            <Image
                              src={product?.images?.[1] || product?.images?.[0]}
                              width={32}
                              height={32}
                              style={{
                                borderRadius: '50%',
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          )}
                        </span>
                        <p>
                          {/* {formatNumber(product?.orderOfProd)}{' '} */}
                          {/* {product?.swatch_main_prod} */}
                          {/* {product?.sku?.slice(-2)} */}
                          {product?.sku?.split('-')?.pop()}{' '}
                          {getUnselectedSwatches(product)?.[0]}
                        </p>
                      </a>
                    }
                    {(product?.variations?.length > 0
                      ? product?.variations
                      : [
                          {
                            sku: product?.sku,
                            name: product?.name,
                            images: product?.images,
                            color_hex: product?.color_hex,
                            main_image: product?.main_image,
                            attributes: product?.attributes,
                          },
                        ]
                    )?.map(
                      (p, i) =>
                        p?.sku && (
                          <a
                            className={`item colors  ${
                              Variant?.sku === p?.sku ? 'active' : ''
                            }`}
                            key={i}
                            href={`/product/${product?.slug}?sku=${p?.sku}`}
                            onClick={() => {
                              setShowColors((c) => !c);

                              // setOrderProdInList(i + 1);

                              // setVariant(p || {});
                              // ref?.current?.swiper?.slideTo(i);
                            }}
                          >
                            {/* <div className='color'></div> */}
                            {/* <Image
                              height={30}
                              width={30}
                              alt='pr'
                              src={p?.images[0] || ''}
                            /> */}
                            <span
                              style={{
                                background:
                                  // `url('${p?.images?.[0]}')` ||
                                  // `url('${p?.main_image}')` ||
                                  '#eee',
                              }}
                            >
                              {(p?.images?.[0] || p?.main_image) && (
                                <Image
                                  src={p?.images?.[0] || p?.main_image}
                                  width={32}
                                  height={32}
                                  style={{
                                    borderRadius: '50%',
                                    width: '100%',
                                    height: '100%',
                                  }}
                                />
                              )}
                            </span>
                            <p style={{ textTransform: 'uppercase' }}>
                              {p?.sku?.split('-')?.pop()}
                              {'  '}
                              {removeDash(
                                p?.attributes?.filter(
                                  (a) => a?.name == 'swatches'
                                )?.[0]?.option
                              ) ||
                                p?.name ||
                                p?.sku}
                            </p>
                          </a>
                        )
                    )}
                  </ul>
                </div>
              )}
              {/* <div className='categories'>
              {product?.categories?.map((c, i) => (
                <Link key={i} href={`/categorie/${c}`}>
                  {c}
                </Link>
              ))}
            </div>
            <p
              style={{
                fontFamily: 'var(--bar-code)',
                fontSize: 50,
                margin: ' 30px 0',
              }}
            >
              {Variant?.sku || product?.variations[0]?.sku}
            </p> */}
              <p
                dangerouslySetInnerHTML={{ __html: product?.short_description }}
              ></p>
              {/* <p style={{ display: 'inline' }}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: product?.description?.slice(0, 100) + '...',
                  }}
                />
                <span>
                  <a
                    onClick={handleScroll}
                    style={{
                      textDecoration: 'underline',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    plus details
                  </a>
                </span>
              </p> */}

              <AddToCart
                {...{
                  count,
                  setcount,
                  product,
                  Variant,
                  Available,
                }}
              />
              <div className='container'>
                <button
                  className={`heart ${wishes[product?.id] ? 'active' : ''}`}
                  style={{ display: 'flex', position: 'static' }}
                  onClick={() =>
                    setWishes((w) => {
                      let new_w = { ...w };
                      if (new_w[product?.id]) delete new_w[product?.id];
                      else new_w[product?.id] = 1;
                      return new_w;
                    })
                  }
                >
                  <Icon name={'heart'} /> AJOUTER AU FAVOURIS
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='Product-Details' id='flormar_product_description'>
          <ul>
            <li className='title'>Description du produit</li>
          </ul>
          <div className='container'>
            <div style={{ flex: 2 }}>
              <h4 dangerouslySetInnerHTML={{ __html: product?.name }}></h4>
              <p
                dangerouslySetInnerHTML={{ __html: product?.description }}
                style={{ marginBottom: '1.5rem' }}
              ></p>
              <table>
                <tr>
                  <td>Barcode</td>
                  <td>{Variant?.barcode || '--------'}</td>
                </tr>
                <tr>
                  <td>SKU</td>
                  <td>{sku}</td>
                </tr>
                <tr>
                  <td>Volume</td>
                  <td>{Variant?.volume || '--------'}</td>
                </tr>
              </table>
            </div>
            <div
              className='html'
              dangerouslySetInnerHTML={{ __html: product?.short_description }}
            ></div>
            <div style={{ flex: 1 }}>
              <img src={product?.acf?.['dtails-img']?.url} alt='' />
            </div>
          </div>

          <AddToCart
            {...{
              count,
              setcount,
              product,
              Variant,
              Available,
            }}
          />
        </div>

        <Choeson
          title={'Suggestions des produits'}
          items={product?.related_ids}
        />
      </div>
    );
}

export default Product;

const AddToCart = ({ count, setcount, product, Variant, Available = true }) => {
  const {
    cart,
    addToCart,
    ShowCart,
    setShowCart,
    removeFromCart,
    ProductsCart,
    LoadingCart,
    total,
    items_length,
    setLoadingCart,
    CartData,
    Gifts,
    getGifts,
  } = useContext(Context);

  return (
    <div className='add-to-cart'>
      {Available || Variant?.stock_status === 'instock' ? (
        <div className='container'>
          <Counter {...{ count, setcount }} />
          <button
            onClick={() => {
              addToCart(
                product?.id,
                count,
                Variant?.sku || product?.sku,
                Variant?.id
              );
              setShowCart(true);
            }}
          >
            Ajouter au panier
          </button>
        </div>
      ) : (
        <p className='not-available'>
          Produit en rupture, veuillez choisir une autre variante ou teinte
        </p>
      )}
    </div>
  );
};
