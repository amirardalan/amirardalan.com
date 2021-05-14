import React from 'react'
import Typical from 'react-typical'

const TypingAnimationMemoized =  React.memo(()=> {
  return (
    <Typical
      steps={[
        "Front-end Engineering ", 1500,
        "User Interface Design ", 1500,
        "JavaScript ", 1500,
        "< React /> ⚛️ ", 1500,
        "Next.js ", 1500,
        "Three.js △ ", 1500,
        "{ CSS; Sass; SCSS; } 🎨 ", 1500,
        "Emotion { CSS in JS; } ", 1500,
        "Web Accessibility ", 1500,
        "Technical Learning 📚 ", 1500,
        "...eating pizza 🍕 ", 1500
      ]}
      loop={Infinity}
    />
  )
})

export default function TypingAnomaton() {
  return <TypingAnimationMemoized />
}