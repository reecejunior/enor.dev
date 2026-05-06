import React from 'react';
import {
  BookOpen,
  Zap,
  KeyRound,
  ArrowDownToLine,
  ArrowUpFromLine,
  Puzzle,
  ChevronRight,
} from 'lucide-react';

interface SidebarSection {
  title: string;
  items: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const SECTIONS: SidebarSection[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'overview', label: 'Overview', icon: BookOpen },
      { id: 'quickstart', label: 'Quickstart', icon: Zap },
      { id: 'authentication', label: 'Authentication', icon: KeyRound },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { id: 'inbound-engine', label: 'Inbound Engine', icon: ArrowDownToLine },
      { id: 'outbound-engine', label: 'Outbound Engine', icon: ArrowUpFromLine },
    ],
  },
  {
    title: 'Guides',
    items: [
      { id: 'integrations', label: 'Integrations', icon: Puzzle },
    ],
  },
];

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeSection, onNavigate, isOpen, onClose }: SidebarProps) {
  const handleClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-16 bottom-0 left-0 z-40 w-[280px] lg:w-auto
          bg-doc-bg lg:bg-transparent
          border-r border-doc-border
          overflow-y-auto overscroll-contain
          transform transition-transform duration-300 ease-out
          lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:transform-none lg:transition-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <nav className="p-5 lg:p-6 space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-doc-text-muted mb-3 px-3">
                {section.title}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleClick(item.id)}
                        className={`
                          w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium
                          transition-all duration-150 group
                          ${isActive
                            ? 'bg-doc-accent-soft text-doc-accent dark:text-doc-accent'
                            : 'text-doc-text-secondary hover:text-doc-text hover:bg-doc-surface-2'
                          }
                        `}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-doc-accent' : 'text-doc-text-muted group-hover:text-doc-text-secondary'}`} />
                        <span className="flex-1 text-left">{item.label}</span>
                        {isActive && (
                          <ChevronRight className="w-3 h-3 text-doc-accent" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Status badge */}
          <div className="mt-8 mx-3 p-4 rounded-xl bg-doc-surface border border-doc-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-doc-text">All Systems Operational</span>
            </div>
            <p className="text-[11px] text-doc-text-muted leading-relaxed">
              API latency: &lt;10ms (inbound) · &lt;50ms (outbound)
            </p>
          </div>
        </nav>
      </aside>
    </>
  );
}
