import { auth, wp_json_post } from '../../../utils/wp_json';

const base_url = 'https://admin.flormar.ma/wp-json/';

const instance = (url, method = 'GET', data = {}) => {
  const options =
    method !== 'GET' ? { method, body: JSON.stringify(data) } : {};

  return fetch(base_url + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
      next: { tags: [url] },
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return { data };
    });
};

export const dynamic = 'force-dynamic'; // defaults to auto
export async function POST(req, { params }) {
  const { username, email, phone, name, password } = await req.json();

  try {
    const user = await wp_json_post('wp/v2/users', {
      username,
      email,
      phone,
      name,
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
