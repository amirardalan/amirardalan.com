import { useTheme } from '@emotion/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/Container'
import ErrorAnimation from '@/components/ErrorAnimation'

import { error } from '@/data/content'
export const getStaticProps = async () => {
  return {
    props: {
      data: error,
    },
  }
}

export default function Custom404({ data, toggleTheme }) {
  const theme: any = useTheme()

  return(
    <Container toggleTheme={toggleTheme}>
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
            margin: '0 1rem 0 1rem',
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
          <Image
            src={theme.icon.error}
            alt={data.img.meta}
            aria-label={data.img.meta}
            width={40}
            height={40}
          />
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
    </Container>
  )
}