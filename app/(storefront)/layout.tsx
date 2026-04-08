import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { CartProvider } from '@/components/CartProvider';
import TawkChat from '@/components/TawkChat';
import WhatsAppChat from '@/components/WhatsAppChat';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      <main className="grow">
        {children}
      </main>
      <Footer />
      <MobileNav />
      <WhatsAppChat />
      <TawkChat />
    </CartProvider>
  );
}
