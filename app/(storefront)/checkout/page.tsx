import { getSettings } from '@/lib/data';
import CheckoutClient from './CheckoutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | Engraving Nation',
  description: 'Complete your custom emblem order with our secure offline payment checkout.',
  robots: {
    index: false,
    follow: false,
  },
};

export const revalidate = 0;

export default async function CheckoutPage() {
  const settings = await getSettings();

  return <CheckoutClient settings={settings} />;
}
