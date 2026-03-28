import OrderStatusSelect from '@/components/admin/OrderStatusSelect';
import Link from 'next/link';
import { ShoppingCart, Eye, Package, Clock, CheckCircle, AlertCircle, Mail, Calendar } from 'lucide-react';
import { getOrders } from '@/lib/data';

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await getOrders();


  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-outfit font-black text-transparent bg-clip-text bg-linear-to-r from-brand-gold to-[#e6c25e] uppercase tracking-tighter italic">Orders</h1>
          <p className="text-white/40 mt-1">Track and manage customer purchases</p>
        </div>
      </div>

      <div className="bg-[#111111] border border-[#333333] rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#333333] text-[#a0a0a0] bg-[#1a1a1a]">
                <th className="py-4 px-6 font-medium">Order ID</th>
                <th className="py-4 px-6 font-medium">Customer</th>
                <th className="py-4 px-6 font-medium">Date</th>
                <th className="py-4 px-6 font-medium">Total</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((order: any) => (
                    <tr key={order.id} className="border-b border-[#222222] hover:bg-[#222222]/50 transition-colors">

                     <td className="py-4 px-6 font-mono text-xs text-[#a0a0a0]" title={order.id}>{order.id.slice(0, 8)}...</td>
                     <td className="py-4 px-6">
                       <div className="font-semibold text-white">{order.firstName} {order.lastName}</div>
                       <div className="flex items-center space-x-2 text-xs text-[#a0a0a0] mt-1">
                         <Mail size={12} />
                         <span>{order.email}</span>
                       </div>
                     </td>
                     <td className="py-4 px-6 text-sm">
                       <div className="flex items-center space-x-2 text-[#a0a0a0]">
                         <Calendar size={14} />
                         <span>{new Date(order.created_at).toLocaleDateString()}</span>
                       </div>
                     </td>
                     <td className="py-6 px-4 font-mono font-bold text-brand-gold">
                        ${(order.total_amount || 0).toFixed(2)}
                      </td>
                     <td className="py-4 px-6">
                       <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
                     </td>
                     <td className="py-6 px-4 text-right">
                       <Link href={`/admin/orders/${order.id}`} className="text-white/20 hover:text-brand-gold transition-colors inline-block">
                         <Eye size={18} />
                       </Link>
                     </td>
                   </tr>
                 ))
               ) : (
                 <tr>
                   <td colSpan={6} className="py-12 text-center text-[#a0a0a0] italic">
                     No orders found.
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
