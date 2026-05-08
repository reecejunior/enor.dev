import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeTab {
  label: string;
  lang: string;
  code: React.ReactNode;
}

interface CodeBlockProps {
  title?: string;
  tabs: CodeTab[];
}

export default function CodeBlock({ title, tabs }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const extractText = (node: React.ReactNode): string => {
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
    const text = extractText(tabs[activeTab].code);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block border border-doc-code-border shadow-lg rounded-xl overflow-hidden">
      {/* Header with tabs */}
      <div className="code-block-header">
        <div className="flex items-center gap-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                activeTab === i
                  ? 'bg-doc-code-bg text-doc-text shadow-sm'
                  : 'text-doc-text-muted hover:text-doc-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {title && (
            <span className="text-[11px] text-doc-text-muted font-mono mr-2">
              {title}
            </span>
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

      {/* Code body */}
      <div className="code-block-body">
        <pre className="text-[13px] leading-[1.7] font-mono whitespace-pre-wrap">
          <code>{tabs[activeTab].code}</code>
        </pre>
      </div>
    </div>
  );
}
