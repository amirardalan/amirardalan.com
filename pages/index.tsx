import { css, useTheme } from '@emotion/react'
import { useState, useEffect } from 'react'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import LoadingTriangle from '../components/LoadingTriangle'
import TypingAnimation from '../components/TypingAnimation'

const CanvasLoader = dynamic(() => import('../components/CanvasLoader'), {
  loading: () => <LoadingTriangle />,
  ssr: true
})

// Get latest blog post
export const getStaticProps: GetStaticProps = async () => {
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

export default function Home(props: any) {

  const latestPost = props.latestPost[0]

  const theme : any = useTheme()
  const [toggleCanvas, setToggleCanvas] = useState(false);

  useEffect(() => {
    setToggleCanvas(!toggleCanvas)
  }, [])
  
  return (
    <main>
      <div className="mainLeft">
        <div css={css`
          margin-bottom: 3rem;
          @media (max-width: 890px) {
            order: 1;
          }
          @media (max-width: 480px) {
            margin-bottom: 2rem;
            height: 60px;
            width: 60px;
          }
        `}>
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
          css={css`
            margin: 0;
            line-height: 1.3;
            font-size: calc(1.6vw + 1.6vh);
            min-height: 0vw;
            font-weight: bolder;
            @media (min-width: 480px) and (max-width: 890px) {
              font-size: calc(2.5vw + 2.5vh);
              min-height: 0vw;
            }
          `}
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
            <Link
              href="/blog"
              aria-label="Blog"
            >
              <button className="buttonCta">
                Weblog
              </button>
            </Link>
          </div>
          <div className="latestPost">
            <h4 aria-label="Latest Post">
              Latest Post:
            </h4>
            <Link
              href={`/blog/${encodeURIComponent(latestPost.slug)}`}
              aria-label={latestPost.title}>
              <a>{latestPost.title} →</a>
            </Link>
            <p className="teaser">
              {latestPost.teaser}
            </p>
          </div>
        </div>
      </div>
      <div className="mainRight">
        {toggleCanvas ? <CanvasLoader /> : null}
      </div>
    </main>
  )
}