import { useTheme, css } from '@emotion/react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Avatar from '@/components/Avatar'

export default function About() {

  const theme : any = useTheme()
  const stylePageHeading = css({
    fontFamily: theme.fonts.secondary,
    fontSize: 'calc(3.2vw + 3.2vh)',
    fontWeight: 900,
    textAlign: 'center',
  })
  const stylePageHeadingSub = css({
    marginBottom: '2.5rem',
    color: theme.colors.grayscale,
    fontFamily: theme.fonts.tertiary,
    fontSize: 'calc(1vw + 1vh)',
    fontWeight: 'normal',
    fontStyle: 'italic',
    textAlign: 'center',
  })
  const styleGridWrapper = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
    gridAutoRows: 'minmax(100px, auto)',
    '@media(max-width: 890px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media(max-width: 600px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    '.grid': {
      display: 'flex',
      justifyContent: 'center',
      padding: '5rem',
      backgroundColor: theme.colors.accent,
      animation: 'slideUp .5s forwards',
      '@media (max-width: 1200px)': {
        padding: '2rem',
      },
      'ul li': {
        marginBottom: '.5rem',
        color: theme.colors.grayscale,
        fontSize: 14,
        textAlign: 'center',
        strong: {
          color: theme.colors.text
        }
      }
    },
    h4: {
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      fontFamily: theme.fonts.secondary,
      fontSize: 25,
      textAlign: 'center',
      borderBottom: '2px solid'+ theme.colors.accentColor
    }
  })
  const centerImage = css({
    display: 'flex',
    justifyContent: 'center',
    margin: '6rem 0',
  })
  const styleCopy = css({
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    fontFamily: theme.fonts.tertiary,
    fontSize: 16,
    p: {
      padding: '3% 4%',
    },
    '@media(max-width: 1024px)': {
      flexDirection: 'column',
      p: {
        padding: '1.5rem 0',
      },
    }
  })
  const socialIconsWrapper = css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  })
  const socialIcons = css({
    display: 'flex',
    justifyContent: 'space-evenly',
    li: {
      flexDirection: 'row',
    }
  })

  return (
    <>
      <Head>
        <title>About – Amir Ardalan</title>
      </Head>
      <div className="about">
        <h2 css={stylePageHeading}>
          Design &amp; Code.
        </h2>
        <h3 css={stylePageHeadingSub}>
          – from Portland, OR –
        </h3>
        <main css={styleGridWrapper}>
          <div className="grid">
            <ul>
              <h4>Bio:</h4>
              <li>
                <Avatar />
              </li>
              <li><strong>Developer, Designer, Writer.</strong></li>
              <li>
                <em>
                  I ❤️ clean, maintainable code
                  and purpose-built user interfaces.
                </em>
              </li>
              <li>
                <Link href="/amir-ardalan-resume.pdf">Download Resume</Link>
              </li>
              <li>
                <Link href="/blog/2021-a-dev-odyssey">My journey</Link>
              </li>
            </ul>
          </div>
          <div className="grid">
            <ul>
              <h4>Skills:</h4>
              <li>Fullstack Engineering</li>
              <li>User Interface Design</li>
              <li>JavaScript / TypeScript</li>
              <li>React.js / Next.js</li>
              <li>CSS in JS / SCSS</li>
              <li>Prisma ORM + PostgreSQL</li>
              <li>Testing &amp; documentation</li>
            </ul>
          </div>
          <div className="grid">
            <ul>
              <h4>Experience:</h4>
              <li>10+ years</li>
              <li>Columbia Sportswear</li>
              <li>KEEN Footwear</li>
              <li>Chrome Industries</li>
              <li>Hanna Andersson</li>
              <li>Salesforce Commerce Cloud</li>
              <li>Freelance</li>
            </ul>
          </div>
          <div className="grid">
            <ul>
              <h4>Availability:</h4>
              <li>✅ Currently Available</li>
              <li>Remote or Portland, OR</li>
            </ul>
          </div>
          <div className="grid">
            <div css={socialIconsWrapper}>
              <h4>Social:</h4>
              <ul css={socialIcons}>
                <li>
                  <a
                    href="https://github.com/amirardalan"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="GitHub">
                    <Image
                      src={theme.social.github}
                      height={48}
                      width={48}
                      alt="GitHub"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/amirardalan"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Twitter">
                    <Image
                      src={theme.social.twitter}
                      height={48}
                      width={48}
                      alt="Twitter"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/amirardalan"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn">
                    <Image
                      src={theme.social.linkedin}
                      height={48}
                      width={48}
                      alt="LinkedIn"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid">
            <ul>
              <h4>Contact</h4>
              <li>hi@amirardalan.com</li>
              <li>- or - </li>
              <li>
                <a
                  href="https://twitter.com/messages/compose?recipient_id=23831468"
                  className="twitter-dm-button"
                  data-screen-name="@amirardalan"
                  aria-label="DM @amirardalan on Twitter"
                  target="_blank"
                  rel="noreferrer noopener">
                  DM @amirardalan
                </a>
            </li>
            </ul>
          </div>
        </main>
        <div css={centerImage}>
          <Image
            src={theme.logo}
            height={75}
            width={75}
            alt="Logo"
          />
        </div>
      </div>
    </>
  )
}