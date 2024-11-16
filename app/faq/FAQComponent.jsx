// 'use client';

// import { useEffect } from 'react';

// const FAQComponent = ({ initialFaqHtml }) => {
//   useEffect(() => {
//     const scriptContent = `
//       function toggleFAQ(item) {
//         const faqItems = document.querySelectorAll('.faq-item');
//         const content = item.querySelector('.faq-content');
//         const icon = item.querySelector('.icon');

//         faqItems.forEach(otherItem => {
//           const otherContent = otherItem.querySelector('.faq-content');
//           const otherIcon = otherItem.querySelector('.icon');
//           if (otherItem !== item) {
//             otherContent.style.height = '0px';
//             otherContent.style.opacity = '0';
//             otherIcon.innerHTML = '&#9660;';
//           }
//         });

//         if (content.style.height === '0px' || content.style.height === '') {
//           content.style.height = content.scrollHeight + 'px';
//           content.style.opacity = '1';
//           icon.innerHTML = '&#9650;';
//         } else {
//           content.style.height = '0px';
//           content.style.opacity = '0';
//           icon.innerHTML = '&#9660;';
//         }
//       }

//       function initializeFAQ() {
//         const faqItems = document.querySelectorAll('.faq-item');
//         faqItems.forEach(item => {
//           item.addEventListener('click', () => toggleFAQ(item));
//         });
//       }

//       if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', initializeFAQ);
//       } else {
//         initializeFAQ();
//       }
//     `;

//     const script = document.createElement('script');
//     script.innerHTML = scriptContent;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return <div dangerouslySetInnerHTML={{ __html: initialFaqHtml }} />;
// };

// export default FAQComponent;
