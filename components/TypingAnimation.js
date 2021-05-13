import React from 'react'
import Typical from 'react-typical'

const TypingAnimationMemoized =  React.memo(()=> {
  return (
    <Typical
      steps={[
        "Front-end Code ", 1500,
        "UI/UX Design ", 1500,
        "JavaScript ", 1500,
        "React.js ⚛️ ", 1500,
        "Next.js ", 1500,
        "Three.js ", 1500,
        "{ CSS } 🎨 ", 1500,
        "Emotion CSS ", 1500,
        "Sass & SCSS ", 1500,
        "Web Accessibility ", 1500,
        "Learning 📚 ", 1500,
        "...eating pizza 🍕 ", 1500
      ]}
      loop={Infinity}
    />
  )
})

export default function TypingAnomaton() {
  return <TypingAnimationMemoized />
}