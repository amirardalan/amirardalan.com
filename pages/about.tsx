import { Key } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { css } from '@emotion/react';

import Container from '@/components/Container';
import Avatar from '@/components/Avatar';
import CtaButtons from '@/components/CtaButtons';
import SocialIcons from '@/components/SocialIcons';
import Timeline from '@/components/Timeline';

import { aboutContent, timelineContent } from '@/data/content';
import { AboutTypes, TimelineContentTypes } from '@/types/about';
import { CtaButtonsTypes } from '@/types/button';
import { SocialIconsTypes } from '@/types/icons';
import { TimelineTypes } from '@/types/about';

type AboutPageProps = {
  about: AboutTypes & SocialIconsTypes & CtaButtonsTypes;
  timeline: TimelineTypes & TimelineContentTypes;
};

const About: NextPage<AboutPageProps> = ({ about, timeline }) => {
  const styleAbout = {
    margin: '0 auto',
    maxWidth: 768,
    hr: {
      borderTop: 'none',
      margin: 0,
      paddingTop: '3rem',
    },
    '.aboutIntro': {
      fontFamily: 'var(--font-tertiary)',
      fontSize: 32,
      lineHeight: '3rem',
      margin: '3rem 0 5rem',
      li: {
        color: 'var(--color-heading)',
        marginBottom: '3rem',
      },
      '@media (max-width: 768px)': {
        fontSize: 24,
        lineHeight: '2.25rem',
        margin: '2rem 0 3rem',
        li: {
          marginBottom: '2rem',
        },
      },
    },
  };

  const styleGridWrapper = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    gridAutoRows: 'minmax(100px, auto)',
    '@media (max-width: 480px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    '.grid': {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 10,
      lineHeight: '1.8rem',
      '&:first-of-type': {
        border: 'transparent',
        background: 'var(--color-gradient)',
        padding: '2rem',
        '.bioSubHeading': {
          lineHeight: '1.2',
          margin: '1rem 0',
          color: 'var(--color-light)',
        },
        '.blurb': {
          margin: '.5rem 0 1.5rem',
          fontSize: 20,
          fontFamily: 'var(--font-tertiary)',
          fontStyle: 'italic',
          color: 'var(--color-gray-static)',
          '@media(max-width: 768px)': {
            fontSize: 18,
          },
        },
        '.divider': {
          borderBottom: '2px dotted var(--color-light)',
          opacity: '.2',
          paddingBottom: '1rem',
          marginBottom: '1.5rem',
        },
        '.ctaButton': {
          background: 'var(--color-light)',
          color: 'var(--color-dark)',
          '@media(min-width: 1025px)': {
            '&:hover': {
              background: 'transparent',
              border: '2px solid var(--color-light)',
              color: 'var(--color-light)',
            },
          },
        },
        svg: {
          fill: 'var(--color-light)',
          '&:hover': {
            fill: 'var(--color-gray-static)',
          },
        },
      },
      h3: {
        fontFamily: 'var(--font-primary)',
        fontWeight: 400,
        fontSize: 16,
        letterSpacing: 5,
        textTransform: 'uppercase',
      },
      'a:hover': {
        textDecoration: 'none',
      },
      '.availability': {
        color: 'var(--color-heading)',
        fontSize: 20,
        fontFamily: 'var(--font-secondary)',
        '.subheading': {
          marginTop: '1.5rem',
        },
      },

      '@media(max-width: 768px)': {
        background: 'none',
        border: 'none',
        padding: 0,
        margin: '1rem 0',
        '.availability .subheading': {
          marginTop: '1.5rem',
        },
      },
    },
    h3: {
      marginBottom: '.5rem',
      paddingBottom: '.5rem',
      fontSize: 24,
      color: 'var(--color-gray)',
      borderBottom: '2px solid var(--color-text)',
    },
  });
  const styleSocialIcons = css({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '2rem',
    button: {
      marginRight: '1.5rem',
      '&:last-of-type': {
        marginRight: 0,
      },
    },
    svg: {
      fill: 'var(--color-heading)',
      '@media (min-width: 769px)': {
        '&:hover': {
          fill: 'var(--color-primary)',
        },
      },
    },
  });

  const generateListItems = (items: string[]) => {
    return items.map((item: string, i: Key) => {
      return <li key={i}>{item}</li>;
    });
  };

  return (
    <Container
      title={about.meta.title}
      description={about.meta.description}
      robots="follow, index"
    >
      <main className="about" css={styleAbout}>
        <h1 className="pageHeading">{about.heading}</h1>
        <div className="aboutIntro">
          {generateListItems(aboutContent.intro.items)}
        </div>

        <div css={styleGridWrapper}>
          <div className="grid">
            <ul>
              <li css={styleSocialIcons}>
                <SocialIcons about={about} />
              </li>
              <li>
                <CtaButtons items={about.bio.items} />
              </li>
            </ul>
          </div>
          <div className="grid">
            <Avatar height={200} width={200} avatar={about.avatar} />
          </div>
        </div>
        <hr id="timeline" />
        <Timeline timeline={timeline} />
      </main>
    </Container>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
  return { props: { about: aboutContent, timeline: timelineContent } };
};
