import { useTheme } from '@emotion/react'
import SocialLinks from './SocialLinks'

export default function Footer() {

  const theme : any = useTheme()

  return (
    <footer
      css={{
      marginTop: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: '12px',
      padding: '1em',
      height: '100px',
      backgroundColor: theme.colors.background,
      color: theme.colors.grayscale,
      borderTop: '1px solid' + theme.colors.accent,
      lineHeight: '1.8em',
      animation: 'slide-up .25s forwards',
      transition: 'all 0.25s linear',
    }}>
      <div>
        Copyright &copy;
        {(new Date().getFullYear())}
        {' '}-{' '} Amir Ardalan
      </div>
      <div css={{
        'a': {
          textDecoration: 'none',
          padding: '0 .3em',
          '&::after': {
            content: '"•"',
            paddingLeft: '.5rem',
            color: theme.colors.grayscale,
          },
          '&:last-of-type::after': {
            content: '""',
          }
        },
        'div': { flexDirection: 'row'}
      }}>
        Made with <span>&hearts;</span> using Next.js + Prisma<br/>
        <SocialLinks />
      </div>
    </footer>
  )
}