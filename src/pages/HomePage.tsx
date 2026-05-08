import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cpu, Globe, Brain, ArrowRight, Zap, CheckCircle2, Server, Database, Cloud } from 'lucide-react';

const FEATURES = [
  {
    icon: Shield,
    title: 'PHI Scrubbing',
    description: 'Local tokenization before cloud exposure.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Cpu,
    title: 'Hallucination Intercept',
    description: 'Edge-ML catches unsafe outputs instantly.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Globe,
    title: 'FHIR-Native',
    description: 'First-class HL7 FHIR R4 interoperability.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Brain,
    title: 'Federated Learning',
    description: 'Privacy-preserving training across sites.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
];

const PRICING = [
  {
    name: 'Pay-as-you-go',
    price: '$0.02',
    period: '/call',
    description: 'Includes a 14-day free trial. Perfect for scaling healthcare applications.',
    features: ['Unlimited scaling', 'Ultra-low latency (<10ms)', 'Full HIPAA compliance', 'Community Discord support', 'Basic terminology rules'],
    cta: 'Start free trial',
    highlight: false
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: '/mo',
    description: 'Dedicated infrastructure and SLAs for massive hospital networks.',
    features: ['Unlimited volume included', 'Dedicated local VPC appliance', 'Priority phone & email support', 'Custom regex & terminology', 'BAA & Full Indemnification', 'SOC2 Type II Report'],
    cta: 'Contact sales',
    highlight: true
  }
];

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic transform values for the mesh
  // The scale gets slightly larger and the rotation tilts back as you scroll down
  const scale = 1 + scrollY * 0.0005;
  const rotateX = Math.min(scrollY * 0.05, 50);

  return (
    <div className="min-h-screen relative overflow-hidden bg-doc-bg perspective-1000">
      {/* Dynamic Background Mesh */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center"
        style={{
          transformOrigin: 'top center',
          transform: `translateZ(-100px) rotateX(${rotateX}deg) scale(${scale})`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-[-50%] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-doc-surface/80 backdrop-blur-sm border border-doc-border text-[13px] text-doc-text-secondary mb-8 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-medium">v1.2 now available</span>
              <span className="text-doc-border mx-1">|</span>
              <Link to="/docs/overview" className="text-doc-text hover:text-doc-link transition-colors flex items-center gap-1">
                Read changelog <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[68px] font-bold tracking-tight text-doc-text leading-[1.05] mb-6 drop-shadow-sm">
              Build safe <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-400">
                healthcare AI.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-doc-text-secondary leading-relaxed mb-10 max-w-xl">
              The EnorAI middleware provides deterministic safety rails. Scrub PHI, intercept hallucinations, and stay HIPAA-compliant with just two lines of code.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/docs/api-reference/authentication"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-doc-text text-doc-bg text-[15px] font-medium rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg shadow-md"
              >
                Get API Key
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/docs/overview"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-doc-surface/80 backdrop-blur-sm border border-doc-border text-doc-text text-[15px] font-medium rounded-xl transition-all hover:bg-doc-surface-2 shadow-sm"
              >
                Read the docs
              </Link>
            </div>
          </div>

          {/* Code Demo Window */}
          <div className="relative z-10 w-full rounded-2xl bg-doc-code-bg/95 backdrop-blur-sm border border-doc-code-border shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-2 px-4 py-3 border-b border-doc-code-border bg-doc-code-header-bg/95">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
              </div>
              <div className="mx-auto text-[11px] font-mono text-doc-text-muted">app.py</div>
            </div>
            <div className="p-4 sm:p-6 text-[13px] sm:text-[14px] font-mono leading-loose text-doc-text overflow-x-auto">
              <div><span className="text-pink-500">from</span> enorai <span className="text-pink-500">import</span> EnorAI</div>
              <div className="mt-4"><span className="text-blue-400">client</span> = EnorAI(api_key=<span className="text-emerald-400">"enor_live_..."</span>)</div>
              <div className="mt-4 text-doc-text-muted"># 1. Scrub inbound text</div>
              <div>safe_text = client.inbound.<span className="text-amber-300">tokenize</span>(</div>
              <div className="pl-4">text=<span className="text-emerald-400">"Patient John Doe presents with fever."</span></div>
              <div>)</div>
              <div className="mt-4 text-doc-text-muted"># 2. Call your LLM</div>
              <div>response = openai.ChatCompletion.<span className="text-amber-300">create</span>(</div>
              <div className="pl-4">messages=[&#123;<span className="text-emerald-400">"role"</span>: <span className="text-emerald-400">"user"</span>, <span className="text-emerald-400">"content"</span>: safe_text&#125;]</div>
              <div>)</div>
              <div className="mt-4 text-doc-text-muted"># 3. Validate and re-identify outbound</div>
              <div>final_text = client.outbound.<span className="text-amber-300">detokenize</span>(</div>
              <div className="pl-4">text=response.choices[<span className="text-purple-400">0</span>].message.content</div>
              <div>)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Visualization Section */}
      <section className="relative z-10 py-24 px-6 border-y border-doc-border bg-doc-surface/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-doc-text tracking-tight mb-4">The Security Middleware</h2>
          <p className="text-lg text-doc-text-secondary max-w-2xl mx-auto">
            EnorAI sits securely between your clinical applications and any cloud LLM provider, ensuring real-time data safety.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="grid md:grid-cols-3 gap-6 md:gap-12 items-center">
            
            {/* Left: Client App */}
            <div className="w-full bg-doc-bg/80 backdrop-blur-sm border border-doc-border rounded-2xl p-8 text-center shadow-sm relative z-10">
              <Server className="w-10 h-10 text-blue-500 mx-auto mb-4" />
              <h4 className="font-semibold text-doc-text mb-1">Your App</h4>
              <p className="text-[13px] text-doc-text-muted">Clinical interface</p>
            </div>

            {/* Center: EnorAI Middleware Hub */}
            <div className="w-full flex flex-col gap-6 relative z-10">
              {/* Top: Inbound */}
              <div className="w-full bg-blue-500/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 text-center shadow-sm relative overflow-visible group">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <Shield className="w-8 h-8 text-blue-500 mx-auto mb-3 relative z-10" />
                <h4 className="font-semibold text-blue-500 mb-1 relative z-10">Inbound Scrub</h4>
                <p className="text-[12px] text-blue-500/70 relative z-10">Tokens replace PHI</p>
                {/* Flow Lines */}
                <div className="hidden md:block absolute top-1/2 -left-12 w-12 h-[2px] bg-blue-500/20 overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-flow-right" />
                </div>
                <div className="hidden md:block absolute top-1/2 -right-12 w-12 h-[2px] bg-blue-500/20 overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-flow-right" style={{ animationDelay: '1s' }} />
                </div>
              </div>

              {/* Bottom: Outbound */}
              <div className="w-full bg-purple-500/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 text-center shadow-sm relative overflow-visible group">
                <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <Cpu className="w-8 h-8 text-purple-500 mx-auto mb-3 relative z-10" />
                <h4 className="font-semibold text-purple-500 mb-1 relative z-10">Outbound Validate</h4>
                <p className="text-[12px] text-purple-500/70 relative z-10">Re-identify & check</p>
                {/* Flow Lines */}
                <div className="hidden md:block absolute top-1/2 -right-12 w-12 h-[2px] bg-purple-500/20 overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-flow-left" />
                </div>
                <div className="hidden md:block absolute top-1/2 -left-12 w-12 h-[2px] bg-purple-500/20 overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-flow-left" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>

            {/* Right: Cloud LLM */}
            <div className="w-full bg-doc-bg/80 backdrop-blur-sm border border-doc-border rounded-2xl p-8 text-center shadow-sm relative z-10">
              <Cloud className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
              <h4 className="font-semibold text-doc-text mb-1">Cloud LLM</h4>
              <p className="text-[13px] text-doc-text-muted">OpenAI / Anthropic</p>
            </div>

          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-doc-text tracking-tight mb-4">Enterprise-grade by default</h2>
          </div>
          {/* Condense into a single 4-column row on large screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  to="/docs/overview"
                  className="group p-6 rounded-2xl border border-doc-border hover:border-doc-text-muted/30 transition-all hover:shadow-md bg-doc-surface/80 backdrop-blur-sm flex flex-col items-center text-center"
                >
                  <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-5 shadow-inner`}>
                    <Icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <h3 className="text-[16px] font-semibold text-doc-text mb-2 group-hover:text-doc-text transition-colors tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-doc-text-secondary leading-relaxed mb-4 flex-1">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-1 text-[13px] font-semibold text-doc-link transition-colors">
                    Explore docs
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section - Now 2 Tiers */}
      <section className="py-24 px-6 border-t border-doc-border bg-doc-surface/50 backdrop-blur-sm relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-doc-text tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-doc-text-secondary">Scale securely with predictable costs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            {PRICING.map((tier) => (
              <div 
                key={tier.name} 
                className={`relative flex flex-col p-8 rounded-3xl border ${tier.highlight ? 'border-blue-500 shadow-xl bg-doc-bg' : 'border-doc-border bg-doc-surface/80 backdrop-blur-sm shadow-sm'} transition-transform hover:-translate-y-1 duration-300`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-full">
                    Recommended
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-doc-text mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-bold text-doc-text tracking-tight">{tier.price}</span>
                    {tier.period && <span className="text-doc-text-muted">{tier.period}</span>}
                  </div>
                  <p className="text-[14px] text-doc-text-secondary leading-relaxed">{tier.description}</p>
                </div>
                
                <ul className="flex-1 space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-doc-text-secondary">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${tier.highlight ? 'text-blue-500' : 'text-doc-text-muted'}`} />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3.5 rounded-xl text-[14px] font-semibold transition-all ${
                  tier.highlight 
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg' 
                    : 'bg-doc-surface-2 text-doc-text border border-doc-border hover:bg-doc-surface'
                }`}>
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-doc-border px-6 py-12 bg-doc-bg relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-doc-text-muted">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-blue-500 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">E</span>
            </div>
            <span>© 2026 EnorAI Inc. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[13px] font-medium">
            <Link to="/docs/overview" className="hover:text-doc-text transition-colors">Documentation</Link>
            <Link to="/privacy" className="hover:text-doc-text transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-doc-text transition-colors">Terms of Service</Link>
            <div className="flex items-center gap-2 hover:text-doc-text transition-colors cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
