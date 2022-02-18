import { css } from '@emotion/react'

import Container from '@/components/Container'
import Avatar from '@/components/Avatar'
import CtaButtonsAbout from '@/components/CtaButtonsAbout'
import ContactButton from '@/components/ContactButton'
import SocialIcons from '@/components/SocialIcons'
import Timeline from '@/components/Timeline'

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
    '@media(max-width: 1200px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media(max-width: 768px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    '.grid': {
      display: 'flex',
      justifyContent: 'center',
      padding: '3rem',
      backgroundColor: 'var(--color-accent)',
      lineHeight: '1.8rem',
      animation: 'slideUp .5s forwards',
      h4: {
        fontFamily: 'var(--font-secondary)'
      },
      '@media (max-width: 1200px)': {
        padding: '1.5rem',
      },
      '@media (max-width: 480px)': {
        padding: '1.5rem',
      },
      ul: {
        width: '100%',
      },
      'ul li': {
        color: 'var(--color-gray)',
        fontSize: 14,
        strong: {
          color: 'var(--color-text)',
          fontFamily: 'var(--font-secondary)',
          fontSize: 16,
        },
        em: {
          marginBottom: '1rem',
          display: 'inline-block',
          fontFamily: 'var(--font-tertiary)',
          fontSize: 16,
          maxWidth: 450,
        },
        a: {
          textDecoration: 'none'
        },
      }
    },
    h4: {
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      fontSize: 22,
      color: 'var(--color-text)',
      borderBottom: '2px solid var(--color-accent-color)',
    },
  })
  const styleCtaWrapper = css({
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'row wrap',
    '@media(max-width: 350px)': {
      flexDirection: 'column',
    }
  })
  const styleBioItems = css({
    li: {
      marginBottom: '1rem',
      '&:last-of-type': {
        marginBottom: 0,
      }
    }
  })
  const styleSocialIconsWrapper = css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  })
  const styleSocialIcons = css({
    display: 'flex',
    flexDirection: 'row',
    a: {
      marginRight: '1.5rem',
      '&:last-of-type': {
        marginRight: 0,
      }
    }
  })

  const GenerateListItems = (items: Array<string>) => {
    return items.map((items, i) => {
      return (
        <li key={i}>
          {items}
        </li>
      )
    })
  }

  return (
    <Container title={data.meta.title}>
      <div className="about">
        <div className="animationWrapper">
          <h2 className="pageHeading">
            {data.heading}
          </h2>
          <main css={styleGridWrapper}>
            <div className="grid">
              <ul css={styleBioItems}>
                <li>
                  <Avatar height="100" width="100" />
                </li>
                <li aria-label={data.bio.subheading}>
                  <strong>{data.bio.subheading}</strong>
                </li>
                <li>
                  <em>
                    {data.bio.content}
                  </em>
                </li>
                <li css={styleCtaWrapper}>
                  <CtaButtonsAbout />
                </li>
              </ul>
            </div>
            <div className="grid">
              <ul>
                <li>
                  <h4 aria-label="{data.skills.title}">
                    {data.skills.title}
                  </h4>
                </li>
                {GenerateListItems(data.skills.items)}
              </ul>
              <ul>
                <li>
                  <h4 aria-label="{data.skills.title}">
                    {data.stack.title}
                  </h4>
                </li>
                {GenerateListItems(data.stack.items)}
              </ul>
            </div>
            <div className="grid">
              <ul>
                <li>
                  <h4 aria-label={data.experience.title}>
                    {data.experience.title}
                  </h4>
                </li>
                {GenerateListItems(data.experience.items)}
              </ul>
            </div>
            <div className="grid">
              <ul>
                <li>
                  <h4 aria-label={data.availability.title}>
                    {data.availability.title}
                  </h4>
                </li>
                {GenerateListItems(data.availability.items)}
              </ul>
            </div>
            <div className="grid">
              <div css={styleSocialIconsWrapper}>
                <ul>
                  <li>
                    <h4>{data.social.title}</h4>
                  </li>
                  <li css={styleSocialIcons}>
                    <SocialIcons />
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid">
              <ul>
                <li>
                  <h4 aria-label={data.contact.title}>
                    {data.contact.title}
                  </h4>
                </li>
                <li css={styleCtaWrapper}>
                  <ContactButton />
                </li>
              </ul>
            </div>
          </main>
        </div>
        <Timeline />
      </div>
    </Container>
  )
}