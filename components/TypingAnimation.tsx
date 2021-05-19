import React from 'react'
import Typical from 'react-typical'

const TypingAnimation =  React.memo(()=> {
  return (
    <Typical
      steps={[
        "Fullstack Engineering ", 1500,
        "User Interface ", 1500,
        "JavaScript ", 1500,
        "TypeScript ", 1500,
        "< React /> ⚛️ ", 1500,
        "Next.js ", 1500,
        "Prisma ORM ", 1500,
        "Three.js △ ", 1500,
        "Emotion { CSS in JS; } ", 1500,
        "Web Accessibility ", 1500,
        "Technical Learning 📚 ", 1500,
        "...eating pizza 🍕 ", 1500
      ]}
      loop={Infinity}
    />
  )
})

export default TypingAnimation