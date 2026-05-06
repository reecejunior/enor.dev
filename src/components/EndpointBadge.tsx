import React from 'react';

interface EndpointBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
}

const METHOD_STYLES: Record<string, string> = {
  GET: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20',
  POST: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  PUT: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20',
  DELETE: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20',
  PATCH: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20',
};

export default function EndpointBadge({ method, path }: EndpointBadgeProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider border ${METHOD_STYLES[method] || METHOD_STYLES.GET}`}
      >
        {method}
      </span>
      <code className="text-sm font-mono font-medium text-doc-text dark:text-doc-text">
        {path}
      </code>
    </div>
  );
}
