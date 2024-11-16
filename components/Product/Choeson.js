import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chosen from '../Chosen/Chosen';

function Choeson({ items = [], title }) {
  const [Products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    if (items?.length > 0) {
      setLoading(true);
      axios
        .get(`/api/product?include=${items.join(',')}`)
        .then(({ data }) => {
          setProducts(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else setProducts([]);
  }, [items]);

  return <Chosen loading={Loading} title={title} products={Products || []} />;
}

export default Choeson;
