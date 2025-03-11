import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
// import postgres from 'postgres';

// export const sql = postgres(process.env.DATABASE_URL!, {
//   ssl: 'allow',
// });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  // async redirects() {
  //   if (!process.env.DATABASE_URL) {
  //     return [];
  //   }

  //   let redirects = await sql`
  //     SELECT source, destination, permanent
  //     FROM redirects;
  //   `;

  //   return redirects.map(({ source, destination, permanent }) => ({
  //     source,
  //     destination,
  //     permanent: !!permanent,
  //   }));
  // },
  // Note: Using the Rust compiler means we cannot use
  // rehype or remark plugins. For my app, this is fine.
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
