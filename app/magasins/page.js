'use client';
import React, { useState } from 'react';
import Maps from './Maps/Maps';
import SelectStore from './SelectStore';
import MapFilter from './Maps/MapFilter';
import './page.css';
import { wp_json } from '../../utils/wp_json';
import positions from './positions.json';
import ReactSelect from 'react-select';
import { useForm } from 'react-hook-form';
import Icon from '../../components/Icon';

const page = () => {
  //   let positions = await wp_json('acf/v3/stores?per_page=1000').then((data) => {
  //     // if (data?.length > 0) return data[0]?.acf;
  //     return data?.map((item) => item?.acf);
  //     //   ?.filter((item) =>
  //     //     item?.storeAddress?.toLowerCase()?.includes('morocco')
  //     //   );
  //   });
  //   //   console.log(positions);
  const [position, setPosition] = useState({ lat: 34, lng: -6 });
  const [zoom, setZoom] = useState(6);
  const { handleSubmit, setValue } = useForm();

  return (
    <div className='container page Magadins'>
      <h1>Magasins</h1>
      <form
        onSubmit={handleSubmit(({ position }) => {
          if (position?.storelat) {
            setPosition({
              lat: Number(position?.storelat || 0),
              lng: Number(position?.storelng || 0),
              name: '',
              address: position?.storeAddress,
              city: position?.city,
            });
            setZoom(10);
          }
        })}
        className='flex-filter'
      >
        <ReactSelect
          className='Select'
          value={{ value: 'MAROC', label: 'MAROC' }}
          options={[{ value: 'MAROC', label: 'MAROC' }]}
        />
        <ReactSelect
          className='Select'
          // value={selectedOption}
          // onChange={this.handleChange}
          onChange={({ value }) => setValue('position', value)}
          options={positions
            ?.filter(
              (item, index) =>
                positions?.findIndex((p) => p?.city === item?.city) === index
            )
            ?.map((p, i) => ({ value: p, label: p?.city }))}
        />

        <button className='find-button'>TROUVER UN MAGASIN</button>
      </form>
      <div className='flex-maps'>
        <SelectStore {...{ positions, position, setPosition, zoom, setZoom }} />
        <Maps {...{ positions, position, setPosition, zoom, setZoom }} />
      </div>

      {/* <MapFilter
        locations={positions?.map((p) => ({
          ...p,
          lat: Number(p?.storelat || 0),
          lng: Number(p?.storelng || 0),
        }))}
      /> */}
    </div>
  );
};

export default page;
