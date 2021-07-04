import React, { useEffect } from 'react'
import Typed from 'typed.js'


// Console Tag
console.log(`
█████   ███    ███ ██ ██████  
██   ██ ████  ████ ██ ██   ██ 
███████ ██ ████ ██ ██ ██████  
██   ██ ██  ██  ██ ██ ██   ██ 
██   ██ ██      ██ ██ ██   ██ 
-----------------------------
Design & Code by Amir Ardalan
`)

const TypingAnimation = ({ data }) => {
    
  useEffect(() => {
    const options: any = {
      strings: [...data.items],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
      cursorChar: "_",
    }
    const typed = new Typed('.typingAnimation', options)

    return () => {
      typed.destroy()
    }
  }, [])

    return <span className='typingAnimation'></span>
}

export default TypingAnimation