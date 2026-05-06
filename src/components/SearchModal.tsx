import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, ArrowRight } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  section: string;
  description: string;
}

const SEARCH_DATA: SearchResult[] = [
  { id: 'overview', title: 'Overview', section: 'Getting Started', description: 'Build with EnorAI — deterministic safety API for healthcare AI' },
  { id: 'quickstart', title: 'Quickstart', section: 'Getting Started', description: 'Install the SDK and make your first API call in minutes' },
  { id: 'authentication', title: 'Authentication', section: 'Getting Started', description: 'API key setup and secure request authentication' },
  { id: 'inbound-engine', title: 'Inbound Engine', section: 'API Reference', description: 'POST /v1/inbound/tokenize — PHI scrubbing and tokenization' },
  { id: 'outbound-engine', title: 'Outbound Engine', section: 'API Reference', description: 'POST /v1/outbound/validate — Hallucination intercept and validation' },
  { id: 'integrations', title: 'Integrations', section: 'Guides', description: 'FHIR-native interoperability and third-party integrations' },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function SearchModal({ isOpen, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? SEARCH_DATA.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_DATA;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent controls toggle
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl mx-4 bg-doc-bg dark:bg-doc-surface border border-doc-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-doc-border">
          <Search className="w-5 h-5 text-doc-text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-doc-text placeholder:text-doc-text-muted text-sm outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-doc-surface-2 text-doc-text-muted text-[10px] font-mono border border-doc-border">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[320px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-doc-text-muted text-sm">
              No results found for "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-doc-surface-2 transition-colors group"
              >
                <FileText className="w-4 h-4 text-doc-text-muted shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-doc-text truncate">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-doc-text-muted px-1.5 py-0.5 rounded bg-doc-surface-2">
                      {item.section}
                    </span>
                  </div>
                  <p className="text-xs text-doc-text-muted truncate mt-0.5">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-doc-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-5 py-3 border-t border-doc-border text-[11px] text-doc-text-muted">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-doc-surface-2 text-[10px] font-mono border border-doc-border">↵</kbd>
            to select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-doc-surface-2 text-[10px] font-mono border border-doc-border">↑↓</kbd>
            to navigate
          </span>
        </div>
      </div>
    </div>
  );
}
