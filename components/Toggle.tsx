import Image from 'next/image'
import { useTheme } from '@emotion/react'

const Toggle = ({ toggleTheme }) => {

  const theme : any = useTheme()

  return (
    <>
      <button
        onClick={toggleTheme}
        aria-label="Toggle Dark Mode"
        css={{
          zIndex: 6,
          width: 130,
          padding: '.2rem .5rem',
          background: theme.colors.divider,
          border: '1px solid' + theme.colors.divider,
          borderRadius: 15,
          color: theme.colors.text,
          cursor: 'pointer',
      }}>
        <span>
          {theme.toggleButton.text}
        </span>
      </button>
    </>
  )
}

export default Toggle