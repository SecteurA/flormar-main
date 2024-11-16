import { category } from '../utils/category';
import { product } from '../utils/product';

export default async function sitemap() {
  let products = [];
  let new_products = [];
  let page = 1;
  let base_url = 'https://flormar.ma';

  do {
    new_products = [];
    new_products = await product({ page, params: {} }).catch((err) => null);
    if (new_products?.length > 0) products = [...products, ...new_products];
    page++;
    // console.log(page);
  } while (new_products?.length > 0);

  let categorys = [];
  let new_categorys = [];
  page = 1;
  do {
    new_categorys = [];
    new_categorys = await category({ page, params: {} }).catch((err) => null);
    if (new_categorys?.length > 0) categorys = [...categorys, ...new_categorys];
    page++;
    // console.log(page);
  } while (new_products?.length > 0);

  return [
    ...products?.map((p) => ({
      url: `${base_url}/product/${p?.slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    })),
    ...categorys?.map((c) => ({
      url: `${base_url}/categorie/${c?.slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    })),
  ];
}
