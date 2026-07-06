import { NextRequest } from "next/server";
import { ok, err, requireAuth } from "@/lib/api-helpers";
import { claims, ensureSeeded } from "@/lib/db";

/** GET /api/claims/:id — get a single claim */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  ensureSeeded();
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  const userClaims = claims.get(auth.payload.sub) ?? [];
  const claim = userClaims.find((c) => c.id === params.id);
  if (!claim) return err("Claim not found", 404);

  return ok({ claim });
}
