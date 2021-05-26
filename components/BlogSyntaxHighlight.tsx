import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { duotoneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const BlogSyntaxHighlight = {
  
  code({node, inline, className,...props}) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        style={duotoneDark}
        language={match[1]}
        PreTag="div"
        className="codeStyle"
        showLineNumbers={true}
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    )
  }
}

export default BlogSyntaxHighlight as any