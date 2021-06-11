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

      const match = /language-(\w+)/.exec(className || '')
      const RE = /{([\d,-]+)}/
      const metadata = node.data.meta
      const strlineNumbers : any = RE.exec(metadata)[1]
      const lineNumbers : any = rangeParser(strlineNumbers)

      const highlightLine: any = (lineNumbers) => {
        console.log(lineNumbers)
      }

      const ADDED = [1, 2];
      const REMOVED = [6];

      return match ? (
        <SyntaxHighlighter
          style={setSyntaxTheme}
          language={match[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={true}
          lineProps={lineNumber => {
            let style: any = { display: 'block' };
            if (ADDED.includes(lineNumber)) {
              style.backgroundColor = '#dbffdb';
            } else if (REMOVED.includes(lineNumber)) {
              style.backgroundColor = '#ffecec';
            }
            return { style };
          }}
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
            transform: 'translateZ(0)'
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
          '&::before, &::after': { content: 'none' },
        },
        '.language-bash span.linenumber': {
          display: 'none !important'
        },
      }} />
    </>
  )
}