'use client';

import { useState } from 'react';
import { updateOrderStatus } from '@/app/admin/actions';

export default function OrderStatusSelect({ orderId, initialStatus }: { orderId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setIsUpdating(true);
    
    const result = await updateOrderStatus(orderId, newStatus);
    if (!result.success) {
      alert('Failed to update status');
      setStatus(initialStatus); // Revert on failure
    }
    
    setIsUpdating(false);
  };

  const statusStyles: Record<string, string> = {
    'pending_payment': 'bg-[#1a1a1a] text-amber-500 border-amber-500/30',
    'processing': 'bg-[#1a1a1a] text-blue-500 border-blue-500/30',
    'shipped': 'bg-[#1a1a1a] text-green-500 border-green-500/30',
    'delivered': 'bg-[#1a1a1a] text-white border-[#333333]',
    'cancelled': 'bg-[#1a1a1a] text-red-500 border-red-500/30',
  };

  return (
    <select 
      value={status} 
      onChange={handleChange}
      disabled={isUpdating}
      className={`text-xs font-medium px-2 py-1 rounded-lg border outline-none cursor-pointer appearance-none ${statusStyles[status] || statusStyles['pending_payment']} ${isUpdating ? 'opacity-50' : ''}`}
    >
      <option value="pending_payment">Pending Payment</option>
      <option value="processing">Processing</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}
