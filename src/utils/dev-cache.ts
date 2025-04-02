/**
 * Simple in-memory cache for development environment
 * This reduces Redis requests during local development
 */
class DevCache {
  private cache: Record<string, any> = {};
  private expiry: Record<string, number> = {};
  private defaultTTL = 60 * 1000; // 1 minute default
  private useCache = false; // Default: cache is disabled

  get(key: string): any {
    // If cache is disabled, always return null
    if (!this.useCache) {
      return null;
    }

    // Check if the value exists and hasn't expired
    if (this.cache[key] !== undefined && this.expiry[key] > Date.now()) {
      return this.cache[key];
    }
    return null;
  }

  set(key: string, value: any, ttl = this.defaultTTL): void {
    // Skip setting if cache is disabled
    if (!this.useCache) {
      return;
    }

    this.cache[key] = value;
    this.expiry[key] = Date.now() + ttl;
  }

  has(key: string): boolean {
    // If cache is disabled, always return false
    if (!this.useCache) {
      return false;
    }

    return this.cache[key] !== undefined && this.expiry[key] > Date.now();
  }

  delete(key: string): void {
    delete this.cache[key];
    delete this.expiry[key];
  }

  // Method to enable or disable the cache
  setUseCache(enabled: boolean): void {
    this.useCache = enabled;
  }

  // Method to check if cache is currently enabled
  isEnabled(): boolean {
    return this.useCache;
  }
}

// Create a singleton instance
const devCache = new DevCache();
export default devCache;
