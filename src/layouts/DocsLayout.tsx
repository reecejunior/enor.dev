import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DocsSidebar from '../components/DocsSidebar';
import CustomMDXProvider from '../components/mdx/MdxProvider';

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-doc-bg text-doc-text">
      <Navbar
        onToggleSidebar={() => setSidebarOpen((p) => !p)}
        sidebarOpen={sidebarOpen}
        showSidebarToggle
      />

      <div className="docs-grid pt-14">
        <DocsSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-w-0 overflow-hidden">
          <CustomMDXProvider>
            <div className="px-6 lg:px-10 xl:px-12 py-10">
              <Outlet />
            </div>
          </CustomMDXProvider>
        </main>
      </div>
    </div>
  );
}
