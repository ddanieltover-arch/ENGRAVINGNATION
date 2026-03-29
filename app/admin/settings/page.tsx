import { getSettings } from '@/lib/data';
import SettingsForm from './SettingsForm';
import { Settings } from 'lucide-react';

export const revalidate = 0;

export default async function SettingsPage() {
  const currentSettings = await getSettings();

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex items-center space-x-4 border-b border-[#222222] pb-6 mb-8">
        <div className="bg-[#222222] p-3 rounded-xl text-brand-gold">
          <Settings size={28} />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-outfit font-black text-white italic tracking-tight">System <span className="text-brand-gold">Settings</span></h1>
          <p className="text-[#a0a0a0] mt-1 text-sm md:text-base">Configure dynamic checkout arrays for payment processors and shipping logistics.</p>
        </div>
      </div>

      <SettingsForm initialSettings={currentSettings} />
    </div>
  );
}
