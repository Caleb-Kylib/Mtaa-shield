import { NextRequest } from "next/server";
import { ok, err, requireAuth } from "@/lib/api-helpers";
import { payments, policies, generateId, ensureSeeded } from "@/lib/db";

/** GET /api/payments — get payment history for authenticated user */
export async function GET(req: NextRequest) {
  ensureSeeded();
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "10");

  const userPayments = payments.get(auth.payload.sub) ?? [];
  const sorted = [...userPayments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const start = (page - 1) * limit;
  const paginated = sorted.slice(start, start + limit);

  return ok({
    payments: paginated,
    total: sorted.length,
    page,
    totalPages: Math.ceil(sorted.length / limit),
  });
}

/** POST /api/payments/mpesa — initiate M-Pesa STK push (mock) */
export async function POST(req: NextRequest) {
  ensureSeeded();
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  try {
    const { policyId, amount, phone } = await req.json();

    if (!policyId || !amount || !phone) {
      return err("policyId, amount, and phone are required");
    }

    const userPolicies = policies.get(auth.payload.sub) ?? [];
    const policy = userPolicies.find((p) => p.id === policyId);
    if (!policy) return err("Policy not found", 404);

    // Simulate STK push — in production, call Daraja API here
    const checkoutRequestId = `ws_CO_${Date.now()}`;

    // Mock: auto-success after slight delay simulation
    const payment = {
      id: generateId("pay"),
      userId: auth.payload.sub,
      policyId,
      amount,
      method: "mpesa" as const,
      mpesaRef: `QH${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      status: "success" as const,
      date: new Date().toISOString(),
    };

    const existing = payments.get(auth.payload.sub) ?? [];
    payments.set(auth.payload.sub, [payment, ...existing]);

    // Extend policy end date
    const policyIdx = userPolicies.findIndex((p) => p.id === policyId);
    if (policyIdx !== -1) {
      const endDate = new Date(userPolicies[policyIdx].endDate);
      if (policy.frequency === "weekly") endDate.setDate(endDate.getDate() + 7);
      else if (policy.frequency === "monthly") endDate.setMonth(endDate.getMonth() + 1);
      else endDate.setMonth(endDate.getMonth() + 3);
      userPolicies[policyIdx].endDate = endDate.toISOString().split("T")[0];
      userPolicies[policyIdx].status = "active";
      policies.set(auth.payload.sub, userPolicies);
    }

    return ok({
      checkoutRequestId,
      payment,
      message: "M-Pesa payment processed successfully",
    });
  } catch {
    return err("Internal server error", 500);
  }
}
