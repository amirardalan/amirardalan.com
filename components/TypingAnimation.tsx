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

    // New Typed instance
    const typed = new Typed('.typingAnimation', options);

    // Destroy Typed instance on unmounting 
    // the component to prevent memory leaks
    return () => {
      typed.destroy()
    }

  }, [])

    return <span className='typingAnimation'></span>
}

export default TypingAnimation