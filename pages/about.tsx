import { useTheme, css } from '@emotion/react'
import Link from 'next/link'

export default function About() {

  const theme : any = useTheme()

  const grid = css({
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem',
    backgroundColor: theme.page.bg,
    animation: 'slideUp .5s forwards'
  })


  return (
    <div className="about">
      <h2 css={{ 
        fontFamily: theme.fonts.secondary,
        fontSize: 38,
        fontWeight: 900,
        marginBottom: 15,
      }}>
        About
      </h2>
      <p css={{
        fontFamily: theme.fonts.tertiary,
        fontSize: 18,
        marginBottom: '2rem',
      }}>
        Hello, I'm Amir Ardalan, a developer and designer from Portland, Oregon. I love React.js and Next.js. 
        I'll be showcasing my personal projects on this portfolio site as well as writing about code and life.
        This page is still in development, For now, you can read a bit 
        about <Link href="/blog/2021-a-dev-odyssey">my journey</Link> as a developer.
      </p>
      <main css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
        gridAutoRows: 'minmax(100px, auto)',
        '@media(max-width: 890px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media(max-width: 480px)': {
          gridTemplateColumns: 'repeat(1, 1fr)',
        }
      }}>
        <div css={grid}>This</div>
        <div css={grid}>page</div>
        <div css={grid}>is</div>
        <div css={grid}>coming</div>
        <div css={grid}>soon</div>
        <div css={grid}>...</div>
      </main>
    </div>
  )
}