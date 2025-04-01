export class MockRedis {
  private store: Record<string, any> = {};

  async get(key: string) {
    console.log(`[MockRedis] GET ${key}`);
    return this.store[key] || 0;
  }

  async incr(key: string) {
    this.store[key] = (this.store[key] || 0) + 1;
    console.log(`[MockRedis] INCR ${key} -> ${this.store[key]}`);
    return this.store[key];
  }

  async decr(key: string) {
    if (this.store[key] && this.store[key] > 0) {
      this.store[key] -= 1;
    } else {
      this.store[key] = 0;
    }
    console.log(`[MockRedis] DECR ${key} -> ${this.store[key]}`);
    return this.store[key];
  }

  async set(key: string, value: any) {
    this.store[key] = value;
    console.log(`[MockRedis] SET ${key} ${JSON.stringify(value)}`);
    return 'OK';
  }
}

// Create a singleton instance
let mockRedisInstance: MockRedis | null = null;

export function getMockRedis() {
  if (!mockRedisInstance) {
    mockRedisInstance = new MockRedis();
    console.log('[MockRedis] Created new instance');
  }
  return mockRedisInstance;
}
