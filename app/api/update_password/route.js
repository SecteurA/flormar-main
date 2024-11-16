import { updatePassword, updateProfile } from '../../../utils/profile';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function POST(req, { params }) {
  const { newPassword, password } = await req.json();

  try {
    const user = await updatePassword({
      newPassword,
      password,
    }).then(({ data }) => {
      return data;
    });
    // console.log(user);
    return Response.json(user ? user : '');
  } catch (error) {
    return Response.json({ error: error?.message }, { status: 500 });
  }
}
