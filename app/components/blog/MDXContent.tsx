'use client';

import { useMDXComponents } from '@/mdx-components';
import { MDXProvider } from '@mdx-js/react';
import { ReactNode } from 'react';

export default function MDXContent({ children }: { children: ReactNode }) {
  const components = useMDXComponents();

  return <MDXProvider components={components}>{children}</MDXProvider>;
}
