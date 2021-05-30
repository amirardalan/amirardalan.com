// Core
import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useTheme } from '@emotion/react'
import TypingAnimation from '../components/TypingAnimation'

import prisma from '../lib/prisma'
import LoadingTriangle from '../components/LoadingTriangle'
import dynamic from 'next/dynamic'
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

export default function Home(props: any) {

  // Latest Post Error Handling
  const latestPost = (!props.latestPost) ? {} : props.latestPost[0]
  const showLatestPost = (props.latestPost) ? true : false
  const ShowLatestPost = () => (
    <div className="latestPost">
      <h4 aria-label="Latest Post">
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
  
  return (
    <>
    <Head>
      <title>Amir Ardalan – Developer, Designer, Writer</title>
    </Head>
      <main className="home">
        <div className="mainLeft">
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
            <h2>
              Hi, {theme.helloEmoji} I'm <br/>
              <span className="highlight">Amir Ardalan</span>
            </h2>
            <h3>
              I'm currently focusing on: <br/>
              <TypingAnimation />
            </h3>
            <br/>
            <div className="cta">
              <Link href="/blog" aria-label="Blog">
                <button className="buttonCta">
                  Blog
                </button>
              </Link>
              <Link href="/about" aria-label="About">
                <button className="buttonCta">
                  About
                </button>
              </Link>
            </div>
            { showLatestPost ? <ShowLatestPost /> : null }
          </div>
        </div>
        <div className="mainRight">
          {toggleCanvas ? <CanvasLoader /> : null}
        </div>
      </main>
    </>
  )
}