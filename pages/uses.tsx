import { uses } from '@/data/content'
import Markdown from '@/components/Markdown'

export default function Uses() {

  const styleUsesMarkdown = ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '4rem',
    gridAutoRows: 'minmax(100px, auto)',
    'h3, h4, h5, h6': {
      fontFamily: 'var(--font-secondary)',
    },
    h3: {
      marginTop: '2rem',
      fontSize: 'calc(1.8vw + 1.8vh)',
      WebkitMarqueeIncrement: '0vw',
    },
    h4: {
      margin: '1rem 0 .5rem 0',
      paddingBottom: '.2rem',
      borderBottom: '1px solid var(--color-accent-gray)',
      fontSize: 'calc(.9vw + .9vh)',
      WebkitMarqueeIncrement: '0vw',
    },
    '@media(max-width: 890px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
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