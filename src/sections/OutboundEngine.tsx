import React from 'react';
import CodePane from '../components/CodePane';
import ParamTable from '../components/ParamTable';
import EndpointBadge from '../components/EndpointBadge';
import { Clock, Brain, AlertTriangle } from 'lucide-react';

export default function OutboundEngine() {
  return (
    <div className="doc-content-grid">
      <div className="doc-prose">
        <div className="mb-10">
          <EndpointBadge method="POST" path="/v1/outbound/validate" />
          <h1 className="text-3xl lg:text-[36px] font-bold tracking-tight text-doc-text leading-tight mt-5 mb-4">
            Outbound Engine — Hallucination Intercept
          </h1>
          <p className="text-lg text-doc-text-secondary leading-relaxed">
            Validate LLM outputs for clinical accuracy and intercept hallucinations before they reach patients.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium border border-amber-500/15">
            <Clock className="w-3.5 h-3.5" />
            &lt;50ms latency
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-medium border border-purple-500/15">
            <Brain className="w-3.5 h-3.5" />
            Edge-ML powered
          </div>
        </div>

        <hr className="border-doc-border my-8" />

        <section>
          <h2 className="text-xl font-semibold text-doc-text mb-4 tracking-tight">Description</h2>
          <p className="text-doc-text-secondary leading-relaxed mb-4">
            This endpoint runs a multi-stage validation pipeline on LLM-generated clinical text to detect potential hallucinations and unsafe recommendations:
          </p>
          <ol className="space-y-3 text-doc-text-secondary leading-relaxed mb-6 list-decimal list-inside">
            <li><strong className="text-doc-text font-medium">TensorFlow Lite Edge Classifiers</strong> — Lightweight ML models running at the edge that score the semantic coherence and clinical plausibility of the LLM's output in real time.</li>
            <li><strong className="text-doc-text font-medium">RAG Validation</strong> — The output is cross-referenced against a Retrieval-Augmented Generation pipeline backed by peer-reviewed medical knowledge bases (NICE, WHO, UpToDate).</li>
          </ol>
          <p className="text-doc-text-secondary leading-relaxed mb-4">
            The combined analysis produces a <code className="px-1.5 py-0.5 rounded-md bg-doc-surface-2 text-doc-accent text-[13px] font-mono">confidence_score</code> between 0 and 1. If the score drops below <strong className="text-doc-text font-medium">0.8</strong>, the API returns a <code className="px-1.5 py-0.5 rounded-md bg-doc-surface-2 text-doc-accent text-[13px] font-mono">flagged</code> status with a <code className="px-1.5 py-0.5 rounded-md bg-doc-surface-2 text-doc-accent text-[13px] font-mono">route_to_human</code> action.
          </p>

          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15 text-sm text-doc-text-secondary mb-6">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-600 dark:text-red-400 font-medium">Critical Safety Note:</strong> When <code className="font-mono text-doc-accent text-[13px]">action</code> is <code className="font-mono text-doc-accent text-[13px]">route_to_human</code>, your application <strong>must not</strong> display the LLM output to the patient. Instead, route to a qualified clinician for manual review.
              </div>
            </div>
          </div>
        </section>

        <hr className="border-doc-border my-8" />

        <ParamTable title="Request Body" params={[
          { name: 'llm_output', type: 'string', required: true, description: 'The raw text output from the LLM that needs clinical validation.' },
          { name: 'clinical_context', type: 'string', required: true, description: 'The original clinical question or prompt sent to the LLM. Used for RAG cross-referencing.' },
        ]} />

        <hr className="border-doc-border my-8" />

        <section>
          <h2 className="text-xl font-semibold text-doc-text mb-4 tracking-tight">Response</h2>
          <ParamTable title="Response Fields" params={[
            { name: 'status', type: 'string', required: true, description: 'Either "passed" or "flagged". Flagged responses should not be shown to patients.' },
            { name: 'confidence_score', type: 'number', required: true, description: 'A value between 0 and 1 indicating clinical confidence. Scores below 0.8 trigger flagging.' },
            { name: 'detected_risk', type: 'string', required: true, description: 'Human-readable description of the detected risk or anomaly.' },
            { name: 'action', type: 'string', required: true, description: 'Recommended action: "none" for passed, "route_to_human" for flagged responses.' },
          ]} />
        </section>
      </div>

      <div className="doc-code-pane">
        <div className="sticky top-20 space-y-6">
          <CodePane title="Request" tabs={[
            {
              label: 'cURL', lang: 'bash',
              code: (<>
<span className="syn-function">curl</span> <span className="syn-flag">-X</span> POST \{'\n'}
{'  '}<span className="syn-url">https://api.enorai.com/v1/outbound/validate</span> \{'\n'}
{'  '}<span className="syn-flag">-H</span> <span className="syn-string">"Authorization: Bearer $ENORAI_API_KEY"</span> \{'\n'}
{'  '}<span className="syn-flag">-H</span> <span className="syn-string">"Content-Type: application/json"</span> \{'\n'}
{'  '}<span className="syn-flag">-d</span> <span className="syn-string">'{`{\n    "llm_output": "Recommend 500mg Amoxicillin TID for 14 days for suspected viral pharyngitis.",\n    "clinical_context": "Patient with sore throat, no fever, rapid strep negative."\n  }`}'</span>
              </>),
            },
            {
              label: 'Python', lang: 'python',
              code: (<>
<span className="syn-keyword">from</span> enorai <span className="syn-keyword">import</span> EnorAI{'\n'}
{'\n'}
client = <span className="syn-function">EnorAI</span>(api_key=<span className="syn-string">"ENORAI_API_KEY"</span>){'\n'}
{'\n'}
result = client.outbound.<span className="syn-function">validate</span>({'\n'}
{'  '}llm_output=<span className="syn-string">"Recommend 500mg Amoxicillin TID for 14 days..."</span>,{'\n'}
{'  '}clinical_context=<span className="syn-string">"Patient with sore throat, no fever, rapid strep negative."</span>{'\n'}
){'\n'}
{'\n'}
<span className="syn-keyword">if</span> result.status == <span className="syn-string">"flagged"</span>:{'\n'}
{'  '}<span className="syn-function">print</span>(<span className="syn-string">f"Risk: </span>{'{'}result.detected_risk{'}'}<span className="syn-string">"</span>){'\n'}
{'  '}<span className="syn-comment"># Route to clinician fallback</span>
              </>),
            },
          ]} />

          <CodePane title="Response · 200 OK (Flagged)" tabs={[
            {
              label: 'JSON', lang: 'json',
              code: (<>
{'{'}{'\n'}
{'  '}<span className="syn-property">"status"</span>: <span className="syn-string">"flagged"</span>,{'\n'}
{'  '}<span className="syn-property">"confidence_score"</span>: <span className="syn-number">0.64</span>,{'\n'}
{'  '}<span className="syn-property">"detected_risk"</span>: <span className="syn-string">"High entropy in dosage recommendation"</span>,{'\n'}
{'  '}<span className="syn-property">"action"</span>: <span className="syn-string">"route_to_human"</span>{'\n'}
{'}'}
              </>),
            },
          ]} />

          <CodePane title="Response · 200 OK (Passed)" tabs={[
            {
              label: 'JSON', lang: 'json',
              code: (<>
{'{'}{'\n'}
{'  '}<span className="syn-property">"status"</span>: <span className="syn-string">"passed"</span>,{'\n'}
{'  '}<span className="syn-property">"confidence_score"</span>: <span className="syn-number">0.94</span>,{'\n'}
{'  '}<span className="syn-property">"detected_risk"</span>: <span className="syn-string">"none"</span>,{'\n'}
{'  '}<span className="syn-property">"action"</span>: <span className="syn-string">"none"</span>{'\n'}
{'}'}
              </>),
            },
          ]} />
        </div>
      </div>
    </div>
  );
}
