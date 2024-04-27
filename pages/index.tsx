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
    display: 'flex',
    alignItems: 'end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: '63.75vh',
    paddingBottom: '6rem',
    '@media (max-width: 768px)': {
      paddingBottom: '2rem'
    }
  });
  const styleContent = css({
    padding: '0 4rem',
    zIndex: 3,
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
        marginBottom: '1rem',
      },
    },
    '.typed': {
      fontSize: 26,
      fontWeight: 400,
      overflow: 'hidden',
      margin: '6rem 0 3rem 0',
      '&:before': {
        content: '"> ~ % "',
        color: 'var(--color-primary)',
      },
      '@media(max-width: 768px)': {
        fontSize: 16,
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
        <div css={styleContent}>
          <div className="titleWrapper">
            <div className="typed" aria-hidden="true">
              <TypingAnimation data={home.typed} />
            </div>
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
      </main>
    </Container>
  );
};

export default Home;
