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

export const components = {
  h1: (props: HeadingProps) => (
    <h1 className="mb-0 pt-12 text-dark dark:text-light" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="mb-3 mt-8 text-dark dark:text-light" {...props} />
  ),
  h3: ({ children, ...props }: HeadingProps) => {
    if (typeof children !== 'string' && !Array.isArray(children)) {
      return (
        <h3 className="mb-4 mt-8 text-2xl text-dark dark:text-light" {...props}>
          {children}
        </h3>
      );
    }
    const slug = generateSlug(
      Array.isArray(children)
        ? children
            .map((child) => (typeof child === 'string' ? child : ''))
            .join('')
        : children
    );
    return (
      <a
        href={`#${slug}`}
        className="group relative mb-4 mt-8 block scroll-mt-24 text-2xl leading-tight text-dark outline-none lg:leading-normal dark:text-light"
        id={slug}
        aria-label={`Link to ${children}`}
      >
        <span className="absolute -left-5 text-primary opacity-0 transition-opacity group-hover:opacity-100">
          #
        </span>
        {Array.isArray(children)
          ? children.map((child, index) =>
              typeof child === 'string' ? (
                child
              ) : (
                <code key={index} className="font-sans text-primary">
                  {child.props.children}
                </code>
              )
            )
          : children}
      </a>
    );
  },
  h4: (props: HeadingProps) => <h4 className="" {...props} />,
  p: (props: ParagraphProps) => (
    <p
      className="my-6 font-serif text-lg leading-normal text-dark dark:text-light"
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
    const isInsidePre = props.className?.includes('language-');
    if (!isInsidePre) {
      return (
        <code
          className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm text-dark dark:bg-zinc-800 dark:text-light"
          {...props}
        >
          {children}
        </code>
      );
    }
    const codeHTML = highlight(children as string);
    return (
      <code
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm text-dark dark:bg-zinc-800 dark:text-light"
        {...props}
      />
    );
  },
  pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="overflow-y-none my-8 overflow-x-auto rounded-lg bg-zinc-100 p-4 font-mono text-sm scrollbar scrollbar-track-zinc-600 scrollbar-thumb-zinc-500 dark:bg-zinc-900"
      {...props}
    >
      {children}
    </pre>
  ),
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
  img: (props: ComponentPropsWithoutRef<'img'> & { title?: string }) => {
    const { src, alt, title } = props;
    const isPriority = title?.trim().toLowerCase() === 'priority';
    return (
      <Image
        src={src!}
        alt={alt || 'Image'}
        width={736}
        height={552}
        priority={isPriority}
        className="my-6 h-auto w-full"
      />
    );
  },
  Figure: ({
    src,
    alt,
    caption,
    priority = false,
  }: {
    src: string;
    alt?: string;
    caption?: string;
    priority?: boolean;
  }) => (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt || 'Image'}
        width={736}
        height={552}
        priority={priority}
        className="h-auto w-full"
      />
      {caption && (
        <figcaption className="mt-2 text-right text-xxs uppercase text-gray-600 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
