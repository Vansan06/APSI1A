import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  // Canonical format used for all newly-created accounts.
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  if (typeof password !== "string" || typeof stored !== "string") return false;

  let salt = "";
  let expectedHex = "";

  // Legacy/current app format: <salt>:<hash>
  if (stored.includes(":")) {
    const splitAt = stored.indexOf(":");
    salt = stored.slice(0, splitAt);
    expectedHex = stored.slice(splitAt + 1);
  } else {
    // Compatibility with the earlier database seed package:
    // scrypt$<salt>$<hash>
    const [scheme, legacySalt, legacyHash] = stored.split("$");
    if (scheme !== "scrypt" || !legacySalt || !legacyHash) return false;
    salt = legacySalt;
    expectedHex = legacyHash;
  }

  if (!salt || !/^[0-9a-f]+$/i.test(expectedHex) || expectedHex.length % 2 !== 0) {
    return false;
  }

  try {
    const expected = Buffer.from(expectedHex, "hex");
    if (expected.length !== KEY_LENGTH) return false;
    const actual = scryptSync(password, salt, expected.length);
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
