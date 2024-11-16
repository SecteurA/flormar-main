import React from 'react';
import CheckOut from './CheckOut';
import { wc_json } from '../../utils/wc_json';
import { profile } from '../../utils/profile';

async function page() {
  const user = await profile();
  const data = await wc_json(`v2/payment_gateways`).then(({ data }) => {
    return data?.map((d) => {
      const { id, title, description, enabled } = d;
      return { id, title, description, enabled };
    });
  });
  // console.log(user);

  return (
    <main>
      <CheckOut payment_method={data} user={user} />
    </main>
  );
}

export default page;
