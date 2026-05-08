import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, FileText, X } from 'lucide-react';
import Fuse from 'fuse.js';

interface SearchResult {
  path: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null);

  // Fetch the dynamic search index built by scripts/build-search.js
  useEffect(() => {
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data: SearchResult[]) => {
        setSearchIndex(data);
        setFuse(
          new Fuse(data, {
            keys: [
              { name: 'title', weight: 2 },
              { name: 'category', weight: 1.5 },
              { name: 'content', weight: 1 },
            ],
            threshold: 0.3,
            ignoreLocation: true,
            includeMatches: true,
          })
        );
      })
      .catch((err) => console.error('Failed to load search index', err));
  }, []);

  const results = query.trim() && fuse
    ? fuse.search(query).map((res) => res.item).slice(0, 8)
    : searchIndex.filter((item) => !item.path.includes('#')).slice(0, 4);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
      onClose();
      // If it's a hash link, we might need to manually scroll if React Router doesn't immediately jump
      if (path.includes('#')) {
        setTimeout(() => {
          const id = path.split('#')[1];
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    },
    [navigate, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleNavigate(results[selectedIndex].path);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl mx-4 bg-doc-bg border border-doc-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-doc-border">
          <Search className="w-4 h-4 text-doc-text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            className="flex-1 py-4 bg-transparent text-[15px] text-doc-text placeholder:text-doc-text-muted outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-doc-surface transition-colors"
          >
            <X className="w-4 h-4 text-doc-text-muted" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[300px] overflow-y-auto py-2">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-doc-text-muted text-sm">
              No results found for "{query}"
            </div>
          ) : (
            results.map((result, i) => (
              <button
                key={`${result.path}-${i}`}
                onClick={() => handleNavigate(result.path)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  selectedIndex === i ? 'bg-doc-surface' : ''
                }`}
              >
                <FileText className="w-4 h-4 text-doc-text-muted shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-doc-text truncate">
                    {result.title}
                  </p>
                  <p className="text-[11px] text-doc-text-muted truncate mt-0.5">
                    {result.description}
                  </p>
                </div>
                <span className="text-[10px] text-doc-text-muted px-2 py-0.5 rounded-full bg-doc-surface-2 shrink-0">
                  {result.category}
                </span>
                {selectedIndex === i && (
                  <ArrowRight className="w-3.5 h-3.5 text-doc-text-muted shrink-0" />
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-doc-border text-[11px] text-doc-text-muted">
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded bg-doc-surface-2 border border-doc-border font-mono text-[10px]">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded bg-doc-surface-2 border border-doc-border font-mono text-[10px]">↵</kbd>
            Open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded bg-doc-surface-2 border border-doc-border font-mono text-[10px]">esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
