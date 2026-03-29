'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function CheckoutClient({ settings }: { settings: any }) {
  const { items, cartTotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // New States
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingMethod, setShippingMethod] = useState(
    settings?.shipping_zones?.[0]?.id || 'us-standard'
  );

  // Customer info states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('US');

  // Coupon States
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ type: string; value: number; code: string } | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  // Scroll to top on success
  const [hasScrolled, setHasScrolled] = useState(false);
  if (isSubmitted && !hasScrolled) {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
    setHasScrolled(true);
  }

  const shippingRates: Record<string, number> = (settings?.shipping_zones || []).reduce((acc: any, zone: any) => {
    acc[zone.id] = zone.cost;
    return acc;
  }, {});

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percentage') {
      return (cartTotal * appliedCoupon.value) / 100;
    }
    return appliedCoupon.value;
  };

  const discountAmount = calculateDiscount();
  const currentShippingCost = shippingRates[shippingMethod] || 0;
  const grandTotal = Math.max(0, cartTotal - discountAmount + currentShippingCost);
  const selectedShipping = (settings?.shipping_zones || []).find((z: any) => z.id === shippingMethod);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsValidatingCoupon(true);
    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode }),
      });
      const data = await response.json();
      if (data.success) {
        setAppliedCoupon({ type: data.type, value: data.value, code: couponCode.toUpperCase() });
        alert('Coupon applied successfully!');
      } else {
        alert(data.error || 'Invalid coupon code');
      }
    } catch (error) {
      alert('Error validating coupon');
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          address,
          city,
          state,
          zip,
          country,
          items,
          cartTotal,
          discountAmount,
          appliedCoupon: appliedCoupon?.code,
          shippingMethod,
          currentShippingCost,
          grandTotal,
          payment_method: paymentMethod,
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setOrderId(data.id);
        setIsSubmitted(true);
        clearCart();
      } else {
        alert('Failed to place order. ' + data.error);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-text-secondary mb-6">Add some products to your cart before checking out.</p>
        <Link href="/products" className="btn-primary">Return to Shop</Link>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-brand-bg text-white/90 pt-32 pb-24 flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-10 border border-brand-gold/20 animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase italic text-brand-gold mb-6 text-center">
          Order <span className="text-white">Received</span>
        </h1>
        <p className="text-xl text-white/80 font-md max-w-2xl text-center mb-12 leading-relaxed">
          Your custom automotive engravings are now in our production queue!
        </p>
        
        <div className="glass-card p-10 md:p-16 max-w-4xl w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-brand-gold to-transparent opacity-40"></div>
          
          <div className="text-center mb-8">
            <span className="text-sm text-white/40 uppercase tracking-widest block mb-2">Order ID</span>
            <strong className="text-3xl md:text-4xl text-brand-gold font-mono tracking-tight">{orderId}</strong>
          </div>
          
          <h2 className="text-2xl font-heading font-black tracking-tighter uppercase italic mb-8 border-t border-white/10 pt-8 text-center">
            Next <span className="text-brand-gold">Steps</span>
          </h2>
          
          <div className="flex justify-center">
            <div className="glass-card bg-brand-gold/5 border border-brand-gold/30 p-8 max-w-lg w-full text-center">
              <p className="text-lg text-white/90 mb-4">
                Thank you for choosing {paymentMethod}.
              </p>
              <p className="text-brand-gold font-medium leading-relaxed">
                Please contact the admin using the phone number or our email to receive the payment details and instructions.
              </p>
              <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                <p className="text-sm font-mono text-white/60">Email: info@engravingnation.store</p>
                <p className="text-sm font-mono text-white/60">Phone: +1 (332) 256-6110</p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/products" className="mt-16 text-sm font-bold uppercase tracking-[0.3em] text-white/20 hover:text-brand-gold transition-colors flex items-center gap-3 group">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Return to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-white/90 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase italic leading-none mb-4">
            Secured <span className="text-brand-gold">Checkout</span>
          </h1>
          <div className="w-24 h-1 bg-brand-gold"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Checkout Form */}
          <div className="space-y-12">
            <div className="glass-card p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold/40"></div>
              <h2 className="text-2xl font-heading font-black tracking-tighter uppercase italic mb-10">Shipping <span className="text-brand-gold">Details</span></h2>
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">First Name</label>
                    <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/50 transition-all" type="text" placeholder="John" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">Last Name</label>
                    <input required value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/50 transition-all" type="text" placeholder="Doe" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/50 transition-all" placeholder="john@example.com" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">Phone Number</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/50 transition-all" placeholder="123-456-7890" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">Street Address</label>
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/50 transition-all" placeholder="123 Performance Way" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">City</label>
                    <input required value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/50 transition-all" type="text" placeholder="Detroit" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">State</label>
                      <input required value={state} onChange={(e) => setState(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/50 transition-all" type="text" placeholder="MI" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">ZIP</label>
                      <input required value={zip} onChange={(e) => setZip(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/50 transition-all" type="text" placeholder="48201" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">Country</label>
                  <select 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/50 transition-all appearance-none cursor-pointer"
                    value={country}
                    onChange={(e) => {
                      const newCountry = e.target.value;
                      setCountry(newCountry);
                      // Set defaults for simple US vs Intl fallback if necessary
                      if (settings?.shipping_zones) {
                        const defaultUs = settings.shipping_zones.find((z: any) => z.id.includes('us'));
                        const defaultInt = settings.shipping_zones.find((z: any) => !z.id.includes('us'));
                        if (newCountry === 'US' && defaultUs) setShippingMethod(defaultUs.id);
                        if (newCountry !== 'US' && defaultInt) setShippingMethod(defaultInt.id);
                      }
                    }}
                  >
                    <option value="US" className="bg-[#1a1a1a] text-white">United States</option>
                    <option value="CA" className="bg-[#1a1a1a] text-white">Canada</option>
                    <option value="GB" className="bg-[#1a1a1a] text-white">United Kingdom</option>
                    <option value="AU" className="bg-[#1a1a1a] text-white">Australia</option>
                    <option value="DE" className="bg-[#1a1a1a] text-white">Germany</option>
                    <option value="FR" className="bg-[#1a1a1a] text-white">France</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="glass-card p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold/30"></div>
              <h2 className="text-2xl font-heading font-black tracking-tighter uppercase italic mb-10">Shipping <span className="text-brand-gold">Method</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(settings?.shipping_zones || []).map((option: any) => {
                  // For a smarter UX, try to hide US/Intl options if they visibly clash with the selected country
                  const isVisiblyUS = option.id.includes('us') || option.name.toLowerCase().includes('us');
                  const isVisiblyInt = option.id.includes('int') || option.name.toLowerCase().includes('int');
                  
                  if (country === 'US' && isVisiblyInt) return null;
                  if (country !== 'US' && isVisiblyUS) return null;

                  return (
                  <label 
                    key={option.id}
                    className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${
                      shippingMethod === option.id 
                        ? 'bg-brand-gold/10 border-brand-gold/50' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="shipping-method" 
                      className="hidden" 
                      checked={shippingMethod === option.id}
                      onChange={() => setShippingMethod(option.id)}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-black uppercase italic tracking-tight">{option.name}</span>
                      <span className="text-brand-gold font-bold">${option.cost.toFixed(2)}</span>
                    </div>
                  </label>
                  );
                })}
              </div>
            </div>
            
            <div className="glass-card p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold/20"></div>
              <h2 className="text-2xl font-heading font-black tracking-tighter uppercase italic mb-10 flex items-center justify-between font-bold">
                <span>Select <span className="text-brand-gold">Payment Method</span></span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(settings?.payment_methods || []).map((method: any) => (
                  <label 
                    key={method.id}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                      paymentMethod === method.name 
                        ? 'bg-brand-gold/10 border-brand-gold/40' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="payment-method" 
                      className="hidden" 
                      required
                      checked={paymentMethod === method.name}
                      onChange={() => setPaymentMethod(method.name)}
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      paymentMethod === method.name ? 'border-brand-gold bg-brand-gold' : 'border-white/20'
                    }`}>
                      {paymentMethod === method.name && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                    </div>
                    <span className={`text-sm font-black uppercase italic tracking-tight ${paymentMethod === method.name ? 'text-white' : 'text-white/60'}`}>
                      {method.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="self-start lg:sticky lg:top-32">
            <div className="glass-card p-10 relative overflow-hidden mb-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
              
              <h2 className="text-2xl font-heading font-black tracking-tighter uppercase italic mb-10 border-b border-white/10 pb-6">Summary</h2>
              
              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div className="flex gap-4">
                      <span className="text-[10px] font-bold text-brand-gold bg-brand-gold/10 w-6 h-6 flex items-center justify-center rounded-sm mt-1">{item.quantity}</span>
                      <div>
                        <p className="text-sm font-black uppercase italic tracking-tight group-hover:text-brand-gold transition-colors">{item.name}</p>
                        {item.finishType && <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mt-1">{item.finishType}</p>}
                      </div>
                    </div>
                    <span className="text-sm font-black italic text-white/70">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-brand-border/30 pt-8 space-y-4 mb-8">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 leading-none">
                  <span>Merchandise</span>
                  <span className="text-white/80">${cartTotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 leading-none">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 leading-none">
                  <span>Shipping ({selectedShipping?.name || 'Standard'})</span>
                  <span className="text-white/80">${currentShippingCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-10 pt-6 border-t border-white/5">
                <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mb-4 block">Promo Code</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="ENTER CODE" 
                    className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-gold/50 transition-all uppercase tracking-widest"
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    disabled={isValidatingCoupon || !couponCode}
                    className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-6 rounded-xl transition-all border border-white/5 disabled:opacity-50"
                  >
                    {isValidatingCoupon ? '...' : 'Apply'}
                  </button>
                </div>
              </div>
              
              <div className="border-t border-brand-border/30 pt-8 mb-12 flex justify-between items-end">
                <div className="text-xs font-bold uppercase tracking-widest text-white/20 mb-2">Total Due</div>
                <span className="text-4xl font-heading font-black text-brand-gold italic">${grandTotal.toFixed(2)}</span>
              </div>
              
              <button form="checkout-form" type="submit" disabled={isSubmitting} className="btn-primary w-full h-[70px] flex items-center justify-center text-lg uppercase tracking-[0.3em] font-black italic group disabled:opacity-50">
                {isSubmitting ? 'Processing...' : 'Place Order'}
                {!isSubmitting && <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-8 opacity-20">
              <div className="text-[8px] font-black uppercase tracking-[0.3em]">Encrypted</div>
              <div className="text-[8px] font-black uppercase tracking-[0.3em]">Identity Verified</div>
              <div className="text-[8px] font-black uppercase tracking-[0.3em]">Privacy Protected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
