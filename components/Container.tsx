import type { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from '@/components/Footer';
import { metadata } from '@/data/metadata';

type ContainerProps = {
  title: string;
  description: string;
  children: ReactNode;
  date: Date | null;
  robots: string;
};

const Container: FC<ContainerProps> = (
  props,
  { title, description, date, robots }
) => {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title,
    description,
    image: metadata?.image,
    type: 'website',
    robots,
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content={meta.robots} />

        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`}
        />

        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={metadata.name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />

        <meta name="description" content={meta.description} />
        <meta name="thumbnail" property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={metadata.twitterHandle} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:image:alt" content={meta.title} />
        {date && <meta property="article:published_time" content={date} />}
      </Head>

      <div className="container">{children}</div>

      <Footer />
    </>
  );
};

export default Container;
