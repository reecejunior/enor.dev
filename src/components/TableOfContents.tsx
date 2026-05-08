import { useState, useEffect } from 'react';

export interface TocItem {
  id: string;
  label: string;
  level: number; // 2 = h2, 3 = h3
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0.1 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="space-y-1">
      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-doc-text-muted mb-3">
        On this page
      </h4>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`
            block text-[13px] leading-snug py-1 transition-colors border-l-2
            ${item.level === 3 ? 'pl-6' : 'pl-3'}
            ${activeId === item.id
              ? 'border-doc-text text-doc-text font-medium'
              : 'border-transparent text-doc-text-muted hover:text-doc-text-secondary'
            }
          `}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
