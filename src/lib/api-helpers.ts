import { NextRequest, NextResponse } from "next/server";
import { verifyToken, type JWTPayload } from "@/lib/jwt";
import { usersById, ensureSeeded } from "@/lib/db";

/** Standard success response */
export function ok<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

/** Standard error response */
export function err(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/** Extract and verify the Bearer token from Authorization header.
 *  Returns the decoded payload or null. */
export async function getAuthPayload(req: NextRequest): Promise<JWTPayload | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  return verifyToken(token);
}

/** Guard: require a valid token. Returns user payload or an error Response. */
export async function requireAuth(
  req: NextRequest
): Promise<{ payload: JWTPayload } | NextResponse> {
  ensureSeeded();
  const payload = await getAuthPayload(req);
  if (!payload) return err("Unauthorized — please sign in", 401);
  return { payload };
}

/** Simple password check (mock — replace with bcrypt.compare in production) */
export function checkPassword(plain: string, hash: string): boolean {
  return plain === hash;
}

/** Hash password (mock — replace with bcrypt.hash in production) */
export function hashPassword(plain: string): string {
  // In production: return await bcrypt.hash(plain, 10)
  return plain;
}
