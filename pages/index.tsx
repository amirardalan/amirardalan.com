import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { PrismaClient } from '@prisma/client';
import { css } from '@emotion/react';

import Container from '@/components/Container';
import TypingAnimation from '@/components/TypingAnimation';
import FeaturedPost from '@/components/FeaturedPost';
import CtaButtons from '@/components/CtaButtons';
import Tooltip from '@/components/Tooltip';

import { homeContent } from '@/data/content';
import { HomeTypes } from '@/types/home';
import { CtaButtonsTypes } from '@/types/button';

const CanvasLoader = dynamic(() => import('@/components/CanvasLoader'), {
  ssr: false,
});

import { GetStaticProps } from 'next';
const prisma = new PrismaClient();

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [featuredPost, latestPost] = await prisma.$transaction([
      prisma.post.findFirst({
        where: { featured: true, published: true },
        select: { title: true, teaser: true, slug: true },
      }),
      prisma.post.findFirst({
        where: { published: true },
        orderBy: { publishedAt: 'desc' },
        select: { title: true, teaser: true, slug: true },
      }),
    ]);
    return {
      props: {
        home: homeContent,
        featuredPost: featuredPost,
        latestPost: latestPost,
      },
    };
  } catch {
    return { props: { home: homeContent } };
  }
};

type HomeProps = {
  home: HomeTypes & {
    typed: string;
    title: string;
    subTitle: string;
    items: CtaButtonsTypes['items'];
    meta: {
      title: string;
      description: string;
    };
  };
  featuredPost: any;
  latestPost: any;
};

const Home: NextPage<HomeProps> = ({ home, featuredPost, latestPost }) => {
  const styleMain = css({
    padding: '0 4.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '63.75vh',
    '@media (max-width: 890px)': {
      flexDirection: 'column',
      padding: '0 2.5rem',
    },
    '@media (max-width: 768px)': {
      padding: '0 2.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '0 2rem',
    },
  });
  const styleMainLeft = css({
    zIndex: 2,
    width: 'fit-content',
    marginleft: '2rem',
    animation: 'fadeIn .8s forwards',
    '@media (max-width: 480px)': {
      padding: 0,
    },
  });
  const styleContent = css({
    '.titleWrapper': {
      marginBottom: '2.8rem',
      '@media(max-width: 1024px)': {
        marginTop: '4rem',
      },
      '@media(max-width: 480px)': {
        marginTop: '2rem',
        marginBottom: '2rem',
      },
    },
    h1: {
      marginBottom: '6rem',
      lineHeight: '100%',
      fontFamily: 'var(--font-secondary)',
      fontSize: 'calc(4vw + 4vh)',
      fontWeight: 400,
      WebkitMarqueeIncrement: '0vw',
      '@media (max-width: 768px)': {
        fontSize: 'calc(4vw + 4vh)',
        marginBottom: '3rem',
      },
    },
    '.intro, .typed': {
      display: 'block',
      marginBottom: '3.5rem',
      '@media(max-width: 768px)': {
        marginBottom: '2.5rem',
      },
    },
    '.typed': {
      fontSize: 26,
      fontWeight: 400,
      overflow: 'hidden',
      '&:before': {
        content: '"> ~ % "',
        color: 'var(--color-primary)',
      },
      '@media(max-width: 1720px)': {
        fontSize: 20,
      },
      '@media(max-width: 768px)': {
        fontSize: 18,
      },
      '@media(max-width: 360px)': {
        fontSize: 13,
      },
    },
  });
  const styleCtaButtons = css({
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 480px)': {
      marginBottom: '1rem',
    },
  });

  return (
    <Container
      title={home.meta.title}
      robots="follow, index"
      description={home.meta.description}
    >
      <Tooltip pos="cursor" text="Randomize terrain">
        <CanvasLoader />
      </Tooltip>
      <main css={styleMain} className="home">
        <div css={styleMainLeft}>
          <div css={styleContent}>
            <div className="titleWrapper">
              <span className="typed" aria-hidden="true">
                <TypingAnimation data={home.typed} />
              </span>
              <h1>{home.title}</h1>
            </div>
            <div css={styleCtaButtons}>
                <CtaButtons items={home.items} />
              </div>
            <FeaturedPost
              home={home}
              featuredPost={featuredPost}
              latestPost={latestPost}
            />
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Home;
