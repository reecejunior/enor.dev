import { Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import HomeLayout from './layouts/HomeLayout';
import DocsLayout from './layouts/DocsLayout';
import HomePage from './pages/HomePage';
import OverviewPage from './pages/docs/OverviewPage';
import AuthenticationPage from './pages/docs/AuthenticationPage';
import InboundPage from './pages/docs/InboundPage';
import OutboundPage from './pages/docs/OutboundPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

export default function App() {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? 'dark' : ''}>
      <Routes>
        {/* Home layout */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Route>

        {/* Docs layout */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Navigate to="/docs/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="api-reference/authentication" element={<AuthenticationPage />} />
          <Route path="api-reference/inbound" element={<InboundPage />} />
          <Route path="api-reference/outbound" element={<OutboundPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
