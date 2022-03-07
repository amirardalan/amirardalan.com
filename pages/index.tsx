import { css } from '@emotion/react'
import Container from '@/components/Container'
import { home } from '@/data/content'
import LatestPost from '@/components/LatestPost'
import { GenerateCtaButtons } from '@/components/CtaButtons'

import dynamic from 'next/dynamic'
const CanvasLoader = dynamic(() => import('@/components/CanvasLoader'), {
  ssr: false
})

import { GetStaticProps } from 'next'
import prisma from '@/lib/prisma'

export const getStaticProps: GetStaticProps = async () => {
  try {
    const latestPost = await prisma.post.findMany({
      where: { published: true },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 1,
      select: {
        title: true,
        teaser: true,
        slug: true,
      },
    })
    return { props: { latestPost, data: home } }
  }
  catch {
    return { props: { data: home } }
  }
}


export default function Home({ data, latestPost }) {

  // Styles
  const styleMain = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '@media (max-width: 890px)': {
      flexDirection: 'column',
    }
  })
  const styleMainLeft = css({
    padding: '0 6rem 0 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    animation: 'slideUp .8s forwards',
    '@media (max-width: 890px)': {
      height: 'auto',
      flexDirection: 'column-reverse',
      justifyContent: 'start',
      alignSelf: 'flex-start',
    },
    '@media (max-width: 480px)': {
      padding: 0,
    }
  })
  const styleMainLeftContent = css({
    margin: 0,
    fontWeight: 'bolder',
    lineHeight: 1.5,
    minHeight: '0vw',
    '.titleWrapper': {
      margin: '0 0 3rem',
      '.description': {
        display: 'inline-block',
        marginTop: '1rem',
      },
    },
    '.intro': {
      marginBottom: '.5rem',
      display: 'inline-block',
      fontFamily: 'var(--font-primary)',
      fontWeight: 'normal',
      fontSize: 17,
      color: 'var(--color-accent-color)'
    },
    h1: {
      fontFamily: 'var(--font-secondary)',
      fontSize: 'calc(3.2vw + 3.2vh)',
      WebkitMarqueeIncrement: '0vw',
      fontWeight: 'bolder',
      '@media (max-width: 890px)': {
        fontSize: 'calc(3vw + 3vh)',
        WebkitMarqueeIncrement: '0vw',
      }
    },
    '.description': {
      borderTop: '2px solid var(--color-accent-color)',
      maxWidth: 600,
      paddingTop: '1.8rem',
      fontFamily: 'var(--font-primary)',
      fontSize: 14,
      fontWeight: 'normal',
      color: 'var(--color-gray)',
    },
    '.highlightText': {
      width: 'max-content',
      marginLeft: 3,
      padding: '0 .5rem',
      background: 'var(--color-text)',
      color: 'var(--color-bg)',
      boxShadow: '-3px 3px 0 var(--color-accent-color)',
    },
    '@media (min-width: 480px) and (max-width: 890px)': {
      fontSize: 'calc(2.5vw + 2.5vh)',
      WebkitMarqueeIncrement: '0vw',
      minHeight: '0vw',
    }
  })
  const styleButtonContainer = css({
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
  })
  const styleMainRight = css({
    background: 'var(--canvas-bg)',
    height: '72vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 1024px)': {
      marginTop: 0,
    },
    '@media (max-width: 890px)': {
      height: '45vh',
      marginTop: '2rem',
      alignSelf: 'flex-start',
    }
  })

  return (
    <Container title={data.meta.title}>
      <div className="home">
        <main css={styleMain}>
          <div className="animationWrapper">
            <div css={styleMainLeft}>
              <div css={styleMainLeftContent}>
                <div className="titleWrapper">
                  <span className="intro">{data.intro}</span>
                  <h1>{data.title}</h1>
                  <h2 className="description">
                    {data.description}
                  </h2>
                </div>
                <div css={styleButtonContainer}>
                  {GenerateCtaButtons(home.items)}
                </div>
                <LatestPost data={data} latestPost={latestPost} />
              </div>
            </div>
          </div>
          <div className="animationWrapper">
            <div css={styleMainRight}>
              <CanvasLoader />
            </div>
          </div>
        </main>
      </div>
    </Container>
  )
}