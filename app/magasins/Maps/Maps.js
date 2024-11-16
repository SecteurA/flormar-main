import React, { Fragment, useState } from 'react';
import {
  APIProvider,
  InfoWindow,
  Map,
  Marker,
} from '@vis.gl/react-google-maps';

function Maps({ positions = [], position, setPosition, zoom, setZoom }) {
  return (
    <APIProvider apiKey={'AIzaSyA0v1gP-rlYNhnR8fUT5cyLYqIHqxGNOKo'}>
      <Map
        center={position}
        onCenterChanged={(v) =>
          setPosition((position) => ({ ...position, ...v?.detail?.center }))
        }
        style={{ height: 600 }}
        defaultZoom={6}
        zoom={zoom}
        onZoomChanged={(z) => setZoom(z)}
        styles={'custom'}
        gestureHandling={'greedy'}
        // disableDefaultUI={true}
        // onClick={(v) => {
        //   if (v?.detail?.latLng) {
        //     console.log(v);
        //     setPosition(v?.detail?.latLng);
        //   }
        // }}
      >
        {positions?.map((p, i) => (
          <Marker
            key={i}
            // label={

            // }
            // title={p?.storeAddress}
            onClick={(v) => {
              if (v?.latLng) {
                console.log(v);
                setPosition({
                  lat: Number(p?.storelat || 0),
                  lng: Number(p?.storelng || 0),
                  name: p?.storetitle,
                  address: p?.storeAddress,
                });
              }
            }}
            position={{
              lat: Number(p?.storelat || 0),
              lng: Number(p?.storelng || 0),
            }}
          />
        ))}

        {position?.name && (
          <InfoWindow
            position={position}
            onClose={() => setPosition((p) => ({ ...p, name: '' }))}
          >
            <div>
              <h3 style={{ margin: 0 }}>{position?.name}</h3>

              <p style={{ margin: 0 }}> {position?.address}</p>
              <a
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                  marginTop: 10,
                  display: 'flex',
                }}
                href={`https://www.google.com/maps/dir/?api=1&destination=${position?.lat},${position?.lng}`}
                target='_blank'
              >
                Instructions
              </a>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}

export default Maps;
