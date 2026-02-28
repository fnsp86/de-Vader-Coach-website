import crypto from 'crypto';

const PERIOD = 30; // seconds
const DIGITS = 6;

/**
 * Generate a TOTP code for the given secret at the current time.
 * Compatible with Google Authenticator, Authy, etc.
 */
export function generateTOTP(secret: string, time?: number): string {
  const counter = Math.floor((time ?? Date.now() / 1000) / PERIOD);
  const buffer = Buffer.alloc(8);
  buffer.writeUInt32BE(0, 0);
  buffer.writeUInt32BE(counter, 4);

  const key = base32Decode(secret);
  const hmac = crypto.createHmac('sha1', key).update(buffer).digest();

  const offset = hmac[hmac.length - 1] & 0x0f;
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  return String(code % 10 ** DIGITS).padStart(DIGITS, '0');
}

/**
 * Verify a TOTP code. Allows 1 period of drift (30 seconds before/after).
 */
export function verifyTOTP(secret: string, code: string): boolean {
  if (!code || code.length !== DIGITS) return false;
  const now = Date.now() / 1000;

  // Check current period and ±1 period for clock drift
  for (const offset of [-PERIOD, 0, PERIOD]) {
    if (generateTOTP(secret, now + offset) === code) return true;
  }
  return false;
}

/**
 * Generate a new random TOTP secret (base32 encoded, 20 bytes).
 */
export function generateSecret(): string {
  const bytes = crypto.randomBytes(20);
  return base32Encode(bytes);
}

/**
 * Generate an otpauth:// URI for QR code scanning.
 */
export function getTOTPUri(secret: string, account: string, issuer = 'De Vadercoach'): string {
  return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&digits=${DIGITS}&period=${PERIOD}`;
}

// ── Base32 helpers ───────────────────────────────────────────────────────────

const B32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Encode(buffer: Buffer): string {
  let bits = 0;
  let value = 0;
  let result = '';

  for (const byte of buffer) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      result += B32_CHARS[(value >>> bits) & 0x1f];
    }
  }
  if (bits > 0) {
    result += B32_CHARS[(value << (5 - bits)) & 0x1f];
  }
  return result;
}

function base32Decode(encoded: string): Buffer {
  const cleaned = encoded.toUpperCase().replace(/[^A-Z2-7]/g, '');
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (const char of cleaned) {
    const idx = B32_CHARS.indexOf(char);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((value >>> bits) & 0xff);
    }
  }
  return Buffer.from(bytes);
}
