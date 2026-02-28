/**
 * Validate email address format.
 * Checks for basic structure: something@something.something
 * Max 254 characters per RFC 5321.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(email.toLowerCase());
}

/**
 * Sanitize a string for use in email content.
 * Escapes HTML entities to prevent injection.
 */
export function sanitizeForEmail(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
