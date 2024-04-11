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
import ContactButton from '@/components/ContactButton';

type AboutPageProps = {
  about: AboutTypes & SocialIconsTypes & CtaButtonsTypes;
  timeline: TimelineTypes & TimelineContentTypes;
};

const About: NextPage<AboutPageProps> = ({ about, timeline }) => {
  const styleAboutIntro = {
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
      margin: '3.6rem 0 6.5rem',
      li: {
        color: 'var(--color-heading)',
        marginBottom: '3rem',
      },
      '@media (max-width: 768px)': {
        fontSize: 24,
        lineHeight: '2.25rem',
        margin: '2rem 0 3.5rem',
        li: {
          marginBottom: '2rem',
        },
      },
    },
    '.contact': {
      marginBottom: '7.5rem',
      '@media (max-width: 768px)': {
        marginBottom: '5rem',
      },
    },
  };

  const styleAboutModules = css({
    display: 'flex',
    justifyContent: 'space-between',
    '.module': {
      width: '100%',
      '.social': {
        borderRadius: 10,
        lineHeight: '1.8rem',
        border: 'transparent',
        background: 'var(--color-gradient)',
        padding: '2rem 3rem 2.5rem',
        button: {
          width: '100%',
          margin: '0 auto',
          marginRight: '8%',
          '&:last-of-type': {
            marginRight: 0,
          },
        },
        '@media (max-width: 768px)': {
          padding: '1.5rem 2rem 1.5rem',
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
        '.ctaButton': {
          background: 'transparent',
          border: '2px solid var(--color-light)',
          color: 'var(--color-light)',
          '@media(min-width: 1025px)': {
            '&:hover': {
              background: 'transparent',
              border: '2px solid var(--color-light)',
              color: 'var(--color-light)',
            },
          },
          '&:hover': {
            border: '2px solid var(--color-gray-static)',
            color: 'var(--color-gray-static)',
          },
        },
        svg: {
          fill: 'var(--color-light)',
          '&:hover': {
            fill: 'var(--color-gray-static)',
          },
        },
      },
      '.avatar': {
        display: 'flex',
        justifyContent: 'center',
      },
    },
    '@media(max-width: 768px)': {
      flexDirection: 'column',
      '.avatar': {
        marginTop: '3rem',
      },
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
      <main className="about" css={styleAboutIntro}>
        <h1 className="pageHeading">{about.heading}</h1>
        <div className="aboutIntro">
          {generateListItems(aboutContent.intro.items)}
        </div>

        <ContactButton />

        <div css={styleAboutModules}>
          <div className="module">
            <ul className="social">
              <li css={styleSocialIcons}>
                <SocialIcons about={about} />
              </li>
              <li>
                <CtaButtons items={about.bio.items} />
              </li>
            </ul>
          </div>
          <div className="module">
            <div className="avatar">
              <Avatar height={199} width={199} avatar={about.avatar} />
            </div>
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
