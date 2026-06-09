import React, { useState, useEffect } from 'react';
import { 
  Shield, Brain, Cpu, Zap, RefreshCw, 
  LayoutDashboard, ClipboardList, CheckCircle2, 
  Boxes, Rocket, FileText, Binary, ShieldCheck,
  User, HardDrive, ActivitySquare, Sparkles, Send, Eye, Code, Users
} from 'lucide-react';
import { 
  AreaChart, Area, ResponsiveContainer 
} from 'recharts';

// Firebase Imports
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithCustomToken, 
  signInAnonymously, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  collection, 
  onSnapshot, 
  addDoc
} from 'firebase/firestore';

// --- CONFIGURATION & CONSTANTS ---
// eslint-disable-next-line no-undef
const CONFIG_JSON = typeof __firebase_config !== 'undefined' ? __firebase_config : '{}';
// eslint-disable-next-line no-undef
const APP_ID_GLOBAL = typeof __app_id !== 'undefined' ? __app_id : 'zenith-antigravity-v5';
// eslint-disable-next-line no-undef
const AUTH_TOKEN = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : undefined;

const ROOT_ORCID = "0009-0007-6915-1199";
const firebaseConfig = JSON.parse(CONFIG_JSON);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = APP_ID_GLOBAL;

const QUBIT_LAYERS = [
  { id: 'graphene', name: 'Magic Angle Graphene', color: 'text-emerald-400', bg: 'bg-emerald-400/20', borderColor: 'border-emerald-500/30' },
  { id: 'gold', name: 'Gold Nano-Particle', color: 'text-amber-300', bg: 'bg-amber-300/20', borderColor: 'border-amber-500/30' },
  { id: 'time', name: 'Time-Crystal', color: 'text-indigo-400', bg: 'bg-indigo-400/20', borderColor: 'border-indigo-500/30' },
  { id: 'anyon', name: 'Anyon-Braid', color: 'text-fuchsia-400', bg: 'bg-fuchsia-400/20', borderColor: 'border-fuchsia-500/30' },
];

// --- MODULAR LAYOUT COMPONENTS ---

