import React,{ useEffect } from 'react'
import Typed from 'typed.js'


const TypingAnimation = ({ data }) => {
    
  useEffect(() => {
    const options: any = {
      strings: [...data],
      cursorChar: '▌',
      startDelay: 500,
      typeSpeed: 90,
      backSpeed: 20,
      backDelay: 5000,
      loop: true,
    }
    const typed = new Typed('.typingAnimation', options);

    return () => {
      typed.destroy()
    }
  }, [data])

  return <span className="typingAnimation" />
}

export default React.memo(TypingAnimation)