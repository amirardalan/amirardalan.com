import { FC, ReactElement, useState } from 'react';
import Image from 'next/image';
import { css, Theme, useTheme } from '@emotion/react';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { generateSlug } from '@/utils/generateSlug';
import rangeParser from 'parse-numeric-range';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import lua from 'react-syntax-highlighter/dist/cjs/languages/prism/lua';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('lua', lua);

import { MarkdownTypes } from '@/types/markdown';

type BlogMarkdownProps = MarkdownTypes;

const BlogMarkdown: FC<BlogMarkdownProps> = ({ markdown }) => {
  const theme: Theme = useTheme();
  const syntaxTheme = theme.active === 'dark' ? oneDark : oneLight;

  const styleMarkdown = css({
    '.codeStyle, pre, code, code span': {
      fontFamily: 'var(--font-primary)',
      fontStyle: 'normal',
      fontSize: 16,
      border: 'none',
      boxShadow: 'none',
      textShadow: 'none',

      '@media(max-width: 768px)': {
        fontSize: 14,
      },
      '::-webkit-scrollbar': {
        width: 16,
        height: '8px',
      },
      '::-webkit-scrollbar-thumb': {
        border: '4px solid var(--code-scrollbar)',
        width: 8,
        backgroundClip: 'padding-box',
        borderRadius: 10,
        WebkitBoxShadow: 'none',
        '&:hover': {
          border: '4px solid var(--code-scrollbar-hover)',
        },
      },
    },
    '.copyCode': {
      position: 'relative',
      '.language': {
        position: 'absolute',
        bottom: 10,
        right: -10,
        color: 'var(--color-accent-gray)',
        textAlign: 'right',
        fontSize: 12,
      },
      button: {
        background: 'var(--code-bg)',
        border: '1px solid var(--code-scrollbar-hover)',
        zIndex: 1,
        position: 'absolute',
        top: 14,
        right: -10,
        borderRadius: 5,
        textTransform: 'uppercase',
        fontSize: 13,
        padding: '.4rem .4rem',
        width: 28,
        height: 28,
        color: 'var(--color-bg)',
        '&:hover': {
          background: 'var(--code-highlight)',
        },
        '&:not(:hover)': {
          opacity: 0,
          animation: 'fadeOut ease-out .2s',
          animationFillMode: 'forwards',
        },
      },
      '&:hover': {
        button: {
          opacity: 0,
          animation: 'fadeIn ease-in .2s',
          animationFillMode: 'forwards',
        },
      },
      '@keyframes fadeOut': {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
    },
    pre: {
      margin: '0 -1.5rem 2.5rem -1.5rem',
      fontSize: 15,
    },
    '.codeStyle': {
      padding: '1.5rem 0 1.5rem 1.5rem !important',
      overflow: 'scroll',
      background: 'transparent !important',
      borderRadius: '10px !important',
      backgroundColor: 'var(--code-bg) !important',
      code: {
        paddingRight: '1.2rem',
        marginLeft: -5,
        backgroundColor: 'transparent !important',
        transform: 'translateZ(0)',
        minWidth: '100%',
        float: 'left',
        '& > span[data="highlight"]': {
          display: 'block',
          '&:last-of-type': {
            display: 'none',
          },
        },
      },
      '@media(max-width: 768px)': {
        borderRadius: '0 !important',
        borderLeft: 'none',
        borderRight: 'none',
      },
    },
    code: {
      fontSize: 14,
      backgroundColor: 'var(--color-accent)',
      padding: '.1rem .3rem',
      wordWrap: 'break-word',
      borderRadius: 5,
      '&::before, &::after': {
        content: '"`"',
        color: 'var(--color-primary)',
      },
    },
    'p code': {
      textShadow: 'none !important',
    },
    'pre code': {
      fontFamily: 'var(--font-primary) !important',
      '&::before, &::after': { content: 'none' },
    },
    'span.linenumber': {
      display: 'none !important',
    },
    '[data="highlight"]': {
      background: 'var(--code-highlight)',
      margin: '0 -1.5rem',
      padding: '0 1.5rem',
    },
  });

  interface PreProps {
    className: string;
  }

  interface PreNode {
    node: Node & { [key: string]: any };
    children: ReactElement<PreProps, string>[];
    position: object;
    properties: object;
    tagName: string;
    type: string;
  }

  interface Node {
    [key: string]: any;
    type: string;
    value: string;
  }

  interface H3Props {
    children: React.ReactNode;
  }

  const MarkdownComponents: object = {
    code({
      node,
      inline,
      className,
      ...props
    }: {
      node: Node;
      inline: boolean;
      className: string;
      [key: string]: any;
    }) {
      const hasLang = /language-(\w+)/.exec(className || '');
      const hasMeta = node?.data?.meta;

      const applyHighlights = (lineNumber: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta.replace(/\s/g, '');
          let strlineNumbers = '0';
          if (RE.test(metadata)) {
            const match = RE.exec(metadata);
            if (match) {
              strlineNumbers = match[1];
            }
          }
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data = highlight.includes(lineNumber) ? 'highlight' : undefined;
          return { data };
        } else {
          return {};
        }
      };

      return hasLang ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} />
      );
    },
    p: (paragraph: { children?: boolean; node?: Node }) => {
      const { node } = paragraph;

      if (node?.children[0].tagName === 'img') {
        const image = node?.children[0];
        const metastring = image?.properties?.alt;
        const alt = metastring?.replace(/ *\{[^)]*\} */g, '');
        const metaWidth = metastring?.match(/{([^}]+)x/);
        const metaHeight = metastring?.match(/x([^}]+)}/);
        const width = metaWidth ? metaWidth[1] : '768';
        const height = metaHeight ? metaHeight[1] : '432';
        const isPriority = metastring?.toLowerCase().match('{priority}');
        const hasCaption = metastring?.toLowerCase().includes('{caption:');
        const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

        return (
          <div className="postImgWrapper">
            <Image
              src={image.properties.src}
              width={width}
              height={height}
              className="postImg"
              alt={alt}
              priority={isPriority}
              sizes="(max-width: 768px) 100vw)"
            />
            {hasCaption ? (
              <div className="caption" aria-label={caption}>
                {caption}
              </div>
            ) : null}
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    a: (anchor: { href: string; children: string }) => {
      if (anchor.href.match('http')) {
        return (
          <a href={anchor.href} target="_blank" rel="noopener noreferrer">
            {anchor.children}
          </a>
        );
      }
      return <a href={anchor.href}>{anchor.children}</a>;
    },
    h3: (props: H3Props) => {
      const children = Array.isArray(props.children)
        ? props.children
        : [props.children];

      const heading = children
        .flatMap((element) =>
          typeof element === 'string'
            ? element
            : element?.type !== undefined &&
              typeof element.props.children === 'string'
            ? element.props.children
            : typeof element === 'object' && element.props?.children?.flatMap
            ? element.props.children.flatMap((child: object) => {
                if (typeof child === 'string') return child;
                return '';
              })
            : ''
        )
        .join('');

      const slug = generateSlug(heading);

      return (
        <h3 id={slug}>
          <a href={`#${slug}`} {...props}></a>
        </h3>
      );
    },
    pre: (pre: PreNode) => {
      const codeChunk = pre.node.children[0].children[0].value;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [codeCopied, setCodeCopied] = useState(false);
      const handleCopyCode = (codeChunk: string) => {
        setCodeCopied(true);
        navigator.clipboard.writeText(codeChunk);
        setTimeout(() => {
          setCodeCopied(false);
        }, 5000);
      };

      const language = pre.children[0].props.className.replace(
        /language-/g,
        ''
      );

      return (
        <div className="copyCode">
          <button
            onClick={() => handleCopyCode(codeChunk)}
            aria-label="Copy code to clipboard"
          >
            {codeCopied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                  fill="var(--color-gray)"
                />
              </svg>
            ) : (
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                width={14}
                height={14}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m6 19v2c0 .621.52 1 1 1h2v-1.5h-1.5v-1.5zm7.5 3h-3.5v-1.5h3.5zm4.5 0h-3.5v-1.5h3.5zm4-3h-1.5v1.5h-1.5v1.5h2c.478 0 1-.379 1-1zm-1.5-1v-3.363h1.5v3.363zm0-4.363v-3.637h1.5v3.637zm-13-3.637v3.637h-1.5v-3.637zm11.5-4v1.5h1.5v1.5h1.5v-2c0-.478-.379-1-1-1zm-10 0h-2c-.62 0-1 .519-1 1v2h1.5v-1.5h1.5zm4.5 1.5h-3.5v-1.5h3.5zm3-1.5v-2.5h-13v13h2.5v-1.863h1.5v3.363h-4.5c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v4.5h-3.5v-1.5z"
                  fillRule="nonzero"
                  fill="var(--color-gray)"
                />
              </svg>
            )}
          </button>
          <span className="language">{language}</span>
          <pre {...pre}></pre>
        </div>
      );
    },
  };

  return (
    <ReactMarkdown
      components={MarkdownComponents}
      rehypePlugins={[[rehypeRaw, { passThrough: ['element'] }]]}
      css={styleMarkdown}
    >
      {markdown?.content ?? ''}
    </ReactMarkdown>
  );
};

export default BlogMarkdown;
