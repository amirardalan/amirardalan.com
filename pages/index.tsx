import { css, useTheme } from '@emotion/react'
import Container from '@/components/Container'
import LatestPost from '@/components/LatestPost'
import Head from 'next/head'
import Link from 'next/link'

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

// Get Latest Post title, teaser, and slug
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
    return { props: { latestPost } }
  }
  catch {
    return { props: {} }
  }
}


export default function Home(props: any) {
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
  const styleAnimationWrapper = css ({
    width: '100%',
    overflow: 'hidden',
    alignSelf: 'flex-end',
  })
  const styleMainLeft = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    animation: 'slideUp .8s forwards',
    '@media (max-width: 890px)': {
      height: 'auto',
      margin: '2rem 0 0 0',
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
      margin: '0 0 1rem',
      fontWeight: 'bolder',
      '@media (max-width: 890px)': {
        fontSize: 'calc(3.4vw + 3.4vh)',
      }
    },
    '.typedText': {
      marginBottom: '3rem',
      fontSize: 'calc(.9vw + .9vh)',
      fontWeight: 'normal',
      color: 'var(--color-gray)',
      '@media (max-width: 890px)': {
        fontSize: 'calc(1.2vw + 1.2vh)',
      } 
    },
    '.highlightText': {
      width: 'max-content',
      padding: '0 .5rem',
      background: 'var(--color-text)',
      color: 'var(--color-bg)',
    },
    '@media (min-width: 480px) and (max-width: 890px)': {
      fontSize: 'calc(2.5vw + 2.5vh)',
      minHeight: '0vw',
    }
  })
  const styleButtonContainer = css({
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'row',
  })
  const styleCtaButton = css({
    minWidth: 135,
    minHeight: 45,
    marginRight: '1rem',
    padding: '.5rem 1.4rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'var(--color-text)',
    border: '1px solid transparent',
    borderRadius: 8,
    color: 'var(--color-bg)',
    fontSize: 15,
    cursor: 'pointer',
    '&:hover': {
      background: 'var(--color-bg)',
      border: '1px solid var(--color-text)',
      color: 'var(--color-text)'
    }
  })
  const styleMainRight = css({
    marginTop: '2rem',
    background: 'var(--canvas-bg)',
    height: '72vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    <Container toggleTheme={props.toggleTheme}>
      <Head>
        <title>Amir Ardalan – Developer, Designer, Writer</title>
        <meta
          name="description"
          content="Front-end developer, UI designer &amp; TypeScript enthusiast based in Portland, OR"
        />
      </Head>
      
      <main css={styleMain}>
        <div css={styleAnimationWrapper}>
          <div css={styleMainLeft}>
            <div css={styleMainLeftContent}>
              <h2>
                Hi, {theme.emoji} I'm
                <div className="highlightText">
                  Amir Ardalan
                </div>
              </h2>
              <div className="typedText" aria-hidden="true" >
                I'm currently focusing on:
                <div>
                  <TypingAnimation />
                </div>
              </div>
              <div css={styleButtonContainer}>
                <Link href="/blog" aria-label="Blog">
                  <button css={styleCtaButton}>
                    Blog
                  </button>
                </Link>
                <Link href="/about" aria-label="About">
                  <button css={styleCtaButton}>
                    About
                  </button>
                </Link>
              </div>
              <LatestPost latestPost={props.latestPost} />
            </div>
          </div>
        </div>
        <div css={styleAnimationWrapper}>
          <div css={styleMainRight}>
            <CanvasLoader toggleTheme={props.toggleTheme} />
          </div>
        </div>
      </main>
    </Container>
  )
}