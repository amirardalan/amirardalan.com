import { GetStaticProps } from 'next'
import prisma from '@/lib/prisma'
import dynamic from 'next/dynamic'
const CanvasLoader = dynamic(() => import('@/components/CanvasLoader'), {
  ssr: false
})

import { css } from '@emotion/react'
import { home } from '@/data/content'
import Container from '@/components/Container'
import TypingAnimation from '@/components/TypingAnimation'
import LatestPost from '@/components/LatestPost'
import { generateCtaButtons } from '@/components/CtaButtons'


export default function Home({ data, latestPost }) {

  const styleMain = css({
    display: 'flex',
    '@media (max-width: 890px)': {
      flexDirection: 'column',
    }
  })
  const styleMainLeft = css({
    padding: '0 2rem 0 0',
    animation: 'slideUpSection .8s forwards',
    '@media (max-width: 890px)': {
      flexDirection: 'column-reverse',
    },
    '@media (max-width: 480px)': {
      padding: 0,
    }
  })

  const styleContent = css({
    '.titleWrapper': {
      marginBottom: '3rem',
      '@media(max-width: 480px)': {
        marginBottom: '2rem',
      }
    },
    '.intro, .typed': {
      display: 'block',
      margin: '2rem 0',
    },
    '.typed': {
      '&:before': {
        content: '"> ~ % "',
        color: 'var(--color-primary)',
      },
      '@media(max-width: 480px)': {
        fontSize: 13
      }
    },
    h1: {
      lineHeight: '100%',
      fontFamily: 'var(--font-secondary)',
      fontSize: 'calc(3.5vw + 3.5vh)',
      fontWeight: 800,
      WebkitMarqueeIncrement: '0vw',
    },
  })
  const styleCtaButtons = css({
    display: 'flex',
    flexDirection: 'row',
  })
  const styleMainRight = css({
    position: 'relative',
    background: 'var(--color-gradient)',
    height: '72vh',
    '@media (max-width: 890px)': {
      height: '45vh',
      marginTop: '2rem',
    }
  })

  return (
    <Container title={data.meta.title}>
      <main css={styleMain} className="home">
        <div css={styleMainLeft} className="animationWrapper">
          <div css={styleContent}>
            <div className="titleWrapper">
              <span className="typed" aria-hidden="true">
                <TypingAnimation data={data.typed} />
              </span>
              <h1>{data.title}</h1>
            </div>
            <div css={styleCtaButtons}>
              {generateCtaButtons(home.items)}
            </div>
            <LatestPost data={data} latestPost={latestPost} />
          </div>
        </div>
        <div css={styleMainRight} className="animationWrapper">
          <CanvasLoader />
        </div>
      </main>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const latestPost = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 1, select: { title: true, teaser: true, slug: true }
    })
    return { props: { latestPost, data: home } }
  }
  catch { return { props: { data: home } } }
}