import { useState } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'

import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rangeParser from 'parse-numeric-range'
import gfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import link from 'rehype-autolink-headings'


export default function BlogMarkdown({ markdown }) {

  const syntaxTheme = nightOwl

  const styleMarkdown = css({
    '.codeStyle, pre, code, code span': {
      fontFamily: 'var(--font-primary)',
      fontStyle: 'normal',
      lineHeight: '1.5rem !important',
      fontSize: 15,
      border: 'none',
      boxShadow: 'none',
      textShadow: 'none',
      '@media(max-width: 768px)': {
        lineHeight: '1.2rem !important',
        fontSize: 13
      }
    },
    '.copyCode': {
      position: 'relative',
      button: {
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
      fontSize: 16,
      color: 'var(--color-neutral)',
      backgroundColor: 'var(--code)',
      borderRadius: 5,
      '&::before, &::after': {
        content: '"`"',
        color: 'var(--color-primary)'
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
      margin: '0 -1.5rem',
      padding: '0 1.5rem',
    },
  })

  interface PreNode {
    node?: any
    children: Array<object>
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
    },
    pre: (pre: PreNode) => {
      const codeChunk = pre.node.children[0].children[0].value

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
      remarkPlugins={[ [gfm], ]}
      rehypePlugins={[ [rehypeSlug], [link], [rehypeRaw, { passThrough: ["element"] }] ]}
      css={styleMarkdown}
    >
      {markdown.content}
    </ReactMarkdown>
  )
}
