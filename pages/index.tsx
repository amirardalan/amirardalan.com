import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import Container from '@/components/Container';
import TypingAnimation from '@/components/TypingAnimation';
import FeaturedPost from '@/components/FeaturedPost';
import { CtaButtons } from '@/components/CtaButtons';

import { homeContent } from '@/data/content';

const CanvasLoader = dynamic(() => import('@/components/CanvasLoader'), {
  ssr: true,
});

import { GetStaticProps } from 'next';
import prisma from '@/lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [featuredPost, latestPost] = await prisma.$transaction([
      prisma.post.findFirst({
        where: { featured: true, published: true },
        select: { title: true, teaser: true, slug: true },
      }),
      prisma.post.findFirst({
        where: { featured: false, published: true },
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
  home: {
    typed: string;
    title: string;
    items: Array<object>;
    meta: {
      title: string;
      description: string;
    };
  };
  featuredPost: Object;
  latestPost: Object;
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
    animation: 'slideUpSection .8s forwards',
    '@media (max-width: 890px)': {
      flexDirection: 'column-reverse',
    },
    '@media (max-width: 480px)': {
      padding: 0,
    },
  });
  const styleContent = css({
    '.titleWrapper': {
      marginBottom: '3rem',
      '@media(max-width: 480px)': {
        marginBottom: '2rem',
      },
    },
    '.intro, .typed': {
      display: 'block',
      margin: '2rem 0',
    },
    '.typed': {
      '&:before': {
        content: '"> ~ % "',
        color: 'var(--color-primary)',
      },
      '@media(max-width: 480px)': {
        fontSize: 13,
      },
    },
    h1: {
      lineHeight: '100%',
      fontFamily: 'var(--font-secondary)',
      fontSize: 'calc(3.5vw + 3.5vh)',
      fontWeight: 800,
      WebkitMarqueeIncrement: '0vw',
    },
  });
  const styleCtaButtons = css({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1rem',
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
        <div css={styleMainRight} className="animationWrapper">
          <CanvasLoader />
        </div>
      </main>
    </Container>
  );
};

export default Home;
