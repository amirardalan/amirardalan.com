import { css, useTheme } from '@emotion/react'
import Image from 'next/image'
import TypingAnimation from '../components/TypingAnimation'
import * as gtag from '../lib/gtag'
import dynamic from 'next/dynamic'

const CanvasLoader = dynamic(() => import('../components/CanvasLoader'), {
  loading: () => <Image src="/loading.svg" height="30" width="30" alt="loading" />,
  ssr: false
})

export default function Home() {

  const LinkGitHubGA = () => {
    gtag.event({
        category: 'Link',
        action: 'GitHub Link Clicked'
    })
  }

  const LinkResumeGA = () => {
    gtag.event({
        category: 'Link',
        action: 'Resume Link Clicked'
    })
  }

  const theme = useTheme()
  
  return (
    <>
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
              p { color: #999; }
            `}
          >
            Hi, {theme.helloEmoji} I'm <span className="highlight">Amir Ardalan</span>
            <br/>I'm passionate about:
            <TypingAnimation />
            <br/>
            Check out my <a
              href="https://github.com/amirardalan"
              target="_blank"
              rel="noopener noreferrer"
              onClick={LinkGitHubGA}
              aria-label="GitHub">github</a>
            <br/>
            Download my <a
              href="/amir-ardalan-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={LinkResumeGA}
              aria-label="resume">resume</a>
          </div>
        </div>
        <div className="mainRight">
          <CanvasLoader />
        </div>
      </main>
    </>
  )
}