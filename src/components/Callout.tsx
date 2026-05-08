import React from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'success' | 'danger';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const CONFIG: Record<CalloutType, { icon: React.ComponentType<{ className?: string }>; border: string; bg: string; titleColor: string; iconColor: string }> = {
  info: {
    icon: Info,
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
    titleColor: 'text-blue-600 dark:text-blue-400',
    iconColor: 'text-blue-500',
  },
  success: {
    icon: CheckCircle,
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    titleColor: 'text-emerald-600 dark:text-emerald-400',
    iconColor: 'text-emerald-500',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    titleColor: 'text-amber-600 dark:text-amber-400',
    iconColor: 'text-amber-500',
  },
  danger: {
    icon: XCircle,
    border: 'border-red-500/20',
    bg: 'bg-red-500/5',
    titleColor: 'text-red-600 dark:text-red-400',
    iconColor: 'text-red-500',
  },
};

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const cfg = CONFIG[type];
  const Icon = cfg.icon;

  return (
    <div className={`p-4 rounded-xl border ${cfg.border} ${cfg.bg} my-6`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${cfg.iconColor} shrink-0 mt-0.5`} />
        <div className="min-w-0">
          {title && (
            <p className={`text-sm font-semibold ${cfg.titleColor} mb-1`}>{title}</p>
          )}
          <div className="text-sm text-doc-text-secondary leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
