import Link from 'next/link';
import { ArrowLeft, User, MapPin, Mail, Phone, Package, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';
import OrderStatusSelect from '@/components/admin/OrderStatusSelect';
import { getOrders } from '@/lib/data';



export const revalidate = 0;

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const orders = await getOrders();
  const order = orders.find((o: any) => o.id === id);


  if (!order) {
    notFound();
  }

  let items = [];
  try {
    items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
  } catch (e) {
    items = [];
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center space-x-4">
           <Link href="/admin/orders" className="bg-[#222222] p-2 rounded-lg text-[#a0a0a0] hover:text-white transition-colors">
             <ArrowLeft size={20} />
           </Link>
           <h2 className="text-2xl md:text-3xl font-outfit font-bold text-white">
             Order <span className="text-brand-gold">#{order.id.slice(0, 8)}</span>
           </h2>
         </div>
         <div>
           <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111111] border border-[#333333] rounded-xl p-6">
            <h3 className="text-xl font-bold font-outfit mb-4 text-white flex items-center">
              <Package className="mr-2 text-brand-gold" size={20} />
              Order Items
            </h3>
            <div className="space-y-4">
              {items && items.length > 0 ? (
                items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b border-[#222222] last:border-0 last:pb-0">
                    <div className="flex items-center space-x-4">
                      {item.image && (
                        <div className="w-16 h-16 bg-[#1a1a1a] rounded-lg overflow-hidden shrink-0 border border-[#333333]">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        {item.customText && (
                          <p className="text-sm text-[#a0a0a0] mt-1">Engraving: <span className="text-white italic">"{item.customText}"</span></p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">${(item.price || 0).toFixed(2)}</p>
                      <p className="text-sm text-[#a0a0a0]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#a0a0a0] italic">No items found details.</p>
              )}
            </div>
            
            <div className="flex justify-between items-center bg-brand-gold/10 p-4 rounded-lg border border-brand-gold/20">
               <span className="font-outfit font-bold text-lg text-white">Grand Total</span>
               <span className="text-2xl font-bold text-brand-gold">${(order.grand_total || 0).toFixed(2)}</span>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111111] border border-[#333333] rounded-xl p-6">
             <h3 className="text-xl font-bold font-outfit mb-4 text-white flex items-center">
               <User className="mr-2 text-brand-gold" size={20} />
               Customer Info
             </h3>
             <div className="space-y-3 text-sm">
               <div className="flex items-center space-x-3 text-[#a0a0a0]">
                 <User size={16} />
                 <span className="text-white">{order.customer_name}</span>
               </div>
               <div className="flex items-center space-x-3 text-[#a0a0a0]">
                 <Mail size={16} />
                 <a href={`mailto:${order.email}`} className="text-brand-gold hover:underline">{order.email}</a>
               </div>
               <div className="flex items-center space-x-3 text-[#a0a0a0]">
                 <Phone size={16} />
                 <a href={`tel:${order.phone}`} className="text-white hover:text-brand-gold break-all">{order.phone || 'N/A'}</a>
               </div>
             </div>
          </div>

          <div className="bg-[#111111] border border-[#333333] rounded-xl p-6">
             <h3 className="text-xl font-bold font-outfit mb-4 text-white flex items-center">
               <MapPin className="mr-2 text-brand-gold" size={20} />
               Shipping Address
             </h3>
             <address className="not-italic text-sm text-[#a0a0a0] space-y-1">
               <p className="text-white">{order.customer_name}</p>
               <p>{order.address}</p>
               {(order.city || order.zip) && (
                 <p>{order.city}, {order.zip}</p>
               )}
               <p>{order.country || 'US'}</p>
             </address>
          </div>

          <div className="bg-[#111111] border border-[#333333] rounded-xl p-6">
             <h3 className="text-xl font-bold font-outfit mb-4 text-white flex items-center">
               <Calendar className="mr-2 text-brand-gold" size={20} />
               Order Info
             </h3>
             <div className="space-y-2 text-sm">
               <div className="flex justify-between">
                 <span className="text-[#a0a0a0]">Date Placed</span>
                 <span className="text-white">{new Date(order.created_at).toLocaleString()}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-[#a0a0a0]">Payment Method</span>
                 <span className="text-white capitalize">{order.payment_method || 'Offline'}</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
