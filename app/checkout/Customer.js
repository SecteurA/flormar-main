import React from 'react';
import { citys } from '../../utils/citys';

function Customer({ register, handleSubmit, setSelected, errors, setValue }) {
  return (
    <div>
      <h3>Informations client</h3>
      <form
        action=''
        id='customer'
        onSubmit={handleSubmit(() => setSelected(1))}
      >
        <div className='input-container'>
          <label htmlFor=''>Prénom</label>
          <input
            type='text'
            {...register('billing.first_name', { required: true })}
            className={errors?.billing?.first_name ? 'err' : ''}
            placeholder='Prénom'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Nom</label>
          <input
            type='text'
            {...register('billing.last_name', { required: true })}
            className={errors?.billing?.last_name ? 'err' : ''}
            placeholder='Nom'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>ADRESSE</label>
          <textarea
            rows={5}
            {...register('billing.address_1', { required: true })}
            className={errors?.billing?.address_1 ? 'err' : ''}
            type='text'
            placeholder='ADRESSE'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Email</label>
          <input
            type='text'
            {...register('billing.email', { required: true })}
            className={errors?.billing?.email ? 'err' : ''}
            placeholder='Email'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Ville</label>

          <select
            {...register('billing.city', { required: true })}
            className={errors?.billing?.city ? 'err' : ''}
          >
            {citys?.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className='input-container'>
          <label htmlFor=''>CODE POSTAL</label>
          <input
            type='number'
            {...register('billing.postcode', { required: true })}
            className={errors?.billing?.postcode ? 'err' : ''}
            placeholder='CODE POSTAL'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>TÉLÉPHONE</label>
          <input
            type='text'
            {...register('billing.phone', { required: true })}
            className={errors?.billing?.phone ? 'err' : ''}
            placeholder='TÉLÉPHONE'
          />
        </div>
      </form>
    </div>
  );
}

export default Customer;
