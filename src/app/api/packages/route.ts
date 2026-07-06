import { NextRequest } from "next/server";
import { ok, err } from "@/lib/api-helpers";
import { insurancePackages } from "@/data/packages";
import { addOns } from "@/data/addons";

/** GET /api/packages — list all packages, optionally filtered by occupation */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const occupation = url.searchParams.get("occupation");
  const id = url.searchParams.get("id");

  if (id) {
    const pkg = insurancePackages.find((p) => p.id === id);
    if (!pkg) return err("Package not found", 404);
    return ok({ package: pkg });
  }

  const filtered = occupation
    ? insurancePackages.filter((p) => p.occupation === occupation)
    : insurancePackages;

  return ok({ packages: filtered, total: filtered.length });
}
