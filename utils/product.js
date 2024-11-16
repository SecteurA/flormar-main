import dynamic from 'next/dynamic';
import { wc_json } from './wc_json';
import moment from 'moment';

const product = async ({
  page = 1,
  params = {},
  per_page = 100,
  link = false,
}) => {
  let params_string = '';
  Object.keys(params).map((key) => (params_string += `&${key}=${params[key]}`));

  return await wc_json(
    `v3/products?page=${page}&per_page=${per_page}&status=publish&${params_string}&link=${
      link ? moment().format('DD-MM-YYYY-hh-mm-ss') : ''
    }`
  ).then(({ data }) => {
    try {
      return data.map((product) => ({
        id: product?.id,
        name: product?.name,
        sku: product?.sku,
        date_created: product?.date_created,
        slug: product?.slug,
        price_html: product?.price_html,
        description: product?.description,
        price: product?.price,
        images: product?.images?.map((image) => image?.src),
        categories: product?.categories?.map((category) => category?.name),
        categoriesWithId: product?.categories?.map((category) => ({
          id: category?.id,
          name: category?.name,
        })),
        related_ids: product?.related_ids,
        tags: product?.tags,
        acf: product?.acf,
        color_hex: product?.color_hex,
        short_description: product?.short_description,
        stock_status: product?.stock_status,
        type: product?.type,
        x: 'rabi',
        swatch_main_prod: product?.attributes?.filter(
          (a) => a?.slug === 'pa_swatches'
        )?.[0]?.options?.[0],
        orderOfProd: 1,
        variations:
          product?.variations?.length > 0
            ? [
                ...product?.variations?.map((v) => ({
                  // images: [
                  //   ...(v?.image || [])?.map((im) => im?.src),
                  //   ...(v?.downloads || [])?.map((im) => im?.file),
                  // ],
                  images: v?.images,
                  attributes: v?.attributes,
                  sku: v?.sku,
                  color_hex: v?.color_hex,
                  stock_status: v?.stock_status,
                  main_image: v?.main_image,
                  name: v?.name,
                  type: v?.type,
                })),
              ]
            : [],
        attributes: product?.attributes?.map((attribute) => ({
          name: attribute?.name,
          slug: attribute?.slug,
          options: attribute?.options,
        })),
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  });
};

export { product };
