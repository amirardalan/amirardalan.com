import { css, useTheme } from '@emotion/react'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
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

export default function About({ data, toggleTheme }) {
  const theme: any = useTheme()

  const stylePageHeadingSub = css({
    margin: '0 0 2.5rem 0',
    color: 'var(--color-gray)',
    fontFamily: 'var(--font-tertiary)',
    fontSize: 'calc(1vw + 1vh)',
    WebkitMarqueeIncrement: '0vw',
    fontWeight: 'normal',
    fontStyle: 'italic',
    textAlign: 'center',
    '@media(max-width: 1024px)': {
      margin: '1rem 0 2.5rem 0',
    }
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


  return (
    <div className="container">
      <Head>
        <title>{data.meta.title}</title>
      </Head>
      <div className="about">
        <h2 className="pageHeading">
          {data.title}
        </h2>
        <h3 css={stylePageHeadingSub}>
          {data.subtitle}
        </h3>
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
                <li>
                  <a
                    href={data.link.github.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={data.meta.github.title}>
                    <Image
                      src={theme.icon.github}
                      height={48}
                      width={48}
                      alt={data.meta.github.title}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={data.link.twitter.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={data.meta.twitter.title}>
                    <Image
                      src={theme.icon.twitter}
                      height={48}
                      width={48}
                      alt={data.meta.twitter.title}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={data.link.linkedin.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={data.meta.linkedin.title}>
                    <Image
                      src={theme.icon.linkedin}
                      height={48}
                      width={48}
                      alt={data.meta.linkedin.title}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid">
            <ul>
              <h4>{data.contact.title}</h4>
              {generateListItems(data.contact.items)}
              <li css={styleCtaWrapper}>
                <a
                  href={data.link.twitter.dm.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                <button
                  className="ctaButton"
                  data-screen-name={data.link.twitter.dm.handle}
                  aria-label={data.link.twitter.dm.title}>
                  {data.link.twitter.dm.title}
                </button>
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
    </div>
  )
}