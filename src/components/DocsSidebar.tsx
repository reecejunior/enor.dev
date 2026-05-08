import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  KeyRound,
  ArrowDownToLine,
  ArrowUpFromLine,
  Puzzle,
  X,
} from 'lucide-react';

interface SidebarSection {
  title: string;
  items: {
    path: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

const SECTIONS: SidebarSection[] = [
  {
    title: 'Get Started',
    items: [
      { path: '/docs/overview', label: 'Overview', icon: BookOpen },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { path: '/docs/api-reference/authentication', label: 'Authentication', icon: KeyRound },
      { path: '/docs/api-reference/inbound', label: 'Inbound Engine', icon: ArrowDownToLine },
      { path: '/docs/api-reference/outbound', label: 'Outbound Engine', icon: ArrowUpFromLine },
    ],
  },
  {
    title: 'Guides',
    items: [
      { path: '#', label: 'Integrations', icon: Puzzle, badge: 'Soon' },
    ],
  },
];

interface DocsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocsSidebar({ isOpen, onClose }: DocsSidebarProps) {
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
          fixed top-14 bottom-0 left-0 z-40 w-[280px] lg:w-[260px]
          bg-doc-bg border-r border-doc-border
          overflow-y-auto overscroll-contain
          transform transition-transform duration-300 ease-out
          lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:transform-none lg:transition-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Mobile close */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-doc-border">
          <span className="text-sm font-semibold text-doc-text">Navigation</span>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-doc-surface transition-colors">
            <X className="w-4 h-4 text-doc-text-muted" />
          </button>
        </div>

        <nav className="p-4 space-y-6">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-doc-text-muted mb-2 px-2">
                {section.title}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isDisabled = item.path === '#';

                  if (isDisabled) {
                    return (
                      <li key={item.label}>
                        <span className="flex items-center gap-2.5 px-2 py-[7px] rounded-lg text-[13px] text-doc-text-muted cursor-default">
                          <Icon className="w-4 h-4 shrink-0 opacity-40" />
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-doc-surface-2 text-doc-text-muted font-medium">
                              {item.badge}
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  }

                  return (
                    <li key={item.label}>
                      <NavLink
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 px-2 py-[7px] rounded-lg text-[13px] font-medium transition-all duration-150 group ${
                            isActive
                              ? 'bg-doc-surface-2 text-doc-text'
                              : 'text-doc-text-secondary hover:text-doc-text hover:bg-doc-surface'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-doc-text' : 'text-doc-text-muted group-hover:text-doc-text-secondary'}`} />
                            <span className="flex-1">{item.label}</span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Status badge */}
          <div className="mx-2 p-3 rounded-lg bg-doc-surface border border-doc-border">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-medium text-doc-text">All Systems Operational</span>
            </div>
            <p className="text-[10px] text-doc-text-muted leading-relaxed">
              API latency: &lt;10ms (inbound) · &lt;50ms (outbound)
            </p>
          </div>
        </nav>
      </aside>
    </>
  );
}
