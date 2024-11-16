import React, { useEffect, useRef } from 'react';
import Icon from '../../components/Icon';

function Pagination({ Page, setPage, products }) {
  let length = products?.length / 12;
  const array_p = Array(
    length > Math.floor(length) ? Math.floor(length + 1) : Math.floor(length)
  ).fill(0);

  // Reference to the search container
  // Scroll to the search container when the page changes
  useEffect(() => {
    const searchContainer = document.getElementById('flormar_search_container');
    if (searchContainer) {
      searchContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }, [Page]);

  if (length > 0)
    return (
      <div className='pagination'>
        <button
          disabled={Page === 1}
          className='item button'
          onClick={() => setPage(Page - 1)}
        >
          <Icon name={'chevron-left'} />
        </button>
        {array_p?.map((_, i) =>
          i === 0 ||
          i === array_p?.length - 1 ||
          (i + 3 > Page && i - 1 < Page) ? (
            <button
              className={`item ${Page === i + 1 ? 'active' : ''}`}
              key={i}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ) : (
            <span key={i}></span>
          )
        )}
        {
          <button
            disabled={Page >= array_p?.length}
            className='item button'
            onClick={() => setPage(Page + 1)}
          >
            <Icon name={'chevron-right'} />
          </button>
        }
      </div>
    );
}

export default Pagination;
