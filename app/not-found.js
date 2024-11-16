import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='not-found-page'>
      <img src='/404.png' alt='' srcset='' />
      <div className='container'>
        <h2>LA PAGE N'EST PAS TROUVÉE !</h2>
        <Link href='/'>Accueil</Link>
      </div>
    </div>
  );
}
