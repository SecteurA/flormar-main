// Sort by Best Sellers
function sortByBestSellers(products) {
  return products?.sort((a, b) => b?.sales - a?.sales);
}

// Sort by Smart Sort (custom logic, e?.g?., a combination of factors)
function sortBySmartSort(products) {
  return products?.sort(
    (a, b) =>
      b?.sales +
      b?.comments +
      b?.favorites -
      (a?.sales + a?.comments + a?.favorites)
  );
}

// Sort by New Arrivals
function sortByNewArrivals(products) {
  return products?.sort(
    (a, b) => new Date(b?.date_created) - new Date(a?.date_created)
  );
}

// Sort by Price Ascending
function sortByPriceAscending(products) {
  return products?.sort((a, b) => a?.price - b?.price);
}

// Sort by Price Descending
function sortByPriceDescending(products) {
  return products?.sort((a, b) => b?.price - a?.price);
}

// Sort by Most Commented
function sortByMostCommented(products) {
  return products?.sort((a, b) => b?.comments - a?.comments);
}

// Sort by Most Favorited
function sortByMostFavorited(products) {
  return products?.sort((a, b) => b?.favorites - a?.favorites);
}

// Sort by Random
function sortByRandom(products) {
  return products.sort(() => Math.random() - 0.5);
}

const sort_by = (criterion, products) => {
  let sortedProducts;
  switch (criterion) {
    case 'Meilleures ventes':
      sortedProducts = sortByBestSellers(products);
      break;
    case 'Tri intelligent':
      sortedProducts = sortByRandom(products);
      break;
    case 'Nouveautés':
      sortedProducts = sortByNewArrivals(products);
      break;
    case 'Prix ​​augmenté':
      sortedProducts = sortByPriceAscending(products);
      break;
    case 'Prix ​​dégressif':
      sortedProducts = sortByPriceDescending(products);
      break;
    case 'Les plus commentés':
      sortedProducts = sortByMostCommented(products);
      break;
    case 'Les plus favoris':
      sortedProducts = sortByMostFavorited(products);
      break;
    default:
      sortedProducts = products;
  }

  console.log(sortedProducts);

  return sortedProducts;
};

export { sort_by };
