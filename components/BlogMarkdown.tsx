import theme from '@/styles/theme'
import { materialOceanic, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import gfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import link from 'rehype-autolink-headings'
import { Global } from '@emotion/react'

export default function BlogMarkdown({ props }) {

  // Syntax Highlighter Object for Markdown
  const BlogSyntaxHighlight: object = {
    code({node, inline, className,...props}) {
      const syntaxTheme: any = theme.code
      const setSyntaxTheme = syntaxTheme === 'light' ? materialLight : materialOceanic
      const match = /language-(\w+)/.exec(className || '')
      return match ? (
        <SyntaxHighlighter
          style={setSyntaxTheme}
          language={match[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={false}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      )
    }
  }

  return (
    <>
      <Global styles={{
        '.codeStyle, pre, code, code span': {
          fontFamily: 'var(--font-primary)',
          fontStyle: 'normal !important'
        },
        '.codeStyle': {
          overflow: 'scroll',
          borderRadius: 5,
          backgroundColor: 'var(--syntax-highlight-bg)' + '!important',
          'code': {
            backgroundColor: 'transparent' + '!important',
            transform: 'translateZ(0)'
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
        '.language-bash span.linenumber': {
          display: 'none !important'
        },
      }} />

      <ReactMarkdown
        children={props.post.content}
        components={BlogSyntaxHighlight}
        remarkPlugins={[ [gfm] ]}
        rehypePlugins={[ [rehypeSlug], [link] ]}
      />
    </>
  )
}