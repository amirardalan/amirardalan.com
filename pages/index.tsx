import { css } from '@emotion/react'
import { home } from '@/data/content'
import Container from '@/components/Container'
import TypingAnimation from '@/components/TypingAnimation'
import FeaturedPost from '@/components/FeaturedPost'
import { generateCtaButtons } from '@/components/CtaButtons'
import CanvasLoader from '@/components/CanvasLoader'

import { GetStaticProps } from 'next'
import prisma from '@/lib/prisma'

export const getStaticProps: GetStaticProps = async () => {
  try {
    const featuredPost = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 1, select: { title: true, teaser: true, slug: true }
    })
    return { props: { featuredPost, data: home } }
  }
  catch { return { props: { data: home } } }
}


export default function Home({ data, featuredPost }) {

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
            <FeaturedPost data={data} featuredPost={featuredPost} />
          </div>
        </div>
        <div css={styleMainRight} className="animationWrapper">
          <CanvasLoader />
        </div>
      </main>
    </Container>
  )
}