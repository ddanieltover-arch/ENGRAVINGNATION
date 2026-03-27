import { cookies } from 'next/headers';

/**
 * Basic authentication utility to check for an admin session.
 * This is used in server components and actions.
 */
export async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  
  // In a real app, we'd verify a JWT or session token.
  // For this implementation, we just check if the cookie exists and matches 'authenticated'.
  return session?.value === 'authenticated';
}
