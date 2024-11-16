// 'use client';

// import { useEffect } from 'react';

// function Page() {
//   useEffect(() => {
//     const toggleFAQ = (item) => {
//       const faqItems = document.querySelectorAll('.faq-item');
//       const content = item.querySelector('.faq-content');
//       const icon = item.querySelector('.icon');

//       faqItems.forEach((otherItem) => {
//         const otherContent = otherItem.querySelector('.faq-content');
//         const otherIcon = otherItem.querySelector('.icon');
//         if (otherItem !== item) {
//           otherContent.style.height = '0px';
//           otherContent.style.opacity = '0';
//           otherIcon.innerHTML = '&#9660;';
//         }
//       });

//       if (content.style.height === '0px' || content.style.height === '') {
//         content.style.height = `${content.scrollHeight}px`;
//         content.style.opacity = '1';
//         icon.innerHTML = '&#9650;';
//       } else {
//         content.style.height = '0px';
//         content.style.opacity = '0';
//         icon.innerHTML = '&#9660;';
//       }
//     };

//     const initializeFAQ = () => {
//       const faqItems = document.querySelectorAll('.faq-item');
//       faqItems.forEach((item) => {
//         item.addEventListener('click', () => toggleFAQ(item));
//       });
//     };

//     if (document.readyState === 'loading') {
//       document.addEventListener('DOMContentLoaded', initializeFAQ);
//     } else {
//       initializeFAQ();
//     }

//     return () => {
//       const faqItems = document.querySelectorAll('.faq-item');
//       faqItems.forEach((item) => {
//         item.removeEventListener('click', () => toggleFAQ(item));
//       });
//     };
//   }, []);

//   return (
//     <div>
//       <h1 style={{ marginBottom: '45px', textAlign: 'center' }}>
//         Foire aux questions - FAQ
//       </h1>
//       <div className='container'>
//         <div className='flex justify-center'>
//           <div className='faq-area'>
//             <div className='faq-loop'>
//               <div className='faq-item'>
//                 <div className='faq-title'>
//                   <span>
//                     1 - Je veux essayer vos produits. Que dois-je faire?
//                   </span>
//                   <div className='icon'>&#9660;</div>
//                 </div>
//                 <div className='faq-content'>
//                   nos produits de taille d'essai ne sont pas disponibles pour le
//                   moment. Vous pouvez essayer les produits Flormar des testeurs
//                   en visitant notre magasin le plus proche.
//                 </div>
//               </div>

//               <div className='faq-item'>
//                 <div className='faq-title'>
//                   <span>
//                     2 - Comment puis-je recevoir des informations sur un
//                     produit?
//                   </span>
//                   <div className='icon'>&#9660;</div>
//                 </div>
//                 <div className='faq-content'>
//                   les informations sur les ingrédients du produit sont
//                   accessibles sur www.flormar.com.
//                 </div>
//               </div>

//               <div className='faq-item'>
//                 <div className='faq-title'>
//                   <span>3 - Vos produits sont-ils testés sur les animaux?</span>
//                   <div className='icon'>&#9660;</div>
//                 </div>
//                 <div className='faq-content'>
//                   Flormar ne teste pas ses produits sur les animaux. Offrant ses
//                   produits dans 110 pays à travers le monde, Flormar est
//                   fermement opposé aux tests sur les animaux de ses produits. Il
//                   reflète également cette attitude envers les fournisseurs avec
//                   lesquels il coopère et les oblige à faire une déclaration à ce
//                   sujet.
//                 </div>
//               </div>

//               <div className='faq-item'>
//                 <div className='faq-title'>
//                   <span>
//                     4 - Dans quelles conditions vos produits sont-ils fabriqués?
//                   </span>
//                   <div className='icon'>&#9660;</div>
//                 </div>
//                 <div className='faq-content'>
//                   Flormar opère dans une zone de production et d'entrepôt de 21
//                   000 m2 établie dans la Zone Industrielle Organisée de Gebze.
//                   Le Département de Contrôle de la Qualité de Flormar, qui
//                   dispose des normes ISO 9001:2008 et ISO 22716 GMP (Normes
//                   Cosmétiques), met en œuvre un contrôle de haute qualité à
//                   chaque étape de la production en testant les produits dans les
//                   laboratoires modernes.
//                 </div>
//               </div>

