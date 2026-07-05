import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you requested could not be found on Engraving Nation.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-bg text-white px-4 pt-32 pb-24">
      <p className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-6">404</p>
      <h1 className="text-4xl md:text-6xl font-heading font-black uppercase italic text-center mb-6">
        Page Not Found
      </h1>
      <p className="text-white/50 text-lg text-center max-w-xl mb-10">
        That URL does not exist or may have moved. Browse our custom emblems, fitment guides, or contact support.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn-primary px-10 py-4 uppercase tracking-widest italic font-black">
          Go Home
        </Link>
        <Link href="/products" className="btn-secondary px-10 py-4 uppercase tracking-widest italic font-black">
          Shop Products
        </Link>
      </div>
    </div>
  );
}
