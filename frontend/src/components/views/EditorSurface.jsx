import React from 'react';
import { Code, Zap } from 'lucide-react';
import { ROOT_ORCID } from '../../App'; // We might need to export this or pass as prop

export const EditorSurface = ({ handlePushToMesh, rootOrcid }) => {
  return (
    <div className="flex-1 bg-[#0f172a]/90 rounded-[4rem] border border-white/20 p-12 flex flex-col shadow-2xl backdrop-blur-3xl animate-slide-up relative border-t-white/30">
      <div className="absolute top-12 right-12 flex gap-5 z-10">
         <div className="flex items-center gap-3 px-5 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-[10px] text-emerald-400 font-black uppercase shadow-2xl backdrop-blur-xl">ML-KEM Secure</div>
         <div className="flex items-center gap-3 px-5 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-[10px] text-indigo-400 font-black uppercase shadow-2xl backdrop-blur-xl">ORCID Rooted</div>
      </div>
      
      <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-12">
         <div className="flex items-center gap-8">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl">
               <Code size={32} className="text-indigo-400" />
            </div>
            <div>
               <h3 className="text-xl font-black uppercase tracking-tighter text-white">Integrated Editor</h3>
               <p className="text-[12px] text-slate-500 font-mono mt-1.5 tracking-tight uppercase tracking-[0.2em]">Context: <span className="text-indigo-400 font-black">zenith_bridge_v5.z</span></p>
            </div>
         </div>
         <div className="flex gap-4">
            <button className="px-8 py-3.5 bg-white/5 text-slate-400 border border-white/10 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all shadow-xl">Pre-Process</button>
            <button 
              onClick={handlePushToMesh}
              className="px-10 py-3.5 bg-indigo-600 text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-500 shadow-2xl shadow-indigo-600/50 transition-all active:scale-95 flex items-center gap-3"
            >
              <Zap size={16} /> Deploy to Lattice
            </button>
         </div>
      </div>
      
      <div className="flex-1 bg-black/60 rounded-[3rem] border border-white/10 p-12 font-mono text-base leading-relaxed overflow-hidden relative shadow-2xl backdrop-blur-sm border-t-white/5">
         <div className="absolute top-10 left-10 flex gap-4 opacity-70">
            <div className="w-5 h-5 rounded-full bg-red-500/30 border border-red-500/60" />
            <div className="w-5 h-5 rounded-full bg-amber-500/30 border border-amber-500/60" />
            <div className="w-5 h-5 rounded-full bg-emerald-500/30 border border-emerald-500/60" />
         </div>
         <div className="text-slate-700 select-none border-r border-white/5 pr-10 mr-12 inline-block opacity-40 text-right min-w-[3rem]">
            {Array.from({length: 15}).map((_, i) => <div key={i} className="h-8">{i+1}</div>)}
         </div>
         <div className="inline-block align-top">
            <p className="h-8"><span className="code-keyword-import">import</span> "mu_re_qua" <span className="code-keyword-import">as</span> mesh;</p>
            <p className="h-8"><span className="code-keyword-import">import</span> "pyramidal_hal" <span className="code-keyword-import">as</span> hal;</p>
            <p className="h-8 mt-4"><span className="text-slate-600 italic">// Topological Security Handshake</span></p>
            <p className="h-8"><span className="code-keyword-auth">auth</span> director = <span className="text-amber-200">"{rootOrcid}"</span>;</p>
            <p className="h-8 mt-4"><span className="code-keyword-cognitive">cognitive</span> optimize_lattice(u, v) {"{"}</p>
            <p className="h-8 pl-12"><span className="code-keyword-suggest">suggest</span> {"{"}</p>
            <p className="h-8 pl-24 text-emerald-400">hal.route(coord: (u, v, layer: Anyon));</p>
            <p className="h-8 pl-24 text-emerald-400">mesh.broadcast(state: "synaptic_locked");</p>
            <p className="h-8 pl-12">{"}"}</p>
            <p className="h-8 pl-12"><span className="code-keyword-verify">verify</span> {"{"}</p>
            <p className="h-8 pl-24 text-emerald-400">assert lattice.coherence {">"} 0.98;</p>
            <p className="h-8 pl-12">{"}"}</p>
            <p className="h-8">{"}"}</p>
            <p className="h-8 mt-4 animate-pulse inline-block w-3.5 bg-indigo-500 shadow-[0_0_20px_#6366f1] rounded-sm" />
         </div>
      </div>
    </div>
  );
};
