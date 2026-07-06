import { NextRequest } from "next/server";
import { ok, err, checkPassword } from "@/lib/api-helpers";
import { signToken } from "@/lib/jwt";
import { users, ensureSeeded } from "@/lib/db";

export async function POST(req: NextRequest) {
  ensureSeeded();
  try {
    const { email, password } = await req.json();

    if (!email || !password) return err("Email and password are required");

    const user = users.get(email.toLowerCase().trim());
    if (!user) return err("Invalid credentials", 401);

    if (!checkPassword(password, user.passwordHash)) return err("Invalid credentials", 401);

    const token = await signToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      occupation: user.occupation,
    });

    return ok({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        county: user.county,
        occupation: user.occupation,
      },
    });
  } catch {
    return err("Internal server error", 500);
  }
}
