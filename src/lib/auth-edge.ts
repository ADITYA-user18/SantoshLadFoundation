/**
 * auth-edge.ts — Edge Runtime compatible auth (used ONLY in middleware.ts).
 * Verifies JWT using WebCrypto (no Node.js crypto / jsonwebtoken).
 * Cookie name updated to slad_jwt_token to match new auth.ts.
 */

const SESSION_COOKIE = "slad_jwt_token";
const JWT_SECRET = process.env.JWT_SECRET ?? "santosh-lad-jwt-fallback-secret-2024";

function base64urlToUint8Array(base64url: string): Uint8Array {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  return new Uint8Array([...binary].map((c) => c.charCodeAt(0)));
}

async function getKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
}

export async function verifyTokenEdge(token: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [headerB64, payloadB64, sigB64] = parts;

    // Verify signature
    const key = await getKey();
    const enc = new TextEncoder();
    const sigBytes = base64urlToUint8Array(sigB64);
    const sigBuffer = sigBytes.buffer.slice(
      sigBytes.byteOffset,
      sigBytes.byteOffset + sigBytes.byteLength,
    ) as ArrayBuffer;

    const dataBuffer = enc.encode(`${headerB64}.${payloadB64}`).buffer.slice(0) as ArrayBuffer;

    const valid = await crypto.subtle.verify("HMAC", key, sigBuffer, dataBuffer);
    if (!valid) return false;

    // Check expiry
    const payloadJson = JSON.parse(
      new TextDecoder().decode(base64urlToUint8Array(payloadB64)),
    ) as { exp?: number };
    if (payloadJson.exp && Date.now() / 1000 > payloadJson.exp) return false;

    return true;
  } catch {
    return false;
  }
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}
