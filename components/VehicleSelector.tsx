'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VehicleSelector() {
  const router = useRouter();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (make) params.set('make', make);
    if (model) params.set('model', model);
    if (year) params.set('year', year);
    router.push(`/products?${params.toString()}`);
  };

  // Specialty focus makes
  const makes = ['GMC', 'Chevrolet', 'Ford', 'Ram'];
  const models = make === 'Chevrolet' ? ['Silverado 1500', 'Silverado 2500', 'Tahoe', 'Suburban'] :
                 make === 'GMC' ? ['Sierra 1500', 'Sierra 2500', 'Yukon', 'Yukon XL'] : 
                 make === 'Ford' ? ['F-150', 'F-250', 'F-350', 'Explorer', 'Expedition'] :
                 make === 'Ram' ? ['1500', '2500', '3500'] : [];

  return (
    <div className="glass-card p-10 mb-8 mt-4 rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold/40"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-heading font-black tracking-tighter uppercase italic text-white mb-2">
            Find <span className="text-brand-gold">Your Fit</span>
          </h2>
          <p className="text-xs text-white/40 uppercase tracking-[0.3em] font-medium">Select your vehicle details below</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        <div className="flex flex-col gap-3">
          <label className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Vehicle Make</label>
          <div className="relative">
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/50 transition-all cursor-pointer hover:bg-white/10"
              value={make}
              onChange={(e) => { setMake(e.target.value); setModel(''); setYear(''); }}
            >
              <option value="" className="bg-brand-bg">Select Make</option>
              {makes.map(m => <option key={m} value={m} className="bg-brand-bg">{m}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <label className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Model</label>
          <div className="relative">
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/50 transition-all cursor-pointer disabled:opacity-30 hover:bg-white/10"
              value={model}
              onChange={(e) => { setModel(e.target.value); setYear(''); }}
              disabled={!make}
            >
              <option value="" className="bg-brand-bg">Select Model</option>
              {models.map(m => <option key={m} value={m} className="bg-brand-bg">{m}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <label className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Year</label>
          <div className="relative">
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/50 transition-all cursor-pointer disabled:opacity-30 hover:bg-white/10"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={!model}
            >
              <option value="" className="bg-brand-bg">Select Year</option>
              {[2024, 2023, 2022, 2021, 2020].map(y => <option key={y} value={y} className="bg-brand-bg">{y}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
        
        <button 
          className="btn-primary w-full h-[60px] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
          disabled={!make}
          onClick={handleSearch}
        >
          Search Inventory
        </button>
      </div>
    </div>
  );
}
