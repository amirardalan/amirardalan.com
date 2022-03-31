import { css } from '@emotion/react'
import Container from '@/components/Container'
import Avatar from '@/components/Avatar'
import { generateCtaButtons, ContactButton } from '@/components/CtaButtons'
import SocialIcons from '@/components/SocialIcons'
import Timeline from '@/components/Timeline'
import { about } from '@/data/content'


export default function About() {
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
          '&:hover': {
            background: 'var(--color-select)',
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
        fontSize: 16
      },
    },
    'h2, h3': {
      fontWeight: 700,
    },
    h2: {
      color: 'var(--color-text)',
      fontSize: 22,
    },
    h3: {
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      fontSize: 22,
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
  const styleDownloadResume = css({
    margin: '2rem 0',
    background: 'var(--color-accent)',
    padding: '4rem',
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
              <ul css={styleBioItems}>
                <li>
                  <Avatar height={125} width={125} />
                </li>
                <li aria-label={about.bio.subheading} className="bioSubHeading">
                  <h2>{about.bio.subheading}</h2>
                </li>
                <li>
                  <em className='blurb'>{about.bio.content}</em>
                </li>
                <div>
                  {generateCtaButtons(about.bio.items)}
                </div>
              </ul>
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
                    <SocialIcons />
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
                  <ContactButton />
                </li>
              </ul>
            </div>
          </div>
        <Timeline />
      </main>
    </Container>
  );
}
