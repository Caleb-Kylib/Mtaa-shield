import { NextRequest } from "next/server";
import { ok, err, requireAuth } from "@/lib/api-helpers";
import { claims, policies, generateId, claimReference, ensureSeeded, type DBClaim } from "@/lib/db";
import type { OccupationType } from "@/types";

/** GET /api/claims — list all claims for the authenticated user */
export async function GET(req: NextRequest) {
  ensureSeeded();
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  const userClaims = claims.get(auth.payload.sub) ?? [];
  const sorted = [...userClaims].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return ok({ claims: sorted, total: sorted.length });
}

/** POST /api/claims — submit a new claim */
export async function POST(req: NextRequest) {
  ensureSeeded();
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  try {
    const { policyId, claimType, occupation, description, evidenceUrls = [] } = await req.json();

    if (!claimType || !occupation) {
      return err("claimType and occupation are required");
    }

    // Verify the user has an active policy (if policyId provided)
    if (policyId) {
      const userPolicies = policies.get(auth.payload.sub) ?? [];
      const policy = userPolicies.find((p) => p.id === policyId);
      if (!policy) return err("Policy not found", 404);
      if (policy.status !== "active") return err("Only active policies can make claims");
    }

    const now = new Date().toISOString();
    const newClaim: DBClaim = {
      id: generateId("clm"),
      userId: auth.payload.sub,
      policyId: policyId ?? "",
      claimType,
      occupation: occupation as OccupationType,
      description: description ?? "",
      evidenceUrls,
      status: "submitted",
      reference: claimReference(),
      submittedAt: now,
      updatedAt: now,
    };

    const existing = claims.get(auth.payload.sub) ?? [];
    claims.set(auth.payload.sub, [newClaim, ...existing]);

    return ok(
      {
        claim: newClaim,
        message: "Claim submitted successfully. You will receive an SMS update within 48 hours.",
      },
      201
    );
  } catch {
    return err("Internal server error", 500);
  }
}
