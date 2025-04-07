import { randomBytes, timingSafeEqual } from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || 'default_secret_key';

export function generateCsrfToken() {
  if (!CSRF_SECRET) {
    throw new Error('CSRF_SECRET environment variable is not set.');
  }
  return randomBytes(32).toString('hex');
}

export function validateCsrfToken(
  clientToken: string | null,
  serverToken: string | null
) {
  if (!serverToken || !clientToken) {
    throw new Error('Invalid CSRF token');
  }

  const isValid = timingSafeEqual(
    Buffer.from(serverToken),
    Buffer.from(clientToken)
  );

  if (!isValid) {
    throw new Error('Invalid CSRF token');
  }
}
