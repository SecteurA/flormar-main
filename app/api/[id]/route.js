import axios from 'axios';
const auth = Buffer.from(`idyahia:vbZs Ytbx alRy 1fOD RNik cFmJ`).toString(
  'base64'
);

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(req, { params }) {
  try {
    const response = await axios.get(
      'https://admin.flormar.ma/wp-json/wp/v2/' + params?.id,

      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
      }
    );

    // Retrieve detailed menu data
    const menus = response.data.map((menu) => ({
      id: menu.id,
      title: menu.title.rendered,
      url: menu.url,
      description: menu.description,
      object_id: menu.object_id,
      parent: menu.parent,
    }));

    return Response.json(menus);
  } catch (error) {
    console.log(error);
    return Response.status(500).json({ error: error.message });
  }
}
