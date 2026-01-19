import React from 'react';
import { Boxes, Shield, Eye, HardDrive } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export const AnalyticsSidebar = () => {
  return (
    <aside className="w-80 bg-black/40 border-l border-white/5 p-10 flex flex-col gap-12 overflow-y-auto shadow-2xl backdrop-blur-3xl">
       <section>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2 px-1">
            <Boxes size={16} className="text-indigo-400"/> Synaptic Telemetry
          </h3>
          <div className="h-56 w-full mb-12 relative group">
            <div className="absolute inset-0 bg-indigo-500/10 blur-[5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={Array.from({length: 20}).map((_, i) => ({ val: 95 + Math.random() * 5 }))}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="val" stroke="#818cf8" fill="url(#colorVal)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="absolute top-0 right-0 p-4 text-[9px] font-mono text-slate-600 font-black uppercase opacity-60 tracking-widest">REALTIME_HAL_LOAD</div>
          </div>
          <div className="space-y-8 px-1">
             <div className="flex justify-between items-center group">
               <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] group-hover:text-slate-400 transition-colors">Mesh Consensus</span>
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
                  <span className="text-[12px] text-emerald-400 font-mono font-black tracking-widest uppercase tracking-tighter">99.9%</span>
               </div>
             </div>
             <div className="flex justify-between items-center group">
               <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] group-hover:text-slate-400 transition-colors">Vault Weight</span>
               <span className="text-[12px] text-indigo-400 font-mono font-black tracking-widest uppercase tracking-tighter">1.042 W_i</span>
             </div>
          </div>
       </section>

       <section className="bg-indigo-600/10 border border-indigo-500/20 p-10 rounded-[4rem] relative overflow-hidden group shadow-2xl border-t-white/10">
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-indigo-500/20 rounded-full blur-[4rem] group-hover:bg-indigo-500/30 transition-all duration-1000" />
          <div className="flex items-center gap-5 mb-8 relative z-10">
            <div className="w-14 h-14 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-600/40 border border-white/20">
               <Shield size={28} className="text-white" />
            </div>
            <div>
               <h4 className="text-xs font-black text-white uppercase tracking-[0.1em] leading-tight">Antigravity Guard</h4>
               <p className="text-[9px] text-indigo-400 font-black uppercase mt-1 tracking-widest">Active Auditor</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-10 relative z-10 opacity-80 font-medium italic tracking-tight">Autonomous security auditor active. Every agentic suggestion is adversarial-reviewed against root ORCID invariants before commit.</p>
          <button className="w-full bg-white text-black text-[11px] font-black py-5 rounded-[2rem] hover:bg-slate-100 transition-all uppercase tracking-[0.2em] active:scale-95 shadow-2xl shadow-white/5 relative z-10">
            Audit Invariants
          </button>
       </section>

       <div className="mt-auto p-6 bg-black/60 rounded-[2rem] border border-white/5 flex items-center justify-between shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]" />
             <span className="text-[11px] text-slate-500 font-black uppercase tracking-widest">Node 0x9921_A</span>
          </div>
          <div className="flex items-center gap-5">
             <Eye size={16} className="text-slate-600 hover:text-indigo-400 cursor-pointer transition-colors" />
             <HardDrive size={16} className="text-slate-600 hover:text-emerald-400 cursor-pointer transition-colors" />
          </div>
       </div>
    </aside>
  );
};
