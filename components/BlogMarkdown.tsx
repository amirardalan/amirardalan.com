import { useTheme, Global } from '@emotion/react'
import Image from 'next/image'

import { solarizedlight, tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rangeParser from 'parse-numeric-range'
import gfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import link from 'rehype-autolink-headings'


export default function BlogMarkdown({ post }) {

  const theme: any = useTheme()
  const setSyntaxTheme = theme.code === 'light' 
    ? solarizedlight
    : tomorrow

  // Syntax Highlighter Object for Markdown
  const MarkdownComponents: object = {
    code({ node, inline, className,...props }) {

      // Set code language declared in code block: ```lang
      const match = /language-(\w+)/.exec(className || '')

      // Check for line highlighting metastring
      const hasMeta = node?.data?.meta

      // Highlight lines declared in code block
      //example: ```jsx {2,4-6}
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
    // Convert Markdown img to next/image component and set height, width and optional Banner
    // example: ![AltText {Banner}{768x432}](...
    p: paragraph => {
      const { node } = paragraph

      if (node.children[0].tagName === "img") {
        const image = node.children[0]
        const alt = image.properties.alt?.replace(/ *\{[^)]*\} */g, "")
        const isBanner = image.properties.alt?.toLowerCase().includes('{banner}')
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
            priority={isBanner ? true : false}
          />
        )
      }
      return <p>{paragraph.children}</p>
    },
    // Open external links in new tab
    a: anchor => {
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
      // Handle internal linking normally
      return <a href={anchor.href}>{anchor.children}</a>
    }
  }

  return (
    <>
      <ReactMarkdown
        children={post.content}
        components={MarkdownComponents}
        remarkPlugins={[
          [gfm],
        ]}
        rehypePlugins={[
          [rehypeSlug],
          [link],
        ]}
      />
      <Global styles={{
        // react-syntax-highlighter styles
        '.codeStyle, pre, code, code span': {
          fontFamily: 'var(--font-primary)',
          fontStyle: 'normal !important'
        },
        pre: {
          marginBottom: '1.5rem',
        },
        '.codeStyle': {
          padding: '1rem !important',
          overflow: 'scroll',
          borderRadius: 5,
          backgroundColor: 'var(--syntax-highlight-bg) !important',
          'code': {
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
        },
        code: {
          wordWrap: 'break-word',
          fontSize: 16,
          color: 'var(--color-gray)',
          backgroundColor: 'var(--color-accent)',
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
          margin: '0 -1rem',
          padding: '0 .8rem',
        },
      }} />
    </>
  )
}