import { updateProfile } from '../../../utils/profile';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function POST(req, { params }) {
  const {
    username,
    email,
    first_name,
    last_name,
    password,
    phone,
    address_1,
    city,
    zip,
    country,
    state,
    address2,
    postcode,
  } = await req.json();

  try {
    const user = await updateProfile({
      username,
      email,
      first_name,
      last_name,
      password,
      phone,
      address_1,
      city,
      zip,
      country,
      state,
      address2,
      postcode,
    }).then(({ data }) => {
      return data;
    });
    // console.log(user);
    return Response.json(user ? user : '');
  } catch (error) {
    return Response.json({ error: error?.message }, { status: 500 });
  }
}
