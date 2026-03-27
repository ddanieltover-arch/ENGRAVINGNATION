import type { Metadata } from 'next';
import { CreditCard, Wallet, Smartphone, Banknote, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Payment Options | Engraving Nation',
  description: 'Secure and convenient payment options for your custom automotive orders.',
};

export default function PaymentPage() {
  const methods = [
    {
      name: "Cash App",
      desc: "Fast and easy payments directly from your mobile device. Instant confirmation.",
      icon: Smartphone
    },
    {
      name: "Zelle",
      desc: "Direct bank-to-bank transfers with quick processing. Ideal for secure large transactions.",
      icon: Wallet
    },
    {
      name: "Apple Pay",
      desc: "Secure way to pay using your iPhone, iPad, or Mac. Built-in privacy features.",
      icon: Smartphone
    },
    {
      name: "Chime",
      desc: "Send payments quickly and securely through your Chime account.",
      icon: Banknote
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6">
            SECURE CHECKOUT
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase italic leading-none mb-6 text-white">
            Payment <span className="text-brand-gold">Options</span>
          </h1>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto">
            We offer secure and convenient payment options to make your purchase process smooth and hassle-free.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {methods.map((method, index) => (
            <div key={index} className="glass-card p-8 group">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all">
                <method.icon size={24} />
              </div>
              <h3 className="text-xl font-heading font-black uppercase italic text-white mb-2 tracking-tight">{method.name}</h3>
              <p className="text-white/50 font-light leading-relaxed text-sm">
                {method.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 md:p-12 relative overflow-hidden bg-brand-gold/5 border-brand-gold/20">
          <div className="flex items-start gap-6">
            <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
              <Info size={20} />
            </div>
            <div className="space-y-6">
              <h2 className="text-xl font-heading font-black uppercase italic text-white tracking-wide">Important Payment Information</h2>
              <ul className="space-y-4 text-white/60 font-light">
                <li className="flex gap-4">
                  <span className="text-brand-gold">01</span>
                  <span>All payments must be completed before production begins on custom orders.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-brand-gold">02</span>
                  <span>Please ensure payment details are accurate to avoid processing delays.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-brand-gold">03</span>
                  <span>Payment confirmations are required to finalize your order in our queue.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
