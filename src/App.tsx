/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Terminal, 
  Lock, 
  Zap, 
  ChevronRight, 
  Copy, 
  Check, 
  Cpu, 
  Activity, 
  Globe, 
  Scale,
  RefreshCw,
  Code
} from 'lucide-react';

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

export default function App() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateKey = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newKey = `enor_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
      setApiKey(newKey);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen blueprint-grid selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 h-20 bg-white/40 backdrop-blur-md border-b border-white/20 px-8 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tighter text-2xl uppercase text-clinical-900">Enor <span className="opacity-30 tracking-normal text-xl">//</span> System</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#blueprint" className="text-[10px] uppercase tracking-widest text-clinical-500 hover:text-clinical-900 transition-colors font-bold">Documentation</a>
            <a href="#integration" className="text-[10px] uppercase tracking-widest text-clinical-500 hover:text-clinical-900 transition-colors font-bold">Protocol</a>
            <a href="#compliance" className="text-[10px] uppercase tracking-widest text-clinical-500 hover:text-clinical-900 transition-colors font-bold">Compliance</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-[10px] font-mono text-clinical-400 opacity-60">UTC {new Date().toISOString().split('T')[1].split('.')[0]}</div>
          <button 
            onClick={() => document.getElementById('api-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2 bg-clinical-900 text-white rounded-full text-[10px] uppercase tracking-widest font-bold hover:scale-105 transition-all"
          >
            Get Started
          </button>
        </div>
      </nav>

      <main className="pt-48 pb-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              show: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS} className="text-6xl lg:text-8xl font-sans font-light tracking-tight text-clinical-900 leading-[1.05] mb-8">
              Objective <br/><span className="text-clinical-400 italic">Intelligence.</span>
            </motion.h1>
            
            <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="text-md text-clinical-500 max-w-md leading-relaxed mb-10 opacity-80">
              Enor is the execution layer for deterministic intelligence. No hallucination, no fluff. Raw, high-availability inference logic for global scale.
            </motion.p>
            
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('api-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-clinical-900 text-white rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-clinical-800 transition-all flex items-center gap-4 shadow-2xl shadow-clinical-900/30"
              >
                Provision API Access <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-10 font-mono text-[11px] relative overflow-hidden shadow-2xl">
               <div className="flex gap-2 mb-8 opacity-30">
                <div className="w-2 h-2 rounded-full bg-clinical-900"></div>
                <div className="w-2 h-2 rounded-full bg-clinical-900"></div>
                <div className="w-2 h-2 rounded-full bg-clinical-900"></div>
              </div>
              <div className="space-y-5 leading-relaxed text-clinical-600">
                <div className="flex justify-between items-center opacity-40 uppercase tracking-widest text-[9px] font-bold">
                  <span>Handshake Protocol :: v4.2</span>
                  <span className="text-emerald-600">Node_Verified</span>
                </div>
                <div className="space-y-2">
                  <div className="text-clinical-400 italic"># Monitoring high-availability inference</div>
                  <div className="p-4 bg-white/30 rounded-2xl border border-white/20 text-clinical-700">
                    <div><span className="text-blue-600">await</span> enor.execute({'{'}</div>
                    <div className="pl-4">model: <span className="text-blue-700">'objective-1'</span>,</div>
                    <div className="pl-4">scrub: <span className="text-blue-700">'PII_LEVEL_3'</span></div>
                    <div>{'}'});</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-600/50 mt-4 animate-pulse">
                  <Activity className="w-3 h-3" />
                  <span>SYSTEM_IDLE // PACKET_WAITING</span>
                </div>
              </div>
            </div>
            {/* Visual background elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>

        {/* The 4 Pillars */}
        <section id="compliance" className="mb-40">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Globe, 
                title: "Data Sovereignty", 
                desc: "Patient data cannot leave geographic boundaries. Compliant with GDPR and HIPAA.",
                tag: "Localized"
              },
              { 
                icon: Activity, 
                title: "Safety Net", 
                desc: "Deterministic safety net converting probabilistic outputs into audited clinical outcomes.",
                tag: "Shield"
              },
              { 
                icon: Lock, 
                title: "Robustness", 
                desc: "Neutralizing malicious commands and jailbreaks before they reach the model.",
                tag: "ISO/IEC"
              },
              { 
                icon: Scale, 
                title: "Fairness", 
                desc: "Active monitoring for demographic anomalies ensuring equitable behavior.",
                tag: "Ethics"
              }
            ].map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/30 backdrop-blur-sm border border-white/30 p-8 rounded-[2rem] hover:bg-white/50 transition-all group shadow-sm"
              >
                <div className="w-14 h-14 bg-white border border-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-6 h-6 text-clinical-900" />
                </div>
                <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-clinical-400 mb-3">{pillar.tag}</div>
                <h3 className="text-xl font-bold text-clinical-900 mb-3 uppercase tracking-tight">{pillar.title}</h3>
                <p className="text-sm text-clinical-500 leading-relaxed font-normal opacity-80">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Integration Model */}
        <section id="integration" className="mb-40">
          <div className="bg-white/30 backdrop-blur-md border border-white/30 rounded-[3rem] p-16 overflow-hidden relative shadow-xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-light tracking-tighter mb-8 text-clinical-900 uppercase">Seamless Protocol</h2>
                <p className="text-clinical-500 mb-10 leading-relaxed text-md opacity-80">
                  Deterministic alignment at the execution layer. Simply redirect your base URL to the Enor gateway. Our middleware handles clinical validation asynchronously.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "10min Deploy",
                    "<10ms Latency",
                    "Rust Core",
                    "Audit Vault"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-clinical-700 bg-white/20 px-6 py-4 rounded-full border border-white/20 transition-all hover:bg-white/40">
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-6 border-b border-clinical-200 pb-6">
                  <div className="flex items-center gap-2">
                    <Terminal className="text-clinical-400 w-4 h-4" />
                    <span className="text-clinical-500 text-[10px] uppercase font-mono tracking-widest font-bold">Terminal_Buffer</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard('curl https://api.enorai.com/v1/chat/completions -H "Authorization: Bearer ENORAI_API_KEY"')}
                    className="text-clinical-400 hover:text-clinical-900 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <pre className="text-xs font-mono leading-relaxed text-clinical-700 overflow-x-auto bg-white/40 p-6 rounded-2xl border border-white/10">
                  <code>{`curl https://api.enorai.com/v1/chat \\
  -H "Authorization: Bearer ENOR_KEY"`}</code>
                </pre>
                
                <div className="mt-6 pt-6 border-t border-clinical-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-clinical-400" />
                    <span className="text-xs text-clinical-400 font-bold uppercase tracking-tighter">Proxied :: Secure</span>
                  </div>
                </div>
                
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* API Generation Section */}
        <section id="api-section" className="mb-40 scroll-mt-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-light tracking-tighter mb-6 text-clinical-900 uppercase">Provision Access</h2>
            <p className="text-clinical-500 mb-12 opacity-80">
              Generate a securely hashed API key bound to a dedicated Tenant ID. Access is subject to BAA/DPA verification.
            </p>
            
            <div className="bg-white/40 backdrop-blur-xl border border-white/40 p-16 rounded-[3rem] relative shadow-2xl">
              <AnimatePresence mode="wait">
                {!apiKey ? (
                  <motion.div 
                    key="generate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-10"
                  >
                    <div className="flex flex-col gap-4 max-w-sm mx-auto">
                      <div className="text-left space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-clinical-500 font-bold ml-6">Node_Identifier</label>
                        <input 
                          type="text" 
                          placeholder="node-alpha-central" 
                          className="w-full bg-white/50 border border-white px-8 py-5 rounded-full text-sm font-mono focus:outline-none focus:ring-4 focus:ring-clinical-900/5 text-clinical-900 transition-all font-bold"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={generateKey}
                      disabled={isGenerating}
                      className="w-full max-w-sm bg-clinical-900 text-white py-6 rounded-full text-xs uppercase tracking-[0.25em] font-bold hover:bg-clinical-800 transition-all shadow-2xl shadow-clinical-900/30 flex items-center justify-center gap-3 mx-auto"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Vaulting...
                        </>
                      ) : (
                        'Generate Credential'
                      )}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <Check className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-light tracking-tighter text-clinical-900 uppercase">Key Provisioned</h3>
                    
                    <div className="relative group max-w-md mx-auto">
                      <div className="w-full bg-white border border-clinical-100 rounded-full py-5 px-10 font-mono text-xs break-all text-clinical-900 pr-16 shadow-lg">
                        {apiKey}
                      </div>
                      <button 
                        onClick={() => copyToClipboard(apiKey)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-clinical-50 hover:bg-clinical-100 rounded-full transition-all text-clinical-400 hover:text-clinical-900"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => setApiKey(null)}
                      className="text-[10px] text-clinical-400 hover:text-clinical-900 transition-colors uppercase tracking-[0.2em] font-bold border-b border-transparent hover:border-clinical-900 pb-1"
                    >
                      Rotate Credential
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="grid lg:grid-cols-2 gap-32 items-center mb-40">
           <div>
             <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-clinical-400 block mb-6">Management_Layer</span>
             <h2 className="text-4xl font-light tracking-tighter text-clinical-900 mb-10 uppercase">Compliance Dashboard</h2>
             <div className="space-y-10">
               {[
                 { title: "The Audit Vault", desc: "Immutable logs required by law for medical defense." },
                 { title: "Clinical Rules", desc: "Internal interface for red lines without engineering overhead." },
                 { title: "Jurisdiction", desc: "Switch frameworks between HIPAA and GDPR instantly." }
               ].map((item) => (
                 <div key={item.title} className="group border-l-2 border-clinical-200 pl-8 hover:border-clinical-900 transition-colors cursor-default">
                   <h4 className="font-bold text-lg text-clinical-900 uppercase tracking-tight mb-2">{item.title}</h4>
                   <p className="text-sm text-clinical-500 opacity-80">{item.desc}</p>
                 </div>
               ))}
             </div>
           </div>
           
           <div className="relative">
             <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-[3rem] overflow-hidden shadow-2xl p-12">
               <div className="flex justify-between items-end mb-12">
                   <div>
                     <div className="text-[9px] text-clinical-500 font-mono uppercase tracking-widest font-bold mb-2">Protocol_Analyzer</div>
                     <div className="text-2xl font-light tracking-tight text-clinical-900 uppercase">Inference_Load</div>
                   </div>
                   <div className="text-right">
                     <div className="text-emerald-600 font-mono text-xl font-bold">99.9%</div>
                     <div className="text-[9px] text-clinical-500 font-mono uppercase tracking-widest font-bold">Availability</div>
                   </div>
               </div>
               
               <div className="space-y-6">
                 {[85, 40, 65].map((w, i) => (
                   <div key={i} className="h-2.5 bg-clinical-100 rounded-full overflow-hidden border border-clinical-200">
                     <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${w}%` }}
                      className={`h-full ${i === 1 ? 'bg-clinical-400/50' : 'bg-clinical-900'}`}
                     />
                   </div>
                 ))}
               </div>
             </div>
           </div>
        </section>
      </main>

      <footer className="border-t border-white/20 py-24 px-8 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono tracking-[0.2em] text-clinical-400 uppercase font-bold">
          <div>ID: EN-OR-0092-ALPHA</div>
          <div className="flex gap-12">
            <span className="hover:text-clinical-900 cursor-pointer transition-colors">Privacy_Vault</span>
            <span className="hover:text-clinical-900 cursor-pointer transition-colors">Nexus_Protocol</span>
            <span className="hover:text-clinical-900 cursor-pointer transition-colors">Safety_Override</span>
          </div>
          <div>© 2026 Enor Industrial Systems</div>
        </div>
      </footer>
    </div>
  );
}
