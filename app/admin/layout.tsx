import { Metadata } from 'next';
import Sidebar from '@/components/admin/Sidebar';
import MobileAdminMenu from '@/components/admin/MobileAdminMenu';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Engraving Nation',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] bg-[#0a0a0a] text-[#f5f5f5] font-sans antialiased">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <MobileAdminMenu />
      <div className="flex-1 md:ml-64 flex flex-col relative w-full h-full pt-16 md:pt-0">
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
