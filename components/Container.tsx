import { FC, ReactNode, useEffect, useState } from 'react';
import { useTheme, Theme } from '@emotion/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from '@/components/Footer';
import { metadata } from '@/data/metadata';

type ContainerProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  robots?: string;
  date?: string;
  meta?: object;
};

const Container: FC<ContainerProps> = (props) => {
  const theme: Theme = useTheme();

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: metadata.title,
    description: metadata.description,
    image: metadata.image,
    type: 'website',
    robots: 'follow, index',
    ...customMeta,
  };

  const metaImage = meta.image ? meta.image : metadata.image;

  const [faviconTheme, setFaviconTheme] = useState(theme.active);

  let favicon = '';

  if (faviconTheme === 'dark') {
    favicon = '/favicon-dark.png';
  } else {
    favicon = '/favicon-light.png';
  }

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
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={metadata.name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta name="description" content={meta.description} />
        <meta property="og:image" content={metaImage} />
        <meta name="thumbnail" property="og:image" content={metaImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={metadata.twitterHandle} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={metaImage} />
        <meta name="twitter:image:alt" content={meta.title} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>

      <div className="container">{children}</div>

      <Footer />
    </>
  );
};

export default Container;
