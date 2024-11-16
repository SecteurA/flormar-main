import React, { Suspense } from 'react';
import { wc_json } from '../../utils/wc_json';
import Filter from './Filter';
import { product } from '../../utils/product';
import { get_menu } from '../../utils/get_menu';

async function Products({
  category,
  params,
  searchParams,
  categories,
  subCategories,
}) {
  let obj = {};
  if (!searchParams?.search && !searchParams?.tag) {
    obj = { category: category?.id, page: searchParams?.page || 1 };
  } else if (searchParams?.search) {
    obj = { search: searchParams?.search, page: searchParams?.page || 1 };
  } else {
    obj = { tag: searchParams?.tag, page: searchParams?.page || 1 };
  }

  const products = await product({
    params: obj,
    // searchParams?.search
    //   ? { search: searchParams?.search, page: searchParams?.page || 1 }
    //   : { category: category?.id, page: searchParams?.page || 1 },
  });
  const { tags } = await get_menu();

  const colors = await wc_json(`v3/products/attributes/5/terms?per_page=100`)
    .then(({ data }) => {
      return data.map(({ name, id, slug, description }) => ({
        id,
        name,
        slug,
        description,
      }));
    })
    .catch((err) => {});
  const spf = await wc_json(`v3/products/attributes/7/terms`)
    .then(({ data }) => {
      return data.map(({ name, id, slug }) => ({
        id,
        name,
        slug,
      }));
    })
    .catch((err) => {});
  const skinType = await wc_json(`v3/products/attributes/8/terms`)
    .then(({ data }) => {
      return data.map(({ name, id, slug, description }) => ({
        id,
        name,
        slug,
        description,
      }));
    })
    .catch((err) => {});

  return (
    <Suspense>
      <Filter
        category={category}
        products={products}
        categories={categories}
        subCategories={subCategories}
        tags={tags?.filter((t) => t?.description !== 'hide')}
        colors={colors}
        spf={spf}
        skinType={skinType}
      />
    </Suspense>
  );
}

export default Products;
