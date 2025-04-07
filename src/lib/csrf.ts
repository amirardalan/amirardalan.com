import { randomBytes, timingSafeEqual } from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || 'default_secret_key';

// Generate a CSRF token using the Web Crypto API
export async function generateCsrfToken(): Promise<string> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
    ''
  );
}

// Validate the CSRF token using a timing-safe comparison
export function validateCsrfToken(
  clientToken: string | null,
  serverToken: string | null
): void {
  if (!serverToken || !clientToken) {
    throw new Error('CSRF token is missing.');
  }

  const clientBuffer = new TextEncoder().encode(clientToken);
  const serverBuffer = new TextEncoder().encode(serverToken);

  if (clientBuffer.length !== serverBuffer.length) {
    throw new Error('CSRF token is invalid.');
  }

  let isValid = true;
  for (let i = 0; i < clientBuffer.length; i++) {
    isValid = isValid && clientBuffer[i] === serverBuffer[i];
  }

  if (!isValid) {
    throw new Error('CSRF token is invalid.');
  }
}
