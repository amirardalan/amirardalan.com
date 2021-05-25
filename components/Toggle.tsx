import Image from 'next/image'
import { useTheme, css } from '@emotion/react'

const Toggle = ({ toggleTheme }) => {

  const theme : any = useTheme()

  return (
    <>
      <button
        onClick={toggleTheme}
        aria-label="Toggle Dark Mode"
        css={{
          margin: 0,
          padding: 0,
          display: 'flex',
          alignSelf: 'center',
          overflow: 'hidden',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          '&:hover': {
            span: { animation: 'slide-left .5s forwards' }
          }
        }}>

        <span css={{
          color: theme.colors.text,
          width: '50px',
          fontFamily: '"Fira Code", Menlo, Monaco, "Courier New", monospace',
          fontSize: '16px',
          padding: '.3rem .5rem 0 0',
          textAlign: 'right',
          animation: 'slide-right .3s forwards',
        }}>
          {theme.toggleButton.text}
        </span>

        <Image
          src={theme.toggleButton.icon}
          alt={theme.toggleButton.iconAlt}
          aria-label={theme.toggleButton.iconAlt}
          width={30}
          height={30}
          // css={{
          //   background: theme.colors.background,
          //   transition: 'background-color .25s linear',
          // }}
        />
      </button>
    </>
  )
}

export default Toggle