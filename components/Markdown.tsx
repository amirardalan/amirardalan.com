import { useState } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import generateSlug from '@/utils/generateSlug'
import rangeParser from 'parse-numeric-range'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('scss', scss)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('markdown', markdown)


export default function BlogMarkdown({ markdown }) {

  const syntaxTheme = oneDark

  const styleMarkdown = css({
    '.codeStyle, pre, code, code span': {
      fontFamily: 'var(--font-primary)',
      fontStyle: 'normal',
      fontSize: 16,
      border: 'none',
      boxShadow: 'none',
      textShadow: 'none',
      '@media(max-width: 768px)': {
        fontSize: 14
      }
    },
    '.copyCode': {
      position: 'relative',
      button: {
        display: 'none',
        zIndex: 1,
        position: 'absolute',
        top: 13,
        right: -10,
        backgroundColor: 'var(--code-highlight)',
        borderRadius: 5,
        textTransform: 'uppercase',
        fontSize: 13,
        padding: '.1rem .4rem .2rem',
        color: 'var(--color-bg)',
        '&:after': {
          content: '"📋"',
        },
      },
      '&.active button:after': {
        content: '"☑️"'
      },
      '&:hover': {
        button: {
          display: 'block'
        }
      }
    },
    pre: {
      margin: '0 -1.5rem 2.5rem -1.5rem',
      fontSize: 15,
    },
    '.codeStyle': {
      padding: '1.5rem 0 1.5rem 1.5rem !important',
      overflow: 'scroll',
      borderRadius: 5,
      background: 'transparent !important',
      backgroundColor: 'var(--code-bg) !important',
      code: {
        paddingRight: '1.5rem',
        backgroundColor: 'transparent !important',
        transform: 'translateZ(0)',
        minWidth: '100%',
        float: 'left',
        '& > span[data="highlight"]': {
          display: 'block',
          '&:last-of-type': {
            display: 'none',
          }
        },
      },
      '@media(max-width: 768px)': {
        borderRadius: '0 !important',
      },
    },
    code: {
      wordWrap: 'break-word',
      color: 'var(--color-primary)',
      borderRadius: 5,
      '&::before, &::after': {
        content: '"`"',
        color: 'var(--color-primary)'
      },
      '@media(max-width: 768px)': {
        fontSize: 16
      }
    },
    'p code': {
      textShadow: 'none !important',
    },
    'pre code': {
      fontFamily: 'var(--font-primary) !important',
      '&::before, &::after': { content: 'none' },
    },
    'h3 code': {
      color: 'inherit'
    },
    'span.linenumber': {
      display: 'none !important'
    },
    '[data="highlight"]': {
      background: 'var(--code-highlight)',
      margin: '0 -1.5rem',
      padding: '0 1.5rem',
    },
  })

  interface PreNode {
    node?: any
    children: Array<any>
    position: object
    properties: object
    tagName: string
    type: string
  }

  const MarkdownComponents: object = {
    code({ node, inline, className, ...props }) {

      const match = /language-(\w+)/.exec(className || '')
      const hasMeta = node?.data?.meta

      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/
          const metadata = node.data.meta?.replace(/\s/g, '')
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)[1]
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
          style={syntaxTheme}
          language={match[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta ? true : false}
          useInlineStyles={true}
          lineProps={applyHighlights}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      )
    },
    p: (paragraph: { children?: boolean; node?: any}) => {
      const { node } = paragraph

      if (node.children[0].tagName === "img") {
        const image = node?.children[0]
        const metastring = image?.properties?.alt
        const alt = metastring?.replace(/ *\{[^)]*\} */g, "")
        const metaWidth = metastring?.match(/{([^}]+)x/)
        const metaHeight = metastring?.match(/x([^}]+)}/)
        const width = metaWidth ? metaWidth[1] : "768"
        const height = metaHeight ? metaHeight[1] : "432"
        const isPriority = metastring?.toLowerCase().match('{priority}')
        const hasCaption = metastring?.toLowerCase().includes('{caption:')
        const caption = metastring?.match(/{caption: (.*?)}/)?.pop()

        return (
          <div className="postImgWrapper">
            <Image
              src={image.properties.src}
              width={width}
              height={height}
              className="postImg"
              alt={alt}
              priority={isPriority}
            />
            {hasCaption ? <div className="caption" aria-label={caption}>{caption}</div> : null}
          </div>
        )
      }
      return <p>{paragraph.children}</p>
    },
    a: (anchor: { href: string; children: Array<any> }) => {
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
    },
    h3: (props: any) => {
      const arr = props.children
      
      let heading = ''

      for (let i = 0; i < arr.length; i++) {
        if (arr[i]?.type !== undefined) {
          for (let j = 0; j < arr[i].props.children.length; j++) {
            heading += arr[i]?.props?.children[0]
          }
        } else heading += arr[i]
      }

      const slug = generateSlug(heading)
      return <h3 id={slug}><a href={`#${slug}`} {...props}></a></h3>
    },
    pre: (pre: PreNode) => {
      const codeChunk = pre.node.children[0].children[0].value
      
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [codeCopied, setCodeCopied] = useState(false)
      const handleCopyCode = (codeChunk: string) => {
        setCodeCopied(true)
        navigator.clipboard.writeText(codeChunk)
        setTimeout(() => {
          setCodeCopied(false)
        }, 5000)
      }
      return (
        <div className={codeCopied ? 'copyCode active' : 'copyCode'}>
          <button onClick={()=> handleCopyCode(codeChunk)} aria-label="Copy code to clipboard" />
          <pre {...pre}></pre>
        </div>
      )
    }
  }

  return (
    <ReactMarkdown
      components={MarkdownComponents}
      rehypePlugins={[[rehypeRaw, { passThrough: ["element"] }]]}
      css={styleMarkdown}
    >
      {markdown.content}
    </ReactMarkdown>
  )
}
