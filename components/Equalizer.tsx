import { css } from "@emotion/react";

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
    '.eq1': {
      height: 13,
      left: 0,
      animationName: 'shorteq',
      animationDuration: '0.5s',
      animationIterationCount: 'infinite',
      animationDelay: '0s',
      '-webkit-animation-name': 'shorteq',
      '-webkit-animation-duration': '0.5s',
      '-webkit-animation-iteration-count': 'infinite',
    },
    '.eq2': {
      height: 15,
      left: 6,
      animationName: 'talleq',
      animationDuration: '0.5s',
      animationIterationCount: 'infinite',
      animationDelay: '0.17s',
      '-webkit-animation-name': 'talleq',
      '-webkit-animation-duration': '0.5s',
      '-webkit-animation-iteration-count': 'infinite',
    },
    '.eq3': {
      height: 13,
      left: 12,
      animationName: 'shorteq',
      animationDuration: '0.5s',
      animationIterationCount: 'infinite',
      animationDelay: '0.34s',
      '-webkit-animation-name': 'shorteq',
      '-webkit-animation-duration': '0.5s',
      '-webkit-animation-iteration-count': 'infinite',
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