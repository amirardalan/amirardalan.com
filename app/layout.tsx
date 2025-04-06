import { Metadata } from 'next';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

import clsx from 'clsx';
import './globals.css';
import { getTheme } from '@/utils/get-theme';

import { Jura, Prata, JetBrains_Mono } from 'next/font/google';
import DarkIcon from '@/public/images/favicon-dark.png';
import LightIcon from '@/public/images/favicon-light.png';

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { AuthProvider } from '@/components/auth/AuthProvider';

const sans = Jura({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});
const serif = Prata({
  subsets: ['latin'],
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

  let title = '';
  if (pathname === '/') {
    title = 'Amir Ardalan — Fullstack Engineer & UI/UX Designer';
  } else if (pathname.startsWith('/blog/')) {
    const slug = pathname.split('/blog/')[1];
    title = `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} — Amir Ardalan`;
  } else {
    title = `${pathname.slice(1).charAt(0).toUpperCase()}${pathname.slice(2)} — Amir Ardalan`;
  }

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title,
    description: 'The portfolio and blog of Engineer and Designer Amir Ardalan',
    icons: [
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
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();
  const session = await auth();

  return (
    <AuthProvider session={session}>
      <html
        lang="en"
        className={clsx(sans.className, serif.className, mono.className, theme)}
      >
        <body
          className={clsx('font-sans font-medium', {
            'bg-light': theme === 'light',
            'dark:bg-dark': theme === 'dark',
          })}
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-1 flex-grow">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
