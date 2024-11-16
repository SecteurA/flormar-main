const wc = {
  url: 'https://admin.flormar.ma/wp-json/wc/', // Your store URL
  consumerKey: 'ck_021b3d5a1a8ec96cdd4079042563d1c10c323373', // Your consumer key
  consumerSecret: 'cs_39ea16c4171474a5479f958a700a6d533ee2d313', // Your consumer secret
};

export const dynamic = 'force-dynamic'; // defaults to auto
const instance = (url, method = 'GET', data = {}) => {
  // console.log(wc.url + url)

  const options =
    method !== 'GET' ? { method, body: JSON.stringify(data) } : {};
  return fetch(wc.url + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(
        `${wc?.consumerKey}:${wc?.consumerSecret}`
      ).toString('base64')}`,
      next: { tags: [url] },
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return { data };
    });
};

const wc_json = (id) => {
  return instance(id);
};

const wc_json_post = (id, data) => {
  return instance(id, 'POST', data);
};

export { wc_json, wc_json_post };
