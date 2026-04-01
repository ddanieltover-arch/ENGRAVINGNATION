import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Build Showcase & Inspiration Gallery | Engraving Nation',
  description: 'Explore the elite collection of custom engraved builds. From blacked-out Silverado emblems to precision-etched GMC mirror caps. Get inspired for your next project.',
  openGraph: {
    title: 'Custom Build Gallery | Engraving Nation',
    description: 'Real-world examples of our precision engraving on Chevy, GMC, Ford, and more.',
    images: ['/gallery-og.jpg'],
  },
};

const builds = [
  {
    title: "The Midnight Silverado",
    description: "Deep laser-etched black bowtie emblems with a custom honeycomb texture.",
    image: "/builds/silverado-midnight.png",
    category: "Chevy",
    link: "/products?make=Chevrolet"
  },
  {
    title: "Crimson Forge Sierra",
    description: "GMC mirror caps with a signature shattered carbon engraving and bronze finish.",
    image: "/builds/sierra-crimson.png",
    category: "GMC",
    link: "/products?make=GMC"
  },
  {
    title: "Platinum Edition F-150",
    description: "Detailed tailgate etching featuring a geometric mesh pattern for the Platinum trim.",
    image: "/builds/f150-platinum.png",
    category: "Ford",
    link: "/products?make=Ford"
  }
];

export default function GalleryPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-bg">
      <div className="container mx-auto px-4">
        <header className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6">
            Visual Inspiration
          </div>
          <h1 className="text-4xl md:text-7xl font-heading font-black tracking-tighter uppercase italic leading-none mb-8 text-white">
            Build <span className="text-brand-gold">Showcase</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed italic">
            See how Engraving Nation customers are transforming their vehicles with precision-etched performance art.
          </p>
        </header>

        <div className="space-y-32">
          {builds.map((build, index) => (
            <section key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center`}>
              <div className="w-full md:w-1/2 aspect-video relative group overflow-hidden rounded-3xl glass-card">
                <div className="absolute inset-0 bg-brand-gold/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/80 to-transparent z-20"></div>
                <Image 
                  src={build.image} 
                  alt={`${build.title} - Custom Engraved ${build.category} build`}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[9px] uppercase tracking-widest font-black text-brand-gold/60 border border-brand-gold/20 px-2 py-0.5 rounded">
                    {build.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-black uppercase italic text-white leading-none">
                  {build.title}
                </h2>
                <p className="text-white/60 text-lg font-light leading-relaxed">
                  {build.description}
                </p>
                <div className="pt-6">
                  <Link href={build.link} className="btn-secondary inline-block px-8 py-4 text-xs uppercase tracking-widest">
                    Shop The Look
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-32 glass-card p-12 text-center bg-brand-gold/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -mr-48 -mt-48 transition-all duration-1000 group-hover:bg-brand-gold/20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-heading font-black uppercase italic mb-8 text-white">Your Build <span className="text-brand-gold">Featured</span>?</h2>
            <p className="text-white/40 font-light leading-relaxed max-w-2xl mx-auto mb-10 text-lg">
              We love seeing where our engravings end up. Tag us on Instagram or send us high-resolution photos of your build for a chance to be featured in our official showcase.
            </p>
            <Link href="/contact" className="btn-primary px-12 py-5 text-sm uppercase tracking-widest italic font-black">
              Submit Your Photos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
