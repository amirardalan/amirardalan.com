import React,{ useEffect } from 'react'
import Typed from 'typed.js'


const TypingAnimation = ({ data }) => {
    
  useEffect(() => {
    const options: any = {
      strings: [...data],
      cursorChar: '▌',
      loop: true,
      typeSpeed: 90,
      backSpeed: 20,
      startDelay: 500,
      fadeOutDelay: 0,
      backDelay: 5000,
    }
    const typed = new Typed('.typingAnimation', options);

    return () => {
      typed.destroy()
    }
  })

    return <span className="typingAnimation"></span>
}

export default React.memo(TypingAnimation)