import { wc_json } from './wc_json';

const order = async (customer) => {
  let orders;
  if (customer) {
    try {
      orders = await wc_json(`v3/orders?customer=${customer}`).then(
        ({ data }) => data
      );
    } catch (error) {
      console.log(error?.message);
    }
  }
  return orders;
};

export { order };
