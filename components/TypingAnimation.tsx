import React,{ useEffect } from 'react'
import Typed from 'typed.js'


const TypingAnimation = ({ data }) => {
    
  useEffect(() => {
    const options: any = {
      strings: [...data],
      cursorChar: '▌',
      loop: true,
      typeSpeed: 100,
      backSpeed: 20,
      // fadeOut: true,
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