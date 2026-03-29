'use client';

import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { deleteOrderAction } from '@/app/admin/actions';

export default function DeleteOrderButton({ id, redirectUrl }: { id: string, redirectUrl?: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Are you sure you want to completely delete this order? This cannot be undone.')) {
      startTransition(async () => {
        const res = await deleteOrderAction(id);
        if (res?.error) {
          alert('Failed to delete order: ' + res.error);
        } else if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500/50 hover:text-red-500 transition-colors disabled:opacity-50"
      title="Delete Order"
    >
      <Trash2 size={18} />
    </button>
  );
}
