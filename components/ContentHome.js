import React from 'react'
import Typical from 'react-typical'
import Link from 'next/link'

export default function ContentHome() {

  const TypingAnimation =  React.memo(()=>{
    return <Typical
    steps={[
      "React.js", 1500,
      "User Interface design.", 1500,
      "Front-end development.", 1500,
      "Web accessibility.", 1500,
      "Learning 📚", 1500,
      "Playing soccer ⚽", 1500,
      "Audio engineering 🔊", 1500,
      "...and eating pizza 🍕", 1500
    ]}
    loop={Infinity}
    className="content"
  />
  },(props,prevProp)=> true ); // this line prevent re rendering
  
  return (
    <>
      Hi, 👋 I'm <span className="highlight">Amir Ardalan</span>
      <br/> My passions include:
      <TypingAnimation />
    <br/> Check out my <a href="https://github.com/amirardalan" target="_blank" rel="noopener noreferrer">github</a>
    <br/> Download my <Link href="/amir-ardalan-resume.pdf"><a>resume</a></Link>
  </>
  )
}