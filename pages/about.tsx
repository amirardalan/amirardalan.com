import { css } from '@emotion/react'

import Container from '@/components/Container'
import Avatar from '@/components/Avatar'
import { GenerateCtaButtons } from '@/components/CtaButtons'
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
  };
};

export default function About({ data }) {
  const styleGridWrapper = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
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
      padding: '3rem',
      backgroundColor: 'var(--color-accent)',
      lineHeight: '1.8rem',
      animation: 'slideUpSection .5s forwards',
      h4: {
        fontFamily: 'var(--font-secondary)',
      },
      '@media (max-width: 1024px)': {
        padding: '1.5rem',
      },
      '@media (max-width: 480px)': {
        padding: '1.5rem',
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
        '.blurb': {
          color: 'var(--color-neutral)',
        },
        em: {
          marginBottom: '1rem',
          display: 'inline-block',
          fontFamily: 'var(--font-tertiary)',
          fontSize: 17,
          maxWidth: 450,
        },
        a: {
          textDecoration: 'none',
        },
      },
      '.bioSubHeading': {
        lineHeight: '1.2rem',
      },
      '.availability': {
        fontFamily: 'var(--font-secondary)',
        color: 'var(--color-neutral)',
        fontSize: 16
      },
    },
    h4: {
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      fontSize: 22,
      color: 'var(--color-text)',
      borderBottom: '2px solid var(--color-primary)',
    },
  });
  const styleCtaWrapper = css({
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'row wrap',
    '@media(max-width: 350px)': {
      flexDirection: 'column',
    },
  });
  const styleBioItems = css({
    li: {
      marginBottom: '1rem',
      '&:last-of-type': {
        marginBottom: 0,
      },
    },
  });
  const styleSocialIconsWrapper = css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  });
  const styleSocialIcons = css({
    display: 'flex',
    flexDirection: 'row',
    a: {
      marginRight: '1.5rem',
      '&:last-of-type': {
        marginRight: 0,
      },
    },
  });

  const GenerateListItems = (items: Array<string>) => {
    return items.map((items, i) => {
      return <li key={i}>{items}</li>
    })
  }

  return (
    <Container title={data.meta.title} description={data.meta.description}>
      <div className='about'>
        <div className='animationWrapper'>
          <h1 className='pageHeading'>{data.heading}</h1>
          <main css={styleGridWrapper}>
            <div className='grid'>
              <ul css={styleBioItems}>
                <li>
                  <Avatar height='100' width='100' />
                </li>
                <li aria-label={data.bio.heading} className="bioHeading">
                  {data.bio.heading}
                </li>
                <li aria-label={data.bio.subheading} className="bioSubHeading">
                  <strong>{data.bio.subheading}</strong>
                </li>
                <li>
                  <em className='blurb'>{data.bio.content}</em>
                </li>
                <li css={styleCtaWrapper}>
                  {GenerateCtaButtons(about.bio.items)}
                </li>
              </ul>
            </div>
            <div className='grid'>
              <ul>
                <li>
                  <h4 aria-label='{data.skills.title}'>{data.skills.title}</h4>
                </li>
                {GenerateListItems(data.skills.items)}
              </ul>
              <ul>
                <li>
                  <h4 aria-label='{data.skills.title}'>{data.stack.title}</h4>
                </li>
                {GenerateListItems(data.stack.items)}
              </ul>
            </div>
            <div className='grid'>
              <ul>
                <li>
                  <h4 aria-label={data.experience.title}>
                    {data.experience.title}
                  </h4>
                </li>
                {GenerateListItems(data.experience.items)}
              </ul>
            </div>
            <div className='grid'>
              <ul>
                <li>
                  <h4 aria-label={data.availability.title}>
                    {data.availability.title}
                  </h4>
                </li>
                <li className="availability">
                  {data.availability.text}
                </li>
                <li>
                  {data.availability.location}
                </li>
              </ul>
            </div>
            <div className='grid'>
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
            <div className='grid'>
              <ul>
                <li>
                  <h4 aria-label={data.contact.title}>{data.contact.title}</h4>
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
  );
}
