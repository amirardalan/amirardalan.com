import { useTheme } from '@emotion/react'
import { materialOceanic, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import gfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import link from 'rehype-autolink-headings'


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

  // Render ReactMarkdown and Rehype plugins
  return (
    <ReactMarkdown
      children={props.post.content}
      components={BlogSyntaxHighlight}
      remarkPlugins={[ [gfm] ]}
      rehypePlugins={[ [rehypeSlug], [link] ]}
    />
  )
}