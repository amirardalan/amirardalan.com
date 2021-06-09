import { css } from '@emotion/react'
import Layout from '@/components/Container'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Avatar from '@/components/Avatar'

export default function About(props: any) {

  const stylePageHeading = css({
    fontFamily: 'var(font-secondary)',
    fontSize: 'calc(3.2vw + 3.2vh)',
    fontWeight: 900,
    textAlign: 'center',
  })
  const stylePageHeadingSub = css({
    marginBottom: '2.5rem',
    color: 'var(--color-gray)',
    fontFamily: 'var(--font-tertiary)',
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
      backgroundColor: 'var(--color-accent)',
      animation: 'slideUp .5s forwards',
      h4: {
        fontFamily: 'var(--font-secondary)'
      },
      '@media (max-width: 1200px)': {
        padding: '2rem',
      },
      'ul li': {
        marginBottom: '.5rem',
        color: 'var(--color-gray)',
        fontSize: 14,
        textAlign: 'center',
        strong: {
          color: 'var(--color-text)'
        }
      }
    },
    h4: {
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      fontFamily: 'var(font-secondary)',
      fontSize: 25,
      textAlign: 'center',
      borderBottom: '2px solid var(--color-accent-color)'
    }
  })
  const centerImage = css({
    display: 'flex',
    justifyContent: 'center',
    margin: '6rem 0',
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
    <Layout>
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
                  I craft experiences for the web with clean, accessible code, and purpose-built user interfaces.
                </em>
              </li>
              <li>
                <Link
                  href="/amir-ardalan-resume.pdf"
                  aria-label="Resume (.pdf)">
                  Resume(.pdf)
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/2021-a-dev-odyssey"
                  aria-label="My Journey">
                  My Journey
                </Link>
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
                      src='/static/icons/icon-github.svg'
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
                      src='/static/icons/icon-twitter.svg'
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
                      src='/static/icons/icon-linkedin.svg'
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
            src='/logo/logo-dark.svg'
            height={75}
            width={75}
            alt="Logo"
          />
        </div>
      </div>
    </Layout>
  )
}