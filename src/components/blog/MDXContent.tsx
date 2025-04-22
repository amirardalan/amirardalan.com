import { useMDXComponents } from '@/components/blog/MDXComponents';
import { MDXProvider } from '@mdx-js/react';
import { ReactNode } from 'react';

interface MDXContentProps {
  children: ReactNode;
}

export default function MDXContent({ children }: MDXContentProps) {
  const components = useMDXComponents();

  return (
    <div className="mdx-content">
      <MDXProvider components={components}>{children}</MDXProvider>
    </div>
  );
}
