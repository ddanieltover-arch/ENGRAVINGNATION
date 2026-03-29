import { Settings as SettingsIcon } from 'lucide-react';

export const metadata = {
  title: 'Settings | Admin Dashboard',
};

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 relative">
        <div className="absolute inset-0 border border-brand-gold/30 rounded-2xl animate-spin-slow"></div>
        <SettingsIcon size={40} className="text-brand-gold" />
      </div>
      
      <h2 className="text-4xl font-outfit font-black text-transparent bg-clip-text bg-linear-to-r from-brand-gold to-[#e6c25e] uppercase tracking-tighter italic mb-4">
        Settings Module
      </h2>
      
      <p className="text-[#a0a0a0] max-w-lg text-lg">
        The Global configuration and settings module is currently under development. 
        General store settings, payment gateways, and shipping zones configurations will be available here soon.
      </p>
    </div>
  );
}
