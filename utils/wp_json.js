export const auth = Buffer.from(
  `idyahia:vbZs Ytbx alRy 1fOD RNik cFmJ`
).toString('base64');

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

export async function wp_json(url = 'url') {
  try {
    const response = await instance(url);

    return response.data;
  } catch (error) {
    // console.log(error);
  }
}

export async function wp_json_post(id, data) {
  const response = await instance(id, 'POST', data);
  return response;
}
