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

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  author: text('author'),
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
