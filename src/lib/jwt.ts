/**
 * Lightweight JWT-compatible token utility using the Web Crypto API.
 * Works in Next.js Edge and Node runtimes without external dependencies.
 */

const SECRET = process.env.JWT_SECRET || "mtaa-shield-dev-secret-2026-change-in-production";
const ALGORITHM = { name: "HMAC", hash: "SHA-256" };
const EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7; // 7 days

function base64url(input: ArrayBuffer | string): string {
  const bytes =
    typeof input === "string"
      ? new TextEncoder().encode(input)
      : new Uint8Array(input);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function decodeBase64url(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return atob(padded);
}

async function getCryptoKey(): Promise<CryptoKey> {
  const keyData = new TextEncoder().encode(SECRET);
  return crypto.subtle.importKey("raw", keyData, ALGORITHM, false, ["sign", "verify"]);
}

export interface JWTPayload {
  sub: string;       // user id
  email: string;
  name: string;
  occupation?: string;
  iat: number;
  exp: number;
}

export async function signToken(payload: Omit<JWTPayload, "iat" | "exp">): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + EXPIRES_IN_SECONDS;
  const fullPayload: JWTPayload = { ...payload, iat, exp };

  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64url(JSON.stringify(fullPayload));
  const signingInput = `${header}.${body}`;

  const key = await getCryptoKey();
  const signature = await crypto.subtle.sign(
    ALGORITHM,
    key,
    new TextEncoder().encode(signingInput)
  );

  return `${signingInput}.${base64url(signature)}`;
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, body, sig] = parts;
    const signingInput = `${header}.${body}`;

    const key = await getCryptoKey();
    const signatureBytes = Uint8Array.from(decodeBase64url(sig), (c) => c.charCodeAt(0));

    const valid = await crypto.subtle.verify(
      ALGORITHM,
      key,
      signatureBytes,
      new TextEncoder().encode(signingInput)
    );
    if (!valid) return null;

    const payload: JWTPayload = JSON.parse(decodeBase64url(body));

    // Check expiry
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}
