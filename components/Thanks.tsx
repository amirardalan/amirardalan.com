import Link from 'next/link'


const styleThanks = ({
  p: {
    fontFamily: 'var(--font-tertiary)'
  },
  '.homeLink': {
    marginTop: '2rem',
    fontFamily: 'var(--font-secondary)',
    fontSize: 18,
  }
})

export default function Thanks({ content }) {
  
  return (
    <>
      <h1 className="pageHeading">
        {content.heading}
      </h1>
      <div css={styleThanks}>
        
        <p>{content.copy}</p>

        <div className="homeLink">
          <Link href="/">Return Home</Link>
        </div>

      </div>
    </>
  )
}