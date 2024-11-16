'use client';
import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SearchHeader({ categories = [] }) {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [rand] = useState(Math.floor(categories?.length * Math.random()));
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const { handleSubmit, register } = useForm({ values: { search } });

  useEffect(() => {
    setLoading(false);
  }, [search]);

  return (
    <form
      onSubmit={handleSubmit(({ search }) => {
        setLoading(true);
        router.push(`/search?search=${search}`);
      })}
    >
      <input
        type='text'
        placeholder='Rechercher à Flormar'
        {...register('search', { required: true })}
      />
      <div className='buttons'>
        {categories?.length > 0 && (
          <>
            <Link href={`/categorie/${categories[rand]?.slug}`} type='button'>
              {categories[rand]?.name}
            </Link>
            <Link
              href={`/categorie/${categories[rand + 1]?.slug}`}
              type='button'
            >
              {categories[rand + 1]?.name}
            </Link>
          </>
        )}
        <button>
          {!Loading ? (
            <Icon name={'search'} />
          ) : (
            <svg
              width={24}
              height={24}
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                className='spinner_hzlK'
                x={1}
                y={1}
                width={6}
                height={22}
              />
              <rect
                className='spinner_hzlK spinner_koGT'
                x={9}
                y={1}
                width={6}
                height={22}
              />
              <rect
                className='spinner_hzlK spinner_YF1u'
                x={17}
                y={1}
                width={6}
                height={22}
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}

export default SearchHeader;
