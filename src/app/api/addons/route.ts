import { NextRequest } from "next/server";
import { ok } from "@/lib/api-helpers";
import { addOns } from "@/data/addons";

/** GET /api/addons — list all available add-ons */
export async function GET(_req: NextRequest) {
  return ok({ addOns, total: addOns.length });
}
