import React from 'react';
import { Brain, Sparkles, Users, Send, User, ActivitySquare, Cpu, RefreshCw } from 'lucide-react';

export const MissionControl = ({ 
  chatMessages, 
  currentInput, 
  setCurrentInput, 
  handleSendMessage, 
  activeLayer, 
  coherence, 
  logs 
}) => {
  return (
    <div className="flex-1 flex flex-col gap-8 animate-slide-up">
      <div className="grid grid-cols-2 gap-8 flex-1">
        {/* Agent Activity Console */}
        <div className="bg-[#0f172a]/80 rounded-[3rem] border border-white/10 p-8 flex flex-col shadow-2xl backdrop-blur-3xl overflow-hidden border-t-white/20">
           <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shadow-2xl">
                  <Brain size={28} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-[0.1em] text-white">Mission Agent Manager</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                    <p className="text-[10px] text-slate-500 font-mono uppercase font-bold tracking-widest">ORCID AUTHORIZED // PARALLEL-3</p>
                  </div>
                </div>
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto space-y-6 pr-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center border shadow-xl ${msg.role === 'ai' ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-400' : 'bg-emerald-600/20 border-emerald-500/30 text-emerald-400'}`}>
                    {msg.role === 'user' ? <User size={20}/> : msg.agent === 'Jules-Beta' ? <Sparkles size={20}/> : <Users size={20}/>}
                  </div>
                  <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-[12px] leading-relaxed shadow-2xl border ${msg.role === 'ai' ? 'bg-white/5 border-white/5 text-indigo-100' : 'bg-indigo-600 border-indigo-500 text-white'}`}>
                     {msg.agent && <p className="text-[9px] font-black uppercase mb-2 opacity-60 tracking-widest border-b border-white/10 pb-1.5">{msg.agent}</p>}
                     {msg.text}
                  </div>
                </div>
              ))}
           </div>

           <div className="mt-10 relative group">
              <div className="absolute inset-0 bg-indigo-500/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <input 
                type="text" 
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Dispatch mission directives to agents..."
                className="w-full bg-black/60 border border-white/10 rounded-3xl py-6 px-8 text-sm focus:outline-none focus:border-indigo-500/50 transition-all pr-20 shadow-2xl relative z-10 placeholder:text-slate-700"
              />
              <button 
                onClick={handleSendMessage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-500 transition-all active:scale-90 z-20"
              >
                <Send size={20} />
              </button>
           </div>
        </div>

        {/* Verification & Physics Surface */}
        <div className="bg-[#0f172a]/80 rounded-[3rem] border border-white/10 p-8 flex flex-col shadow-2xl backdrop-blur-3xl relative overflow-hidden group border-t-white/20">
           <div className="flex items-center justify-between mb-10 relative z-10">
              <h3 className="text-base font-black uppercase tracking-[0.1em] flex items-center gap-3">
                <ActivitySquare size={22} className="text-emerald-400" /> Physics Engine Surface
              </h3>
              <div className="flex gap-2">
                <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-[10px] text-emerald-400 font-black uppercase tracking-tighter shadow-xl backdrop-blur-xl">8024x8000 Verified</div>
              </div>
           </div>

           <div className="flex-1 flex flex-col items-center justify-center relative">
              <div className="relative w-80 h-80 flex items-center justify-center">
                 <div className="absolute inset-0 border border-white/10 rounded-full animate-spin-slow opacity-20" />
                 <div className="w-64 h-64 border-2 border-indigo-500/20 rounded-[3.5rem] flex items-center justify-center rotate-45 animate-pulse shadow-[0_0_120px_rgba(79,70,229,0.15)] bg-indigo-500/5">
                    <div className="w-44 h-44 bg-indigo-600/10 border-4 border-double border-indigo-400/40 rounded-[2.5rem] flex items-center justify-center">
                       <Cpu size={64} className="text-indigo-400/30 -rotate-45" />
                    </div>
                 </div>
              </div>
              <div className="mt-12 text-center relative z-10">
                 <p className={`text-4xl font-black uppercase tracking-tighter ${activeLayer.color} drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>{activeLayer.name}</p>
                 <p className="text-[12px] text-slate-500 font-mono mt-3 opacity-80 uppercase tracking-[0.3em]">MuReQua Protocol Active</p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6 mt-10 relative z-10">
              <div className="p-6 rounded-[2rem] bg-black/50 border border-white/10 shadow-2xl backdrop-blur-3xl group hover:border-emerald-500/30 transition-all">
                <p className="text-[11px] text-slate-500 font-black uppercase mb-2 opacity-70 tracking-widest">Spin Coherence</p>
                <p className="text-3xl font-mono text-emerald-400 font-black tracking-tight">{coherence}%</p>
              </div>
              <div className="p-6 rounded-[2rem] bg-black/50 border border-white/10 shadow-2xl backdrop-blur-3xl group hover:border-indigo-500/30 transition-all">
                <p className="text-[11px] text-slate-500 font-black uppercase mb-2 opacity-70 tracking-widest">HAL Status</p>
                <p className="text-3xl font-mono text-indigo-400 font-black tracking-tight uppercase">OK</p>
              </div>
           </div>
        </div>
      </div>

      {/* MuReQua Relay Bar */}
      <div className="h-36 bg-[#0f172a]/95 rounded-[2.5rem] border border-white/10 p-6 font-mono text-[11px] overflow-hidden shadow-2xl backdrop-blur-3xl border-t-white/10">
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
          <span className="text-slate-500 uppercase tracking-[0.2em] flex items-center gap-3 font-black">
            <RefreshCw size={14} className="animate-spin text-indigo-500" /> Relay Stream: MuReQua-V5
          </span>
          <div className="flex items-center gap-6">
            <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">SHA-3 VAULT SYNCED</span>
            <span className="text-indigo-400 font-black uppercase tracking-widest px-3 py-1 bg-indigo-500/10 rounded-lg border border-indigo-500/20">CAUSALITY: LOCKED</span>
          </div>
        </div>
        <div className="space-y-2 overflow-y-auto h-16 scrollbar-hide">
          {logs.map((l, i) => (
            <div key={i} className="text-slate-400 border-l-4 border-indigo-500/40 pl-5 py-0.5 animate-in slide-in-from-left duration-300 hover:text-white transition-colors cursor-default">
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
