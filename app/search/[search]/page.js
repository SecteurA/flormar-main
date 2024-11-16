import React from 'react';
import dynamic from 'next/dynamic';
import Products from '../Products';
import { get_menu } from '../../../utils/get_menu';
import { wc_json } from '../../../utils/wc_json';
import FlexCategories from '../../../components/FlexCategories/FlexCategories';

dynamic;
async function Search({ params, searchParams }) {
  let categorys = params?.id
    ? await wc_json(
        `v3/products/categories?slug=${params?.sub_id || params?.id}`
      )
        .then(({ data }) => data)
        .catch((err) => {})
    : [];

  let subCategories =
    categorys?.length > 0
      ? await wc_json(`v3/products/categories?parent=${categorys[0]?.id}`)
          .then(({ data }) => data)
          .catch((err) => [])
      : [];

  const { categories, menu } = await get_menu();

  return (
    <main className='Search-Page'>
      <Products
        params={params}
        category={categorys?.length > 0 ? categorys?.[0] : {}}
        searchParams={searchParams}
        categories={categories}
        subCategories={subCategories}
      />
    </main>
  );
}

export default Search;
