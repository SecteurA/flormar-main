import { category } from '../../utils/category';
import { product } from '../../utils/product';

const URL = 'https://flormar.ma';

const GetData = async () => {
  let products = [];
  let new_products = [];
  let page = 1;

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

  return { products, categorys };
};

function generateSiteMap({ products, categorys }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <url>
      <loc>${URL}</loc>
      <lastmod>2024-02-24</lastmod>
      <changefreq>yearly</changefreq>
      <priority>0.5</priority>
    </url>
    <url>
      <loc>${URL}/about-me</loc>
      <lastmod>2024-02-24</lastmod>
      <changefreq>yearly</changefreq>
      <priority>0.5</priority>
    </url>
    <url>
      <loc>${URL}/projects</loc>
      <lastmod>2024-02-24</lastmod>
      <changefreq>yearly</changefreq>
      <priority>0.5</priority>
    </url>
    <url>
      <loc>${URL}/technologies</loc>
      <lastmod>2024-02-24</lastmod>
      <changefreq>yearly</changefreq>
      <priority>0.5</priority>
    </url>
    <url>
      <loc>${URL}/tools</loc>
      <lastmod>2024-02-24</lastmod>
      <changefreq>yearly</changefreq>
      <priority>0.5</priority>
    </url>
    <url>
      <loc>${URL}/blog</loc>
      <lastmod>2024-02-24</lastmod>
      <changefreq>yearly</changefreq>
      <priority>0.5</priority>
    </url>
    ${categorys
      .map(({ slug, date, image }) => {
        return `
           <url>
                <loc>${`${URL}/product/${slug}`}</loc>
                ${
                  image
                    ? ` <image:image>
                <image:loc>
                ${image}
                </image:loc>
                </image:image>`
                    : ''
                }
               
                <lastmod>${date || new Date()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.5</priority>

           </url>
         `;
      })
      .join('')}
        
     ${products
       .map(({ slug, date, images }) => {
         return `
           <url>
                <loc>${`${URL}/product/${slug}`}</loc>
                ${
                  images?.length > 0
                    ? ` <image:image>
                <image:loc>
                ${images?.[0]}
                </image:loc>
                </image:image>`
                    : ''
                }
               
                <lastmod>${date || new Date()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.5</priority>

           </url>
         `;
       })
       .join('')}
      
   </urlset>
 `;
}

export async function GET() {
  const { categorys, products } = await GetData();
  const body = generateSiteMap({ products, categorys });

  return new Response(body, {
    status: 200,
    headers: {
      'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
      'content-type': 'application/xml',
    },
  });
}
