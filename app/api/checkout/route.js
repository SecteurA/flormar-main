import { cookies } from 'next/headers';
import { wc_json, wc_json_post } from '../../../utils/wc_json';
import { profile } from '../../../utils/profile';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function POST(req, { params }) {
  let data = {
    payment_method: 'bacs',
    payment_method_title: 'Direct Bank Transfer',
    set_paid: true,
    billing: {
      first_name: 'John',
      last_name: 'Doe',
      address_1: '123 Main St',
      city: 'Cityville',
      state: 'State',
      postcode: '12345',
      country: 'US',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    },
    shipping: {
      first_name: 'John',
      last_name: 'Doe',
      address_1: '123 Main St',
      city: 'Cityville',
      state: 'State',
      postcode: '12345',
      country: 'US',
    },
    line_items: [
      {
        product_id: 123, // Replace with your product ID
        quantity: 2,
      },
    ],
    shipping_lines: [
      {
        method_id: 'flat_rate',
        method_title: 'Flat Rate',
        total: '10.00',
      },
    ],
  };
  let user = {};
  const token = cookies().get('token');
  if (token?.value) user = await profile();

  const app_data = await req.json();

  // console.log(app_data?.coupon_lines?.code);
  let shipping_total = 0;
  switch (data?.shipping_total) {
    case 'CASABLANCA':
      shipping_total = 20;
      break;
    case 'BOUSKOURA':
      shipping_total = 25;
      break;
    case 'DAR BOUAZZA':
      shipping_total = 25;
      break;
    default:
      shipping_total = 30;
  }

  try {
    const coupon_lines = app_data?.coupon_lines?.code
      ? [{ code: app_data?.coupon_lines?.code }]
      : [];
    const checkout = await wc_json_post('v3/orders', {
      ...app_data,
      customer_id: user?.id,
      shipping_total,
      total: 0,
      coupon_lines,
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return Response.json(checkout);
  } catch (error) {
    console.log(error);
    return Response.status(500).json({ error: 'error.message' });
  }
}
