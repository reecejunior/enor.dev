import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SearchModal from './components/SearchModal';
import Overview from './sections/Overview';
import InboundEngine from './sections/InboundEngine';
import OutboundEngine from './sections/OutboundEngine';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'inbound-engine', label: 'Inbound Engine' },
  { id: 'outbound-engine', label: 'Outbound Engine' },
  { id: 'integrations', label: 'Integrations' },
];

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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

  // Scroll-spy for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setSidebarOpen(false);
  }, []);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-doc-bg text-doc-text">
        {/* Navbar */}
        <Navbar
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onOpenSearch={() => setSearchOpen(true)}
          onToggleSidebar={() => setSidebarOpen((p) => !p)}
          sidebarOpen={sidebarOpen}
        />

        {/* Search Modal */}
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onNavigate={handleNavigate}
        />

        {/* Main layout */}
        <div className="doc-grid pt-16">
          {/* Left sidebar */}
          <Sidebar
            activeSection={activeSection}
            onNavigate={handleNavigate}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main content area — spans center + right columns */}
          <main className="col-span-1 xl:col-span-2 min-w-0">
            {/* Overview & Quickstart */}
            <section id="overview" className="scroll-mt-20 px-6 lg:px-10 xl:px-12 py-12 border-b border-doc-border">
              <Overview />
            </section>

            {/* Authentication placeholder */}
            <section id="authentication" className="scroll-mt-20">
              {/* authentication content is in Overview component */}
            </section>

            {/* Inbound Engine */}
            <section id="inbound-engine" className="scroll-mt-20 px-6 lg:px-10 xl:px-12 py-12 border-b border-doc-border">
              <InboundEngine />
            </section>

            {/* Outbound Engine */}
            <section id="outbound-engine" className="scroll-mt-20 px-6 lg:px-10 xl:px-12 py-12 border-b border-doc-border">
              <OutboundEngine />
            </section>

            {/* Integrations placeholder */}
            <section id="integrations" className="scroll-mt-20 px-6 lg:px-10 xl:px-12 py-12 border-b border-doc-border">
              <div className="doc-content-grid">
                <div className="doc-prose">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-medium mb-6">
                    Coming Soon
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-doc-text mb-4">
                    Integrations
                  </h1>
                  <p className="text-lg text-doc-text-secondary leading-relaxed mb-6">
                    FHIR-native interoperability guides, EHR system connectors, and third-party LLM provider setup — launching soon.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { name: 'OpenAI', desc: 'GPT-4 & GPT-3.5 Turbo integration' },
                      { name: 'Google AI', desc: 'Gemini model family support' },
                      { name: 'FHIR R4', desc: 'HL7 FHIR R4 resource mapping' },
                      { name: 'Epic EHR', desc: 'Electronic Health Record connector' },
                    ].map((item) => (
                      <div key={item.name} className="p-4 rounded-xl border border-doc-border bg-doc-surface/50 opacity-60">
                        <h4 className="font-semibold text-doc-text mb-1 text-sm">{item.name}</h4>
                        <p className="text-xs text-doc-text-muted">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="doc-code-pane" />
              </div>
            </section>

            {/* Footer */}
            <footer className="px-6 lg:px-10 xl:px-12 py-12">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-doc-text-muted">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-doc-accent rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-[10px]">E</span>
                  </div>
                  <span>© 2026 EnorAI Inc. All rights reserved.</span>
                </div>
                <div className="flex gap-6 text-xs">
                  <a href="#" className="hover:text-doc-text transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-doc-text transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-doc-text transition-colors">Status</a>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
