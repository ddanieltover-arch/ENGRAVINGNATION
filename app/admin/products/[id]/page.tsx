import Link from 'next/link';
import { X } from 'lucide-react';
import EditProductForm from '@/components/admin/EditProductForm';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/data';


export const revalidate = 0;

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const products = await getProducts();
  const product = products.find((p: any) => p.slug === id || p.id === id);


  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-outfit font-black text-transparent bg-clip-text bg-linear-to-r from-brand-gold to-[#e6c25e] uppercase tracking-tighter italic">
          Edit Product
        </h2>
        <div className="flex space-x-3">
          <Link 
            href="/admin/products"
            className="px-4 py-2 rounded-lg border border-[#333333] text-[#a0a0a0] hover:text-white transition-colors flex items-center space-x-2"
          >
            <X size={18} />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>

      <EditProductForm product={product} />
    </div>
  );
}
