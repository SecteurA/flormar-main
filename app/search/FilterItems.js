'use client';
import React, { useState } from 'react';
import Icon from '../../components/Icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FilterItems = ({
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
}) => {
  const [FiltersType, setFiltersType] = useState('');
  const pathname = usePathname();
  console.log(pathname);
  const isSearchPage = pathname.includes('search'); // Checks if 'search' is in the path

  return (
    <div className={`filter-mobile ${ShowFilter ? 'show' : ''}`}>
      <div className='top'>
        <h5>Filters</h5>
        <button onClick={() => setShowFilter(false)}>
          <Icon name={'close'} />
        </button>
      </div>

      {
        <>
          <form onSubmit={(e) => e.preventDefault()} className='rbfilter'>
            {/* Skin type */}
            <h6
              onClick={() =>
                setFiltersType((f) => (f === 'skin' ? '' : 'skin'))
              }
              className={`${FiltersType === 'skin' ? 'active' : ''}`}
            >
              Type de Peau
              <button type='button'>
                <span></span>
                <span></span>
              </button>
            </h6>
            {FiltersType === 'skin' &&
              skinType?.map((f, i) => (
                <div key={i} className='item'>
                  <input
                    type='checkbox'
                    checked={!!Filters?.[f?.name?.toLowerCase()]}
                    onChange={(e) =>
                      setFilters((fs) => ({
                        ...fs,
                        [f?.name?.toLowerCase()]: e.target.checked,
                      }))
                    }
                    id={f?.name?.toLowerCase()}
                  />
                  <span>
                    <label htmlFor={f?.name?.toLowerCase()}>
                      {f?.description?.toLowerCase()}
                    </label>
                  </span>
                </div>
              ))}

            {/* SPF */}
            <h6
              onClick={() => setFiltersType((f) => (f === 'spf' ? '' : 'spf'))}
              className={`${FiltersType === 'spf' ? 'active' : ''}`}
            >
              Spf
              <button type='button'>
                <span></span>
                <span></span>
              </button>
            </h6>
            {FiltersType === 'spf' &&
              spf?.map((f, i) => (
                <div key={i} className='item'>
                  <input
                    type='checkbox'
                    checked={!!Filters?.[f?.name?.toLowerCase()]}
                    onChange={(e) =>
                      setFilters((fs) => ({
                        ...fs,
                        [f?.name?.toLowerCase()]: e.target.checked,
                      }))
                    }
                    id={f?.name?.toLowerCase()}
                  />
                  <span>
                    <label htmlFor={f?.name?.toLowerCase()}>
                      {f?.name?.toLowerCase()}
                    </label>
                  </span>
                </div>
              ))}

            {/* Color */}
            <h6
              onClick={() =>
                setFiltersType((f) => (f === 'color' ? '' : 'color'))
              }
              className={`${FiltersType === 'color' ? 'active' : ''}`}
            >
              Couleur
              <button type='button'>
                <span></span>
                <span></span>
              </button>
            </h6>
            {FiltersType === 'color' &&
              colors?.map((f, i) => (
                <div key={i} className='item'>
                  <input
                    type='checkbox'
                    checked={!!Filters?.[f?.name]}
                    onChange={(e) =>
                      setFilters((fs) => ({
                        ...fs,
                        [f?.name]: e.target.checked,
                      }))
                    }
                    id={f?.name}
                  />
                  <span>
                    <label htmlFor={f?.name}>{f?.name}</label>
                  </span>
                </div>
              ))}

            {/* Tags */}
            <h6
              onClick={() =>
                setFiltersType((f) => (f === 'tags' ? '' : 'tags'))
              }
              className={`${FiltersType === 'tags' ? 'active' : ''}`}
            >
              Tags
              <button type='button'>
                <span></span>
                <span></span>
              </button>
            </h6>
            {FiltersType === 'tags' &&
              tags?.map((f, i) => (
                <div key={i} className='item'>
                  <input
                    type='checkbox'
                    checked={Filters?.[f?.id]}
                    onChange={(e) =>
                      setFilters((fs) => ({
                        ...fs,
                        [f?.id]: e.target.checked,
                      }))
                    }
                    id={f?.id}
                  />
                  <span>
                    <label htmlFor={f?.id}>{f?.name}</label>
                  </span>
                </div>
              ))}
            {isSearchPage ? null : (
              <h6
                onClick={() =>
                  setFiltersType((f) => (f === 'category' ? '' : 'category'))
                }
                className={`${FiltersType === 'category' ? 'active' : ''}`}
              >
                Catégories{' '}
                <button>
                  <span></span>
                  <span></span>
                </button>
              </h6>
            )}
            {FiltersType === 'category' &&
              // categories?.map((f, i) => (
              //   <Link
              //     href={`/categorie/${
              //       f?.parent !== 0
              //         ? categories?.find((c) => f?.parent === c?.id)?.slug +
              //           '/' +
              //           f?.slug
              //         : f?.slug
              //     }`}
              //     key={i}
              //     className='item'
              //   >
              //     <input
              //       type='checkbox'
              //       checked={category?.slug === f?.slug}
              //     />
              //     <span>
              //       <label htmlFor={f?.id}>{f?.name}</label>
              //     </span>
              //   </Link>
              // )

              currentSubCatOfCategory?.map((f, i) => (
                <Link
                  href={`/categorie/${
                    f?.parent !== 0
                      ? categories?.find((c) => f?.parent === c?.id)?.slug +
                        '/' +
                        f?.slug
                      : f?.slug
                  }`}
                  key={i}
                  className='item'
                >
                  <input type='checkbox' checked={category?.slug === f?.slug} />
                  <span>
                    <label htmlFor={f?.id}>{f?.name}</label>
                  </span>
                </Link>
              ))}

            {/* Price */}
            <h6
              onClick={() =>
                setFiltersType((f) => (f === 'prix' ? '' : 'prix'))
              }
              className={`${FiltersType === 'prix' ? 'active' : ''}`}
            >
              Prix
              <button type='button'>
                <span></span>
                <span></span>
              </button>
            </h6>
            {FiltersType === 'prix' &&
              prices?.map((p, i) => (
                <div key={i} className='item'>
                  <input
                    type='checkbox'
                    name='prix'
                    checked={Filters?.range === p?.range}
                    onChange={(e) =>
                      setFilters((fs) => ({
                        ...fs,
                        range: fs?.range === p?.range ? false : p?.range,
                      }))
                    }
                    id={p?.range}
                  />
                  <span>
                    <label htmlFor={p?.range}>{p?.label}</label>
                  </span>
                </div>
              ))}
          </form>
        </>
      }
    </div>
  );
};

export default FilterItems;
