import React from 'react';
import { generateHash } from '../../../utils/hash';
import { wc_json } from '../../../utils/wc_json';
import GoTo from './GoTo';

async function page({ params }) {
  const order = await wc_json(`v3/orders/${params?.id}`)?.then(
    ({ data }) => data
  );

  // console.log(order);

  const data = {
    clientid: '600001600',
    oid: order?.id,
    shopurl: 'https://flormar.ma',
    // okUrl: 'https://front.flormar.ma/success',
    // failUrl: 'https://front.flormar.ma/',
    okUrl: 'https://v2.flormar.ma/success',
    failUrl: 'https://v2.flormar.ma/',
    email: order?.billing?.email,
    BillToName: `${order?.billing?.first_name} ${order?.billing?.last_name}`,
    BillToCompany: 'company name',
    BillToStreet1: order?.billing?.address_1,
    BillToCity: order?.billing?.city,
    BillToCountry: order?.billing?.country,
    BillToTelVoice: order?.billing?.phone,
    amount: order?.total,
    CallbackURL: 'https://admin.flormar.ma/?wc-api=WC_Gateway_cmi',
    storetype: '3D_PAY_HOSTING',
    trantype: 'PreAuth',
    currency: '504', // MAD
    rnd: Date.now().toString(),
    lang: 'fr',
    hashAlgorithm: 'ver3',
    encoding: 'UTF-8', // OPTIONAL
    refreshtime: '5', // OPTIONAL
    address: order?.billing?.address_1,
  };

  const url = 'https://payment.cmi.co.ma/fim/est3Dgate';

  var payload = {
    Hash: generateHash('Bc_a20200', data),
    ...data,
  };

  return (
    <div>
      <form
        id='redirectpost'
        method='post'
        action={url}
        style={{ cursor: 'wait' }}
      >
        {Object.keys(payload).map((key) => (
          <input hidden key={key} name={key} value={payload[key]} readOnly />
        ))}

        <div className='not-found-page page-pay' style={{ height: 400 }}>
          <img
            src='https://www.cmi.co.ma/sites/default/files/ecommerce2.png'
            alt=''
            style={{ height: 400, objectFit: 'contain', position: 'relative' }}
          />
          <div className='container'>
            <h2>
              Merci pour votre commande. vous serez redirigé vers CMI pour
              effectuer le paiement.
            </h2>
            <button>Continue</button>
          </div>
        </div>
      </form>
      <GoTo />
    </div>
  );
}

export default page;
