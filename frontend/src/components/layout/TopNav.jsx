import React from 'react';
import { Rocket, Cpu, LayoutDashboard, Code } from 'lucide-react';

export const TopNav = ({ activeView, setActiveView, equity, user, rootOrcid }) => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#0f172a]/95 border-b border-white/5 backdrop-blur-3xl z-50 shadow-2xl">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg shadow-xl"><Rocket size={18} className="text-black" /></div>
          <div>
            <h1 className="text-sm font-black tracking-widest text-white uppercase italic">Zenith Antigravity</h1>
            <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">Mission Control Center</p>
          </div>
        </div>
        <div className="h-6 w-px bg-white/10" />
        <div className="flex items-center gap-4">
           <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/30"><Cpu size={16} className="text-emerald-400" /></div>
           <div className="text-[10px] font-mono">
             <span className="text-slate-500">ROOT AUTHORITY:</span> <span className="text-white font-bold underline underline-offset-4 decoration-indigo-500/50">{rootOrcid}</span>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
        <button 
          onClick={() => setActiveView('manager')}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-500 ${activeView === 'manager' ? 'bg-white text-black shadow-2xl scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <LayoutDashboard size={14} /> Mission Control
        </button>
        <button 
          onClick={() => setActiveView('editor')}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-500 ${activeView === 'editor' ? 'bg-white text-black shadow-2xl scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Code size={14} /> Editor View
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Shadow Equity</p>
          <p className="text-lg font-mono text-emerald-400 font-black">∑ {equity.toFixed(4)}</p>
        </div>
        <div className="h-10 w-10 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-300 shadow-2xl animate-glow">
          {user?.uid?.slice(0, 2).toUpperCase() || '..'}
        </div>
      </div>
    </header>
  );
};
