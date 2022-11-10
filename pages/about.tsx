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
      // border: '1px solid var(--color-accent)',
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
          fontFamily: 'var(--font-tertiary)',
          color: 'var(--color-light)',
          '@media(max-width: 768px)': {
            fontSize: 18,
          }
        },
        '.divider': {
          borderBottom: '2px dotted var(--color-light)',
          opacity: '.2',
          paddingBottom: '1.8rem',
          marginBottom: '2.2rem',
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
      '.skills': {
        'li': {
          fontSize: 13,
          '&:first-of-type': {
            '&:before': {
              content: '" "'
            }
          },
          '&:before': {
            content: '"• "'
          }
        }
      },
      '.experience': {
        fontFamily: 'var(--font-tertiary)',
        'li': {
          marginBottom: '1.2rem',
          fontSize: 18,
          '@media(min-width: 769px)': {
            fontSize: 16
          }
        },
      },
      '.availability': {
        fontFamily: 'var(--font-secondary)',
        color: 'var(--color-heading)',
        fontSize: 18,
        '.title': {
          fontSize: 18,
          color: 'var(--color-text)'
        },
        '.text': {
          fontFamily: 'var(--font-tertiary)',
          fontStyle: 'italic'
        }
      },
      '@media(max-width: 768px)': {
        boxShadow: 'none',
        border: 'none',
        padding: 0,
        margin: '1rem 0',
      }
    },
    'h2, h3': {
      fontWeight: 700,
    },
    h2: {
      color: 'var(--color-heading)',
      fontSize: 24,
      paddingBottom: '.25rem'
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
                <div className="avatar">
                  <Avatar height={90} width={90} avatar={about.avatar} />
                </div>
                <h2 aria-label={about.bio.subheading} className="bioSubHeading">
                  {about.bio.subheading}
                </h2>
                <p className='blurb'>{about.bio.content}</p>
                <div className="divider" />
                <CtaButtons items={about.bio.items} />
              </div>
            </div>
            <div className='grid'>
              <ul className="skills">
                <li>
                  <h3 aria-label={about.skills.title}>{about.skills.title}</h3>
                </li>
                {GenerateListItems(about.skills.items)}
              </ul>
              <ul className="skills">
                <li>
                  <h3 aria-hidden="true">&nbsp;</h3>
                </li>
                {GenerateListItems(about.stack.items)}
              </ul>
            </div>
            <div className='grid'>
              <ul className="experience">
                <li>
                  <h3 aria-label={about.experience.title}>
                    {about.experience.title}
                  </h3>
                </li>
                {GenerateListItems(about.experience.items)}
              </ul>
            </div>
            <div className='grid'>
              <ul className="availability">
                <li>
                  <h3 aria-label={about.availability.title}>
                    {about.availability.title}
                  </h3>
                </li>
                <li className="title">
                  {about.availability.text}
                </li>
                <li className="text">
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
            <div className='grid' id="contact">
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
