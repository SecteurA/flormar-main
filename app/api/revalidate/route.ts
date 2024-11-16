import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');

  await revalidatePath('/');
  await revalidatePath('/', 'layout');
  await revalidatePath('/', 'page');

  return Response.json({ revalidated: true, now: Date.now() });
}
