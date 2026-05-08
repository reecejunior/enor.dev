import React, { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Callout from '../Callout';
import ParamTable from '../ParamTable';
import EndpointBadge from '../EndpointBadge';
import { Tabs, Tab } from './Tabs';

const components = {
  // Headings with linkable IDs (already handled by remark-slug if we add it, but we can manually add IDs in MDX for now or use the generic props.id)
  h1: (props: any) => (
    <h1
      className="text-3xl lg:text-4xl font-bold tracking-tight text-doc-text leading-[1.15] mb-5 mt-5 scroll-mt-20"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="text-2xl font-semibold text-doc-text mb-4 mt-8 tracking-tight scroll-mt-20"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="text-xl font-semibold text-doc-text mb-3 mt-6 tracking-tight scroll-mt-20"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className="text-[15px] font-semibold text-doc-text mb-2 mt-4"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="text-lg text-doc-text-secondary leading-relaxed mb-6"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="space-y-3 text-doc-text-secondary leading-relaxed mb-6 list-disc list-inside"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="space-y-3 text-doc-text-secondary leading-relaxed mb-6 list-decimal list-inside"
      {...props}
    />
  ),
  li: (props: any) => <li className="ml-4" {...props} />,
  hr: (props: any) => <hr className="border-doc-border my-8" {...props} />,
  strong: (props: any) => <strong className="text-doc-text font-medium" {...props} />,
  a: (props: any) => (
    <a
      className="text-doc-link hover:text-doc-link-hover underline underline-offset-2 decoration-doc-link/30"
      {...props}
    />
  ),
  // Inline code
  code: (props: any) => {
    // If it's a block code (has data-theme), let it render naturally (or via pre)
    // If it's inline code (no data-language), apply our inline code styles
    if (!props.className && !props['data-language']) {
      return (
        <code
          className="px-1.5 py-0.5 rounded-md bg-doc-surface text-[13px] font-mono border border-doc-border text-doc-text"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  // Custom components available automatically in all MDX files
  Callout,
  ParamTable,
  EndpointBadge,
  Tabs,
  Tab,
};

interface CustomMDXProviderProps {
  children: ReactNode;
}

export default function CustomMDXProvider({ children }: CustomMDXProviderProps) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
