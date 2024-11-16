import { product } from '../../../utils/product';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(req, { params }) {
  const url = new URL(req?.url);

  try {
    const Product = await product({
      page: 1,
      params: { include: url?.searchParams?.get('include') },
    }).catch((err) => {});
    return Response.json(Product);
  } catch (error) {
    console.log(error);
    return Response.status(500).json({ error: error.message });
  }
}
