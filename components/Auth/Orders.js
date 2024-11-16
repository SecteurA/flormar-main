import React from 'react';
import './Auth.css';
import './Orders.css';
import { profile } from '../../utils/profile';
import { order } from '../../utils/order';
import Navigation from './Navigation/Navigation';

async function Orders() {
  const user = await profile();
  // console.log({ user });
  let orders_list;
  if (user?.id) {
    orders_list = await order(user?.id);
  } else return <div> </div>;

  return (
    <>
      <Navigation id={1} />
      <div className='Flex-Auth container'>
        <div className='Login Order'>
          <h3>Orders</h3>
        </div>
      </div>
      <div className='container'>
        <ul className='responsive-table'>
          <li className='table-header'>
            <div className='col col-1'>Id</div>
            <div className='col col-2'>Payment</div>
            <div className='col col-3'>Total</div>
            <div className='col col-4'>Status</div>
            {/* <div className='col col-4'>Payment Url</div> */}
          </li>
          {orders_list?.map((item, i) => (
            <li className='table-row' key={i}>
              <div className='col col-1' data-label='Id'>
                {item?.id}
              </div>
              <div className='col col-2' data-label='Payment'>
                {item?.payment_method_title}
              </div>
              <div className='col col-3' data-label='Total'>
                {item?.total} dh
              </div>

              <div className='col col-4' data-label='Status'>
                {item?.status}
              </div>
              {/* <div className='col col-4' data-label='Payment Url'>
                <Link href={item?.payment_url}>Pay</Link>
              </div> */}
            </li>
          ))}

          {orders_list?.length <= 0 && (
            <p>Vous n'avez pas de commandes passées dans ce restaurant</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default Orders;
