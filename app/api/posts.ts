import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/connector';
import { posts } from '@/app/db/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const {
        title,
        slug,
        excerpt,
        content,
        category,
        author_id,
        published,
        created_at,
        updated_at,
      } = req.body;

      // Debugging: Log the incoming payload
      console.log('Incoming Payload:', req.body);

      // Insert the post into the database
      const result = await db.insert(posts).values({
        title,
        slug,
        excerpt,
        content,
        category,
        author_id, // Ensure this matches the schema
        published,
        created_at: new Date(created_at), // Convert to Date object if necessary
        updated_at: new Date(updated_at), // Convert to Date object if necessary
      });

      // Debugging: Log the database result
      console.log('Database Insert Result:', result);

      res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
