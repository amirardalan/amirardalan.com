import { css } from '@emotion/react'

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
    justifyContent: 'center',
    button: {
      display: 'flex',
      alignSelf: 'center',
      minWidth: 'unset',
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
        <Link
          key={i}
          href={items.path}
          aria-label={items.title}>
          <button className="ctaButton">
            {items.title}
          </button>
        </Link>
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
      <div className="about">
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
            <div css={socialIconsWrapper}>
              <h4>{data.social.title}</h4>
              <ul css={socialIcons}>
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