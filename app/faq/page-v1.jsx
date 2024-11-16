// import FAQComponent from './FAQComponent';

// const FAQPage = async () => {
//   const res = await fetch(
//     'https://admin.flormar.ma/wp-json/wp/v2/pages?slug=Foire-aux-questions-FAQ'
//   );
//   const data = await res.json();

//   if (!data || data.length === 0) {
//     return <div className='container page'>Page not found</div>;
//   }

//   const faqHtml = data?.[0]?.content?.rendered;

//   return (
//     <div className='container page'>
//       <FAQComponent initialFaqHtml={faqHtml} />
//     </div>
//   );
// };

// export default FAQPage;
