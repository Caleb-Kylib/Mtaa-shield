import { NextRequest } from "next/server";
import { ok, err, requireAuth } from "@/lib/api-helpers";
import { usersById } from "@/lib/db";

/** GET /api/auth/me — validate token and return fresh user profile */
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  const user = usersById.get(auth.payload.sub);
  if (!user) return err("User not found", 404);

  return ok({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    county: user.county,
    occupation: user.occupation,
    joinedAt: user.createdAt,
  });
}

/** PATCH /api/auth/me — update profile fields */
export async function PATCH(req: NextRequest) {
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  const user = usersById.get(auth.payload.sub);
  if (!user) return err("User not found", 404);

  try {
    const body = await req.json();
    const allowed = ["name", "phone", "county"] as const;

    for (const key of allowed) {
      if (body[key] !== undefined) {
        (user as Record<string, unknown>)[key] = body[key];
      }
    }

    return ok({ message: "Profile updated", user: { id: user.id, name: user.name, phone: user.phone, county: user.county } });
  } catch {
    return err("Invalid request body");
  }
}
