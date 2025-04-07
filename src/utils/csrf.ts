const CSRF_SECRET = process.env.CSRF_SECRET || 'default-secret';

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
  const hash = await generateHash(CSRF_SECRET, token);
  return `${token}:${hash}`;
}

export async function validateCsrfToken(token: string): Promise<boolean> {
  const [rawToken, hash] = token.split(':');
  if (!rawToken || !hash) return false;

  const expectedHash = await generateHash(CSRF_SECRET, rawToken);
  return hash === expectedHash;
}
