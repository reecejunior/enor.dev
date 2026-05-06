import React from 'react';

interface Param {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ParamTableProps {
  title?: string;
  params: Param[];
}

export default function ParamTable({ title = 'Parameters', params }: ParamTableProps) {
  return (
    <div className="my-6">
      <h4 className="text-sm font-semibold text-doc-text mb-3 flex items-center gap-2">
        {title}
      </h4>
      <div className="border border-doc-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-doc-surface-2 dark:bg-doc-surface text-left">
              <th className="px-4 py-3 text-xs font-semibold text-doc-text-muted uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-xs font-semibold text-doc-text-muted uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-xs font-semibold text-doc-text-muted uppercase tracking-wider">Required</th>
              <th className="px-4 py-3 text-xs font-semibold text-doc-text-muted uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-doc-border">
            {params.map((param) => (
              <tr
                key={param.name}
                className="hover:bg-doc-surface transition-colors"
              >
                <td className="px-4 py-3">
                  <code className="text-[13px] font-mono font-medium text-doc-accent">
                    {param.name}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-0.5 rounded-md bg-doc-surface-2 text-xs font-mono text-doc-text-secondary">
                    {param.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {param.required ? (
                    <span className="inline-flex px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium">
                      Required
                    </span>
                  ) : (
                    <span className="text-xs text-doc-text-muted">Optional</span>
                  )}
                </td>
                <td className="px-4 py-3 text-doc-text-secondary text-[13px] leading-relaxed">
                  {param.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
