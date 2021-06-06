import { css, useTheme } from '@emotion/react'

import Head from 'next/head'
import Link from 'next/link'
import Avatar from '@/components/Avatar'

import TypingAnimation from '@/components/TypingAnimation'
import LatestPost from '@/components/LatestPost'

import dynamic from 'next/dynamic'
import LoadingTriangle from '@/components/LoadingTriangle'
import { GetStaticProps } from 'next'
import prisma from '@/lib/prisma'

const CanvasLoader = dynamic(() => import('../components/CanvasLoader'), {
  loading: () => <LoadingTriangle />
})

// Get all published posts along with author, publish date, title, teaser and slug
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

  // Styles
  const theme : any = useTheme()
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
    background: theme.colors.text,
    border: '1px solid transparent',
    borderRadius: 8,
    color: theme.colors.background,
    fontSize: 15,
    cursor: 'pointer',
    '&:hover': {
      background: theme.colors.background,
      border: '1px solid' + theme.colors.text,
      color: theme.colors.text
    }
  })
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
      marginRight: 0,
      flexDirection: 'column-reverse',
      justifyContent: 'start',
      alignSelf: 'flex-start',
    }
  })
  const stylePhoto = css({
    marginBottom: '1.5rem',
    '@media (max-width: 890px)': {
      order: 1,
    },
    '@media (max-width: 480px)': {
      height: 60,
      width: 60,
    }
  })
  const styleMainLeftContent = css({
    margin: 0,
    lineHeight: 1.3,
    minHeight: '0vw',
    fontWeight: 'bolder',
    h2: {
      fontFamily: theme.fonts.secondary,
      fontSize: 'calc(2.9vw + 2.9vh)',
      margin: '0 0 1rem',
      fontWeight: 'bolder',
      '@media (max-width: 890px)': {
        fontSize: 'calc(3.4vw + 3.4vh)',
      }
    },
    h3: {
      marginBottom: '3rem',
      fontSize: 'calc(.9vw + .9vh)',
      fontWeight: 'normal',
      color: theme.colors.grayscale,
      '@media (max-width: 890px)': {
        fontSize: 'calc(1.2vw + 1.2vh)',
      } 
    },
    '.highlightText': {
      width: 'max-content',
      padding: '0 .5rem',
      background: theme.colors.text,
      color: theme.colors.background,
    },
    '@media (min-width: 480px) and (max-width: 890px)': {
      fontSize: 'calc(2.5vw + 2.5vh)',
      minHeight: '0vw',
    }
  })
  const styleMainRight = css({
    marginTop: '2rem',
    height: '72vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'crosshair',
    animation: 'fadeIn .5s forwards',
    '.canvasControls': {
      zIndex: 3,
      margin: '0 0 1rem 0',
      padding: '0',
      position: 'absolute',
      bottom: 0,
      left: 20,
      color: theme.colors.grayscale,
      fontSize: 10,
      fontWeight: 'normal',
      textTransform: 'uppercase',
      animation: 'fadeOut .2s forwards',
      '@media(max-width: 890px)': {
        display: 'none',
      }
    },
    '&:hover': {
      '.canvasControls': {
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
    <>
      <Head>
        <title>Amir Ardalan – Developer, Designer, Writer</title>
      </Head>
      <main css={styleMain}>
        <div css={styleAnimationWrapper}>
          <div css={styleMainLeft}>
            <div css={stylePhoto}>
              <Avatar />
            </div>
            <div css={styleMainLeftContent}>
              <h2>
                Hi, {theme.helloEmoji} I'm
                <div className="highlightText">
                  Amir Ardalan
                </div>
              </h2>
              <h3 aria-hidden="true" >
                I'm currently focusing on:
                <div>
                  <TypingAnimation />
                </div>
              </h3>
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
            <CanvasLoader />
          </div>
        </div>
      </main>
    </>
  )
}