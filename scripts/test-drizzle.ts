import { db } from '@/db';

async function testDrizzle() {
  try {
    const result = await db.execute('SELECT 1 AS result');
    console.log('Drizzle Test Result:', result.rows);
  } catch (error) {
    console.error('Error testing Drizzle:', error);
  }
}

testDrizzle();
