import { profile } from '../../../utils/profile';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(req, { params }) {
  const token = req.nextUrl.searchParams.get('token');

  try {
    const user = await profile({ value: token });
    // console.log(user);
    return Response.json(user ? user : '');
  } catch (error) {
    return Response.json({ error: error?.message }, { status: 500 });
  }
}
