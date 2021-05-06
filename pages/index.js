import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Typical from 'react-typical'
import { css } from '@emotion/react'


export default function Home() {

  const TypingAnimation =  React.memo(()=>{
    return (
      <Typical
        steps={[
          "JavaScript", 1500,
          "React.js & Next.js", 1500,
          "Front-end code", 1500,
          "User Interface design", 1500,
          "{ CSS }", 1500,
          "Web accessibility", 1500,
          "Learning 📚", 1500,
          "...eating pizza 🍕", 1500
        ]}
        loop={Infinity}
        className="content"
      />
    )
  },(props,prevProp)=> true );
  
  return (
    <>
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
          alt="Picture Amir Ardalan"
          width={100}
          height={100}
        />
      </div>   
      <div css={css`
        margin: 0;
        line-height: 1.3;
        font-size: calc(1.6vw + 1.6vh);
        font-weight: 700;
        @media (min-width: 480px) and (max-width: 890px) {
          font-size: calc(2.5vw + 2.5vh);
        }
        a {
          text-decoration: none;
          &:hover,
          &:focus,
          &:active {
            text-decoration: underline;
          }
        }
        p {
          margin: 0;
          padding: 0;
        }
      `}>
        Hi, 👋 I'm <span className="highlight">Amir Ardalan</span>
        <br/>I'm passionate about:
        <TypingAnimation />
        <br/> Check out my <a href="https://github.com/amirardalan" target="_blank" rel="noopener noreferrer">github</a>
        <br/> Download my <Link href="/amir-ardalan-resume.pdf"><a>resume</a></Link>
      </div>
    </>
  )
}