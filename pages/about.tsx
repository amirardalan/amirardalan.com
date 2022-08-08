import { css } from '@emotion/react'
import Container from '@/components/Container'
import Avatar from '@/components/Avatar'
import { CtaButtons, ContactButton } from '@/components/CtaButtons'
import SocialIcons from '@/components/SocialIcons'
import Timeline from '@/components/Timeline'
import { aboutContent, timelineContent } from '@/data/content'

import { GetStaticProps } from 'next'
export const getStaticProps: GetStaticProps = async () => {
  return { props: { about: aboutContent, timeline: timelineContent } }
}


export default function About({ about, timeline }) {
  const styleGridWrapper = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    gridAutoRows: 'minmax(100px, auto)',
    '@media(max-width: 1280px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media(max-width: 768px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    '.grid': {
      display: 'flex',
      justifyContent: 'center',
      border: '1px solid var(--color-accent)',
      backgroundColor: 'var(--color-bg)',
      boxShadow: '0 0 1rem rgba(12, 12, 14, 0.1)',
      padding: '2rem',
      lineHeight: '1.8rem',
      '&:first-of-type': {
        border: 'transparent',
        background: 'var(--color-gradient)',
        padding: '2rem',
        '.bioSubHeading': {
          margin: '1rem 0',
          color: 'var(--color-light)',
          lineHeight: '1.2rem',
        },
        '.blurb': {
          marginBottom: '1.5rem',
          fontSize: 12,
          lineHeight: '1.2rem',
          color: 'var(--color-light)'
        },
        '.ctaButton': {
          background: 'var(--color-light)',
          color: 'var(--color-dark)',
          '@media(min-width: 1025px)': {
            '&:hover': {
              background: 'transparent',
              border: '1px solid var(--color-light)',
              color: 'var(--color-light)'
            },
          }
        },
        em: {
          color: 'var(--color-select)',
          marginBottom: '1rem',
          display: 'inline-block',
          fontFamily: 'var(--font-tertiary)',
          fontSize: 17,
          maxWidth: 450,
        }
      },
      h3: {
        fontFamily: 'var(--font-secondary)',
      },
      ul: {
        width: '100%',
      },
      'ul li': {
        color: 'var(--color-gray)',
        fontSize: 14,
        strong: {
          color: 'var(--color-heading)',
          fontFamily: 'var(--font-secondary)',
          fontSize: 16,
        },
      },
      '.availability': {
        fontFamily: 'var(--font-secondary)',
        color: 'var(--color-heading)',
        fontSize: 18
      },
    },
    'h2, h3': {
      fontWeight: 700,
    },
    h2: {
      color: 'var(--color-heading)',
      fontSize: 24,
    },
    h3: {
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      fontSize: 24,
      color: 'var(--color-heading)',
      borderBottom: '2px solid var(--color-primary)',
    },
  })
  const styleBioItems = css({
    li: {
      marginBottom: '1rem',
      '&:last-of-type': {
        marginBottom: 0,
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
    flexDirection: 'row',
    a: {
      marginRight: '1.5rem',
      '&:last-of-type': {
        marginRight: 0,
      },
    },
  })

  const GenerateListItems = (items: Array<string>) => {
    return items.map((items, i) => {
      return <li key={i}>{items}</li>
    })
  }

  return (
    <Container title={about.meta.title} description={about.meta.description}>
      <main className='about'>
      <h1 className='pageHeading'>{about.heading}</h1>
          <div css={styleGridWrapper}>
            <div className='grid'>
              <div css={styleBioItems}>
                <Avatar height={125} width={125} avatar={about.avatar} />
                <h2 aria-label={about.bio.subheading} className="bioSubHeading">
                  {about.bio.subheading}
                </h2>
                <p className='blurb'>{about.bio.content}</p>
                <CtaButtons items={about.bio.items} />
              </div>
            </div>
            <div className='grid'>
              <ul>
                <li>
                  <h3 aria-label={about.skills.title}>{about.skills.title}</h3>
                </li>
                {GenerateListItems(about.skills.items)}
              </ul>
              <ul>
                <li>
                  <h3 aria-hidden="true">&nbsp;</h3>
                </li>
                {GenerateListItems(about.stack.items)}
              </ul>
            </div>
            <div className='grid'>
              <ul>
                <li>
                  <h3 aria-label={about.experience.title}>
                    {about.experience.title}
                  </h3>
                </li>
                {GenerateListItems(about.experience.items)}
              </ul>
            </div>
            <div className='grid'>
              <ul>
                <li>
                  <h3 aria-label={about.availability.title}>
                    {about.availability.title}
                  </h3>
                </li>
                <li className="availability">
                  {about.availability.text}
                </li>
                <li>
                  {about.availability.location}
                </li>
              </ul>
            </div>
            <div className='grid'>
              <div css={styleSocialIconsWrapper}>
                <ul>
                  <li>
                    <h3>{about.social.title}</h3>
                  </li>
                  <li css={styleSocialIcons}>
                    <SocialIcons about={about} />
                  </li>
                </ul>
              </div>
            </div>
            <div className='grid'>
              <ul>
                <li>
                  <h3 aria-label={about.contact.title}>{about.contact.title}</h3>
                </li>
                <li>
                  <ContactButton content={about} />
                </li>
              </ul>
            </div>
          </div>
        <Timeline timeline={timeline} />
      </main>
    </Container>
  )
}
