import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useTheme } from '@emotion/react'

// Toggle Syntax Highlight based on theme
const SyntaxTheme = () => {
  const theme:any = useTheme()
  const setSyntaxTheme
    = theme.syntaxHighlight.theme === 'syntaxDark' 
    ? materialOceanic : materialLight
  return setSyntaxTheme
}

// Syntax Highlighter Object for Markdown
const BlogSyntaxHighlight = {
  code({setTheme, node, inline, className,...props}) {
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
      <SyntaxHighlighter
        style={SyntaxTheme()}
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

export default BlogSyntaxHighlight as object