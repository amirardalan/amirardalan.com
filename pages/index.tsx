// Core
import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { css, useTheme } from '@emotion/react'
import TypingAnimation from '../components/TypingAnimation'

import prisma from '../lib/prisma'
import LoadingTriangle from '../components/LoadingTriangle'
import dynamic from 'next/dynamic'
const CanvasLoader = dynamic(() => import('../components/CanvasLoader'), {
  loading: () => <LoadingTriangle />
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

export default function Home(props: any) {

  // Latest Post Error Handling
  const latestPost = (!props.latestPost) ? {} : props.latestPost[0]
  const showLatestPost = (props.latestPost) ? true : false
  const ShowLatestPost = () => (
    <div css={{
      paddingLeft: '1.2rem',
      borderLeft: '7px solid' + theme.colors.accent,
      fontWeight: 'normal',
      lineHeight: '1.8rem',
      h4: {
        fontWeight: 'normal',
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
    }}>
      <h4
        css={{
          color: theme.colors.grayscale,
          fontSize: 12,
          lineHeight: '1.3rem',
        }}
        aria-label="Latest Post"
      >
        Latest Post:
      </h4>
      <Link
        href={`/blog/${encodeURIComponent(latestPost.slug)}`}>
        <a aria-label={latestPost.title} tabIndex={0}>
          {latestPost.title} →
        </a>
      </Link>
      <p className="teaser">
        {latestPost.teaser}
      </p>
    </div>
  )

  const theme : any = useTheme()
  const [toggleCanvas, setToggleCanvas] = useState(false)

  useEffect(() => {
    setToggleCanvas(!toggleCanvas)
  }, [])

  // CTA Button Styles
  const cta = css({
    minWidth: 128,
    margin: '0 1rem 2rem 0',
    padding: '.5rem 1.4rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.colors.text,
    border: '1px solid transparent',
    borderRadius: 5,
    color: theme.colors.background,
    fontSize: 14,
    cursor: 'pointer',
    '&:hover': {
      background: theme.colors.background,
      border: '1px solid' + theme.colors.text,
      color: theme.colors.text
    }
  })
  
  return (
    <>
    <Head>
      <title>Amir Ardalan – Developer, Designer, Writer</title>
    </Head>
      <main
        className="home"
        css={{
          flex: 1,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <div css={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'flex-end',
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
        }}>
          <div css={{
            marginBottom: '3rem',
            '@media (max-width: 890px)': {
              order: 1,
            },
            '@media (max-width: 480px)': {
              marginBottom: '2rem',
              height: '60px',
              width: '60px',
            }
          }}>
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
            css={{
              margin: 0,
              lineHeight: 1.3,
              fontSize: 'calc(1.6vw + 1.6vh)',
              minHeight: '0vw',
              fontWeight: 'bolder',
              '@media (min-width: 480px) and (max-width: 890px)': {
                fontSize: 'calc(2.5vw + 2.5vh)',
                minHeight: '0vw',
              }
            }}
          >
            <h2 css={{
              fontFamily: theme.fonts.secondary,
              fontSize: 'calc(2.8vw + 2.8vh)',
              margin: '0 0 1rem',
              fontWeight: 'bolder',
            }}>
              Hi, {theme.helloEmoji} I'm <br/>
              <span css={{
                padding: '0 .2rem',
                background: theme.colors.text,
                color: theme.colors.background,
              }}>
                Amir Ardalan
              </span>
            </h2>
            <h3 css={{
              fontSize: 'calc(.9vw + .9vh)',
              fontWeight: 'normal',
              color: theme.colors.grayscale,
  
              '@media (max-width: 890px)': {
                fontSize: 'calc(1.2vw + 1.2vh)',
              } 
            }}>
              I'm currently focusing on: <br/>
              <TypingAnimation />
            </h3>
            <br/>
            <div css={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              <Link href="/blog" aria-label="Blog">
                <button css={cta}>
                  Blog
                </button>
              </Link>
              <Link href="/about" aria-label="About">
                <button css={cta}>
                  About
                </button>
              </Link>
            </div>
            { showLatestPost ? <ShowLatestPost /> : null }
          </div>
        </div>
        <div css={{
          width: '50%',
          height: '72vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          cursor: 'crosshair',
          animation: 'slideUp 1s forwards',
          '&:hover': {
            '.canvasControls': {
              animation: 'fadeIn .2s forwards'
            } 
          },

          '@media (max-width: 890px)': {
            width: '100%',
            height: '45vh',
            marginTop: '2rem',
            alignSelf: 'flex-start',
          }
        }}>
          {toggleCanvas ? <CanvasLoader /> : null}
        </div>
      </main>
    </>
  )
}