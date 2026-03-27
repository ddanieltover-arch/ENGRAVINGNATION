'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/app/admin/actions';
import { Save, X } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await createProduct(formData) as any;

    if (result.success) {
      router.push('/admin/products');
      router.refresh();
    } else {
      setError(result?.error || 'Something went wrong');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-outfit font-black text-transparent bg-clip-text bg-linear-to-r from-brand-gold to-[#e6c25e] uppercase tracking-tighter italic">
          Add New Product
        </h2>
        <div className="flex space-x-3">
          <Link 
            href="/admin/products"
            className="px-4 py-2 rounded-lg border border-[#333333] text-[#a0a0a0] hover:text-white transition-colors flex items-center space-x-2"
          >
            <X size={18} />
            <span>Cancel</span>
          </Link>
          <button 
            type="submit"
            form="product-form"
            disabled={isSubmitting}
            className="bg-linear-to-r from-brand-gold to-[#e6c25e] hover:scale-105 transition-all text-black font-black py-4 px-8 rounded-xl shadow-lg shadow-brand-gold/20 flex items-center gap-3 uppercase tracking-widest italic text-sm disabled:opacity-50"
          >
            <Save size={18} />
            <span>{isSubmitting ? 'Saving...' : 'Save Product'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg">
          {error}
        </div>
      )}

      <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#111111] border border-[#333333] rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-bold font-outfit mb-4 text-white">Basic Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-[#a0a0a0] mb-1">Product Name</label>
            <input 
              name="name" 
              required 
              className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg px-4 py-2 text-white focus:border-brand-gold transition-colors appearance-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#a0a0a0] mb-1">Category</label>
            <select 
              name="category" 
              required 
              className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg px-4 py-2 text-white focus:border-brand-gold transition-colors appearance-none"
            >
               <option value="emblems">Emblems</option>
               <option value="mirror-caps">Mirror Caps</option>
               <option value="accessories">Accessories</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#a0a0a0] mb-1">Description</label>
            <textarea 
              name="description" 
              rows={4} 
              className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg px-4 py-2 text-white focus:border-brand-gold transition-colors appearance-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111111] border border-[#333333] rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-bold font-outfit mb-4 text-white">Pricing & Inventory</h3>
            
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-1">Price ($)</label>
              <input 
                name="price" 
                type="number" 
                step="0.01" 
                required 
                className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg px-4 py-2 text-white focus:border-brand-gold transition-colors appearance-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-1">Stock Quantity</label>
              <input 
                name="stock" 
                type="number" 
                defaultValue="10" 
                required 
                className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg px-4 py-2 text-white focus:border-brand-gold transition-colors appearance-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-1">SKU</label>
              <input 
                name="sku" 
                className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg px-4 py-2 text-white focus:border-brand-gold transition-colors appearance-none"
              />
            </div>
          </div>
          
          <div className="bg-[#111111] border border-[#333333] rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-bold font-outfit mb-4 text-white">Media (Image URLs)</h3>
            
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-1">Primary Image URL</label>
              <input 
                name="imageUrl" 
                placeholder="https://..." 
                className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg px-4 py-2 text-white focus:border-brand-gold transition-colors appearance-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
