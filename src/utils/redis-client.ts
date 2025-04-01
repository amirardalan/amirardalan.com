import { Redis } from '@upstash/redis';
import { getMockRedis, MockRedis } from './mock-redis';

// Cache the Redis client to avoid creating multiple instances
let redisClient: Redis | MockRedis | null = null;

export function getRedisClient() {
  if (redisClient) return redisClient;

  if (process.env.NODE_ENV === 'development') {
    console.log('[Redis] Using mock Redis client for development');
    redisClient = getMockRedis();
    return redisClient;
  }

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    throw new Error('Upstash Redis environment variables are missing.');
  }

  redisClient = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  return redisClient;
}
