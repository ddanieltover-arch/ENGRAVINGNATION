import Link from 'next/link';
import { Package, ShoppingCart, DollarSign, ArrowUpRight, TrendingUp } from 'lucide-react';
import { getOrders, getProducts } from '@/lib/data';



export const revalidate = 0; // Don't cache admin pages

export default async function AdminDashboard() {
  const orders = await getOrders();
  const allProducts = await getProducts();
  const productsCount = allProducts.length;
  const ordersCount = orders.length;


  const totalRevenue = orders?.reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0) || 0;
  const pendingOrders = orders?.filter((o: any) => o.status === 'pending_payment').length || 0;


  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, trend: 'Last 30 days' },
    { label: 'Total Orders', value: ordersCount || 0, icon: ShoppingCart, trend: 'All time' },
    { label: 'Pending Offline Payments', value: pendingOrders, icon: TrendingUp, trend: 'Action needed' },
    { label: 'Total Products', value: productsCount || 0, icon: Package, trend: 'Live catalog' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
        <h1 className="text-lg font-outfit font-black text-transparent bg-clip-text bg-linear-to-r from-brand-gold to-[#e6c25e] uppercase tracking-tighter italic">
          Admin Panel
        </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#111111] border border-[#333333] rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-[#a0a0a0] font-medium">{stat.label}</h3>
                <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <Icon size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold text-white relative z-10">{stat.value}</p>
              <p className="text-sm text-[#a0a0a0] mt-2 relative z-10">{stat.trend}</p>
            </div>
          );
        })}
      </div>
      
      <div className="bg-[#111111] border border-[#333333] rounded-xl p-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold font-outfit">Recent Orders</h3>
          <Link href="/admin/orders" className="text-sm text-brand-gold hover:underline font-medium">
            View All Orders
          </Link>
        </div>
        {orders && orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-[#333333] text-[#a0a0a0]">
                   <th className="py-3 px-4 font-medium">Order ID</th>
                   <th className="py-3 px-4 font-medium">Date</th>
                   <th className="py-3 px-4 font-medium">Status</th>
                   <th className="py-3 px-4 font-medium">Total</th>
                 </tr>
               </thead>
               <tbody>
                 {orders.slice(0, 5).map((order: any) => (
                   <tr key={order.id} className="hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0">

                     <td className="py-3 px-4 font-mono text-xs text-[#a0a0a0]">{order.id.slice(0,8)}...</td>
                     <td className="py-3 px-4 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                     <td className="py-3 px-4">
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                         order.status === 'pending_payment' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                         order.status === 'processing' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                         'bg-green-500/10 text-green-500 border border-green-500/20'
                       }`}>
                         {order.status}
                       </span>
                     </td>
                     <td className="py-3 px-4 font-mono text-brand-gold">${(order.total_amount || 0).toFixed(2)}</td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-[#a0a0a0] border border-dashed border-[#333333] rounded-lg">
            No recent orders found.
          </div>
        )}
      </div>
    </div>
  );
}
