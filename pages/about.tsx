import { css, useTheme } from '@emotion/react'
import { useState } from 'react'

import Image from 'next/image'
import Head from 'next/head'
import Avatar from '@/components/Avatar'

import { about } from '@/data/content'
import { GetStaticProps } from 'next'
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: about,
    },
  }
}

export default function About({ data }) {

  const theme: any = useTheme()
  const isDarkTheme = theme.active === 'dark'

  const [showEmail, setShowEmail] = useState(false)
  const showEmailOnclick = () => {
    setShowEmail(true)
  }
  const [copiedToClipBoard, setCopiedToClipBoard] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.contact.email)
    setCopiedToClipBoard(true)
    setTimeout(() => {
      setCopiedToClipBoard(false)
    }, 10000)
  }

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
      padding: '3rem',
      backgroundColor: 'var(--color-accent)',
      animation: 'slideUp .5s forwards',
      h4: {
        fontFamily: 'var(--font-secondary)'
      },
      '@media (max-width: 1200px)': {
        padding: '2rem',
      },
      '@media (max-width: 480px)': {
        padding: '1rem',
      },
      ul: {
        width: '100%',
      },
      'ul li': {
        marginBottom: '.5rem',
        color: 'var(--color-gray)',
        fontSize: 14,
        textAlign: 'center',
        strong: {
          color: 'var(--color-text)',
          fontFamily: 'var(--font-secondary)',
          fontSize: 16,
        },
        em: {
          marginBottom: '1rem',
          display: 'inline-block',
          fontFamily: 'var(--font-tertiary)',
          maxWidth: 450,
          lineHeight: '1.2rem',
        },
        a: {
          textDecoration: 'none'
        },
      }
    },
    h4: {
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      fontFamily: 'var(font-secondary)',
      fontSize: 25,
      textAlign: 'center',
      borderBottom: '2px solid var(--color-accent-color)',
    },
    '.iconGithub, .iconTwitter, .iconLinkedin': {
      height: 48,
      width: 48,
      display: 'inline-block'
    },
    '.iconGithub': {
      backgroundImage: 'var(--icon-github)',
    },
    '.iconTwitter': {
      backgroundImage: 'var(--icon-twitter)',
    },
    '.iconLinkedin': {
      backgroundImage: 'var(--icon-linkedin)',
    }
  })
  const styleCtaWrapper = css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    '.ctaButton': {
      maxWidth: 280,
      margin: '0 .5rem .5rem',
      '&.disabled': {
        cursor: 'pointer',
        background: 'transparent',
        color: 'var(--color-text)',
        border: '1px solid var(--color-accent-gray)',
        '&:active': {
          border: '1px solid var(--color-accent-color)'
        }
      },
      '@media(max-width: 1400px)': {
        width: '100%',
      },
    },
  })
  const styleSocialIconsWrapper = css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  })
  const styleSocialIcons = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    li: {
      flexDirection: 'row',
      margin: '0 1rem'
    }
  })

  const generateListItems = (items: Array<string>) => {
    return items.map((items, i) => {
      return (
        <li key={i}>
          {items}
        </li>
      )
    })
  }

  const generateCtaButtons = (items: Array<any>) => {
    return items.map((items, i) => {
      return (
        <a
          key={i}
          href={items.path}
          className="ctaButton"
          aria-label={items.title}
          target={items.target}
          rel={items.rel}
          data-screen-name={items?.screenname}
          >
            {items.title}
            {items.icon ?
            <span className="icon">
              <Image
                src={isDarkTheme
                  ? items.icon?.dark
                  : items.icon?.light}
                height="18"
                width="18"
                alt={items.title}
                aria-label={items.title}
              />
            </span>
            : null}
        </a>
      )
    })
  }

  const generateSocialIcons = (items: Array<any>) => {
    return items.map((items, i) => {
      return (
        <li key={i}>
          <a
            href={items.path}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={items.title}
          >
            <Image
              src={isDarkTheme
                ? items.icon.dark
                : items.icon.light}
              height="48"
              width="48"
              alt={items.title}
              aria-label={items.title}
            />
          </a>
        </li>
      )
    })
  }

  return (
    <div className="container about">
      <Head>
        <title>{data.meta.title}</title>
      </Head>
      <div className="animationWrapper">
        <h2 className="pageHeading">
          {data.heading}
        </h2>
        <main css={styleGridWrapper}>
          <div className="grid">
            <ul>
              <li>
                <Avatar height="100" width="100" />
              </li>
              <li><strong>{data.bio.subheading}</strong></li>
              <li>
                <em>
                  {data.bio.content}
                </em>
              </li>
              <li css={styleCtaWrapper}>
                {generateCtaButtons(data.bio.items)}
              </li>
            </ul>
          </div>
          <div className="grid">
            <ul>
              <h4>{data.skills.title}</h4>
              {generateListItems(data.skills.items)}
            </ul>
          </div>
          <div className="grid">
            <ul>
              <h4>{data.experience.title}</h4>
              {generateListItems(data.experience.items)}
            </ul>
          </div>
          <div className="grid">
            <ul>
              <h4>{data.availability.title}</h4>
              {generateListItems(data.availability.items)}
            </ul>
          </div>
          <div className="grid">
            <div css={styleSocialIconsWrapper}>
              <h4>{data.social.title}</h4>
              <ul css={styleSocialIcons}>
                {generateSocialIcons(data.social.items)}
              </ul>
            </div>
          </div>
          <div className="grid">
            <ul>
              <h4>{data.contact.title}</h4>
              <li css={styleCtaWrapper}>
                {generateCtaButtons(data.contact.items)}
                <span
                  onClick={showEmail
                    ? copyToClipboard
                    : showEmailOnclick}
                  className={showEmail
                    ? 'ctaButton disabled'
                    : 'ctaButton'}
                  aria-label={showEmail
                    ? data.contact.email
                    : 'Show Email'}
                >
                  {showEmail ? data.contact.email : data.contact.showEmail}
                </span>
              </li>
              <li>
              {copiedToClipBoard
                ? <div>{data.contact.copiedToClipboard}</div>
                : <div css={{color: 'var(--color-accent)'}}>–</div>}
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}