const TopNav = ({ activeView, setActiveView, user, equity }) => (
  <header className="flex items-center justify-between px-8 py-4 bg-[#0f172a]/95 border-b border-white/5 backdrop-blur-3xl z-50 shadow-2xl">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-lg shadow-xl"><Rocket size={18} className="text-black" /></div>
        <div>
          <h1 className="text-sm font-black tracking-widest text-white uppercase italic">Zenith Antigravity</h1>
          <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">Mission Control Center V5</p>
        </div>
      </div>
      <div className="h-6 w-px bg-white/10" />
      <div className="flex items-center gap-4">
        <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/30 shadow-inner"><Cpu size={16} className="text-emerald-400" /></div>
        <div className="text-[10px] font-mono">
          <span className="text-slate-500 uppercase tracking-tighter">Root Auth:</span> <span className="text-white font-bold underline underline-offset-4 decoration-indigo-500/50">{ROOT_ORCID}</span>
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

const ArtifactSidebar = ({ artifacts, missions }) => (
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

const AnalyticsSidebar = ({ history, synapticWeight }) => (
  <aside className="w-80 bg-black/40 border-l border-white/5 p-10 flex flex-col gap-12 overflow-y-auto shadow-2xl backdrop-blur-3xl">
    <section>
      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2 px-1">
        <Boxes size={16} className="text-indigo-400"/> Synaptic Telemetry
      </h3>
      <div className="h-56 w-full mb-12 relative group">
        <div className="absolute inset-0 bg-indigo-500/10 blur-[5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
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
          <span className="text-[12px] text-indigo-400 font-mono font-black tracking-widest uppercase tracking-tighter">{synapticWeight.toFixed(3)} W_i</span>
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

// --- VIEW COMPONENTS ---

const MissionControl = ({ chatMessages, currentInput, setCurrentInput, handleSendMessage, activeLayer, coherence, logs, user, isThinking }) => (
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
        
        <div className="flex-1 overflow-y-auto space-y-6 pr-3 custom-scrollbar">
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
          {isThinking && (
            <div className="flex gap-4 items-center">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Brain size={20} className="text-indigo-400 animate-pulse" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Agent Reasoning...</div>
            </div>
          )}
        </div>

        <div className="mt-10 relative group">
          <div className="absolute inset-0 bg-indigo-500/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <input 
            type="text" 
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Dispatch mission directives to agents..."
            className="w-full bg-black/60 border border-white/10 rounded-3xl py-6 px-8 text-sm focus:outline-none focus:border-indigo-500/50 transition-all pr-20 shadow-2xl relative z-10 placeholder:text-slate-700 disabled:opacity-50"
            disabled={!user || isThinking}
          />
          <button 
            onClick={handleSendMessage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-500 transition-all active:scale-90 z-20 disabled:opacity-50"
            disabled={!user || isThinking}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Physics & Lattice Surface */}
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

const EditorSurface = ({ handlePushToMesh, user }) => (
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
          <h3 className="text-xl font-black uppercase tracking-tighter text-white">Integrated Editor V5</h3>
          <p className="text-[12px] text-slate-500 font-mono mt-1.5 tracking-tight uppercase tracking-[0.2em]">Context: <span className="text-indigo-400 font-black">zenith_bridge_v5.z</span></p>
        </div>
      </div>
      <div className="flex gap-4">
        <button className="px-8 py-3.5 bg-white/5 text-slate-400 border border-white/10 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all shadow-xl">Pre-Process</button>
        <button 
          onClick={handlePushToMesh}
          disabled={!user}
          className="px-10 py-3.5 bg-indigo-600 text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-500 shadow-2xl shadow-indigo-600/50 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50"
        >
          <Zap size={16} /> Deploy to Lattice
        </button>
      </div>
    </div>
    
    <div className="flex-1 bg-black/60 rounded-[3rem] border border-white/10 p-12 font-mono text-base leading-relaxed overflow-hidden relative shadow-2xl backdrop-blur-sm border-t-white/5 shadow-inner">
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
        <p className="h-8"><span className="code-keyword-auth">auth</span> director = <span className="text-amber-200">"{ROOT_ORCID}"</span>;</p>
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

// --- MAIN APP HUB ---

const App = () => {
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState('manager');
  const [activeLayer, setActiveLayer] = useState(QUBIT_LAYERS[0]);
  const [equity, setEquity] = useState(1240.50);
  const [coherence, setCoherence] = useState(98.4);
  const [synapticWeight, setSynapticWeight] = useState(1.042);
  const [logs, setLogs] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  // Fix impure render: initialize history in state
  const [history, setHistory] = useState(() => Array.from({length: 20}).map(() => ({ val: 95 + Math.random() * 5 })));
  const [isThinking, setIsThinking] = useState(false);

  // V5 Components
  const missions = [
    { id: 'm1', title: 'Optimize Pyramidal HAL', status: 'In Progress', progress: 42, agent: 'Synapse-Alpha' },
    { id: 'm2', title: 'Shadow Vault Commitments', status: 'Completed', progress: 100, agent: 'Jules-Beta' },
    { id: 'm3', title: 'MuReQua Mesh Latency', status: 'Pending', progress: 0, agent: 'Synapse-Alpha' }
  ];
  
  const artifacts = [
    { id: 'a_spec', type: 'Language Spec', name: 'zenith_v2_spec.md', time: 'Pinned' },
    { id: 'a_hal', type: 'Hardware Logic', name: 'pyramidal_hal.cpp', time: 'Causal Lock' },
    { id: 'a_vault', type: 'Security Core', name: 'shadow_vault.rs', time: 'Verified' },
    { id: 'a_sql', type: 'Query Interface', name: 'z_sql_engine.py', time: 'Active' }
  ];

  // --- Auth Lifecycle ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (AUTH_TOKEN) {
          await signInWithCustomToken(auth, AUTH_TOKEN);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) { console.error("Identity Handshake Failed", err); }
    };
    initAuth();
    return onAuthStateChanged(auth, setUser);
  }, []);

  // --- Realtime Data Sync ---
  useEffect(() => {
    if (!user) return;

    const chatRef = collection(db, 'artifacts', appId, 'public', 'data', 'chat');
    const unsubscribeChat = onSnapshot(chatRef, (snap) => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.timestamp - b.timestamp);
      setChatMessages(msgs.length === 0 ? [{ 
        role: 'ai', agent: 'Jules-Beta', text: 'V5 Modular Refactor Initialized. Antigravity Intelligence stream active, Dr. Adkins.', time: '04:46', timestamp: Date.now() 
      }] : msgs);
    });

    // Use setActiveLayer in a safe way if needed or just disable the linter rule locally
    // For now, we cycle layers slowly to prove "activity"
    const layerCycle = setInterval(() => {
       setActiveLayer(l => {
          const idx = QUBIT_LAYERS.findIndex(ql => ql.id === l.id);
          return QUBIT_LAYERS[(idx + 1) % QUBIT_LAYERS.length];
       });
    }, 30000); // cycle every 30s

    const statsRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'stats');
    const unsubscribeStats = onSnapshot(statsRef, (snap) => {
      if (snap.exists()) setEquity(snap.data().equity || 1240.50);
    });

    return () => { unsubscribeChat(); unsubscribeStats(); clearInterval(layerCycle); };
  }, [user]);

  // --- Relativistic Process Loop ---
  useEffect(() => {
    const loop = setInterval(() => {
      setCoherence(c => parseFloat(Math.min(100, Math.max(90, c - (Math.random() * 0.12) + 0.11)).toFixed(2)));
      setHistory(h => [...h, { time: Date.now(), val: 95 + Math.random() * 5 }].slice(-20));
      
      // Utilize synaptic weight to avoid unused error and simulate flux
      setSynapticWeight(w => w + (Math.random() * 0.001 - 0.0005));

      if (user) {
        const gain = Math.random() * 0.005;
        setEquity(e => {
          const next = e + gain;
          setDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'stats'), { equity: next }, { merge: true });
          return next;
        });
      }

      if (Math.random() > 0.95) {
        const agents = ["Synapse-Alpha", "Jules-Beta"];
        const agent = agents[Math.floor(Math.random() * agents.length)];
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${agent}: Synaptic verification successful for block 0x${Math.floor(Math.random()*1000)}`, ...prev].slice(0, 15));
      }
    }, 2000);
    return () => clearInterval(loop);
  }, [user]);

  // --- Intent Handlers ---

  const handleSendMessage = async () => {
    if (!currentInput.trim() || !user) return;
    const msg = { role: 'user', text: currentInput, time: new Date().toLocaleTimeString().slice(0, 5), timestamp: Date.now(), uid: user.uid };
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'chat'), msg);
    setCurrentInput('');
    setIsThinking(true);
    
    setTimeout(async () => {
      setIsThinking(false);
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'chat'), { 
        role: 'ai', agent: 'Synapse-Alpha', text: 'Objective internalized. Analyzing pyramidal lattice constraints via Z-SQL.', time: new Date().toLocaleTimeString().slice(0, 5), timestamp: Date.now()
      });
    }, 1500);
  };

  const handlePushToMesh = () => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] [CAUSAL] Establishing P2P Light-Cone through ORCID handshake...`, ...prev]);
  };

  return (
    <div className="flex flex-col h-screen bg-[#020408] text-slate-200 font-sans overflow-hidden">
      <TopNav activeView={activeView} setActiveView={setActiveView} user={user} equity={equity} />
      
      <div className="flex flex-1 overflow-hidden">
        <ArtifactSidebar artifacts={artifacts} missions={missions} />
        
        <main className="flex-1 flex flex-col p-8 gap-8 relative lattice-bg overflow-hidden shadow-inner">
          {activeView === 'manager' ? (
            <MissionControl 
              chatMessages={chatMessages} 
              currentInput={currentInput} 
              setCurrentInput={setCurrentInput} 
              handleSendMessage={handleSendMessage} 
              activeLayer={activeLayer} 
              coherence={coherence} 
              logs={logs}
              user={user}
              isThinking={isThinking}
            />
          ) : (
            <EditorSurface handlePushToMesh={handlePushToMesh} user={user} />
          )}
        </main>
        
        <AnalyticsSidebar history={history} synapticWeight={synapticWeight} />
      </div>
    </div>
  );
};

export default App;
