import { css } from '@emotion/react'
import Container from '@/components/Container'
import Avatar from '@/components/Avatar'
import { generateCtaButtons, ContactButton } from '@/components/CtaButtons'
import SocialIcons from '@/components/SocialIcons'
import Timeline from '@/components/Timeline'
import { about, timeline } from '@/data/content'

import { GetStaticProps } from 'next'
export const getStaticProps: GetStaticProps = async () => {
  return { props: { content: about, timeline } }
}


export default function About({ content }) {
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
          lineHeight: '1.2rem',
          h2: {
            color: 'var(--color-light)'
          }
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
        color: 'var(--color-neutral)',
        fontSize: 14,
        strong: {
          color: 'var(--color-text)',
          fontFamily: 'var(--font-secondary)',
          fontSize: 16,
        },
      },
      '.availability': {
        fontFamily: 'var(--font-secondary)',
        color: 'var(--color-text)',
        fontSize: 18
      },
    },
    'h2, h3': {
      fontWeight: 700,
    },
    h2: {
      color: 'var(--color-text)',
      fontSize: 24,
    },
    h3: {
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      fontSize: 24,
      color: 'var(--color-text)',
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
    <Container title={content.meta.title} description={content.meta.description}>
      <main className='about'>
      <h1 className='pageHeading'>{content.heading}</h1>
          <div css={styleGridWrapper}>
            <div className='grid'>
              <ul css={styleBioItems}>
                <li>
                  <Avatar height={125} width={125} />
                </li>
                <li aria-label={content.bio.subheading} className="bioSubHeading">
                  <h2>{content.bio.subheading}</h2>
                </li>
                <li>
                  <em className='blurb'>{content.bio.content}</em>
                </li>
                <li>
                  {generateCtaButtons(content.bio.items)}
                </li>
              </ul>
            </div>
            <div className='grid'>
              <ul>
                <li>
                  <h3 aria-label={content.skills.title}>{content.skills.title}</h3>
                </li>
                {GenerateListItems(content.skills.items)}
              </ul>
              <ul>
                <li>
                  <h3 aria-hidden="true">&nbsp;</h3>
                </li>
                {GenerateListItems(content.stack.items)}
              </ul>
            </div>
            <div className='grid'>
              <ul>
                <li>
                  <h3 aria-label={content.experience.title}>
                    {content.experience.title}
                  </h3>
                </li>
                {GenerateListItems(content.experience.items)}
              </ul>
            </div>
            <div className='grid'>
              <ul>
                <li>
                  <h3 aria-label={content.availability.title}>
                    {content.availability.title}
                  </h3>
                </li>
                <li className="availability">
                  {content.availability.text}
                </li>
                <li>
                  {content.availability.location}
                </li>
              </ul>
            </div>
            <div className='grid'>
              <div css={styleSocialIconsWrapper}>
                <ul>
                  <li>
                    <h3>{content.social.title}</h3>
                  </li>
                  <li css={styleSocialIcons}>
                    <SocialIcons />
                  </li>
                </ul>
              </div>
            </div>
            <div className='grid'>
              <ul>
                <li>
                  <h3 aria-label={content.contact.title}>{content.contact.title}</h3>
                </li>
                <li>
                  <ContactButton />
                </li>
              </ul>
            </div>
          </div>
        <Timeline content={timeline} />
      </main>
    </Container>
  );
}
