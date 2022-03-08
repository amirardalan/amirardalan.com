import { useTheme, css } from '@emotion/react'
import Image from 'next/image'

import { base16AteliersulphurpoolLight, atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rangeParser from 'parse-numeric-range'
import gfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import link from 'rehype-autolink-headings'


export default function BlogMarkdown({ markdown }) {

  const styleMarkdown = css({
    '.codeStyle, pre, code, code span': {
      fontFamily: 'var(--font-primary)',
      fontStyle: 'normal !important',
      lineHeight: '1.5rem !important',
      fontSize: 16,
      border: 'none',
      boxShadow: 'none',
      textShadow: 'none'
    },
    pre: {
      margin: '0 -1.5rem 1.5rem -1.5rem',
      fontSize: 15,
      '@media(max-width: 768px)': {
        fontSize: 13
      }
    },
    '.codeStyle': {
      padding: '1.5rem 0 1.5rem 1.5rem !important',
      overflow: 'scroll',
      borderRadius: 5,
      backgroundColor: 'var(--syntax-highlight-bg) !important',
      code: {
        paddingRight: '1.5rem',
        backgroundColor: 'transparent !important',
        transform: 'translateZ(0)',
        minWidth: '100%',
        float: 'left',
        '& > span': {
          display: 'block',
          '&:last-of-type': {
            display: 'none',
          }
        },
      },
      '@media(max-width: 768px)': {
        borderRadius: 0,
      },
    },
    code: {
      wordWrap: 'break-word',
      fontSize: 16,
      color: 'var(--color-text)',
      backgroundColor: 'var(--code-highlight)',
      borderRadius: 5,
      '&::before, &::after': {
        content: '"`"',
        color: 'var(--color-accent-color)'
      },
    },
    'pre code': {
      '&::before, &::after': { content: 'none' },
    },
    'span.linenumber': {
      display: 'none !important'
    },
    '[data="highlight"]': {
      background: 'var(--code-highlight)',
      borderLeft: '3px solid var(--color-accent-color)',
      margin: '0 -1.5rem',
      padding: '0 1.3rem',
    },
  })

  const theme: any = useTheme()
  const setSyntaxTheme = theme.code === 'light'
    ? base16AteliersulphurpoolLight
    : atomDark

  const MarkdownComponents: object = {
    code({ node, inline, className,...props }) {

      const match = /language-(\w+)/.exec(className || '')
      const hasMeta = node?.data?.meta

      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/
          const metadata = node.data.meta?.replace(/\s/g, '')
          const strlineNumbers = RE.test(metadata)
            ? RE.exec(metadata)[1]
            : '0'
          const highlightLines = rangeParser(strlineNumbers)
          const highlight = highlightLines
          const data: string = highlight.includes(applyHighlights)
            ? 'highlight'
            : null
          return { data }
        } else {
          return {}
        }
      }

      return match ? (
        <SyntaxHighlighter
          style={setSyntaxTheme}
          language={match[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={true}
          useInlineStyles={true}
          lineProps={applyHighlights}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      )
    },
    p: (paragraph: { children?: any; node?: any }) => {
      const { node } = paragraph

      if (node.children[0].tagName === "img") {
        const image = node.children[0]
        const alt = image.properties.alt?.replace(/ *\{[^)]*\} */g, "")
        const isPriority = image.properties.alt?.toLowerCase().includes('{priority}')
        const metaWidth = image.properties.alt.match(/{([^}]+)x/)
        const metaHeight = image.properties.alt.match(/x([^}]+)}/)
        const width = metaWidth ? metaWidth[1] : "768"
        const height = metaHeight ? metaHeight[1] : "432"

        return (
          <Image
            src={image.properties.src}
            width={width}
            height={height}
            className="postImg"
            alt={alt}
            priority={isPriority}
          />
        )
      }
      return <p>{paragraph.children}</p>
    },
    a: (anchor: { href: string; children: {} }) => {
      if (anchor.href.match('http')) {
        return (
          <a
            href={anchor.href}
            target="_blank"
            rel="noopener noreferrer">
            {anchor.children}
          </a>
        )
      }
      return <a href={anchor.href}>{anchor.children}</a>
    }
  }

  return (
    <ReactMarkdown
      components={MarkdownComponents}
      remarkPlugins={[ [gfm], ]}
      rehypePlugins={[ [rehypeSlug], [link], [rehypeRaw, { passThrough: ["element"] }] ]}
      css={styleMarkdown}
    >
      {markdown.content}
    </ReactMarkdown>
  )
}