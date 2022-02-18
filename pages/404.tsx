import Container from '@/components/Container'
import Head from 'next/head'
import ErrorIcon from '@/components/ErrorIcon'
import Link from 'next/link'
import ErrorAnimation from '@/components/ErrorAnimation'
import { error } from '@/data/content'


export const getStaticProps = async () => {
  return { props: { data: error} }
}


export default function Custom404({ data }) {

  return(
    <Container>
      <div className="404">
        <Head>
          <title>{data.meta.title}</title>
          <meta name="robots" content="noindex"></meta>
        </Head>

        <div css={{
          padding: '4rem 1.5rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--page-bg)',
        }}>
          <ErrorAnimation />
          <div css={{
            display: 'flex',
            justifyContent: 'center',
            animation: 'slideUp .5s forwards',

            h2: {
              margin: '0 1rem 0 .5rem',
              paddingRight: '1rem',
              alignSelf: 'center',
              borderRight: '1px solid var(--color-gray)',
              fontSize: '40px',
            },
            h3: {
              alignSelf: 'center',
              fontFamily: 'var(--font-primary)',
              fontSize: '12px',
              fontWeight: 'normal',
            },
          }}>
            <ErrorIcon />
            <h2 aria-label={data.title}>
              {data.title}
            </h2>
            <h3 aria-label={data.text}>
              {data.text}
            </h3>
          </div>
          <div css={{
            marginTop: '1.5rem',
            textAlign: 'center',
            animation: 'slideUp 1s forwards',
          }}>
            <Link
              href={data.link.path}
              aria-label={data.link.title}
            >
              {data.link.title}
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}