//               <div className='faq-item'>
//                 <div className='faq-title'>
//                   <span>5 - Flormar a-t-il un certificat "sans cruauté?</span>
//                   <div className='icon'>&#9660;</div>
//                 </div>
//                 <div className='faq-content'>
//                   Flormar ne teste pas ses produits sur les animaux. Il reflète
//                   également cette attitude envers les fournisseurs avec lesquels
//                   il coopère dans ses processus de production et les oblige à
//                   faire une déclaration à ce sujet. Flormar n'a pas demandé une
//                   certification “cruelty-free”, qui est délivrée par diverses
//                   organisations. Cependant, ses cosmétiques et autres produits
//                   commerciaux ont été fabriqués ou développés avec des méthodes
//                   qui ne comprennent pas les tests sur les animaux.
//                 </div>
//               </div>

//               <div className='faq-item'>
//                 <div className='faq-title'>
//                   <span>
//                     6 - Quelles sont les conditions de stockage appropriées pour
//                     prolonger la durée de vie de vos produits?
//                   </span>
//                   <div className='icon'>&#9660;</div>
//                 </div>
//                 <div className='faq-content'>
//                   Nos produits doivent être stockés dans un environnement propre
//                   à température ambiante et à l'abri de la lumière pour
//                   prolonger leur durée de vie.
//                 </div>
//               </div>

//               <div className='faq-item'>
//                 <div className='faq-title'>
//                   <span>
//                     7 - Quelle est la date d'expiration de vos produits et
//                     combien de temps durent-ils?
//                   </span>
//                   <div className='icon'>&#9660;</div>
//                 </div>
//                 <div className='faq-content'>
//                   Les dates d'expédition sont de 5 ans à compter de la date de
//                   production et sont indiquées sur l'étiquette sur les produits
//                   et sur la boîte (Exemple: ED: 17.10.18). Les informations
//                   écrites sur l'icône sous la forme d'une vignette jar sur
//                   l'emballage, l'étiquette ou la boîte (Exemple: 6M) spécifient
//                   la période d'utilisation du produit après ouverture et varie
//                   en fonction du produit comme 6, 12, 18, 24 et 36 mois.
//                 </div>
//               </div>

//               <div className='faq-item'>
//                 <div className='faq-title'>
//                   <span>
//                     8 - Flormar effectue-t-il des tests sur des animaux?
//                   </span>
//                   <div className='icon'>&#9660;</div>
//                 </div>
//                 <div className='faq-content'>
//                   Flormar ne teste pas ses produits sur les animaux. Il reflète
//                   également cette attitude envers les fournisseurs avec lesquels
//                   il coopère dans ses processus de production et les oblige à
//                   faire une déclaration à ce sujet. Flormar n'a pas demandé une
//                   certification “cruelty-free”, qui est délivrée par diverses
//                   organisations. Cependant, ses cosmétiques et autres produits
//                   commerciaux ont été fabriqués ou développés avec des méthodes
//                   qui ne comprennent pas les tests sur les animaux. L'usine
//                   Flormar’s fonctionne conformément aux normes et aux lois de
//                   l'Union européenne. Nos produits ont des rapports d'évaluation
//                   de la sécurité en vertu du Règlement Cosmétique Européen. Ce
//                   règlement interdit expressément les tests sur les animaux. En
//                   outre, nos produits sont fabriqués conformément aux exigences
//                   de la norme ISO 22716/2007 “Cosmetics – Bonnes Pratiques de
//                   Production” (GMP). Notre certification GMP est régulièrement
//                   inspectée par le ministère de la Santé et Bureau Veritas, qui
//                   est considéré comme une autorité internationale.
//                 </div>
//               </div>

//               <div className='faq-item'>
//                 <div className='faq-title'>
//                   <span>9 - Flormar est-il certifié "végétalien"?</span>
//                   <div className='icon'>&#9660;</div>
//                 </div>
//                 <div className='faq-content'>
//                   Flormar opère conformément à sa vision de fournir les produits
//                   les plus propres parmi les marques de cosmétiques de couleur
//                   dans la catégorie de distribution répandue. Le contenu de tous
//                   les produits est révisé un par un dans le cadre d'un plan
//                   d'affaires, qui devrait se poursuivre pendant cinq ans. Nous
//                   continuerons à apporter notre collection 'vegan' Green Up,
//                   composée de produits de maquillage de base et de vernis à
//                   ongles, à nos consommateurs chaque année en la renouvelant,
//                   dans le cadre de notre vision.
//                 </div>
//               </div>

