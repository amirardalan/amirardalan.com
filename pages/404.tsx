import { css } from '@emotion/react'
import Container from '@/components/Container'
import ErrorIcon from '@/components/ErrorIcon'
import Link from 'next/link'
import { error } from '@/data/content'


export const getStaticProps = async () => {
  return { props: { data: error} }
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
  animation: 'slideUp .5s forwards',

  h1: {
    margin: '0 1rem 0 .5rem',
    paddingRight: '1rem',
    alignSelf: 'center',
    fontSize: '40px',
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
    maxWidth: 600,
    paddingTop: '2rem',
    marginBottom: '3rem',
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

const styleAnimationWrapper = css({
  marginTop: '1.5rem',
  textAlign: 'center',
  animation: 'slideUp 1s forwards',
})


export default function Custom404({ data }) {

  return(
    <Container title={data.meta.title} robots="noindex">
      <div css={style404Wrapper}>
        <div css={style404Container}>
          <ErrorIcon />
          <h1 aria-label={data.title}>
            {data.title}
          </h1>
          <h2 aria-label={data.text}>
            {data.text}
          </h2>
        </div>
        <div css={styleAnimationWrapper}>
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
          <Link href={data.link.path} aria-label={data.link.title}>
            {data.link.title}
          </Link>
        </div>
      </div>
    </Container>
  )
}