import Link from 'next/link';
import React from 'react';
import './PageLink.css';

function PageLink({ links = [] }) {
  // console.log(links);
  return (
    <ul className='page-link'>
      {links?.map((l, i) => (
        <li key={i}>
          {i !== 0 && '/'}{' '}
          {l?.route ? (
            <Link
              className={l?.name}
              href={l?.route}
              dangerouslySetInnerHTML={{
                __html:
                  l?.route === '/' ? 'Accueil' : decodeURIComponent(l?.name),
              }}
            ></Link>
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html:
                  l?.route === '/' ? 'Accueil' : decodeURIComponent(l?.name),
              }}
            ></span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default PageLink;
