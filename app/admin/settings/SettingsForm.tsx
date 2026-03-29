'use client';

import { useState } from 'react';
import { saveSettingsAction } from '@/app/admin/actions';
import { Plus, Trash2, Save, CreditCard, Truck } from 'lucide-react';

export default function SettingsForm({ initialSettings }: { initialSettings: any }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await saveSettingsAction(settings);
      if (res?.error) {
        alert('Failed to save settings: ' + res.error);
      } else {
        alert('Settings securely saved and applied to checkout!');
      }
    } catch (e) {
       alert('An unexpected error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  const updatePaymentMethod = (index: number, key: string, value: string) => {
    const newSettings = { ...settings };
    newSettings.payment_methods[index][key] = value;
    setSettings(newSettings);
  };

  const addPaymentMethod = () => {
    setSettings({
      ...settings,
      payment_methods: [
        ...settings.payment_methods,
        { id: `method-${Date.now()}`, name: 'New Method', type: 'manual', instructions: '' }
      ]
    });
  };

  const removePaymentMethod = (index: number) => {
    const newSettings = { ...settings };
    newSettings.payment_methods.splice(index, 1);
    setSettings(newSettings);
  };

  const updateShippingZone = (index: number, key: string, value: string | number) => {
    const newSettings = { ...settings };
    newSettings.shipping_zones[index][key] = value;
    setSettings(newSettings);
  };

  const addShippingZone = () => {
    setSettings({
      ...settings,
      shipping_zones: [
        ...settings.shipping_zones,
        { id: `zone-${Date.now()}`, name: 'New Shipping Zone', cost: 0.00 }
      ]
    });
  };

  const removeShippingZone = (index: number) => {
    const newSettings = { ...settings };
    newSettings.shipping_zones.splice(index, 1);
    setSettings(newSettings);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-end">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-brand-gold text-black font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50 flex items-center"
        >
          <Save size={18} className="mr-2" />
          {isSaving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>

      <div className="bg-[#111111] border border-[#222222] rounded-2xl p-8">
        <div className="flex items-center justify-between border-b border-[#222222] pb-6 mb-6">
          <h2 className="text-2xl font-outfit font-bold flex items-center text-white">
            <CreditCard className="mr-3 text-brand-gold" size={24} />
            Payment Methods
          </h2>
          <button onClick={addPaymentMethod} className="text-brand-gold hover:text-white flex items-center text-sm font-bold uppercase tracking-wider">
            <Plus size={16} className="mr-1" /> Add Method
          </button>
        </div>

        <div className="space-y-6">
          {settings.payment_methods.map((method: any, idx: number) => (
            <div key={idx} className="bg-[#1a1a1a] border border-[#333333] rounded-xl p-6 relative group">
              <button 
                onClick={() => removePaymentMethod(idx)} 
                className="absolute top-4 right-4 text-[#555555] hover:text-red-500 transition-colors"
                title="Delete Method"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#a0a0a0] mb-2 font-bold">Display Name</label>
                  <input type="text" value={method.name} onChange={(e) => updatePaymentMethod(idx, 'name', e.target.value)} className="w-full bg-[#111111] border border-[#333333] rounded-lg p-3 text-white focus:border-brand-gold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#a0a0a0] mb-2 font-bold">Internal ID / Type</label>
                  <input type="text" value={method.id} onChange={(e) => updatePaymentMethod(idx, 'id', e.target.value)} className="w-full bg-[#111111] border border-[#333333] rounded-lg p-3 text-white focus:border-brand-gold focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#a0a0a0] mb-2 font-bold">Customer Instructions</label>
                <textarea value={method.instructions} onChange={(e) => updatePaymentMethod(idx, 'instructions', e.target.value)} rows={2} className="w-full bg-[#111111] border border-[#333333] rounded-lg p-3 text-white focus:border-brand-gold focus:outline-none" placeholder="e.g. Send payment to $CashTag"></textarea>
              </div>
            </div>
          ))}
          {settings.payment_methods.length === 0 && <p className="text-[#a0a0a0] italic py-4">No payment methods configured.</p>}
        </div>
      </div>

      <div className="bg-[#111111] border border-[#222222] rounded-2xl p-8">
        <div className="flex items-center justify-between border-b border-[#222222] pb-6 mb-6">
          <h2 className="text-2xl font-outfit font-bold flex items-center text-white">
            <Truck className="mr-3 text-brand-gold" size={24} />
            Shipping Zones
          </h2>
          <button onClick={addShippingZone} className="text-brand-gold hover:text-white flex items-center text-sm font-bold uppercase tracking-wider">
            <Plus size={16} className="mr-1" /> Add Zone
          </button>
        </div>

        <div className="space-y-6">
          {settings.shipping_zones.map((zone: any, idx: number) => (
            <div key={idx} className="bg-[#1a1a1a] border border-[#333333] rounded-xl p-6 relative group flex flex-col md:flex-row gap-6 md:items-end w-full">
              <div className="flex-1">
                <label className="block text-xs uppercase tracking-widest text-[#a0a0a0] mb-2 font-bold">Zone Name</label>
                <input type="text" value={zone.name} onChange={(e) => updateShippingZone(idx, 'name', e.target.value)} className="w-full bg-[#111111] border border-[#333333] rounded-lg p-3 text-white focus:border-brand-gold focus:outline-none" placeholder="e.g. Standard US" />
              </div>
              <div className="w-full md:w-32">
                <label className="block text-xs uppercase tracking-widest text-[#a0a0a0] mb-2 font-bold">Cost ($)</label>
                <input type="number" step="0.01" value={zone.cost} onChange={(e) => updateShippingZone(idx, 'cost', parseFloat(e.target.value) || 0)} className="w-full bg-[#111111] border border-[#333333] rounded-lg p-3 text-white focus:border-brand-gold focus:outline-none" />
              </div>
               <button 
                onClick={() => removeShippingZone(idx)} 
                className="text-[#555555] hover:text-red-500 transition-colors p-3 bg-[#111111] border border-[#333333] rounded-lg"
                title="Delete Zone"
              >
                <Trash2 size={24} />
              </button>
            </div>
          ))}
          {settings.shipping_zones.length === 0 && <p className="text-[#a0a0a0] italic py-4">No shipping zones configured.</p>}
        </div>
      </div>
    </div>
  );
}
