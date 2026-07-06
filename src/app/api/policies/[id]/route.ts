import { NextRequest } from "next/server";
import { ok, err, requireAuth } from "@/lib/api-helpers";
import { policies, ensureSeeded } from "@/lib/db";

/** GET /api/policies/:id — get a single policy */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  ensureSeeded();
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  const userPolicies = policies.get(auth.payload.sub) ?? [];
  const policy = userPolicies.find((p) => p.id === params.id);
  if (!policy) return err("Policy not found", 404);

  return ok({ policy });
}

/** PATCH /api/policies/:id — cancel or update a policy */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  ensureSeeded();
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  try {
    const body = await req.json();
    const userPolicies = policies.get(auth.payload.sub) ?? [];
    const idx = userPolicies.findIndex((p) => p.id === params.id);
    if (idx === -1) return err("Policy not found", 404);

    // Only allow status changes to cancelled
    if (body.status === "cancelled") {
      userPolicies[idx] = { ...userPolicies[idx], status: "cancelled" };
      policies.set(auth.payload.sub, userPolicies);
      return ok({ message: "Policy cancelled", policy: userPolicies[idx] });
    }

    return err("Only cancellation is supported via this endpoint");
  } catch {
    return err("Invalid request body");
  }
}
