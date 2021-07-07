import { css } from "@emotion/react"


export default function Equalizer() {
  
  const equalizer = css({
    display: 'inline-block',
    width: 15,
    backgroundColor: 'transparent',
    border: 0,
    padding: '0.5em',
    position: 'relative',
    transition: 'opacity 0.5s ease',
    span: {
      display: 'inline-block',
      width: 3,
      backgroundColor: '#eee',
      position: 'absolute',
      bottom: 0,
    },
    '@keyframes shorteq': {
      '0%': { height: 10 },
      '50%': {height: 5},
      '100%': {height: 10},
    },
    '@-webkit-keyframes shorteq': {
      '0%': { height: 10 },
      '50%': { height: 5 },
      '100%': { height: 10 },
    },
    '@keyframes talleq': {
      '0%': { height: 15 },
      '50%': { height: 8 },
      '100%': { height: 15 },
    },
    '@-webkit-keyframes talleq': {
      '0%': { height: 15 },
      '50%': { height: 5 },
      '100%': { height: 15 },
    },
    '.eq1, .eq2, .eq3': {
      animationDuration: '0.5s',
      animationIterationCount: 'infinite',
      WebkitAnimationDuration: '0.5s',
      WebkitAnimationIterationCount: 'infinite',
    },
    '.eq1': {
      height: 13,
      left: 0,
      animationDelay: '0s',
      animationName: 'shorteq',
      WebkitAnimationName: 'shorteq',
    },
    '.eq2': {
      height: 15,
      left: 6,
      animationDelay: '0.17s',
      animationName: 'talleq',
      WebkitAnimationName: 'talleq',
    },
    '.eq3': {
      height: 13,
      left: 12,
      animationDelay: '0.34s',
      animationName: 'shorteq',
      WebkitAnimationName: 'shorteq',
    }
  })
  
  return (
    <div css={equalizer} className="equalizer">
      <span className="eq1"></span>
      <span className="eq2"></span>
      <span className="eq3"></span>
    </div>
  )
}