import React from 'react';
import Product from '../../../components/Product/Product';
import { product } from '../../../utils/product';
import { wc_json } from '../../../utils/wc_json';
import { get_menu } from '../../../utils/get_menu';
import moment from 'moment';

export async function generateMetadata({ params }) {
  const products = await product({
    params: { slug: params?.id },
    per_page: 1,
    link: false,
  }).catch((err) => {});

  return {
    title: products?.[0]?.name || '',
    description: products?.[0]?.description || '',
    // canonical: `https://front.flormar.ma/product/${products?.[0]?.slug}`,
    canonical: `https://v2.flormar.ma/product/${products?.[0]?.slug}`,
    alternates: {
      // canonical: `https://front.flormar.ma/product/${products?.[0]?.slug}`,
      canonical: `https://v2.flormar.ma/product/${products?.[0]?.slug}`,
    },
    // metadataBase: new URL(`https://front.flormar.ma`),
    metadataBase: new URL(`https://v2.flormar.ma`),
    openGraph: {
      title: products?.[0]?.name || '',
      description: products?.[0]?.description || '',
      // url: `https://front.flormar.ma/product/${products?.[0]?.slug}`,
      url: `https://v2.flormar.ma/product/${products?.[0]?.slug}`,
      // siteName: 'front.flormar.ma',
      siteName: 'v2.flormar.ma',
      images: [
        {
          url: products?.[0]?.images?.[0], // Must be an absolute URL
          width: 800,
          height: 600,
        },
        {
          url: products?.[0]?.images?.[0], // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: 'Flormar — Flormar Maroc Official Web Site ',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      site: '@eMartiiin94',
      title: 'Title webtsite',
      description: 'this is the desciption',
      images: [
        {
          url: products?.[0]?.images?.[0], // Must be an absolute URL
          width: 800,
          height: 600,
        },
        {
          url: products?.[0]?.images?.[0], // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: 'Flormar — Flormar Maroc Official Web Site ',
        },
      ],
    },
  };
}

export const dynamic = 'force-dynamic'; // defaults to auto
async function ProductPage({ params, searchParams }) {
  const { categories } = await get_menu();

  const products = await product({
    params: { slug: params?.id },
    per_page: 1,
    link: true,
  }).catch((err) => {});
  console.log(products);
  let items = '';
  try {
    [...products?.[0]?.variations, ...[products?.[0]]]?.map((it, i) => {
      items += `${i == 0 ? '' : ','}${it?.sku}`;
    });
  } catch (error) {}
  // console.log({ items });

  const variations =
    products?.[0]?.variations?.length > 0
      ? await wc_json(
          `v3/products/${
            products?.[0]?.id
          }/variations/?per_page=100&link=${moment().format(
            'DD-MM-YYYY-hh-mm-ss'
          )}`
        ).then(({ data }) => {
          return data?.length > 0
            ? data?.map((v) => ({
                ...v,
                images: [v?.image?.src, ...v?.images],
                attributes: v?.attributes,
                sku: v?.sku,
                stock_status: v?.stock_status,
              }))
            : [];
        })
      : [];

  const sku =
    searchParams?.sku || (products?.[0]?.variations?.[0] || products?.[0])?.sku;

  if (products?.length > 0)
    return (
      <main>
        <Product
          product={{ ...products?.[0] }}
          variations={variations}
          // skus={skus}
          categories={categories}
          sku={sku}
        />
      </main>
    );
}

export default ProductPage;
