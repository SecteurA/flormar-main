import { wp_json_post } from '../../../utils/wp_json';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function POST(req, { params }) {
  const { username, email, phone, first_name, last_name, password } =
    await req.json();

  try {
    const user = await wp_json_post('wp/v2/users', {
      username,
      email,
      phone,
      first_name,
      last_name,
      password,
    }).then(({ data }) => {
      return data;
    });
    return Response.json(user);
  } catch (error) {
    // console.log(error);
    return Response.status(500).json({ error: error?.message });
  }
}
