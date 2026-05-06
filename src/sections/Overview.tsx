import React from 'react';
import CodePane from '../components/CodePane';
import { Shield, ArrowDownToLine, ArrowUpFromLine, Zap, Lock, Globe } from 'lucide-react';

export default function Overview() {
  return (
    <div className="doc-content-grid">
      {/* Main content */}
      <div className="doc-prose">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-doc-accent-soft text-doc-accent text-xs font-medium mb-6">
            <Shield className="w-3.5 h-3.5" />
            Deterministic Safety for Healthcare AI
          </div>
          <h1 className="text-4xl lg:text-[42px] font-bold tracking-tight text-doc-text leading-[1.15] mb-5">
            Build with EnorAI
          </h1>
          <p className="text-lg text-doc-text-secondary leading-relaxed max-w-2xl">
            The deterministic safety API for healthcare AI. Integrate HIPAA-compliant PHI scrubbing and hallucination detection into your clinical applications in minutes.
          </p>
        </div>

        {/* Divider */}
        <hr className="border-doc-border my-10" />

        {/* How it works */}
        <section id="quickstart" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-doc-text mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-doc-text-secondary leading-relaxed mb-8">
            EnorAI sits between your application and any cloud LLM. It provides two critical layers of protection with a simple two-step integration:
          </p>

          {/* Step 1 */}
          <div className="relative pl-8 pb-10 border-l-2 border-doc-border group">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-doc-accent flex items-center justify-center shadow-lg shadow-doc-accent/20">
              <ArrowDownToLine className="w-4 h-4 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-doc-text mb-2">
                Step 1 — Inbound Tokenizer
              </h3>
              <p className="text-doc-text-secondary leading-relaxed mb-3">
                Route raw patient inputs through the <code className="px-1.5 py-0.5 rounded-md bg-doc-surface-2 text-doc-accent text-[13px] font-mono">POST /v1/inbound/tokenize</code> endpoint. EnorAI uses a combination of local regex patterns and spaCy Named Entity Recognition (NER) to identify and replace Protected Health Information (PHI) — including patient names, SSNs, and Medical Record Numbers (MRNs) — with deterministic, reversible tokens.
              </p>
              <p className="text-doc-text-secondary leading-relaxed">
                This processing happens locally in <strong className="text-doc-text font-medium">&lt;10ms</strong>, ensuring that no unprotected PHI ever reaches a cloud LLM provider. The tokenized output can be safely forwarded to any model.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pl-8 pb-2">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ArrowUpFromLine className="w-4 h-4 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-doc-text mb-2">
                Step 2 — Outbound Validator
              </h3>
              <p className="text-doc-text-secondary leading-relaxed mb-3">
                Route the LLM's response through <code className="px-1.5 py-0.5 rounded-md bg-doc-surface-2 text-doc-accent text-[13px] font-mono">POST /v1/outbound/validate</code>. EnorAI's Edge-ML engine runs TensorFlow Lite classifiers and RAG-based validation to score the clinical accuracy of the output.
              </p>
              <p className="text-doc-text-secondary leading-relaxed">
                If the confidence score drops below <strong className="text-doc-text font-medium">0.8</strong>, the API returns a <code className="px-1.5 py-0.5 rounded-md bg-doc-surface-2 text-doc-accent text-[13px] font-mono">flagged</code> status, automatically triggering a human-in-the-loop clinician fallback. This intercepts hallucinations in <strong className="text-doc-text font-medium">&lt;50ms</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-doc-border my-10" />

        {/* Key Capabilities */}
        <section id="authentication" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-doc-text mb-6 tracking-tight">
            Key Capabilities
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Zap,
                title: 'Sub-10ms Latency',
                desc: 'Local PHI scrubbing with zero cloud round-trips. No impact on user experience.',
                color: 'text-amber-500',
                bg: 'bg-amber-500/10',
              },
              {
                icon: Shield,
                title: 'Hallucination Shield',
                desc: 'Edge-ML classifiers catch high-entropy clinical outputs before they reach patients.',
                color: 'text-blue-500',
                bg: 'bg-blue-500/10',
              },
              {
                icon: Lock,
                title: 'HIPAA & CDPA Compliant',
                desc: 'Built-in compliance for US HIPAA and Zimbabwe CDPA regulations out of the box.',
                color: 'text-emerald-500',
                bg: 'bg-emerald-500/10',
              },
              {
                icon: Globe,
                title: 'FHIR-Native',
                desc: 'First-class HL7 FHIR R4 interoperability designed for emerging markets in Africa.',
                color: 'text-purple-500',
                bg: 'bg-purple-500/10',
              },
            ].map((cap) => (
              <div
                key={cap.title}
                className="p-5 rounded-xl border border-doc-border hover:border-doc-text-muted/30 transition-all group"
              >
                <div className={`w-9 h-9 ${cap.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <cap.icon className={`w-4.5 h-4.5 ${cap.color}`} />
                </div>
                <h4 className="font-semibold text-doc-text mb-1.5 text-[15px]">{cap.title}</h4>
                <p className="text-sm text-doc-text-secondary leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right pane: Code */}
      <div className="doc-code-pane">
        <div className="sticky top-20 space-y-6">
          {/* Install */}
          <CodePane
            title="Installation"
            tabs={[
              {
                label: 'pip',
                lang: 'bash',
                code: (
                  <>
                    <span className="syn-comment"># Install the EnorAI SDK</span>{'\n'}
                    <span className="syn-function">pip</span> <span className="syn-flag">install</span> enorai-sdk
                  </>
                ),
              },
              {
                label: 'npm',
                lang: 'bash',
                code: (
                  <>
                    <span className="syn-comment"># Install the EnorAI SDK</span>{'\n'}
                    <span className="syn-function">npm</span> <span className="syn-flag">install</span> enorai-sdk
                  </>
                ),
              },
            ]}
          />

          {/* Initialization */}
          <CodePane
            title="Initialization"
            tabs={[
              {
                label: 'Python',
                lang: 'python',
                code: (
                  <>
                    <span className="syn-keyword">import</span> os{'\n'}
                    <span className="syn-keyword">from</span> enorai <span className="syn-keyword">import</span> EnorAI{'\n'}
                    {'\n'}
                    <span className="syn-comment"># Initialize the client</span>{'\n'}
                    client = <span className="syn-function">EnorAI</span>({'\n'}
                    {'  '}api_key=os.<span className="syn-function">environ</span>[<span className="syn-string">"ENORAI_API_KEY"</span>],{'\n'}
                    {'  '}region=<span className="syn-string">"af-south-1"</span>{'\n'}
                    ){'\n'}
                    {'\n'}
                    <span className="syn-comment"># Verify connection</span>{'\n'}
                    status = client.<span className="syn-function">health_check</span>(){'\n'}
                    <span className="syn-function">print</span>(status)  <span className="syn-comment"># {'{'} "status": "ok", "latency_ms": 4 {'}'}</span>
                  </>
                ),
              },
              {
                label: 'Node.js',
                lang: 'javascript',
                code: (
                  <>
                    <span className="syn-keyword">import</span> EnorAI <span className="syn-keyword">from</span> <span className="syn-string">'enorai-sdk'</span>;{'\n'}
                    {'\n'}
                    <span className="syn-comment">// Initialize the client</span>{'\n'}
                    <span className="syn-keyword">const</span> client = <span className="syn-keyword">new</span> <span className="syn-function">EnorAI</span>({'{'}
                    {'\n'}{'  '}apiKey: process.env.<span className="syn-property">ENORAI_API_KEY</span>,{'\n'}
                    {'  '}region: <span className="syn-string">'af-south-1'</span>{'\n'}
                    {'}'});{'\n'}
                    {'\n'}
                    <span className="syn-comment">// Verify connection</span>{'\n'}
                    <span className="syn-keyword">const</span> status = <span className="syn-keyword">await</span> client.<span className="syn-function">healthCheck</span>();{'\n'}
                    console.<span className="syn-function">log</span>(status);{'\n'}
                    <span className="syn-comment">// {'{'} "status": "ok", "latency_ms": 4 {'}'}</span>
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
