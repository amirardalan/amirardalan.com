import { Metadata } from 'next';
import { headers } from 'next/headers';
import { SessionProvider } from 'next-auth/react';

import { getTheme } from '@/app/utils/get-theme';
import clsx from 'clsx';
import '@/app/globals.css';

import DarkIcon from '@/public/images/favicon-dark.png';
import LightIcon from '@/public/images/favicon-light.png';

import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

import { Inter, JetBrains_Mono, DM_Serif_Text } from 'next/font/google';

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
});
const serif = DM_Serif_Text({
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
    description:
      'A Next.js App Router starter project with TypeScript, Tailwind, NextAuth, Prettier, and Dark Mode.',
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
          className={clsx('font-sans', 'grid h-screen grid-rows-layout', {
            'bg-light': theme === 'light',
            'dark:bg-dark': theme === 'dark',
          })}
        >
          <div className="flex min-h-screen flex-col p-4 lg:p-8">
            <Header />
            <div className="flex-grow overflow-auto">{children}</div>
            <Footer />
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
