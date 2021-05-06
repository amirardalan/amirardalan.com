import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Typical from 'react-typical'


export default function Home() {

  const TypingAnimation =  React.memo(()=>{
    return (
      <Typical
        steps={[
          "React.js", 1500,
          "User Interface design.", 1500,
          "Front-end code.", 1500,
          "Web accessibility.", 1500,
          "Collaboration.", 1500,
          "Learning 📚", 1500,
          "Audio engineering 🔊", 1500,
          "...eating pizza 🍕", 1500
        ]}
        loop={Infinity}
        className="content"
      />
    )
  },(props,prevProp)=> true );
  
  return (
    <>
      <div className="profileImage">
        <Image
          src="/photo.png"
          alt="Picture Amir Ardalan"
          width={100}
          height={100}
        />
      </div>   
      <div className="content">
        Hi, 👋 I'm <span className="highlight">Amir Ardalan</span>
        <br/>I am passionate about:
        <TypingAnimation />
        <br/> Check out my <a href="https://github.com/amirardalan" target="_blank" rel="noopener noreferrer">github</a>
        <br/> Download my <Link href="/amir-ardalan-resume.pdf"><a>resume</a></Link>
      </div>
    </>
  )
}