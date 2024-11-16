'use client';
import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const MapFilter = ({ locations }) => {
  const [sortedLocations, setSortedLocations] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA0v1gP-rlYNhnR8fUT5cyLYqIHqxGNOKo', // Replace with your API key
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded && locations.length) {
      locations.forEach((location) => {
        getGeocode(location);
      });
    }
  }, [isLoaded, locations]);

  const getGeocode = ({ lat, lng, ...location }) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const addressComponents = results[0].address_components;
        const country =
          addressComponents.find((comp) => comp.types.includes('country'))
            ?.long_name || '';
        const city =
          addressComponents.find((comp) => comp.types.includes('locality'))
            ?.long_name || '';
        setAddresses((prev) => [...prev, { ...location, country, city }]);
      }
    });
  };

  useEffect(() => {
    if (addresses.length === locations.length) {
      const sorted = addresses.sort((a, b) => {
        if (a.country > b.country) return 1;
        if (a.country < b.country) return -1;
        if (a.city > b.city) return 1;
        if (a.city < b.city) return -1;
        return 0;
      });
      setSortedLocations(sorted);
    }
  }, [addresses]);

  console.log(addresses?.filter((p) => p?.country === 'Morocco'));

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      center={{ lat: locations[0].lat, lng: locations[0].lng }}
      zoom={5}
      mapContainerStyle={{ height: '400px', width: '800px' }}
    >
      {sortedLocations.map((loc, index) => (
        <div key={index}>
          <p>{`Country: ${loc.country}, City: ${loc.city}, Lat: ${loc.lat}, Lng: ${loc.lng}`}</p>
        </div>
      ))}
    </GoogleMap>
  );
};

export default MapFilter;
