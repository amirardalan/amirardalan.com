import { useTheme } from '@emotion/react'
import { materialOceanic, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import gfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import link from 'rehype-autolink-headings'
import { Global } from '@emotion/react'

export default function BlogMarkdown({ props }) {

  const theme: any = useTheme()

  // Syntax Highlighter Object for Markdown
  const BlogSyntaxHighlight: object = {
    code({node, inline, className,...props}) {
      const syntaxTheme = theme.syntaxHighlight.theme
      const setSyntaxTheme = syntaxTheme === 'syntaxDark' ? materialOceanic : materialLight
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
          fontFamily: theme.fonts.primary,
          fontStyle: 'normal !important'
        },
        '.codeStyle': {
          overflow: 'scroll',
          borderRadius: 5,
          backgroundColor: theme.syntaxHighlight.background + '!important',
          'code': {
            backgroundColor: 'transparent' + '!important',
            transform: 'translateZ(0)'
          },
        },
        code: {
          wordWrap: 'break-word',
          fontSize: 16,
          color: theme.colors.grayscale,
          backgroundColor: theme.colors.accent,
          borderRadius: 5,
          '&::before, &::after': {
            content: '"`"',
            color: theme.colors.accentColor
          },
          span: {
            '&:last-of-type': {
              display: 'none !important'
            }
          }
        },
        'pre code': {
          '&::before, &::after': { content: 'none' },
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