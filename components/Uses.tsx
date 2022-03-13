import { uses } from '@/data/content'
import Markdown from '@/components/Markdown'


const styleUsesMarkdown = ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '4rem',
  gridAutoRows: 'minmax(100px, auto)',
  lineHeight: '1.2rem',
  hr: {
    margin: '2rem 0'
  },
  'ul li, a': {
    color: 'var(--color-gray)',
    fontSize: 12,
  },
  'h3, h4, h5, h6': {
    fontFamily: 'var(--font-secondary)',
    margin: '1rem 0 .2rem'
  },
  h3: {
    paddingBottom: '1rem',
    marginBottom: '2rem',
    fontSize: 22,
    borderBottom: '3px solid var(--color-accent-color)',
  },
  h4: {
    width: 'fit-content',
    fontSize: 18,
  },
  h5: {
    fontSize: 12
  },
  '@media(max-width: 1024px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem',
    h3: {
      fontSize: 22,
    },
    'ul li, a': {
      fontSize: 14,
      lineHeight: '1.8rem'
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
      <h1 className="pageHeading">
        {uses.heading}
      </h1>
      <div css={styleUsesMarkdown}>
        <Markdown markdown={uses.devices} />
        <Markdown markdown={uses.stack} />
        <Markdown markdown={uses.tools} />
        <Markdown markdown={uses.software} />
      </div>
    </>
  )
}