/**
 * Simple in-memory cache for development environment
 * This reduces Redis requests during local development
 */
class DevCache {
  private cache: Record<string, any> = {};
  private expiry: Record<string, number> = {};
  private defaultTTL = 60 * 1000; // 1 minute default

  get(key: string): any {
    // Check if the value exists and hasn't expired
    if (this.cache[key] !== undefined && this.expiry[key] > Date.now()) {
      return this.cache[key];
    }
    return null;
  }

  set(key: string, value: any, ttl = this.defaultTTL): void {
    this.cache[key] = value;
    this.expiry[key] = Date.now() + ttl;
  }

  has(key: string): boolean {
    return this.cache[key] !== undefined && this.expiry[key] > Date.now();
  }

  delete(key: string): void {
    delete this.cache[key];
    delete this.expiry[key];
  }
}

// Create a singleton instance
const devCache = new DevCache();
export default devCache;