//               <div className='faq-item'>
//                 <div className='faq-title'>
//                   <span>
//                     10 - Pourquoi des tests sont-ils effectués sur des animaux
//                     en recherche?
//                   </span>
//                   <div className='icon'>&#9660;</div>
//                 </div>
//                 <div className='faq-content'>
//                   Flormar ne teste pas ses produits sur les animaux. Offrant ses
//                   produits dans 110 pays à travers le monde, Flormar est
//                   fermement opposé aux tests sur les animaux de ses produits. Il
//                   reflète également cette attitude envers les fournisseurs avec
//                   lesquels il coopère dans ses processus de production et les
//                   oblige à faire une déclaration sur la question. Marques qui
//                   ont une approche différente sur la question que Flormar
//                   effectuent des tests sur les animaux pour voir à l'avance
//                   comment le corps humain pourrait réagir à leurs produits.
//                 </div>
//               </div>

//               <div className='faq-item'>
//                 <div className='faq-title'>
//                   <span>
//                     11 - Pourquoi les animaux sont-ils utilisés pour tester des
//                     produits cosmétiques?
//                   </span>
//                   <div className='icon'>&#9660;</div>
//                 </div>
//                 <div className='faq-content'>
//                   Flormar ne teste pas ses produits sur les animaux. Offrant ses
//                   produits dans 110 pays à travers le monde, Flormar est
//                   fermement opposé aux tests sur les animaux de ses produits. Il
//                   reflète également cette attitude envers les fournisseurs avec
//                   lesquels il coopère dans ses processus de production et les
//                   oblige à faire une déclaration à ce sujet. Avant le lancement
//                   des produits cosmétiques, les animaux peuvent être utilisés
//                   pour tester la fiabilité de ces produits. Aujourd'hui,
//                   cependant, d'autres méthodes de test ont été développées.
//                   Flormar’s factory operates in accordance with the standards
//                   and laws of the European Union. Nos produits ont des rapports
//                   d'évaluation de la sécurité en vertu du Règlement Cosmétique
//                   Européen. Ce règlement interdit expressément les tests sur les
//                   animaux. En outre, nos produits sont fabriqués conformément
//                   aux exigences de la norme ISO 22716/2007 “Cosmetics – Bonnes
//                   Pratiques de Production” (GMP). Notre certification GMP est
//                   régulièrement inspectée par le ministère de la Santé et Bureau
//                   Veritas, qui est considérée comme une autorité internationale.
//                 </div>
//               </div>

//               <div className='faq-item'>
//                 <div className='faq-title'>
//                   <span>
//                     12 - Les tests sur les animaux effectués sur les produits
//                     cosmétiques sont-ils réglementés?
//                   </span>
//                   <div className='icon'>&#9660;</div>
//                 </div>
//                 <div className='faq-content'>
//                   La législation de l'Union européenne sur les cosmétiques
//                   interdit l'expérimentation animale des produits finis depuis
//                   2004 et des ingrédients des produits depuis 2013. Certains
//                   pays comme l'Inde et Israël ont également imposé la même
//                   interdiction l'année suivante. Par la suite, la
//                   Nouvelle-Zélande, l'Argentine, la Turquie, São Paulo au
//                   Brésil, la Russie, la Corée du Sud, le Canada et Taiwan ont
//                   également promulgué de nouvelles lois ou soumis des projets de
//                   loi pour interdire de telles pratiques. L'usine Flormar’s
//                   fonctionne conformément aux normes et aux lois de l'Union
//                   européenne. Nos produits ont des rapports d'évaluation de la
//                   sécurité en vertu du Règlement Cosmétique Européen. Ce
//                   règlement interdit expressément les tests sur les animaux. En
//                   outre, nos produits sont fabriqués conformément aux exigences
//                   de la norme ISO 22716/2007 “Cosmetics – Bonnes Pratiques de
//                   Production” (GMP). Notre certification GMP est régulièrement
//                   inspectée par le ministère de la Santé et Bureau Veritas,qui
//                   est considérée comme une autorité internationale.
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;

'use client';

import React, { useState } from 'react';
import './style.css';

function Page() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='page container'>
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
                    key={index}
                    className='faq-item'
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className='faq-title'>
                      <span>{item.question}</span>
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
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
}

