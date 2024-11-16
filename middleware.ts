import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const loggedInRoutes = ['/orders', 'auth'];

export default async function AuthMiddleware(req) {
  const myCookie = cookies();

  let token = null;
  if (myCookie.get('token')) {
    token = myCookie.get('token')!.value;
  }

  if (
    !token &&
    loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect('https://v2.flormar.ma/auth');
  }

  return NextResponse.next();
}

// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import type { NextRequest } from 'next/server';

// const loggedInRoutes = ['/orders', 'auth'];

// export default async function middleware(req: NextRequest) {
//   const myCookie = cookies();
//   let token = null;

//   if (myCookie.get('token')) {
//     token = myCookie.get('token')!.value;
//   }

//   // Handle auth redirection for protected routes
//   if (
//     !token &&
//     loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
//   ) {
//     return NextResponse.redirect('https://v2.flormar.ma/auth');
//   }

//   // Handle cache control for all responses
//   const response = NextResponse.next();
//   response.headers.set(
//     'Cache-Control',
//     'public, max-age=60, must-revalidate, stale-while-revalidate=60'
//   );

//   return response;
// }

// // Apply to all routes (or adjust matcher if needed)
// export const config = {
//   matcher: '/:path*',
// };
