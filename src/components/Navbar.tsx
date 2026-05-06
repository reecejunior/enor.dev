import React, { useState } from 'react';
import { Search, Moon, Sun, Key, LogIn, Menu, X } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export default function Navbar({ isDark, onToggleTheme, onOpenSearch, onToggleSidebar, sidebarOpen }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-doc-bg/80 backdrop-blur-xl border-b border-doc-border">
      <div className="h-full flex items-center justify-between px-4 lg:px-6">
        {/* Left: Logo + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-doc-surface-2 transition-colors text-doc-text-secondary"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a href="#" className="flex items-center gap-2.5 select-none">
            <div className="w-7 h-7 bg-doc-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-semibold text-doc-text text-[15px] tracking-tight">
              EnorAI
              <span className="text-doc-text-muted font-normal ml-1.5">Docs</span>
            </span>
          </a>
        </div>

        {/* Center: Search */}
        <button
          onClick={onOpenSearch}
          className="hidden sm:flex items-center gap-3 w-full max-w-sm mx-4 lg:mx-8 px-4 py-2 rounded-xl bg-doc-surface border border-doc-border hover:border-doc-text-muted/30 transition-all text-doc-text-muted text-sm group"
        >
          <Search className="w-4 h-4 shrink-0" />
          <span className="flex-1 text-left">Search documentation...</span>
          <kbd className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md bg-doc-surface-2 text-[10px] font-mono border border-doc-border group-hover:border-doc-text-muted/20 transition-colors">
            ⌘K
          </kbd>
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenSearch}
            className="sm:hidden p-2 rounded-lg hover:bg-doc-surface-2 transition-colors text-doc-text-secondary"
            aria-label="Search"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg hover:bg-doc-surface-2 transition-colors text-doc-text-secondary"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <a
            href="#api-keys"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-doc-text-secondary hover:text-doc-text hover:bg-doc-surface-2 transition-colors"
          >
            <Key className="w-3.5 h-3.5" />
            API Keys
          </a>

          <button className="ml-1 px-4 py-2 bg-doc-accent hover:bg-doc-accent-hover text-white text-sm font-medium rounded-xl transition-all shadow-sm shadow-doc-accent/20">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
