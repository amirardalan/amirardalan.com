import { css, useTheme } from '@emotion/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import LoadingTriangle from '../components/LoadingTriangle'
import dynamic from 'next/dynamic'
import TypingAnimation from '../components/TypingAnimation'
import * as gtag from '../lib/gtag'

const CanvasLoader = dynamic(() => import('../components/CanvasLoader'), {
  loading: () => <LoadingTriangle />,
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

  const LinkLinkedIn = () => {
    gtag.event({
        category: 'Link',
        action: 'LinkedIn Link Clicked'
    })
  }

  const LinkTwitter = () => {
    gtag.event({
        category: 'Link',
        action: 'Twitter Link Clicked'
    })
  }

  const [toggleCanvas, setToggleCanvas] = useState(false);

  console.log('page rendering')

  useEffect(() => {
    setToggleCanvas(!toggleCanvas)
  }, [])

  const theme = useTheme()
  
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
            I'm passionate about: <br/>
            <TypingAnimation />
          </h3>
          <br/>
          <h4>
            Check out my <a
            href="https://github.com/amirardalan"
            target="_blank"
            rel="noopener noreferrer"
            onClick={LinkGitHubGA}
            aria-label="GitHub">GitHub</a>
          </h4>
          <h4>
          Add me on <a
            href="https://linkedin.com/in/amirardalan"
            target="_blank"
            rel="noopener noreferrer"
            onClick={LinkLinkedIn}
            aria-label="resume">LinkedIn</a>
          </h4>
          <h4>
          Follow me on <a
            href="https://twitter.com/amirardalan"
            target="_blank"
            rel="noopener noreferrer"
            onClick={LinkTwitter}
            aria-label="resume">Twitter</a>
          </h4>
          <h4>
          Download my <a
            href="/amir-ardalan-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={LinkResumeGA}
            aria-label="resume">resume</a>
          </h4>
        </div>
      </div>
      <div className="mainRight">
        {toggleCanvas ? <CanvasLoader /> : null}
      </div>
    </main>
  )
}