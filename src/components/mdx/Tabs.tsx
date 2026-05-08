import React, { useState, ReactNode, Children, isValidElement } from 'react';
import { Copy, Check, Play, Loader2 } from 'lucide-react';
import { useApiKey } from '../../hooks/useApiKey';

interface TabProps {
  label: string;
  children: ReactNode;
}

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

interface TabsProps {
  title?: string;
  children: ReactNode;
  interactive?: boolean;
  endpoint?: string;
}

export function Tabs({ title, children, interactive, endpoint }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const { hasKey } = useApiKey();

  const tabs = Children.toArray(children).filter(
    (child): child is React.ReactElement<TabProps> =>
      isValidElement(child) && child.props.label !== undefined
  );

  const extractText = (node: ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (!node) return '';
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (typeof node === 'object' && 'props' in node) {
      return extractText((node as React.ReactElement).props.children);
    }
    return '';
  };

  const handleCopy = () => {
    if (tabs[activeTab]) {
      const text = extractText(tabs[activeTab].props.children);
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRunRequest = () => {
    setLoading(true);
    setResponse(null);

    // Simulate network latency
    setTimeout(() => {
      setLoading(false);
      
      if (!hasKey) {
        setResponse({
          status: 401,
          body: {
            error: "Unauthorized",
            message: "You must provide a valid API key to use the interactive playground."
          }
        });
        return;
      }

      // Mock responses based on endpoint
      if (endpoint === '/v1/inbound/tokenize') {
        setResponse({
          status: 200,
          body: {
            status: "success",
            scrubbed_text: "Patient [ID_001] presents with a fever of 39.2°C.",
            entities_found: 1,
            processing_time_ms: 6.2,
            token_map_id: "tmap_a1b2c3d4-e5f6-7890"
          }
        });
      } else if (endpoint === '/v1/outbound/validate') {
        setResponse({
          status: 200,
          body: {
            status: "flagged",
            confidence_score: 0.64,
            action: "route_to_human",
            reason: "High entropy in dosage"
          }
        });
      } else {
        setResponse({
          status: 200,
          body: { status: "ok" }
        });
      }
    }, 600);
  };

  if (tabs.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="code-block border border-doc-code-border shadow-lg rounded-xl overflow-hidden">
        {/* Header with tabs */}
        <div className="code-block-header flex items-center justify-between px-3 py-2 border-b border-doc-code-border bg-doc-code-header-bg">
          <div className="flex items-center gap-1">
            {tabs.map((tab, i) => (
              <button
                key={tab.props.label}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                  activeTab === i
                    ? 'bg-doc-code-bg text-doc-text shadow-sm'
                    : 'text-doc-text-muted hover:text-doc-text'
                }`}
              >
                {tab.props.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {title && (
              <span className="hidden sm:inline-block text-[11px] text-doc-text-muted font-mono">
                {title}
              </span>
            )}
            
            <div className="flex items-center gap-1 border-l border-doc-code-border pl-3 ml-1">
              {interactive && (
                <button
                  onClick={handleRunRequest}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[12px] font-medium rounded-md transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  Try It
                </button>
              )}
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md hover:bg-doc-code-bg transition-colors text-doc-text-muted hover:text-doc-text"
                aria-label="Copy code"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Code body */}
        <div className="code-block-body">
          {tabs.map((tab, i) => (
            <div key={i} style={{ display: activeTab === i ? 'block' : 'none' }}>
              <div className="text-[13px] leading-[1.7] font-mono whitespace-pre-wrap mdx-code-block">
                {tab.props.children}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Response Pane */}
      {response && (
        <div className="mt-3 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2 px-1">
            <span className={`w-2 h-2 rounded-full ${response.status === 200 ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <span className="text-[12px] font-semibold text-doc-text">
              Response {response.status}
            </span>
          </div>
          <div className="border border-doc-code-border bg-doc-code-bg rounded-xl p-4 overflow-x-auto shadow-sm">
            <pre className="text-[13px] font-mono text-doc-text leading-relaxed">
              <code>{JSON.stringify(response.body, null, 2)}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
