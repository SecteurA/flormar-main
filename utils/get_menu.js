import { wc_json } from './wc_json';
import { wp_json } from './wp_json';

const get_menu = async () => {
  let menu = [];

  const tags = await wc_json('v3/products/tags?per_page=100')
    .then(({ data }) =>
      data.map((category) => ({
        id: category?.id,
        name: category?.name,
        slug: category?.slug,
        description: category?.description,
        show: category?.show,
      }))
    )
    .catch((err) => {});

  const categories = await wc_json('v3/products/categories?per_page=100')
    .then(({ data }) =>
      data.map((category) => ({
        id: category?.id,
        name: category?.name,
        slug: category?.slug,
        description: category?.description,
        price: category?.price,
        image: category?.image?.src,
        parent: category?.parent,
      }))
    )
    .catch((err) => {});

  await wp_json('wp/v2/menu-items').then((d) => {
    d?.map((menu) => ({
      id: menu.id,
      title: menu.title.rendered,
      url: menu.url,
      description: menu.description,
      object_id: menu.object_id,
      parent: menu.parent,
    }))
      ?.map((item) => {
        let category =
          categories?.find((c) => item?.url?.includes(c?.slug)) || {};
        let new_item = { ...category, ...item };
        if (item?.parent === 0) {
          menu.push(new_item);
        }
        return new_item;
      })
      ?.map((item) => {
        const index = menu.findIndex((it) => it?.id === item?.parent);

        if (index >= 0 && menu[index].children) menu[index].children.push(item);
        else if (menu[index]) {
          menu[index].children = [];
          menu[index].children.push(item);
        }
      });
  });

  return { menu, categories, tags };
};

export { get_menu };
