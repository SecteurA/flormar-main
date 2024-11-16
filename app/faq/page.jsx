'use client';

import React, { useState, useEffect } from 'react';
import { getFAQs } from '../api/getFAQs';
import './style.css';

export default function FAQPage() {
  const [faqData, setFaqData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFAQs();
      setFaqData(data);
    };

    fetchData();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='page container faq'>
      <div>
        <h1 style={{ marginBottom: '45px', textAlign: 'center' }}>
          Foire aux questions - FAQ
        </h1>
        <div className='container'>
          <div className='flex justify-center'>
            <div className='faq-area'>
              <div className='faq-loop'>
                {faqData.map((item, index) => (
                  <div
                    key={item?.id}
                    className='faq-item'
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className='faq-title'>
                      <span>{item?.question}</span>
                      <div className='icon'>
                        {activeIndex === index ? '▲' : '▼'}
                      </div>
                    </div>
                    <div
                      className='faq-content'
                      style={{
                        height: activeIndex === index ? 'auto' : '0px',
                        maxHeight: activeIndex === index ? '100%' : '0px',
                        opacity: activeIndex === index ? 1 : 0,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {item?.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
