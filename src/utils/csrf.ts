const CSRF_SECRET = process.env.CSRF_SECRET;
if (!CSRF_SECRET) {
  throw new Error('CSRF_SECRET environment variable is not set.');
}

const CSRF_SECRET_STR: string = CSRF_SECRET;

async function generateHash(key: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    encoder.encode(data)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function generateCsrfToken(): Promise<string> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const token = Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const timestamp = Date.now();
  const data = `${token}:${timestamp}`;
  const hash = await generateHash(CSRF_SECRET_STR, data);
  return `${data}:${hash}`;
}

function isTokenExpired(timestamp: number, maxAgeMs: number): boolean {
  return Date.now() - timestamp > maxAgeMs;
}

function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function validateCsrfToken(token: string): Promise<boolean> {
  try {
    const [rawToken, timestampStr, hash] = token.split(':');
    if (!rawToken || !timestampStr || !hash) return false;

    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp) || isTokenExpired(timestamp, 3600000)) {
      // 1 hour expiry
      console.warn('CSRF token expired or invalid timestamp.');
      return false;
    }

    const expectedHash = await generateHash(
      CSRF_SECRET_STR,
      `${rawToken}:${timestamp}`
    );
    if (!constantTimeCompare(hash, expectedHash)) {
      console.warn('CSRF token hash mismatch.');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error validating CSRF token:', error);
    return false;
  }
}
