import Link from 'next/link'

import { css } from '@emotion/react'
import Container from '@/components/Container'
import ErrorIcon from '@/components/ErrorIcon'
import { errorContent } from '@/data/content'

import { GetStaticProps } from 'next'
export const getStaticProps: GetStaticProps = async () => {
  return { props: { error: errorContent } }
}



const style404Wrapper = css({
  overflow: 'hidden',
  padding: '4rem 1.5rem',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--page-bg)',
})

const style404Container = css({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1.5rem',
  h1: {
    margin: '0 1rem 0 .5rem',
    paddingRight: '1rem',
    alignSelf: 'center',
    fontSize: '40px',
    fontWeight: 800
  },
  h2: {
    alignSelf: 'center',
    fontFamily: 'var(--font-primary)',
    fontSize: '12px',
    fontWeight: 'normal',
  },
})

const styleErrorContent = css({
  display: 'flex',
  justifyContent: 'center',
  '.quoteContainer': {
    maxWidth: 400,
    paddingTop: '2rem',
    marginBottom: '3rem',
    borderTop: '1px solid var(--color-neutral)',
    textAlign: 'center',
  },
  '.quote': {
    fontSize: 22,
    fontFamily: 'var(--font-tertiary)',
    fontStyle: 'italic',
    color: 'var(--color-neutral)',
  },
  '.author': {
    marginTop: '.5rem',
    fontFamily: 'var(--font-tertiary)',
    '&::before': {
      content: '"— "'
    }
  }
})

const styleHomeButton = css({
  display: 'flex',
  justifyContent: 'center',
})

export default function Custom404({ error }) {

  return(
    <Container title={error.meta.title} robots="noindex">
      <main css={style404Wrapper}>
        <div css={style404Container}>
          <ErrorIcon />
          <h1 aria-label={error.title}>
            {error.title}
          </h1>
          <h2 aria-label={error.text}>
            {error.text}
          </h2>
        </div>
        <div css={styleErrorContent}>
          <div className="quoteContainer">
            <p className="quote">
              {error.quote}
            </p>
            <p className="author">
              {error.author}
            </p>
          </div>
        </div>
        <div css={styleHomeButton}>
          <Link href={error.link.path} aria-label={error.link.title} passHref>
            <button className="ctaButton">{error.link.title}</button>
          </Link>
        </div>
      </main>
    </Container>
  )
}