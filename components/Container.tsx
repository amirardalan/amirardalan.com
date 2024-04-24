import { FC, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTheme, Theme } from '@emotion/react';
import Footer from '@/components/Footer';
import { metadata } from '@/data/metadata';
import { css } from '@emotion/react';

type ContainerProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string | null;
  type?: string;
  robots?: string;
  date?: string;
  meta?: object;
};

const Container: FC<ContainerProps> = (props) => {
  const theme: Theme = useTheme();

  const styleWrapper = css({
    paddingTop: '1rem',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '93vh',
    '.container': {
      flex: 1,
    },
    '@media (max-width: 768px)': {
      paddingTop: 0,
    },
  });

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: metadata.title,
    description: metadata.description,
    type: 'website',
    robots: 'follow, index',
    ...customMeta,
  };

  // OG Image

  // Remove emdash and hyphen because I use them in my meta titles
  // but don't want them to display in OG images
  const ogTitle = meta.title.replace(/[\u2013\u2014].*$/, '');
  // Replace apostrophes with smart apostrophes so they are parsed correctly
  const ogDescription = meta.description.replace(/\u0027/g, '\u2019');

  const encodedOgImage = `${
    process.env.NEXT_PUBLIC_SITE_URL
  }/api/og?title=${encodeURIComponent(
    ogTitle
  )}&description=${encodeURIComponent(ogDescription)}`;
  const ogImage = meta.image ? meta.image : encodedOgImage;

  // Dynamic (light and dark mode) Favicon
  const [faviconTheme, setFaviconTheme] = useState(theme.active);
  const favicon =
    faviconTheme === 'dark' ? '/favicon-dark.png' : '/favicon-light.png';
  useEffect(() => {
    const usesDarkMode =
      window.matchMedia('(prefers-color-scheme: dark)').matches || false;

    function switchIcon(usesDarkMode: boolean) {
      if (usesDarkMode) {
        setFaviconTheme('dark');
      } else {
        setFaviconTheme('light');
      }
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => switchIcon(e.matches));
    switchIcon(usesDarkMode);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', (e) => switchIcon(e.matches));
    };
  }, [favicon]);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`}
        />
        <link rel="icon" href={favicon} />
        <meta name="robots" content={meta.robots} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={metadata.name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta name="description" content={meta.description} />
        <meta name="thumbnail" property="og:image" content={ogImage} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={metadata.xHandle} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image:alt" content={meta.title} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>

      <div css={styleWrapper}>
        <div className="container">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Container;
