import { css, useTheme } from '@emotion/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LoadingTriangle from '../components/LoadingTriangle'
import dynamic from 'next/dynamic'
import TypingAnimation from '../components/TypingAnimation'

const CanvasLoader = dynamic(() => import('../components/CanvasLoader'), {
  loading: () => <LoadingTriangle />,
  ssr: false
})

export default function Home() {

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
            font-weight: 700;
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
          <div>
            <Link
              href="/blog"
              aria-label="Read the Blog"
            >
              <button className="buttonCta">
                Read the Blog
              </button>
            </Link>
            <Link
              href="/amir-ardalan-resume.pdf"
              aria-label="Download Resume">
              <a className="linkCta">
                Download Resume
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="mainRight">
        {toggleCanvas ? <CanvasLoader /> : null}
      </div>
    </main>
  )
}