const faqData = [
  {
    question: '1 - Je veux essayer vos produits. Que dois-je faire?',
    answer:
      "Nos produits de taille d'essai ne sont pas disponibles pour le moment. Vous pouvez essayer les produits Flormar des testeurs en visitant notre magasin le plus proche.",
  },
  {
    question: '2 - Comment puis-je recevoir des informations sur un produit?',
    answer:
      'Les informations sur les ingrédients du produit sont accessibles sur www.flormar.com.',
  },
  {
    question: '3 - Vos produits sont-ils testés sur les animaux?',
    answer:
      'Flormar ne teste pas ses produits sur les animaux. Offrant ses produits dans 110 pays à travers le monde, Flormar est fermement opposé aux tests sur les animaux de ses produits. Il reflète également cette attitude envers les fournisseurs avec lesquels il coopère et les oblige à faire une déclaration à ce sujet.',
  },
  {
    question: '4 - Dans quelles conditions vos produits sont-ils fabriqués?',
    answer:
      "Flormar opère dans une zone de production et d'entrepôt de 21 000 m2 établie dans la Zone Industrielle Organisée de Gebze. Le Département de Contrôle de la Qualité de Flormar, qui dispose des normes ISO 9001:2008 et ISO 22716 GMP (Normes Cosmétiques), met en œuvre un contrôle de haute qualité à chaque étape de la production en testant les produits dans les laboratoires modernes.",
  },
  {
    question: "5 - Flormar a-t-il un certificat 'sans cruauté'?",
    answer:
      "Flormar ne teste pas ses produits sur les animaux. Il reflète également cette attitude envers les fournisseurs avec lesquels il coopère dans ses processus de production et les oblige à faire une déclaration à ce sujet. Flormar n'a pas demandé une certification 'cruelty-free', qui est délivrée par diverses organisations. Cependant, ses cosmétiques et autres produits commerciaux ont été fabriqués ou développés avec des méthodes qui ne comprennent pas les tests sur les animaux.",
  },
  {
    question:
      '6 - Quelles sont les conditions de stockage appropriées pour prolonger la durée de vie de vos produits?',
    answer:
      "Nos produits doivent être stockés dans un environnement propre à température ambiante et à l'abri de la lumière pour prolonger leur durée de vie.",
  },
  {
    question:
      "7 - Quelle est la date d'expiration de vos produits et combien de temps durent-ils?",
    answer:
      "Les dates d'expédition sont de 5 ans à compter de la date de production et sont indiquées sur l'étiquette sur les produits et sur la boîte (Exemple: ED: 17.10.18). Les informations écrites sur l'icône sous la forme d'une vignette jar sur l'emballage, l'étiquette ou la boîte (Exemple: 6M) spécifient la période d'utilisation du produit après ouverture et varie en fonction du produit comme 6, 12, 18, 24 et 36 mois.",
  },
  {
    question: '8 - Flormar effectue-t-il des tests sur des animaux?',
    answer:
      "Flormar ne teste pas ses produits sur les animaux. Il reflète également cette attitude envers les fournisseurs avec lesquels il coopère dans ses processus de production et les oblige à faire une déclaration à ce sujet. Flormar n'a pas demandé une certification 'cruelty-free', qui est délivrée par diverses organisations. Cependant, ses cosmétiques et autres produits commerciaux ont été fabriqués ou développés avec des méthodes qui ne comprennent pas les tests sur les animaux. L'usine Flormar fonctionne conformément aux normes et aux lois de l'Union européenne. Nos produits ont des rapports d'évaluation de la sécurité en vertu du Règlement Cosmétique Européen. Ce règlement interdit expressément les tests sur les animaux. En outre, nos produits sont fabriqués conformément aux exigences de la norme ISO 22716/2007 'Cosmetics – Bonnes Pratiques de Production' (GMP). Notre certification GMP est régulièrement inspectée par le ministère de la Santé et Bureau Veritas, qui est considérée comme une autorité internationale.",
  },
  {
    question: "9 - Flormar est-il certifié 'végétalien'?",
    answer:
      "Flormar opère conformément à sa vision de fournir les produits les plus propres parmi les marques de cosmétiques de couleur dans la catégorie de distribution répandue. Le contenu de tous les produits est révisé un par un dans le cadre d'un plan d'affaires, qui devrait se poursuivre pendant cinq ans. Nous continuerons à apporter notre collection 'vegan' Green Up, composée de produits de maquillage de base et de vernis à ongles, à nos consommateurs chaque année en la renouvelant, dans le cadre de notre vision.",
  },
  {
    question:
      '10 - Pourquoi des tests sont-ils effectués sur des animaux en recherche?',
    answer:
      "Flormar ne teste pas ses produits sur les animaux. Offrant ses produits dans 110 pays à travers le monde, Flormar est fermement opposé aux tests sur les animaux de ses produits. Il reflète également cette attitude envers les fournisseurs avec lesquels il coopère dans ses processus de production et les oblige à faire une déclaration sur la question. Marques qui ont une approche différente sur la question que Flormar effectuent des tests sur les animaux pour voir à l'avance comment le corps humain pourrait réagir à leurs produits.",
  },
  {
    question:
      '11 - Pourquoi les animaux sont-ils utilisés pour tester des produits cosmétiques?',
    answer:
      "Flormar ne teste pas ses produits sur les animaux. Offrant ses produits dans 110 pays à travers le monde, Flormar est fermement opposé aux tests sur les animaux de ses produits. Il reflète également cette attitude envers les fournisseurs avec lesquels il coopère dans ses processus de production et les oblige à faire une déclaration à ce sujet. Avant le lancement des produits cosmétiques, les animaux peuvent être utilisés pour tester la fiabilité de ces produits. Aujourd'hui, cependant, d'autres méthodes de test ont été développées. L'usine Flormar fonctionne conformément aux normes et aux lois de l'Union européenne. Nos produits ont des rapports d'évaluation de la sécurité en vertu du Règlement Cosmétique Européen. Ce règlement interdit expressément les tests sur les animaux. En outre, nos produits sont fabriqués conformément aux exigences de la norme ISO 22716/2007 'Cosmetics – Bonnes Pratiques de Production' (GMP). Notre certification GMP est régulièrement inspectée par le ministère de la Santé et Bureau Veritas, qui est considérée comme une autorité internationale.",
  },
  {
    question:
      '12 - Les tests sur les animaux effectués sur les produits cosmétiques sont-ils réglementés?',
    answer:
      "La législation de l'Union européenne sur les cosmétiques interdit l'expérimentation animale des produits finis depuis 2004 et des ingrédients des produits depuis 2013. Certains pays comme l'Inde et Israël ont également imposé la même interdiction l'année suivante. Par la suite, la Nouvelle-Zélande, l'Argentine, la Turquie, São Paulo au Brésil, la Russie, la Corée du Sud, le Canada et Taiwan ont également promulgué de nouvelles lois ou soumis des projets de loi pour interdire de telles pratiques. L'usine Flormar fonctionne conformément aux normes et aux lois de l'Union européenne. Nos produits ont des rapports d'évaluation de la sécurité en vertu du Règlement Cosmétique Européen. Ce règlement interdit expressément les tests sur les animaux. En outre, nos produits sont fabriqués conformément aux exigences de la norme ISO 22716/2007 'Cosmetics – Bonnes Pratiques de Production' (GMP). Notre certification GMP est régulièrement inspectée par le ministère de la Santé et Bureau Veritas, qui est considérée comme une autorité internationale.",
  },
];

