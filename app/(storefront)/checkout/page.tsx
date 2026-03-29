import { getSettings } from '@/lib/data';
import CheckoutClient from './CheckoutClient';

export const revalidate = 0;

export default async function CheckoutPage() {
  const settings = await getSettings();

  return <CheckoutClient settings={settings} />;
}
