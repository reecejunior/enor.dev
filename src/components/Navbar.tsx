import { Link, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';
import { useApiKey } from '../hooks/useApiKey';

interface NavbarProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
  showSidebarToggle?: boolean;
}

export default function Navbar({ onToggleSidebar, sidebarOpen, showSidebarToggle }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();
  const { apiKey, setApiKey } = useApiKey();
  const [searchOpen, setSearchOpen] = useState(false);
  const [apiDropdownOpen, setApiDropdownOpen] = useState(false);
  const location = useLocation();

  // ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!apiDropdownOpen) return;
    const handler = () => setApiDropdownOpen(false);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [apiDropdownOpen]);

  const isDocsActive = location.pathname.startsWith('/docs');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-doc-bg/95 backdrop-blur-xl border-b border-doc-border">
        <div className="h-full flex items-center justify-between px-4 lg:px-6 max-w-[1800px] mx-auto">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3">
            {showSidebarToggle && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-doc-surface transition-colors text-doc-text-secondary"
                aria-label="Toggle menu"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <Link to="/" className="flex items-center gap-2 select-none">
              <span className="text-[17px] font-semibold tracking-tight text-doc-text">
                EnorAI Developers
              </span>
            </Link>
          </div>

          {/* Center: Navigation links */}
          <nav className="hidden md:flex items-center gap-1 ml-8">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-[14px] font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-doc-text bg-doc-surface-2'
                  : 'text-doc-text-secondary hover:text-doc-text hover:bg-doc-surface'
              }`}
            >
              Home
            </Link>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setApiDropdownOpen(!apiDropdownOpen);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[14px] font-medium transition-colors ${
                  isDocsActive
                    ? 'text-doc-text bg-doc-surface-2'
                    : 'text-doc-text-secondary hover:text-doc-text hover:bg-doc-surface'
                }`}
              >
                API
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {apiDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-doc-bg border border-doc-border rounded-xl shadow-lg py-1 animate-fade-in">
                  <Link
                    to="/docs/overview"
                    className="block px-4 py-2 text-[13px] text-doc-text-secondary hover:text-doc-text hover:bg-doc-surface transition-colors"
                  >
                    <span className="font-medium text-doc-text">Docs</span>
                    <span className="block text-[11px] text-doc-text-muted mt-0.5">Guides and concepts</span>
                  </Link>
                  <Link
                    to="/docs/api-reference/authentication"
                    className="block px-4 py-2 text-[13px] text-doc-text-secondary hover:text-doc-text hover:bg-doc-surface transition-colors"
                  >
                    <span className="font-medium text-doc-text">API Reference</span>
                    <span className="block text-[11px] text-doc-text-muted mt-0.5">Endpoints and parameters</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Search + Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-3 w-full max-w-[220px] px-3 py-[7px] rounded-lg bg-doc-surface border border-doc-border hover:border-doc-text-muted/30 transition-all text-doc-text-muted text-[13px] group"
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="flex-1 text-left">Start searching</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded-md bg-doc-bg text-[10px] font-mono border border-doc-border">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="sm:hidden p-2 rounded-lg hover:bg-doc-surface transition-colors text-doc-text-secondary"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* API Key Input */}
            <div className="hidden lg:flex items-center">
              <input
                type="password"
                placeholder="Paste test API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-40 px-3 py-[6px] text-[12px] bg-doc-surface-2 border border-doc-border rounded-lg text-doc-text placeholder:text-doc-text-muted focus:outline-none focus:border-doc-text-muted/50 transition-colors"
              />
            </div>

            <Link
              to="/docs/overview"
              className="hidden md:flex items-center px-4 py-[7px] bg-doc-text text-doc-bg text-[13px] font-medium rounded-lg transition-all hover:opacity-90"
            >
              API Dashboard
              <span className="ml-1.5 text-[11px] opacity-60">↗</span>
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-doc-surface transition-colors text-doc-text-secondary"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
