'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function login(formData: FormData) {
  const password = formData.get('password') as string;

  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    
    // Set a session cookie for 1 day
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    redirect('/admin');
  }

  return { error: 'Invalid password. Please try again.' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}
