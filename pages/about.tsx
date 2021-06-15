import { css, useTheme } from '@emotion/react'

import Head from 'next/head'
import Link from 'next/link'
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
      borderBottom: '2px solid var(--color-accent-color)'
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
    flexDirection: 'column',
    justifyContent: 'center',
    '.ctaButton': {
      marginRight: 0,
      marginBottom: '1rem',
      display: 'flex',
      alignSelf: 'center',
      width: '100%',
      maxWidth: 300,
    },
  })
  const styleSocialIconsWrapper = css({
    width: '100%',
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'column',
  })
  const styleSocialIcons = css({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    li: {
      flexDirection: 'row',
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

  const generateBioLinks = (items: Array<any>) => {
    return items.map((items, i) => {
      return (
        <a
          key={i}
          href={items.path}
          aria-label={items.title}
          target={items.target}
          rel={items.rel}
          >
          <button className="ctaButton">
            {items.title}
            <span className={items.icon}>
              <img
                src={theme.icon.download}
                height="25"
                width="25"
                alt="Download Resume"
              />
            </span>
          </button>
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
            className={items.cName}
          >
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
                <Avatar />
              </li>
              <li><strong>{data.bio.subheading}</strong></li>
              <li>
                <em>
                  {data.bio.content}
                </em>
              </li>
              <li css={styleCtaWrapper}>
                {generateBioLinks(data.bio.items)}
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
              {generateListItems(data.contact.items)}
              <li css={styleCtaWrapper}>
                <a
                  href={data.twitterDm.path}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                <button
                  className="ctaButton"
                  data-screen-name={data.twitterDm.handle}
                  aria-label={data.twitterDm.title}>
                  {data.twitterDm.title}
                </button>
                </a>
            </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}