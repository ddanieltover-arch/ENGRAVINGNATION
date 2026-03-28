import Link from 'next/link';
import { Package, Plus, Search, Filter, MoreVertical, Edit2, Trash2, ExternalLink, Edit } from 'lucide-react';
import DeleteProductButton from '@/components/admin/DeleteProductButton';
import { getProducts } from '@/lib/data';


export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-outfit font-black text-transparent bg-clip-text bg-linear-to-r from-brand-gold to-[#e6c25e] uppercase tracking-tighter italic">Inventory</h1>
          <p className="text-white/40 mt-1">Manage and update your luxury product catalog</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-linear-to-r from-brand-gold to-[#e6c25e] hover:scale-105 transition-all text-black font-black py-4 px-8 rounded-xl shadow-lg shadow-brand-gold/20 flex items-center gap-3 uppercase tracking-widest italic text-sm"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </Link>
      </div>

      <div className="bg-[#111111] border border-[#333333] rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#333333] text-[#a0a0a0] bg-[#1a1a1a]">
                <th className="py-4 px-6 font-medium">Product</th>
                <th className="py-4 px-6 font-medium">SKU</th>
                <th className="py-4 px-6 font-medium">Price</th>
                <th className="py-4 px-6 font-medium">Stock</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((product: any) => (
                  <tr key={product.id} className="border-b border-[#222222] hover:bg-[#222222]/50 transition-colors">

                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#333333] shrink-0 relative">
                           {product.images && product.images[0] ? (
                             <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center text-xs text-[#a0a0a0]">No Img</div>
                           )}
                        </div>
                        <div>
                          <p className="font-semibold text-white line-clamp-1">{product.name}</p>
                          <p className="text-xs text-[#a0a0a0] capitalize">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-sm text-[#a0a0a0]">{product.sku || '-'}</td>
                    <td className="py-4 px-6 text-brand-gold font-mono font-bold">${(product.price || 0).toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock > 10 ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                        product.stock > 0 ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <Link href={`/admin/products/${product.slug || product.id}`} className="text-[#a0a0a0] hover:text-white transition-colors bg-[#222222] p-2 rounded-lg">
                          <Edit size={16} />
                        </Link>
                        <DeleteProductButton productId={product.slug || product.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#a0a0a0] italic">
                    No products found. Add a product to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
