import React from 'react'
import Typical from 'react-typical'

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

const TypingAnimation =  React.memo(()=> {
  return (
    <Typical
      steps={[
        "Fullstack Engineering", 1500,
        "User Interface Design", 1500,
        "JavaScript && Typescript", 1500,
        "React.js ⚛️", 1500,
        "Next.js", 1500,
        "Three.js △", 1500,
        "Emotion CSS", 1500,
        "Prisma ORM", 1500,
        "PostgreSQL", 1500,
        "Web Accessibility", 1500,
        "Writing ✍️", 1500,
        "Technical Learning 📚", 1500,
        "...eating pizza 🍕", 1500
      ]}
      loop={Infinity}
    />
  )
})

export default TypingAnimation