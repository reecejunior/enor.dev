import React from 'react';
import CodePane from '../components/CodePane';
import ParamTable from '../components/ParamTable';
import EndpointBadge from '../components/EndpointBadge';
import { Clock, Brain } from 'lucide-react';

const PARAMS = [
  {
    name: 'llm_output',
    type: 'string',
    required: true,
    description: 'The raw text output from the LLM that needs clinical validation. This is the response your model generated for a patient-facing or clinician-facing query.',
  },
  {
    name: 'clinical_context',
    type: 'string',
    required: true,
    description: 'The original clinical question or prompt that was sent to the LLM. Used by the RAG validator to cross-reference the response against trusted medical knowledge bases.',
  },
];

export default function InboundEngine() {
  return (
    <div className="doc-content-grid">
      <div className="doc-prose">
        <div className="mb-10">
          <EndpointBadge method="POST" path="/v1/inbound/tokenize" />
          <h1 className="text-3xl lg:text-[36px] font-bold tracking-tight text-doc-text leading-tight mt-5 mb-4">
            Inbound Engine — PHI Scrubbing
          </h1>
          <p className="text-lg text-doc-text-secondary leading-relaxed">
            Scrub and tokenize Protected Health Information from clinical text before it reaches any cloud LLM.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium border border-emerald-500/15">
            <Clock className="w-3.5 h-3.5" />
            &lt;10ms latency
          </div>
        </div>

        <hr className="border-doc-border my-8" />

        <section>
          <h2 className="text-xl font-semibold text-doc-text mb-4 tracking-tight">Description</h2>
          <p className="text-doc-text-secondary leading-relaxed mb-4">
            This endpoint uses a two-stage identification pipeline to detect and replace PHI entities in clinical text:
          </p>
          <ol className="space-y-3 text-doc-text-secondary leading-relaxed mb-6 list-decimal list-inside">
            <li><strong className="text-doc-text font-medium">Local Regex Patterns</strong> — High-speed pattern matching for SSNs, MRNs, phone numbers, dates of birth, and email addresses.</li>
            <li><strong className="text-doc-text font-medium">spaCy NER Model</strong> — A fine-tuned Named Entity Recognition model trained on clinical corpora to identify patient names, physician names, and locations.</li>
          </ol>
          <p className="text-doc-text-secondary leading-relaxed mb-4">
            Detected entities are replaced with deterministic tokens (e.g., "John Mwangi" → <code className="px-1.5 py-0.5 rounded-md bg-doc-surface-2 text-doc-accent text-[13px] font-mono">[ID_492]</code>). Tokens are reversible only by the originating EnorAI instance.
          </p>
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-sm text-doc-text-secondary mb-6">
            <strong className="text-amber-600 dark:text-amber-400 font-medium">Important:</strong> Tokenization runs locally. No raw PHI is transmitted to EnorAI cloud services.
          </div>
        </section>

        <hr className="border-doc-border my-8" />

        <ParamTable title="Request Body" params={[
          { name: 'input_text', type: 'string', required: true, description: 'Raw clinical text containing PHI to be scrubbed and tokenized.' },
          { name: 'fhir_resource_id', type: 'string', required: false, description: 'Optional FHIR R4 Resource ID for compliance audit linking.' },
        ]} />

        <hr className="border-doc-border my-8" />

        <section>
          <h2 className="text-xl font-semibold text-doc-text mb-4 tracking-tight">Response</h2>
          <ParamTable title="Response Fields" params={[
            { name: 'tokenized_text', type: 'string', required: true, description: 'Input text with PHI replaced by deterministic tokens.' },
            { name: 'entities_found', type: 'integer', required: true, description: 'Number of PHI entities detected and tokenized.' },
            { name: 'processing_time_ms', type: 'number', required: true, description: 'Processing time in milliseconds.' },
            { name: 'token_map_id', type: 'string', required: true, description: 'UUID reference to stored token map for de-tokenization.' },
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
{'  '}<span className="syn-url">https://api.enorai.com/v1/inbound/tokenize</span> \{'\n'}
{'  '}<span className="syn-flag">-H</span> <span className="syn-string">"Authorization: Bearer $ENORAI_API_KEY"</span> \{'\n'}
{'  '}<span className="syn-flag">-H</span> <span className="syn-string">"Content-Type: application/json"</span> \{'\n'}
{'  '}<span className="syn-flag">-d</span> <span className="syn-string">'{`{\n    "input_text": "Patient John Mwangi, SSN 123-45-6789, presents with a persistent fever of 39.2°C.",\n    "fhir_resource_id": "Patient/p-28491"\n  }`}'</span>
              </>),
            },
            {
              label: 'Python', lang: 'python',
              code: (<>
<span className="syn-keyword">from</span> enorai <span className="syn-keyword">import</span> EnorAI{'\n'}
{'\n'}
client = <span className="syn-function">EnorAI</span>(api_key=<span className="syn-string">"ENORAI_API_KEY"</span>){'\n'}
{'\n'}
result = client.inbound.<span className="syn-function">tokenize</span>({'\n'}
{'  '}input_text=<span className="syn-string">"Patient John Mwangi, SSN 123-45-6789, presents with a persistent fever."</span>,{'\n'}
{'  '}fhir_resource_id=<span className="syn-string">"Patient/p-28491"</span>{'\n'}
){'\n'}
<span className="syn-function">print</span>(result.tokenized_text)
              </>),
            },
          ]} />

          <CodePane title="Response · 200 OK" tabs={[
            {
              label: 'JSON', lang: 'json',
              code: (<>
{'{'}{'\n'}
{'  '}<span className="syn-property">"tokenized_text"</span>: <span className="syn-string">"Patient [ID_492], SSN [SSN_REDACTED], presents with a persistent fever of 39.2°C."</span>,{'\n'}
{'  '}<span className="syn-property">"entities_found"</span>: <span className="syn-number">2</span>,{'\n'}
{'  '}<span className="syn-property">"processing_time_ms"</span>: <span className="syn-number">6.2</span>,{'\n'}
{'  '}<span className="syn-property">"token_map_id"</span>: <span className="syn-string">"tmap_a1b2c3d4-e5f6-7890"</span>{'\n'}
{'}'}
              </>),
            },
          ]} />
        </div>
      </div>
    </div>
  );
}
