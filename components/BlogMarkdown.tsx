import { useTheme } from '@emotion/react'
import { materialLight, materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rangeParser from 'parse-numeric-range'
import gfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import link from 'rehype-autolink-headings'
import { Global } from '@emotion/react'

export default function BlogMarkdown({ props }) {

  const theme: any = useTheme()
  const setSyntaxTheme = theme.code === 'light' 
    ? materialLight
    : materialOceanic

  // Syntax Highlighter Object for Markdown
  const BlogSyntaxHighlight: object = {
    code({node, inline, className,...props}) {

      // Set code language declared in code block: ```lang
      const match = /language-(\w+)/.exec(className || '')

      const hasMeta = node?.data?.meta

      // Highlight lines declared in code block: ```lang {2,4-6}
      const applyHighlights: any = (applyHighlights: any) => {
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
    }
  }

  return (
    <>
      <ReactMarkdown
        children={props.post.content}
        components={BlogSyntaxHighlight}
        remarkPlugins={[ [gfm] ]}
        rehypePlugins={[ [rehypeSlug], [link] ]}
      />
      <Global styles={{
        '.codeStyle, pre, code, code span': {
          fontFamily: 'var(--font-primary)',
          fontStyle: 'normal !important'
        },
        '.codeStyle': {
          padding: '1rem !important',
          overflow: 'scroll',
          borderRadius: 5,
          backgroundColor: 'var(--syntax-highlight-bg) !important',
          'code': {
            backgroundColor: 'transparent !important',
            transform: 'translateZ(0)',
            '& > span': {
              display: 'block'
            }
          },
          '.hi': {
            display: 'block',
            backgroundColor: 'green'
          }
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
          overflow: 'auto',
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
        }
      }} />
    </>
  )
}