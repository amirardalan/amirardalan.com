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
  name: text('name'),
  email: varchar('email', { length: 256 }).notNull(),
  email_verified: timestamp('email_verified'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  provider: varchar('provider', { length: 256 }).notNull(),
  provider_account_id: varchar('provider_account_id', {
    length: 256,
  }).notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: timestamp('expires_at'),
  token_type: text('token_type'),
  idToken: text('id_token'),
  session_state: text('session_state'),
  oauth_token_secret: text('oauth_token_secret'),
  oauth_token: text('oauth_token'),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  author_id: integer('author_id').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
  show_updated: boolean('show_updated'),
  category: text('category'),
  excerpt: text('excerpt'),
  featured: boolean('featured'),
  likes: integer('likes'),
  published: boolean('published'),
  slug: varchar('slug', { length: 256 }).notNull(),
});
