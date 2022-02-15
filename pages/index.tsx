import { css, useTheme } from '@emotion/react'
import { home } from '@/data/content'
import LatestPost from '@/components/LatestPost'
import Head from 'next/head'
import { GenerateCtaButtons } from '@/components/CtaButtons'

import dynamic from 'next/dynamic'
import LoadingTriangle from '@/components/LoadingTriangle'
const TypingAnimation  = dynamic(() => import('@/components/TypingAnimation'), {
  loading: () => <span className="typingAnimation">_</span>,
  ssr: false
})
const CanvasLoader = dynamic(() => import('@/components/CanvasLoader'), {
  loading: () => <LoadingTriangle />,
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
  const theme: any = useTheme()

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    animation: 'slideUp .8s forwards',
    '@media (max-width: 890px)': {
      height: 'auto',
      flexDirection: 'column-reverse',
      justifyContent: 'start',
      alignSelf: 'flex-start',
    }
  })
  const styleMainLeftContent = css({
    margin: 0,
    lineHeight: 1.3,
    minHeight: '0vw',
    fontWeight: 'bolder',
    h2: {
      fontFamily: 'var(--font-secondary)',
      fontSize: 'calc(2.9vw + 2.9vh)',
      WebkitMarqueeIncrement: '0vw',
      margin: '0 0 3rem',
      fontWeight: 'bolder',
      '@media (max-width: 890px)': {
        margin: '2rem 0 2rem',
        fontSize: 'calc(3vw + 3vh)',
        WebkitMarqueeIncrement: '0vw',
      }
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
  const styleTypedText = css({
    margin: '1rem 1rem',
    fontSize: 'calc(.7vw + .7vh)',
    WebkitMarqueeIncrement: '0vw',
    fontWeight: 'normal',
    color: 'var(--color-gray)',
    '@media (max-width: 890px)': {
      marginBottom: '1rem',
      fontSize: 'calc(1.2vw + 1.2vh)',
      WebkitMarqueeIncrement: '0vw',
    } 
  })
  const styleCodeComment = css({
    color: 'var(--color-accent-gray)',
    fontStyle: 'italic',
    '&:before': {
      content: '"  "',
      whiteSpace: 'pre',
      color: 'var(--color-gray)',
    }
  })
  const styleCodeBody = css({
    color: 'var(--color-bg)',
    '&:before': {
      content: '"  return "',
      whiteSpace: 'pre',
      color: 'var(--color-gray)',
    }
  })
  const styleButtonContainer = css({
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
  })
  const styleMainRight = css({
    marginTop: '1rem',
    background: 'var(--canvas-bg)',
    height: '72vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'crosshair',
    animation: 'fadeIn .5s forwards',
    '&:hover': {
      '.canvasInfo': {
        animation: 'fadeIn .2s forwards'
      }
    },
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
    <div className="container home">
      <Head>
        <title>{data.meta.title}</title>
        <meta
          name="description"
          content={data.meta.description}
        />
      </Head>
      <main css={styleMain}>
        <div className="animationWrapper">
          <div css={styleMainLeft}>
            <div css={styleMainLeftContent}>
              <h2>
                {theme.intro}
                <div className="highlightText">
                  {data.title}
                </div>
              </h2>
              <div css={styleButtonContainer}>
                {GenerateCtaButtons(home.items)}
              </div>
              <LatestPost data={data} latestPost={latestPost} />
            </div>
          </div>
        </div>
        <div className="animationWrapper">
          <div css={styleMainRight}>
            <div css={styleTypedText} aria-hidden="true">
              <div>
                {data.typed.heading}
              </div>
              <div css={styleCodeComment}>
                {data.typed.line2}
              </div>
              <div css={styleCodeBody}>
                <TypingAnimation data={data.typed} />
              </div>
              {data.typed.end}
            </div>
            <CanvasLoader />
          </div>
        </div>
      </main>
    </div>
  )
}