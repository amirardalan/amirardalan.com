import { ComponentPropsWithoutRef } from 'react';
import { highlight } from 'sugar-high';
import Link from 'next/link';
import Image from 'next/image';
import { generateSlug } from '@/utils/generate-slug';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

// Export components directly so they can be imported in server components
export const components = {
  h1: (props: HeadingProps) => (
    <h1 className="mb-0 pt-12 text-dark dark:text-light" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="mb-3 mt-8 text-dark dark:text-light" {...props} />
  ),
  h3: ({ children, ...props }: HeadingProps) => {
    // Only process string children
    if (typeof children !== 'string') {
      return (
        <h3 className="mb-4 mt-8 text-2xl text-dark dark:text-light" {...props}>
          {children}
        </h3>
      );
    }

    const slug = generateSlug(children);

    return (
      <h3
        id={slug}
        className="group relative mb-4 mt-8 text-2xl text-dark dark:text-light"
        {...props}
      >
        <a
          href={`#${slug}`}
          className="absolute -left-4 text-primary opacity-0 transition-opacity group-hover:opacity-100"
          aria-label={`Link to ${children}`}
        >
          #
        </a>
        {children}
      </h3>
    );
  },
  h4: (props: HeadingProps) => <h4 className="" {...props} />,
  p: (props: ParagraphProps) => (
    <p
      className="font-serif leading-normal text-dark dark:text-light"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="list-decimal space-y-2 pl-5 text-dark dark:text-light"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="my-8 list-disc space-y-1 pl-5 text-dark dark:text-light"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="text-dark dark:text-light" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="text-dark dark:text-light" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-primary hover:underline dark:text-zinc-400 hover:dark:text-zinc-300 dark:underline dark:underline-offset-2 dark:decoration-zinc-800';
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
        className="overflow-y-none my-8 overflow-x-auto rounded-lg bg-zinc-100 p-4 font-mono text-sm scrollbar scrollbar-track-zinc-600 scrollbar-thumb-zinc-500 dark:bg-zinc-900"
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
      className="my-6 ml-[0.075em] border-l-4 border-zinc-300 pl-4 font-serif text-3xl text-zinc-400 dark:border-zinc-600 dark:text-zinc-500"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    <Image
      src={props.src!}
      alt={props.alt || 'Image'}
      width={736}
      height={552}
      priority={true} // TODO: Make this configurable based on props
      className="my-6"
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
