import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Custom Automotive Engraving',
  description: 'Get answers to common questions about custom engraved emblems, installation, durability, OEM fitment, and ordering from Engraving Nation.',
  alternates: {
    canonical: 'https://engravingnation.store/faq',
  },
  openGraph: {
    title: 'FAQ | Engraving Nation',
    description: 'Everything you need to know about custom automotive engraving, from ordering to installation.',
    url: 'https://engravingnation.store/faq',
  },
};

const faqs = [
  {
    question: 'What makes engraved emblems better than vinyl overlays or stickers?',
    answer: 'Engraved emblems are permanently etched into the part material, meaning they will never peel, fade, bubble, or degrade from UV exposure. Unlike vinyl overlays that typically last 2–3 years, our engravings are designed to last the lifetime of the vehicle while providing a premium 3D depth that stickers cannot replicate.',
  },
  {
    question: 'Do your custom emblems fit specific truck models like the Silverado and Sierra?',
    answer: 'Yes. We specialize in vehicle-specific fitment for Chevy Silverado, GMC Sierra, Ford F-150, and RAM trucks. Each part is cross-referenced with the vehicle year and trim level to ensure a perfect OEM-style bolt-on replacement with no modifications required.',
  },
  {
    question: 'How long does it take to receive a custom engraved order?',
    answer: 'Most custom orders are completed within 5–7 business days from payment verification. Shipping within the USA typically takes an additional 3–5 business days. International shipping timelines vary by destination but usually arrive within 7–14 business days.',
  },
  {
    question: 'What materials are used for your engraved emblems?',
    answer: 'We work primarily with automotive-grade ABS plastics and billet aluminum, depending on the product. All materials are selected for their durability, weather resistance, and compatibility with precision engraving techniques. Finishes include gloss black, satin, and chrome options.',
  },
  {
    question: 'Can I request a fully custom design or logo?',
    answer: 'Absolutely. We offer bespoke engraving services where you can submit your own design, logo, or concept. Our team will create a digital proof for your approval before production begins. Custom design fees may apply depending on complexity.',
  },
  {
    question: 'Will a custom engraved emblem void my vehicle warranty?',
    answer: 'No. Replacing exterior emblems and mirror caps is considered a cosmetic modification and does not affect your vehicle\'s mechanical warranty. Our parts are designed to use the same mounting points and clips as the original factory parts.',
  },
  {
    question: 'How do I install a replacement emblem on my truck?',
    answer: 'Most of our emblems are direct bolt-on replacements that use OEM mounting clips or automotive-grade 3M VHB adhesive tape. We include installation instructions with every order. For detailed step-by-step guides, visit our Journal section.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes. We ship worldwide. Orders over $1,000 qualify for free international shipping. All international orders include tracking and are shipped via trusted carriers like FedEx, UPS, or DHL.',
  },
  {
    question: 'What is your return and refund policy?',
    answer: 'Because every product is custom-made to order, we cannot accept returns for change of mind. However, if your item arrives damaged or defective, we will replace it or issue a full refund. Please contact us within 48 hours of delivery with photos of any damage.',
  },
  {
    question: 'How do I care for my engraved emblem after installation?',
    answer: 'Our engraved products are designed for minimal maintenance. Regular car washes (hand or automatic) are perfectly safe. Avoid using abrasive polishing compounds directly on the engraved surface. For best results, apply a light coat of automotive wax periodically to maintain the finish.',
  },
];

export default function FAQPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://engravingnation.store' },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://engravingnation.store/faq' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white/90 pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <header className="mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6">
              Knowledge Base
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase italic leading-tight mb-6">
              Frequently Asked <span className="text-brand-gold">Questions</span>
            </h1>
            <div className="w-24 h-1 bg-brand-gold mb-8"></div>
            <p className="text-white/50 text-xl font-light leading-relaxed">
              Everything you need to know about ordering, installing, and maintaining your custom engraved automotive emblems.
            </p>
          </header>

          {/* GEO Answer Capsule */}
          <section id="answer" aria-label="FAQ Summary" className="mb-16">
            <div className="p-8 rounded-3xl bg-brand-gold/[0.03] border border-brand-gold/20 backdrop-blur-sm">
              <p className="text-white/80 text-lg leading-relaxed">
                <strong className="text-brand-gold uppercase tracking-widest text-xs block mb-2">Quick Answer:</strong>
                Engraving Nation creates <strong>permanent, precision-etched automotive emblems</strong> that outperform vinyl overlays in durability and aesthetics. All parts feature OEM-level fitment for Chevy, GMC, Ford, and RAM trucks with 5–7 day custom production and worldwide shipping.
              </p>
            </div>
          </section>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-brand-gold/20 transition-all duration-300"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h2 className="text-lg md:text-xl font-heading font-bold text-white pr-8 group-open:text-brand-gold transition-colors">
                    {faq.question}
                  </h2>
                  <span className="shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold text-sm font-bold group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-white/60 text-base font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* CTA Footer */}
          <footer className="mt-24 p-12 rounded-3xl bg-brand-gold/5 border border-brand-gold/10 text-center">
            <h3 className="text-xl font-heading font-black uppercase italic mb-4">Still Have Questions?</h3>
            <p className="text-white/50 mb-8 max-w-2xl mx-auto">Our team is ready to help you find the perfect engraved upgrade for your vehicle.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-block px-10 py-4 rounded-full bg-brand-gold text-black font-black uppercase tracking-widest italic hover:shadow-[0_0_30px_rgba(212,160,23,0.3)] transition-all">
                Contact Us
              </Link>
              <Link href="/products" className="inline-block px-10 py-4 rounded-full border border-brand-gold/30 text-brand-gold font-black uppercase tracking-widest italic hover:bg-brand-gold/10 transition-all">
                Browse Products
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
