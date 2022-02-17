import { uses } from '@/data/content'
import Markdown from '@/components/Markdown'


const styleUsesMarkdown = ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '4rem',
  gridAutoRows: 'minmax(100px, auto)',
  lineHeight: '1.2rem',
  'ul li, a': {
    marginBottom: '1rem',
    color: 'var(--color-gray)',
  },
  'h3, h4, h5, h6': {
    fontFamily: 'var(--font-secondary)',
  },
  h3: {
    margin: '2rem 0 1rem 0',
    paddingBottom: '1rem',
    fontSize: 30,
    borderBottom: '3px solid var(--color-accent-gray)',
  },
  h4: {
    width: 'fit-content',
    margin: '2rem 0 .8rem 0',
    padding: '.5rem',
    color: 'var(--color-bg)',
    backgroundColor: 'var(--color-text)',
    boxShadow: '-2px 2px 0 var(--color-accent-color)',
    fontSize: 14,
  },
  h5: {
    marginBottom: '1rem',
  },
  '@media(max-width: 1024px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem',
    h3: {
      fontSize: 20,
    },
  },
  '@media(max-width: 480px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '2rem',
  },
})

export default function Uses() {
  
  return (
    <>
      <h2 className="pageHeading">
        {uses.heading}
      </h2>
      <div css={styleUsesMarkdown}>
        <div>
          <Markdown markdown={uses.devices} />
        </div>
        <div>
          <Markdown markdown={uses.stack} />
        </div>
        <div>
          <Markdown markdown={uses.tools} />
        </div>
        <div>
          <Markdown markdown={uses.software} />
        </div>
      </div>
    </>
  )
}