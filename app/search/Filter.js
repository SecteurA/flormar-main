'use client';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import './Search.css';
import Icon from '../../components/Icon';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import PageLink from '../../components/PageLink/PageLink';
import Pagination from './Pagination';
import { Context } from '../ContextLayout';
import { useCart } from '../../hooks/useCart';
import FlexCategories from '../../components/FlexCategories/FlexCategories';
import FilterItems from './FilterItems';
import ProductFilter from './ProductFilter';
import { sort_by } from '../../utils/sort_by';

function Filter({
  category = {},
  products = [],
  tags = [],
  categories = [],
  subCategories = [],
  colors = [],
  spf = [],
  skinType = [],
}) {
  const prices = [
    { range: 'r1', min: 0, max: 50, label: '0 - 50 Dhs' },
    { range: 'r2', min: 50, max: 100, label: '50 - 100 Dhs' },
    { range: 'r3', min: 100, max: 200, label: '100 - 200 Dhs' },
    { range: 'r4', min: 200, max: null, label: '+ 200 Dhs' },
  ];

  const orders_by = [
    'Meilleures ventes',
    'Tri intelligent',
    'Nouveautés',
    'Prix ​​augmenté',
    'Prix ​​dégressif',
    'Les plus commentés',
    'Les plus favoris',
  ];

  const [ShowFilter, setShowFilter] = useState(false);
  const [Filters, setFilters] = useState({});
  const [ShowOrderBy, setShowOrderBy] = useState(false);
  const [OrderBy, setOrderBy] = useState('');
  const [Products, setProducts] = useState(products);
  const [Page, setPage] = useState(1);
  const router = useRouter();
  const { id, sub_id } = useParams();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  let links = [
    { route: '/', name: 'Accueil' },
    {
      route: `/categorie/${id}`,
      name: sub_id
        ? id?.replace(/-/g, ' ')
        : category?.name || 'Search Results',
    },
  ];

  // console.log({ l: links });
  if (sub_id) {
    links?.push({ name: decodeURIComponent(category?.name) });
  }

  //convert name to slug
  function convertToOriginal(input) {
    return input.replace(/-/g, ' ');
  }

  useEffect(() => {
    setPage(1); // Reset page to 1 whenever filters change

    // COLORS:
    // Get the selected colors from Filters
    const selectedColors = Object.keys(Filters).filter(
      (key) => Filters[key] && colors.some((color) => color?.name === key)
    );
    // SPF:
    const selectedSPFs = Object.keys(Filters).filter(
      (key) => Filters[key] && spf.some((attr) => attr?.name === key)
    );
    // Skin:
    const selectedSkin = Object.keys(Filters).filter(
      (key) => Filters[key] && skinType.some((attr) => attr?.name === key)
    );
    //PRICE
    // Get selected price range
    // const selectedPriceRange = prices.find((p) => Filters[p?.range]);
    const selectedPriceRange = prices.find((p) => p?.range === Filters?.range);

    //this code works v1
    const filteredProducts = products.filter((product) => {
      /*TAGS*/
      // Check if the product matches any selected tags
      const matchesTags = product?.tags?.some((tag) => Filters?.[tag?.id]);
      // console.log({ matchesTags });

      /*COLORS*/
      // Get the color attribute for the product
      const colorAttribute = product?.attributes?.find(
        (attr) => attr?.slug === 'pa_color'
      );
      // If the product has a color attribute, check if any of the selected colors match
      const matchesColors = colorAttribute?.options?.some((option) =>
        selectedColors.includes(convertToOriginal(option))
      );

      /*SPF*/
      const spfAttribute = product?.attributes?.find(
        (attr) => attr?.slug === 'pa_spf'
      );
      const matchesSPF = spfAttribute?.options?.some((name) =>
        selectedSPFs.includes(convertToOriginal(name))
      );

      /*SKIN TYPE*/
      const skinAttribute = product?.attributes?.find(
        (attr) => attr?.slug === 'pa_skin_type'
      );
      const matchesSKIN = skinAttribute?.options?.some((name) =>
        selectedSkin.includes(convertToOriginal(name))
      );

      /*PRICE*/
      //get price for each product
      const productPrice = parseFloat(product?.price); // Ensure the price is a number
      // Check price filter
      const matchesPrice =
        !selectedPriceRange ||
        (productPrice >= selectedPriceRange?.min &&
          (selectedPriceRange?.max === null ||
            productPrice <= selectedPriceRange?.max));

      // Check if only price filter is active
      const isPriceOnlyActive =
        selectedPriceRange &&
        !selectedColors?.length &&
        !selectedSPFs?.length &&
        !selectedSkin?.length;
      // If price is the only active filter, apply only price filtering
      if (isPriceOnlyActive) {
        return matchesPrice;
      }

      return (
        matchesPrice &&
        (matchesSPF || matchesTags || matchesColors || matchesSKIN)
      );
    });

    if (Object?.values(Filters)?.some((i) => i != false) === false) {
      //console.log('no filter');
      setProducts(products);
    } else if (Object?.values(Filters)?.some((i) => i != false) === true) {
      //console.log('filter active');
      setProducts(filteredProducts);
    }
    setShowFilter(false);

    console.log({
      filteredProducts,
      Filters,
      filter: Object?.values(Filters)?.some((i) => i != false)
        ? 'filter activated'
        : 'no filter',
    });
  }, [search, id, sub_id, Filters, products]);

  let currentCategory = categories?.find((c) => c?.slug === id)?.id;
  let currentSubCatOfCategory = [];
  if (currentCategory) {
    currentSubCatOfCategory = categories?.filter(
      (s) => s?.parent === currentCategory
    );
  }

  return (
    <div className='container'>
      <PageLink links={links} />
      <h1 className=''>
        {' '}
        {search ? 'Résultats de Recherche ' + search : category?.name}
      </h1>
      <FlexCategories
        categories={currentSubCatOfCategory?.map((c) => ({
          title: c?.name,
          img: { url: c?.image?.src || c?.image },
          slug: c?.slug,
        }))}
        route={links?.[1]?.route}
      />
      <div className='container flex' style={{ margin: 0 }}>
        <FilterItems
          {...{
            setFilters,
            setShowFilter,
            Filters,
            tags,
            spf,
            categories,
            skinType,
            ShowFilter,
            colors,
            prices,
            currentSubCatOfCategory,
            category,
          }}
        />
        <div className='Search-container' id='flormar_search_container'>
          <div className='flex'>
            <button className='show-filter' onClick={() => setShowFilter(true)}>
              Filtre <Icon name={'chevron-down'} />
            </button>
            <div className='show-filter show-order'>
              <button onClick={() => setShowOrderBy((o) => !o)}>
                {OrderBy || ' Trier par'}
                <Icon name={'chevron-down'} />
              </button>
              {ShowOrderBy && (
                <>
                  <div
                    onClick={() => setShowOrderBy(false)}
                    className='overlay'
                  ></div>
                  <ul>
                    {orders_by?.map((o) => (
                      <li
                        key={o}
                        className={o === OrderBy ? 'active' : ''}
                        onClick={() => {
                          setOrderBy(o);
                          setShowOrderBy(false);
                        }}
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <p>Afficher les {Products?.length} résultats</p>
          </div>
          <div className='delete-butons'>
            {tags
              ?.filter((f) => Filters?.[f?.id])
              ?.map((f, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setFilters((fs) => ({ ...fs, [f?.id]: false }))
                  }
                  style={{ textTransform: 'capitalize' }}
                >
                  {f?.name} <Icon name={'close'} />
                </button>
              ))}
            {spf
              ?.filter((f) => Filters?.[f?.name])
              ?.map((f, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setFilters((fs) => ({ ...fs, [f?.name]: false }))
                  }
                  style={{ textTransform: 'capitalize' }}
                >
                  {f?.name} <Icon name={'close'} />
                </button>
              ))}
            {colors
              ?.filter((f) => Filters?.[f?.name])
              ?.map((f, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setFilters((fs) => ({ ...fs, [f?.name]: false }))
                  }
                  style={{ textTransform: 'capitalize' }}
                >
                  {f?.name} <Icon name={'close'} />
                </button>
              ))}
            {skinType
              ?.filter((f) => Filters?.[f?.name])
              ?.map((f, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setFilters((fs) => ({ ...fs, [f?.name]: false }))
                  }
                  style={{ textTransform: 'capitalize' }}
                >
                  {f?.name} <Icon name={'close'} />
                </button>
              ))}
            {prices
              ?.filter((f) => f?.range === Filters?.range)
              ?.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setFilters((fs) => ({ ...fs, range: false }))}
                >
                  {f?.label} <Icon name={'close'} />
                </button>
              ))}
            {Object?.values(Filters)?.some((i) => i != false) === true && (
              <button type='button' onClick={() => setFilters({})}>
                Effacer tous les filtres
              </button>
            )}
          </div>
          <div className='Products' style={{ paddingTop: '30px' }}>
            {sort_by(OrderBy, Products)
              ?.slice((Page - 1) * 12, Page * 12)
              ?.map((product, i) => (
                <ProductFilter key={i} {...{ product }} />
              ))}
            {Products && Products?.length === 0 && (
              <div className='not-found'>
                <img src='/file.svg' height={30} />
                <p>
                  Aucun produit correspondant à votre sélection n'a été trouvé.
                </p>
              </div>
            )}

            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div key={i} className='Product' />
              ))}
          </div>
        </div>
      </div>
      <Pagination {...{ Page, setPage, products: Products }} />
    </div>
  );
}

export default Filter;
