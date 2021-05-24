import { useTheme, css } from '@emotion/react'

export default function Bio() {

  const theme : any = useTheme()

  const grid = css({
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem',
    backgroundColor: theme.colors.divider,
    animation: 'slide-up .5s forwards'
  })


  return (
    <div className="bio">
      <h2 css={{ 
        fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
        fontSize: 40,
        fontWeight: 900,
        marginBottom: 15,
      }}>
        Bio
      </h2>
      <p css={{
        fontFamily: "'Lora', Georgia, 'Times New Roman', serif",
        fontSize: 18,
        marginBottom: '2rem',
      }}>
        Hello, I'm Amir Ardalan, a developer and designer from Portland, Oregon.
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
        <div css={grid}>One</div>
        <div css={grid}>Two</div>
        <div css={grid}>Three</div>
        <div css={grid}>Four</div>
        <div css={grid}>Five</div>
        <div css={grid}>Six</div>
      </main>
    </div>
  )
}