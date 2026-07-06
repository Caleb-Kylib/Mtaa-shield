import { NextRequest } from "next/server";
import { ok, err } from "@/lib/api-helpers";
import { insurancePackages } from "@/data/packages";
import { addOns } from "@/data/addons";
import type { OccupationType } from "@/types";

interface RecommendRequest {
  occupation: OccupationType;
  incomeFrequency: "daily" | "weekly" | "monthly";
  county: string;
  monthlyBudget: number;
  hasAssets?: boolean;
  hasFamily?: boolean;
}

/** POST /api/ai/recommend — generate a package recommendation from wizard inputs */
export async function POST(req: NextRequest) {
  try {
    const body: RecommendRequest = await req.json();
    const { occupation, incomeFrequency, monthlyBudget, hasFamily, hasAssets } = body;

    if (!occupation || !monthlyBudget) {
      return err("occupation and monthlyBudget are required");
    }

    const occPackages = insurancePackages.filter((p) => p.occupation === occupation);
    if (!occPackages.length) return err("No packages found for this occupation", 404);

    // Budget: use 5% of monthly income as affordable premium
    const affordableMonthly = monthlyBudget * 0.05;

    // Pick the best affordable package, preferring "plus" tier
    let recommended = occPackages.find(
      (p) => p.tier === "plus" && p.monthlyPrice <= affordableMonthly
    );
    if (!recommended) {
      recommended = occPackages.find(
        (p) => p.tier === "basic" && p.monthlyPrice <= affordableMonthly
      );
    }
    if (!recommended) {
      recommended = occPackages[0]; // fallback to cheapest
    }

    // Confidence score: higher if budget comfortably covers the plan
    const affordabilityRatio = affordableMonthly / recommended.monthlyPrice;
    const confidence = Math.min(98, Math.round(70 + affordabilityRatio * 15));

    // Suggest add-ons based on profile
    const suggestedAddOns = addOns.filter((a) => {
      if (a.id === "family-cover" && hasFamily) return true;
      if (a.id === "tool-protection" && (occupation === "construction-worker" || occupation === "farmer")) return true;
      if (a.id === "hospital-cash") return true;
      if (a.id === "income-protection" && incomeFrequency === "daily") return true;
      return false;
    });

    return ok({
      recommendedPackage: recommended,
      confidence,
      suggestedAddOns,
      reasoning: `Based on your occupation as a ${occupation.replace("-", " ")} and a monthly budget of KES ${monthlyBudget.toLocaleString()}, ${recommended.name} gives you the best value at KES ${recommended.monthlyPrice}/month.`,
    });
  } catch {
    return err("Internal server error", 500);
  }
}
