import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { CartProvider } from '@/components/CartProvider';

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
    </CartProvider>
  );
}
