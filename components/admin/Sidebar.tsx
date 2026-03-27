'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, Ticket } from 'lucide-react';
import clsx from 'clsx';
import { logout } from '@/app/admin/login/actions';


const navItems = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Coupons', href: '/admin/coupons', icon: Ticket },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#111111] border-r border-[#333333] flex flex-col h-[100dvh] fixed top-0 left-0 z-50">
      <div className="p-6 border-b border-[#333333]">
        <h1 className="text-xl font-outfit font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4a017] to-[#e6c25e] uppercase tracking-wider">
          Admin Panel
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive 
                  ? 'bg-gradient-to-r from-[#d4a017]/20 to-transparent text-[#d4a017] border-l-2 border-[#d4a017]' 
                  : 'text-[#a0a0a0] hover:text-[#f5f5f5] hover:bg-[#222222]'
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#333333]">
        <button 
          onClick={() => logout()}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-500 hover:bg-red-500/10 rounded-lg transition-colors group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-medium">Logout Admin</span>
        </button>
      </div>

    </aside>
  );
}
