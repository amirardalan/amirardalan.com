import { css } from '@emotion/react'
import { error } from '@/data/content'


export default function ErrorContent() {

  const styleErrorContent = css({
    display: 'flex',
    justifyContent: 'center',
    '.quoteContainer': {
      maxWidth: 600,
      paddingTop: '2rem',
      margin: '1rem 0 3rem 0',
      borderTop: '1px solid var(--color-gray)',
      textAlign: 'left',
    },
    '.quote': {
      fontFamily: 'var(--font-tertiary)',
      fontStyle: 'italic',
      color: 'var(--color-gray)'
    },
    '.author': {
      marginTop: '.5rem',
      fontFamily: 'var(--font-tertiary)',
      '&::before': {
        content: '"— "'
      }
    }
  })

  return (
    <div css={styleErrorContent}>
      <div className="quoteContainer">
        <p className="quote">{error.quote}</p>
        <p className="author">{error.author}</p>
      </div>
    </div>
  )
}