import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull(),
  emailVerified: timestamp('email_verified'),
});

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  provider: varchar('provider', { length: 256 }).notNull(),
  providerAccountId: varchar('provider_account_id', { length: 256 }).notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: varchar('token_type', { length: 256 }),
  idToken: text('id_token'),
  sessionState: text('session_state'),
  oauthTokenSecret: text('oauth_token_secret'),
  oauthToken: text('oauth_token'),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  authorId: integer('author_id').notNull(),
  title: text('title').notNull(),
  content: text('content'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at'),
  showUpdated: boolean('show_updated'),
  category: varchar('category', { length: 256 }),
  excerpt: text('excerpt'),
  featured: boolean('featured'),
  likes: integer('likes'),
  published: boolean('published'),
  slug: varchar('slug', { length: 256 }),
});
