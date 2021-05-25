import { useState } from 'react'
import { useTheme } from '@emotion/react'

const Toggle = ({ toggleTheme }) => {

  const theme : any = useTheme()
  
  const [toggleThemeControl, setToggleThemeControl] = useState(false)
  const themeControlToggled = () => {
    setToggleThemeControl(!toggleThemeControl),
    toggleTheme()
  }

  const togglePosition = (toggleThemeControl) ? '&::before' : '&::after'

  return (
    <>
      <button
        onClick={themeControlToggled}
        aria-label="Toggle Dark Mode"
        className="crossBrowserAlignment"
        css={{
          zIndex: 6,
          width: 'auto',
          height: 29,
          padding: '0 .1rem',
          background: theme.toggleButton.background,
          position: 'relative',
          border: '1px solid' + theme.colors.divider,
          borderRadius: 25,
          color: theme.colors.text,
          cursor: 'pointer',
          '&::before': {
            zIndex: -1,
            display: 'flex',
            
            alignSelf: 'baseline',
            content: `'${theme.toggleButton.icon}'`,
            marginLeft: toggleThemeControl ? 0 : 2,
            position: 'absolute',
            lineHeight: '1.56rem',
            left: toggleThemeControl ? 27 : 0,
            fontSize: '20px',
            fontFamily: 'apple color emoji, segoe ui emoji, noto color emoji, android emoji, emojisymbols, emojione mozilla, twemoji mozilla, segoe ui symbol',
          }
      }}>
        <div>
          <div css={{
            background: '#e2e2e2',
            height: 25,
            width: 25,
            position: 'relative',
            marginLeft: toggleThemeControl ? 0 : 25,
            marginRight: toggleThemeControl ? 25 : 0,
            borderRadius: 25,
            boxShadow: '0 0 5px' + theme.colors.linkLight,
            transition: '.2s linear',
          }} />
        </div>
      </button>
    </>
  )
}

export default Toggle