import React, { useState } from 'react';
import Icon from '../../components/Icon';

const SelectStore = ({ positions, setPosition, zoom, setZoom, position }) => {
  const [selected, setSelected] = useState('');

  return (
    <div className='SelectStore'>
      {positions

        ?.filter(
          (item, index) =>
            positions?.findIndex((p) => p?.city === item?.city) === index
        )
        ?.filter((p) => (position?.city ? p?.city === position?.city : true))
        ?.map((p, i) => (
          <div
            className={`item ${position?.city ? 'active' : ''}`}
            onClick={() => {
              setPosition((position) => ({
                lat: Number(p?.storelat || 0),
                lng: Number(p?.storelng || 0),
                name: p?.name,
                address: p?.storeAddress,
                city: position?.city ? '' : p?.city,
              }));
              setZoom(position?.city ? 6 : 10);
            }}
            key={i}
          >
            <div className='item'>
              <span>
                {p?.city} (
                {
                  positions?.filter((item, index) => p?.city === item?.city)
                    ?.length
                }
                )
              </span>
              {/* <Icon name={'close-cercle'} />
            <Icon name={'chevron-right'} /> */}
              <button>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        ))}

      {positions
        ?.filter((p) => (position?.city ? p?.city === position?.city : false))
        ?.map((p, i) => (
          <div
            className={`item  ${selected === p?.storetitle ? 'open' : 'close'}`}
            onClick={() =>
              setSelected(selected === p?.storetitle ? '' : p?.storetitle)
            }
            key={i}
          >
            <div className='item'>
              <span style={{ fontWeight: 'bold' }}>{p?.storetitle}</span>

              <button>
                <span></span>
                <span></span>
              </button>
            </div>
            <p>
              {p?.storeAddress}
              <br />
              {p?.city} / {p?.country} <br />
              T: {p?.storephone}
              <a
                style={{ margin: '10px 0' }}
                className='find-button'
                href={`https://www.google.com/maps/dir/?api=1&destination=${position?.lat},${position?.lng}`}
                target='_blank'
              >
                Instructions
              </a>
            </p>
          </div>
        ))}
    </div>
  );
};

export default SelectStore;
