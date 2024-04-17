import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import GitHubProvider from 'next-auth/providers/github';

const prisma = new PrismaClient()

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_AUTH_SECRET,
};

export default authHandler;
