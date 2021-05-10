import { css } from '@emotion/react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Typical from 'react-typical'
import CanvasGeometry from '../components/CanvasGeometry'
import * as gtag from '../lib/gtag'


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

  const TypingAnimation =  React.memo(()=>{
    return (
      <Typical
        steps={[
          "JavaScript", 1500,
          "React.js & Next.js", 1500,
          "Front-end engineering", 1500,
          "User Interface design", 1500,
          "{ CSS }", 1500,
          "Web accessibility", 1500,
          "Learning 📚", 1500,
          "...eating pizza 🍕", 1500
        ]}
        loop={Infinity}
      />
    )
  },(props,prevProp)=> true );
  
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
              font-weight: 700;
              @media (min-width: 480px) and (max-width: 890px) {
                font-size: calc(2.5vw + 2.5vh);
              }
            `}
          >
            Hi, 👋 I'm <span className="highlight">Amir Ardalan</span>
            <br/>I'm passionate about:
            <TypingAnimation />
            <br/> Check out my <Link href="https://github.com/amirardalan" target="_blank" rel="noopener noreferrer" onClick={LinkGitHubGA} aria-label="GitHub">github</Link>
            <br/> Download my <Link href="/amir-ardalan-resume.pdf" onClick={LinkResumeGA} aria-label="resume">resume</Link>
          </div>
        </div>
        <div className="mainRight">
          <CanvasGeometry />
        </div>
      </main>
    </>
  )
}