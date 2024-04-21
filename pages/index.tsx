import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { PrismaClient } from '@prisma/client';
import { css } from '@emotion/react';

import Container from '@/components/Container';
import TypingAnimation from '@/components/TypingAnimation';
import FeaturedPost from '@/components/FeaturedPost';
import CtaButtons from '@/components/CtaButtons';

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
    display: 'flex',
    '@media (max-width: 890px)': {
      flexDirection: 'column',
    },
  });
  const styleMainLeft = css({
    padding: '0 2rem 0 0',
    animation: 'fadeIn .8s forwards',
    '@media (max-width: 890px)': {
      flexDirection: 'column-reverse',
    },
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
      marginBottom: '2rem',
      lineHeight: '100%',
      fontFamily: 'var(--font-secondary)',
      fontSize: 'calc(3.6vw + 3.6vh)',
      fontWeight: 600,
      WebkitMarqueeIncrement: '0vw',
      '@media (max-width: 768px)': {
        fontSize: 'calc(5.2vw + 5.2vh)',
      },
    },
    '.intro, .typed': {
      color: 'var(--color-accent-gray)',
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
  const styleMainRight = css({
    position: 'relative',
    background: 'var(--color-gradient)',
    height: '72vh',
    '@media (max-width: 890px)': {
      height: '45vh',
      marginTop: '2rem',
    },
  });

  return (
    <Container
      title={home.meta.title}
      robots="follow, index"
      description={home.meta.description}
    >
      <main css={styleMain} className="home">
        <div css={styleMainLeft} className="animationWrapper">
          <div css={styleContent}>
            <div className="titleWrapper">
              <span className="typed" aria-hidden="true">
                <TypingAnimation data={home.typed} />
              </span>
              <h1>{home.title}</h1>
              <div css={styleCtaButtons}>
                <CtaButtons items={home.items} />
              </div>
            </div>
            <FeaturedPost
              home={home}
              featuredPost={featuredPost}
              latestPost={latestPost}
            />
          </div>
        </div>
        <div css={styleMainRight} className="animationWrapper">
          <CanvasLoader />
        </div>
      </main>
    </Container>
  );
};

export default Home;