export default Page;

// 'use client';
// import React, { useState } from 'react';
// import './style.css';

// export default async function FAQPage() {
//   const res = await fetch('https://admin.flormar.ma/wp-json/acf/v3/faq');
//   const data = await res.json();

//   const faqData = data.map((item) => ({
//     id: item?.id,
//     question: item?.acf?.question,
//     answer: item?.acf?.reponse,
//   }));

//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div>
//       <h1 style={{ marginBottom: '45px', textAlign: 'center' }}>
//         Foire aux questions - FAQ
//       </h1>
//       <div className='container'>
//         <div className='flex justify-center'>
//           <div className='faq-area'>
//             <div className='faq-loop'>
//               {faqData.map((item, index) => (
//                 <div
//                   key={index}
//                   className='faq-item'
//                   onClick={() => toggleFAQ(index)}
//                 >
//                   <div className='faq-title'>
//                     <span>{item.question}</span>
//                     <div className='icon'>
//                       {activeIndex === index ? '▲' : '▼'}
//                     </div>
//                   </div>
//                   <div
//                     className='faq-content'
//                     style={{
//                       height: activeIndex === index ? 'auto' : '0px',
//                       maxHeight: activeIndex === index ? '100%' : '0px',
//                       opacity: activeIndex === index ? 1 : 0,
//                       transition: 'all 0.3s ease',
//                     }}
//                   >
//                     {item.answer}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
