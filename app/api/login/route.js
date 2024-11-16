import { wp_json_post } from '../../../utils/wp_json';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function POST(req, { params }) {
  const { username, email, phone, name, password } = await req.json();

  try {
    const user = await wp_json_post('jwt-auth/v1/token', {
      username,
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
