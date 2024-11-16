import React from 'react';

async function page() {
  const data = await fetch(
    'https://admin.flormar.ma/wp-json/wp/v2/pages?slug=utilisation-de-cookies'
  )
    .then((res) => res.json())
    .then((data) => data?.[0])
    .catch((err) => 'not found');
  return (
    <div className='container page'>
      <h1
        dangerouslySetInnerHTML={{ __html: data?.title?.rendered || '' }}
      ></h1>
      <div
        dangerouslySetInnerHTML={{ __html: data?.content?.rendered || '' }}
      ></div>
    </div>
  );
}

export default page;
