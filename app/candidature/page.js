'use client';
import React, { useEffect, useState } from 'react';
import './page.css';
import Link from 'next/link';
import Icon from '../../components/Icon';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const page = () => {
  const [step, setStep] = useState();
  const [files, setFiles] = useState([]);
  const { handleSubmit, register, watch, setValue } = useForm({});

  function getBase64(file, index) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setFiles((fs) => {
        let files = [...fs];
        files[index] = { name: file?.name, data: reader.result };
        return files;
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleUploadedFile = (event, index = 0) => {
    const file = event.target.files[0];
    event.target.innerHtml = 'hhhh';
    getBase64(file, index);
  };

  const send = (data) => {
    setStep(1);
    axios
      .post('/api/mail', { subject: 'Rejoignez notre équipe', data, files })
      .then((d) => {
        setStep(2);
      })
      .catch((err) => {
        setStep(3);
        console.log(err);
      });
  };

  return (
    <div className='container page'>
      <div className='formbold-main-wrapper'>
        <h1>Rejoignez notre équipe !</h1>
        <p>
          Chez <Link href={'/'}>Flormar</Link>, nous croyons que chaque talent
          mérite une chance. Si vous souhaitez faire partie de notre aventure et
          contribuer à l’univers de la beauté avec{' '}
          <Link href={'/'}>Flormar</Link>, nous vous invitons à soumettre votre
          candidature spontanée. Remplissez le formulaire ci-dessous pour nous
          faire part de votre parcours et de vos aspirations. Nous avons hâte de
          découvrir votre potentiel !
        </p>
        <div className='formbold-form-wrapper'>
          <form onSubmit={handleSubmit(send)}>
            <div className='formbold-input-flex'>
              <div>
                <label htmlFor='nom' className='formbold-form-label'>
                  {' '}
                  Nom*{' '}
                </label>
                <input
                  type='text'
                  required
                  {...register('nom')}
                  id='nom'
                  placeholder='Votre Nom'
                  className='formbold-form-input'
                />
              </div>
              <div>
                <label htmlFor='prénom' className='formbold-form-label'>
                  {' '}
                  Prénom*{' '}
                </label>
                <input
                  type='text'
                  required
                  {...register('prénom')}
                  id='prénom'
                  placeholder='Votre Prénom'
                  className='formbold-form-input'
                />
              </div>
            </div>
            <div className='formbold-input-flex'>
              <div>
                <label htmlFor='email' className='formbold-form-label'>
                  {' '}
                  Email*{' '}
                </label>
                <input
                  type='email'
                  required
                  {...register('email')}
                  id='email'
                  placeholder='example@email.com'
                  className='formbold-form-input'
                />
              </div>
              <div>
                <label className='formbold-form-label'>Genre*</label>
                <select
                  className='formbold-form-input'
                  required
                  {...register('genre')}
                  id='genre'
                >
                  <option value='Mâle'>mâle</option>
                  <option value='femelle'>Femelle</option>
                </select>
              </div>
            </div>
            <div className='formbold-mb-3 formbold-input-wrapp'>
              <label htmlFor='phone' className='formbold-form-label'>
                Téléphone*{' '}
              </label>
              <div>
                <input
                  type='text'
                  required
                  {...register('téléphone')}
                  id='téléphone'
                  placeholder='Téléphone'
                  className='formbold-form-input'
                />
              </div>
            </div>
            <div className='formbold-mb-3'>
              <label htmlFor='message' className='formbold-form-label'>
                Remarque
              </label>
              <textarea
                rows={6}
                {...register('message')}
                placeholder='...'
                id='message'
                className='formbold-form-input'
                defaultValue={''}
              />
            </div>
            <div className='formbold-mb-3 formbold-input-wrapp'>
              <div className='formbold-input-flex'>
                <div>
                  <label htmlFor='upload' className='formbold-form-label'>
                    CV*
                  </label>
                  <div className='Upload'>
                    <input
                      type='file'
                      name='upload'
                      id='upload-1'
                      required
                      className='formbold-form-file'
                      onChange={(e) => handleUploadedFile(e, 0)}
                    />
                    <button
                      className='formbold-btn'
                      type='button'
                      id='upload-btn'
                    >
                      <span>
                        {files?.[0]?.name || 'Choisir un document pdf'}
                      </span>
                      <img
                        src='https://www.svgrepo.com/show/478427/pdf-file-2.svg'
                        alt
                        srcSet
                      />{' '}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor='upload' className='formbold-form-label'>
                    Lettre de motivation
                  </label>
                  <div className='Upload'>
                    <input
                      type='file'
                      name='upload'
                      id='upload-2'
                      className='formbold-form-file'
                      onChange={(e) => handleUploadedFile(e, 1)}
                    />
                    <button
                      className='formbold-btn'
                      type='button'
                      id='upload-btn'
                    >
                      <span>
                        {files?.[1]?.name || 'Choisir un document pdf'}
                      </span>
                      <img
                        src='https://www.svgrepo.com/show/478427/pdf-file-2.svg'
                        alt
                        srcSet
                      />{' '}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <button className='formbold-btn'>
              Postulez maintenant{' '}
              {step === 1 ? (
                <Icon name={'download'} />
              ) : step === 2 ? (
                <Icon name='upload' />
              ) : step === 3 ? (
                <Icon name='error' />
              ) : (
                <></>
              )}
            </button>
          </form>
        </div>
        {/* <img src='image1.jpg' /> */}
      </div>
    </div>
  );
};

export default page;
