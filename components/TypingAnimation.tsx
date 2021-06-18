import React, { useEffect } from 'react'
import { css } from '@emotion/react'
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

  const styleTypedText = css({
    marginBottom: '3rem',
    fontSize: 'calc(.9vw + .9vh)',
    WebkitMarqueeIncrement: '0vw',
    fontWeight: 'normal',
    color: 'var(--color-gray)',
    '@media (max-width: 890px)': {
      fontSize: 'calc(1.2vw + 1.2vh)',
      WebkitMarqueeIncrement: '0vw',
    } 
  })
  const styleCodeComment = css({
    color: 'var(--color-accent-gray)',
    fontStyle: 'italic',
    '&:before': {
      content: '"  "',
      whiteSpace: 'pre',
      color: 'var(--color-gray)',
    }
  })
  const styleCodeBody = css({
    color: 'var(--color-text)',
    '&:before': {
      content: '"  return "',
      whiteSpace: 'pre',
      color: 'var(--color-gray)',
    }
  })
    
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

    return (
      <div css={styleTypedText} aria-hidden="true">
        <div>
          {data.heading}
        </div>
        <div css={styleCodeComment}>
          {data.line2}
        </div>
        <div css={styleCodeBody}>
          <span className='typingAnimation'></span>
        </div>
        {data.end}
      </div>
    )
}

export default TypingAnimation