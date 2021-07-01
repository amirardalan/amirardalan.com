import { uses } from '@/data/content'
import Markdown from '@/components/Markdown'

export default function Uses() {

  const styleUsesMarkdown = ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '4rem',
    gridAutoRows: 'minmax(100px, auto)',
    lineHeight: '2rem',
    'ul li, a': {
      color: 'var(--color-gray)',
    },
    'h3, h4, h5, h6': {
      fontFamily: 'var(--font-secondary)',
    },
    h3: {
      margin: '2rem 0 1rem 0',
      paddingBottom: '1rem',
      fontSize: 40,
      borderBottom: '3px solid var(--color-accent-gray)',
    },
    h4: {
      marginTop: '2rem',
      paddingBottom: '.2rem',
      fontSize: 24,
    },
    '@media(max-width: 890px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
      h3: {
        fontSize: 30,
      },
      h4: {
        fontSize: 20
      }
    },
    '@media(max-width: 480px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '2rem',
    },
  })

  return (
    <div className="container uses">
      <h2 className="pageHeading">
        {uses.meta.title}
      </h2>
      <div css={styleUsesMarkdown}>
        <div>
          <Markdown markdown={uses.computer} />
        </div>
        <div>
          <Markdown markdown={uses.stack} />
        </div>
        <div>
          <Markdown markdown={uses.software} />
        </div>
      </div>
    </div>
  )
}