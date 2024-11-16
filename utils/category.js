import { wc_json } from './wc_json';

const category = ({ page, params = {} }) => {
  let params_string = '';
  Object.keys(params).map((key) => (params_string += `&${key}=${params?.key}`));
  return wc_json(
    `v2/products/categories?page=${page}&per_page=100&${params_string}`
  ).then(({ data }) =>
    data.map((category) => ({
      id: category?.id,
      name: category?.name,
      slug: category?.slug,
      description: category?.description,
      price: category?.price,
      image: category?.image?.src,
    }))
  );
};

export { category };
