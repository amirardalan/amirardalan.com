// Reduce Redis requests during local development

class DevCache {
  private cache: Record<string, any> = {};
  private expiry: Record<string, number> = {};
  private defaultTTL = 60 * 1000; // 1 minute
  private useCache = false;

  get(key: string) {
    if (!this.useCache) {
      return null;
    }
    if (this.cache[key] !== undefined && this.expiry[key] > Date.now()) {
      return this.cache[key];
    }
    return null;
  }

  set(key: string, value: {}, ttl = this.defaultTTL): void {
    if (!this.useCache) {
      return;
    }

    this.cache[key] = value;
    this.expiry[key] = Date.now() + ttl;
  }

  has(key: string): boolean {
    if (!this.useCache) {
      return false;
    }

    return this.cache[key] !== undefined && this.expiry[key] > Date.now();
  }

  delete(key: string): void {
    delete this.cache[key];
    delete this.expiry[key];
  }

  setUseCache(enabled: boolean): void {
    this.useCache = enabled;
  }

  isEnabled(): boolean {
    return this.useCache;
  }
}

const devCache = new DevCache();
export default devCache;
