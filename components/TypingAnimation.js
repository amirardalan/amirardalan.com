import React from 'react'
import Typical from 'react-typical'

const TypingAnimationMemoized =  React.memo(()=> {
  return (
    <Typical
      steps={[
        "Front-end Engineering", 1500,
        "UI/UX Design", 1500,
        "JavaScript", 700,
        "JavaScript: React.js", 1500,
        "JavaScript: Next.js", 1500,
        "JavaScript: Three.js", 1500,
        "{ CSS }", 700,
        "{ CSS } Emotion", 1500,
        "{ CSS } Sass & SCSS", 1500,
        "{ CSS } Animation", 1500,
        "Web Accessibility", 1500,
        "Technical Learning 📚", 1500,
        "...eating pizza 🍕", 1500
      ]}
      loop={Infinity}
    />
  )
})

export default function TypingAnomaton() {
  return <TypingAnimationMemoized />
}