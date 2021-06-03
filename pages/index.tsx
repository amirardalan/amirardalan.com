import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { css, useTheme } from '@emotion/react'
import TypingAnimation from '../components/TypingAnimation'

import LoadingTriangle from '../components/LoadingTriangle'
import dynamic from 'next/dynamic'
import prisma from '../lib/prisma'

export default function Home(props: any) {
  const theme : any = useTheme()

  // Home Styles
  const styleLatestPost = css({
    paddingLeft: '1.2rem',
    borderLeft: '7px solid' + theme.colors.accent,
    fontWeight: 'normal',
    lineHeight: '1.8rem',
    h4: {
      color: theme.colors.grayscale,
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: '1.3rem',
    },
    'p, a': {
      fontFamily: theme.fonts.tertiary,
    },
    a: {
      color: theme.colors.text,
      fontSize: 18,
      textDecoration: 'underline',
      '&:hover': {
        textDecoration: 'none',
      },
      '@media(max-width: 480px)': {
        fontSize: 16,
      }
    },
    p: {
      color: theme.colors.grayscale,
      fontSize: 15,
    },
  })
  const styleCtaButton = css({
    minWidth: 160,
    minHeight: 50,
    margin: '0 1rem 2rem 0',
    padding: '.5rem 1.4rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.colors.text,
    border: '1px solid transparent',
    borderRadius: 10,
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
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  })
  const styleAnimationWrapper = css ({
    overflow: 'hidden',
    alignSelf: 'flex-end',
  })
  const styleMainLeft = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    animation: 'slideUp .8s forwards',
    '@media (max-width: 890px)': {
      width: '100%',
      height: 'auto',
      marginRight: 0,
      flexDirection: 'column-reverse',
      justifyContent: 'start',
      alignSelf: 'flex-start',
    }
  })
  const styleLogo = css({
    marginBottom: '3rem',
    '@media (max-width: 890px)': {
      order: 1,
    },
    '@media (max-width: 480px)': {
      marginBottom: '2rem',
      height: 60,
      width: 60,
    }
  })
  const styleTypingAnimation = css({
    margin: 0,
    lineHeight: 1.3,
    fontSize: 'calc(1.6vw + 1.6vh)',
    minHeight: '0vw',
    fontWeight: 'bolder',
    h2: {
      fontFamily: theme.fonts.secondary,
      fontSize: 'calc(2.8vw + 2.8vh)',
      margin: '0 0 1rem',
      fontWeight: 'bolder',
      '@media (max-width: 890px)': {
        fontSize: 'calc(3.5vw + 3.5vh)',
      }
    },
    h3: {
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
  const styleButtonContainer = css({
    display: 'flex',
    flexDirection: 'row',
  })
  const styleMainRight = css({
    width: '48vw',
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
    '@media (max-width: 890px)': {
      width: '100vw',
      height: '45vh',
      marginTop: '2rem',
      alignSelf: 'flex-start',
    }
  })

  // Latest Post Error Handling
  const latestPost = (!props.latestPost) ? {} : props.latestPost[0]
  const showLatestPost = (props.latestPost) ? true : false
  const ShowLatestPost = () => (
    <div css={styleLatestPost}>
      <h4 aria-label="Latest Post">
        Latest Post:
      </h4>
      <Link href={`/blog/${encodeURIComponent(latestPost.slug)}`}>
        <a aria-label={latestPost.title} tabIndex={0}>
          {latestPost.title} →
        </a>
      </Link>
      <p>
        {latestPost.teaser}
      </p>
    </div>
  )

  return (
    <>
      <Head>
        <title>Amir Ardalan – Developer, Designer, Writer</title>
      </Head>
      <main css={styleMain}>
        <div css={styleAnimationWrapper}>
          <div css={styleMainLeft}>
            <div css={styleLogo}>
              <Image
                src="/photo.png"
                alt="Amir Ardalan"
                aria-label="Amir Ardalan"
                width={100}
                height={100}
              />
            </div>
            <div
              aria-label="Hi, I'm Amir Ardalan"
              css={styleTypingAnimation}
            >
              <h2>
                Hi, {theme.helloEmoji} I'm
                <div className="highlightText">
                  Amir Ardalan
                </div>
              </h2>
              <h3>
                I'm currently focusing on:
                <div>
                  <TypingAnimation />
                </div>
              </h3>
              <br/>
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
              { showLatestPost ? <ShowLatestPost /> : null }
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

const CanvasLoader = dynamic(() => import('../components/CanvasLoader'), {
  loading: () => <LoadingTriangle />,
  ssr: false
})

// Get latest blog post
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