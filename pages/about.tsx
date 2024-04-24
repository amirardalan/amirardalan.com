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
  const styleAboutWrapper = {
    margin: '0 auto',
    maxWidth: 768,
    hr: {
      borderTop: 'none',
      margin: 0,
      paddingTop: '3rem',
    },
    '.aboutIntro': {
      fontFamily: 'var(--font-tertiary)',
      fontSize: 34,
      lineHeight: '3.6rem',
      margin: '3.6rem 0 6.5rem',
      li: {
        color: 'var(--color-heading)',
        marginBottom: '3rem',
      },
      '@media (max-width: 768px)': {
        fontSize: 24,
        lineHeight: '2.25rem',
        margin: '3rem 0 3.5rem',
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
    '@media (max-width: 1024px)': {
      padding: '0 2.5rem',
    },
    '@media (max-width: 768px)': {
      padding: '0 2.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '0 2rem',
    },
  };

  const styleAboutModules = css({
    display: 'flex',
    justifyContent: 'space-between',
    '.cta': {
      display: 'flex',
      a: {
        marginBottom: 0,
      },
    },
    '.module': {
      borderTop: '1px solid var(--color-accent-lighter)',
      borderBottom: '1px solid var(--color-accent-lighter)',
      padding: '4rem 2.5rem',
      width: '100%',
      '.moduleWrapper': {
        display: 'flex',
        justifyContent: 'space-between',
        '.moduleRight': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        '.tooltipItem': {
          marginRight: '10%',
          '&:last-of-type': {
            marginRight: 0,
          },
        },
        '@media (max-width: 600px)': {
          flexDirection: 'column',
        },
      },
      '.social': {
        display: 'flex',
        justifyContent: 'end',
        button: {
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          '&:last-of-type': {
            marginRight: 0,
          },
        },
        '@media (max-width: 600px)': {
          marginTop: '1.5rem',
          justifyContent: 'center',
          'a:first-of-type': {
            marginRight: '.5rem',
          },
          '.ctaButton': {
            fontSize: 12,
          },
        },
      },
      '.moduleLeft': {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  });
  const styleSocialIcons = css({
    display: 'flex',
    justifyContent: 'space-between',
    svg: {
      fill: 'var(--color-text)',
      '&:hover': {
        fill: 'var(--color-primary)',
      },
      '@media (max-width: 1024px)': {
        '&:hover': {
          fill: 'var(--color-text)',
        },
      },
    },
    '@media (max-width: 600px)': {
      marginTop: '1.5rem',
      justifyContent: 'center',
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
      <main className="about" css={styleAboutWrapper}>
        <h1 className="pageHeading">{about.heading}</h1>
        <div className="aboutIntro">
          {generateListItems(aboutContent.intro.items)}
        </div>

        <div css={styleAboutModules}>
          <div className="module">
            <div className="moduleWrapper">
              <div className="moduleLeft">
                <Avatar height={120} width={120} avatar={about.avatar} />
              </div>
              <div className="moduleRight">
                <div className="social">
                  <div className="cta">
                    <CtaButtons items={about.bio.items} />
                  </div>
                </div>
                <div css={styleSocialIcons} className="socialIcons">
                  <SocialIcons about={about} />
                </div>
              </div>
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
