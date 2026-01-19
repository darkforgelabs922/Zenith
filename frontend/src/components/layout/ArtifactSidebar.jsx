import React from 'react';
import { ClipboardList, CheckCircle2, FileText, Binary, ShieldCheck } from 'lucide-react';

export const ArtifactSidebar = ({ artifacts, missions }) => {
  return (
    <aside className="w-72 bg-black/40 border-r border-white/5 p-6 flex flex-col gap-10 overflow-y-auto">
      <div>
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2 px-1">
          <ClipboardList size={14} className="text-indigo-500" /> Integrated Artifacts
        </h2>
        <div className="space-y-4">
          {artifacts.map(art => (
            <div key={art.id} className="artifact-card p-4 rounded-2xl border border-white/5 bg-white/5 cursor-pointer relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                {art.type.includes('Spec') ? <FileText size={12}/> : art.type.includes('Hardware') ? <Binary size={12}/> : <ShieldCheck size={12}/>}
              </div>
              <div className="flex items-center justify-between mb-2 relative z-10">
                <span className="text-[8px] text-indigo-400 font-black uppercase tracking-widest">{art.type}</span>
                <span className="text-[8px] text-slate-600 font-mono">{art.time}</span>
              </div>
              <div className="flex items-center gap-2.5 relative z-10">
                <CheckCircle2 size={14} className="text-emerald-500/80" />
                <span className="text-[11px] text-slate-300 font-bold truncate">{art.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-white/5">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 px-1">Mission Pipelines</h2>
        <div className="space-y-6">
          {missions.map(m => (
            <div key={m.id} className="px-1 group">
              <div className="flex justify-between text-[11px] mb-2.5 items-center">
                <span className="text-slate-300 font-bold group-hover:text-white transition-colors">{m.title}</span>
                <span className={`text-[8px] px-2 py-0.5 rounded-full font-black border ${m.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'}`}>
                  {m.agent}
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5">
                <div className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000" style={{ width: `${m.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
