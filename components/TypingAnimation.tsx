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

const TypingAnimation = () => {
    
  useEffect(() => {

    const options = {
      strings: [
        'Fullstack Engineering^1500',
        'User Interface Design^1500',
        'JavaScript^1500 &amp; TypeScript^1500',
        'React.js ⚛️^1500',
        'Next.js^1500',
        'Three.js △^1500',
        'Emotion CSS in JS^1500',
        'Prisma ORM^1500',
        'PostgreSQL^1500',
        'Web Accessibility^1500',
        'Writing ✍️^1500',
        'Technical Learning 📚^1500',
        '...eating pizza 🍕^1500',
      ],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
      cursorChar: "_",
    }

    // New Typed instance
    const typed = new Typed('.typingAnimation', options);

    // Destroy Typed instance on unmounting the component to prevent memory leaks
    return () => {
      typed.destroy()
    }

  }, [])

    return (
      <span className='typingAnimation'></span>
    )
}

export default TypingAnimation