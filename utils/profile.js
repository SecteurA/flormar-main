import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { wp_json_post } from './wp_json';

dynamic;
const profile = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  let user;
  if (token?.value) {
    try {
      user = await fetch(
        'https://admin.flormar.ma/wp-json/wp/v2/users/me',

        {
          method: 'POST',
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.value}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const meta = data?.meta?.persisted_preferences?.[0] || {};

          const { username, name, first_name, last_name, email, id } = data;

          return {
            ...meta,
            username,
            name,
            first_name,
            last_name,
            email,
            id,
          };
        });
    } catch (error) {
      console.log(error?.message);
    }
  }
  return user;
};

dynamic;
const updateProfile = (data) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    address_1,
    city,
    zip,
    country,
    state,
    address2,
    postcode,
  } = data;
  const updateData = {
    first_name,
    last_name,
    phone,
    address_1,
    city,
    zip,
    country,
    state,
    address2,
    meta: {
      persisted_preferences: [
        {
          first_name: first_name,
          last_name: last_name,
          address_1: address_1,
          city: city,
          postcode: zip,
          country: country,
          state: state,
          phone: phone,
          email: email,
          postcode,
        },
      ],
    },
  };

  const cookieStore = cookies();
  const token = cookieStore.get('token');

  return fetch(
    'https://admin.flormar.ma/wp-json/wp/v2/users/me',

    {
      method: 'POST',
      body: JSON.stringify(updateData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    }
  ).then((data) => {
    return data;
  });
};

dynamic;
const updatePassword = async (data) => {
  const { newPassword } = data;
  const { id, username } = await profile();

  const updateData = { password: newPassword, username };

  return wp_json_post(`wp/v2/users/${id}`, updateData).then((data) => {
    return data;
  });
};

export { profile, updateProfile, updatePassword };
