import { Metadata } from 'next';
import { headers } from 'next/headers';
import { SessionProvider } from 'next-auth/react';

import { getTheme } from '@/app/utils/get-theme';
import clsx from 'clsx';
import '@/app/globals.css';

import DarkIcon from '@/public/images/favicon-dark.png';
import LightIcon from '@/public/images/favicon-light.png';

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

import { Jura, Prata, JetBrains_Mono } from 'next/font/google';

const sans = Jura({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});
const serif = Prata({
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const pathname = (await headers()).get('x-next-pathname') as string;
  const title =
    pathname === '/'
      ? ''
      : `• ${pathname.slice(1).charAt(0).toUpperCase()}${pathname.slice(2)}`;

  return {
    title: `amir.sh ${title}`,
    description: 'The portfolio and blog of Engineer and Designer Amir Ardalan',
    icons: {
      icon: [
        {
          rel: 'icon',
          media: '(prefers-color-scheme: light)',
          type: 'image/png',
          url: LightIcon.src,
        },
        {
          rel: 'icon',
          media: '(prefers-color-scheme: dark)',
          type: 'image/png',
          url: DarkIcon.src,
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();

  return (
    <SessionProvider>
      <html
        lang="en"
        className={clsx(sans.className, serif.className, mono.className, theme)}
      >
        <body
          className={clsx(
            'font-sans font-medium',
            'grid h-screen grid-rows-layout',
            {
              'bg-light': theme === 'light',
              'dark:bg-dark': theme === 'dark',
            }
          )}
        >
          <div className="flex min-h-screen flex-col px-6 pt-4 lg:px-10 lg:pt-8">
            <Header />
            <div className="h-screen">{children}</div>
            <Footer />
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
