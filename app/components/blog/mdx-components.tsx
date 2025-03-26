import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

// Export components directly so they can be imported in server components
export const components = {
  h1: (props: HeadingProps) => (
    <h1
      className="mb-0 pt-12 font-medium text-dark dark:text-light"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="mb-3 mt-8 font-medium text-dark dark:text-light"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="mb-3 mt-8 font-medium text-dark dark:text-light"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="leading-snug text-dark dark:text-light" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="list-decimal space-y-2 pl-5 text-dark dark:text-light"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="list-disc space-y-1 pl-5 text-dark dark:text-light"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium text-dark dark:text-light" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium text-dark dark:text-light" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-blue-500 hover:text-blue-700 dark:text-zinc-400 hover:dark:text-zinc-300 dark:underline dark:underline-offset-2 dark:decoration-zinc-800';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => {
    return (
      <pre
        className="mb-4 mt-6 overflow-auto rounded-lg bg-zinc-200 p-4 dark:bg-zinc-800"
        {...props}
      >
        {children}
      </pre>
    );
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] mt-4 border-l-4 border-zinc-300 pl-4 text-dark dark:border-zinc-600 dark:text-light"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
