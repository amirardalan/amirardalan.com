import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // If url starts with baseUrl, it's a relative URL, so we can return it directly
      if (url.startsWith(baseUrl)) return url;
      // Otherwise, make sure we only redirect to relative URLs for security
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Fall back to the default behavior which is to go to the homepage
      return baseUrl;
    },
  },
});
