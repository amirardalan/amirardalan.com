export class MockRedis {
  private store: Record<string, any> = {};

  async get(key: string) {
    return this.store[key] || null;
  }

  async incr(key: string) {
    this.store[key] = (this.store[key] || 0) + 1;
    return this.store[key];
  }

  async set(key: string, value: any) {
    this.store[key] = value;
    return 'OK';
  }
}
