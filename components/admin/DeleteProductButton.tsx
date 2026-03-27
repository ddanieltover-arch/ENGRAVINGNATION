'use client';

import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { deleteProduct } from '@/app/admin/actions';

export default function DeleteProductButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      startTransition(async () => {
        const result: any = await deleteProduct(productId);
        if (result && !result.success) {
          alert('Failed to delete: ' + (result.error || 'Unknown error'));
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className={`text-[#a0a0a0] hover:text-red-500 transition-colors bg-[#222222] p-2 rounded-lg ${isPending ? 'opacity-50' : ''}`}
      title="Delete Product"
    >
      <Trash2 size={16} />
    </button>
  );
}
