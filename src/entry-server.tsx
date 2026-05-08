import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ApiKeyProvider } from './hooks/useApiKey';
import App from './App';

export function render(url: string) {
  const html = renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <ApiKeyProvider>
          <App />
        </ApiKeyProvider>
      </StaticRouter>
    </React.StrictMode>
  );
  return { html };
}
