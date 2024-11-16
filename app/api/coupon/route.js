import { wc_json, wc_json_post } from '../../../utils/wc_json';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(req, { params, searchParams }) {
  try {
    const code_coppon = req.nextUrl.searchParams.get('code')?.trim();
    if (code_coppon) {
      const coupon = await wc_json(`v3/coupons?code=${code_coppon}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      const {
        id,
        code,
        amount,
        status,
        discount_type,
        usage_count,
        individual_use,
        excluded_product_ids,
        product_categories,
        excluded_product_categories,
        exclude_sale_items,
        minimum_amount,
        maximum_amount,
        date_expires,
      } = coupon[0];

      return Response.json({
        id,
        code,
        amount,
        date_expires,
        discount_type,
        minimum_amount,
      });
    }

    return Response.json({ amount: 0 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'error.message' }, { status: 500 });
  }
}
