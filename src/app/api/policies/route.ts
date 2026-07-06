import { NextRequest } from "next/server";
import { ok, err, requireAuth } from "@/lib/api-helpers";
import { policies, payments, generateId, ensureSeeded, type DBPolicy } from "@/lib/db";
import { insurancePackages } from "@/data/packages";

/** GET /api/policies — get all policies for the authenticated user */
export async function GET(req: NextRequest) {
  ensureSeeded();
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  const userPolicies = policies.get(auth.payload.sub) ?? [];
  return ok({ policies: userPolicies });
}

/** POST /api/policies — purchase a new policy */
export async function POST(req: NextRequest) {
  ensureSeeded();
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  try {
    const { packageId, frequency, addOns = [] } = await req.json();

    if (!packageId || !frequency) return err("packageId and frequency are required");

    const pkg = insurancePackages.find((p) => p.id === packageId);
    if (!pkg) return err("Package not found", 404);

    const freqMap: Record<string, number> = {
      weekly: pkg.weeklyPrice,
      monthly: pkg.monthlyPrice,
      quarterly: pkg.quarterlyPrice,
    };
    const premium = freqMap[frequency];
    if (!premium) return err("Invalid frequency — use weekly, monthly, or quarterly");

    const now = new Date();
    const endDate = new Date(now);
    if (frequency === "weekly") endDate.setDate(endDate.getDate() + 7);
    else if (frequency === "monthly") endDate.setMonth(endDate.getMonth() + 1);
    else endDate.setMonth(endDate.getMonth() + 3);

    // Generate policy number
    const policyNumber = `MS-${now.getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`;

    const newPolicy: DBPolicy = {
      id: generateId("pol"),
      userId: auth.payload.sub,
      packageId,
      packageName: pkg.name,
      frequency,
      premium,
      status: "active",
      startDate: now.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      policyNumber,
      coverageAmount: pkg.coverageAmount,
      addOns,
      createdAt: now.toISOString(),
    };

    const existing = policies.get(auth.payload.sub) ?? [];
    policies.set(auth.payload.sub, [...existing, newPolicy]);

    // Record payment
    const userPayments = payments.get(auth.payload.sub) ?? [];
    payments.set(auth.payload.sub, [
      {
        id: generateId("pay"),
        userId: auth.payload.sub,
        policyId: newPolicy.id,
        amount: premium,
        method: "mpesa",
        mpesaRef: `QH${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
        status: "success",
        date: now.toISOString(),
      },
      ...userPayments,
    ]);

    return ok({ policy: newPolicy, message: "Policy activated successfully" }, 201);
  } catch {
    return err("Internal server error", 500);
  }
}
