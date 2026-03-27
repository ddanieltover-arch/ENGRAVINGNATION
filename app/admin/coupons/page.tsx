import { Ticket, Search, Plus, Trash2 } from 'lucide-react';
import { getCoupons, createCoupon, deleteCoupon } from '../actions';
import { revalidatePath } from 'next/cache';

export default async function CouponsPage() {
  const coupons = await getCoupons();

  const handleCreateCoupon = async (formData: FormData) => {
    'use server';
    await createCoupon(formData);
  };

  const handleDeleteCoupon = async (formData: FormData) => {
    'use server';
    const id = formData.get('id') as string;
    await deleteCoupon(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-outfit font-black text-transparent bg-clip-text bg-linear-to-r from-brand-gold to-[#e6c25e] uppercase tracking-tighter italic">Coupons</h1>
          <p className="text-white/40 mt-1">Manage promotional codes and discounts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="glass-card bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden">
             <div className="p-6 border-b border-white/5 bg-black/20">
              <h2 className="text-xl font-heading font-black italic text-white uppercase tracking-wider flex items-center gap-2">
                <Ticket className="text-brand-gold w-5 h-5" /> Generate Coupon
              </h2>
             </div>
             <form action={handleCreateCoupon} className="p-6 space-y-4">
                <div>
                  <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mb-2 block">Discount Type</label>
                  <select name="type" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mb-2 block">Discount Value</label>
                  <input type="number" name="value" step="0.01" required placeholder="e.g. 15 or 5.00" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mb-2 block">Custom Code (Optional)</label>
                  <input type="text" name="code" placeholder="Leave blank to auto-generate" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <button type="submit" className="w-full bg-brand-gold hover:bg-[#e6c25e] text-black font-black uppercase tracking-widest italic py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Plus className="w-5 h-5" /> Auto-Generate & Save
                </button>
             </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-card bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-black/20">
                    <th className="p-4 text-[10px] uppercase tracking-widest text-[#a0a0a0]">Code</th>
                    <th className="p-4 text-[10px] uppercase tracking-widest text-[#a0a0a0]">Type</th>
                    <th className="p-4 text-[10px] uppercase tracking-widest text-[#a0a0a0]">Value</th>
                    <th className="p-4 text-[10px] uppercase tracking-widest text-[#a0a0a0]">Uses</th>
                    <th className="p-4 text-[10px] uppercase tracking-widest text-[#a0a0a0] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {coupons.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-white/40">No coupons found. Generate one to get started.</td>
                    </tr>
                  ) : coupons.map((coupon: any) => (
                    <tr key={coupon.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4">
                        <span className="font-mono text-brand-gold font-bold px-3 py-1 bg-brand-gold/10 rounded border border-brand-gold/20">{coupon.code}</span>
                      </td>
                      <td className="p-4 text-white/60 capitalize">
                        {coupon.type}
                      </td>
                      <td className="p-4 text-white">
                         {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value.toFixed(2)}`}
                      </td>
                      <td className="p-4 text-white/60">
                         {coupon.used_count || 0}
                      </td>
                      <td className="p-4 text-right">
                        <form action={handleDeleteCoupon}>
                           <input type="hidden" name="id" value={coupon.id} />
                           <button type="submit" className="text-white/20 hover:text-red-500 transition-colors">
                             <Trash2 className="w-4 h-4" />
                           </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
