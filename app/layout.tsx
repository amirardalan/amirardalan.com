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

import { Inter, Prata, JetBrains_Mono } from 'next/font/google';
import { ToastProvider } from '@/components/ui/ToastContext';

const sans = Inter({
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
          className={clsx('font-sans', 'grid h-screen grid-rows-layout', {
            'bg-light': theme === 'light',
            'dark:bg-dark': theme === 'dark',
          })}
        >
          <ToastProvider>
            <div className="flex min-h-screen flex-col px-4 pt-4 lg:px-8 lg:pt-8">
              <Header />
              <div className="container mx-auto max-w-[768px] flex-grow overflow-auto overflow-x-hidden px-4 py-8">
                {children}
              </div>
              <Footer />
            </div>
          </ToastProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
