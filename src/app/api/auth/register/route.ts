import { NextRequest } from "next/server";
import { ok, err, hashPassword } from "@/lib/api-helpers";
import { signToken } from "@/lib/jwt";
import { users, usersById, generateId, ensureSeeded } from "@/lib/db";
import type { DBUser } from "@/lib/db";
import type { OccupationType } from "@/types";

const phoneRegex = /^(?:254|\+254|0)?([71](?:(?:0[0-8])|(?:[12][0-9])|(?:4[0-3])|(?:9[0-9])|(?:5[7-9])|(?:6[8-9])|(?:8[0-9]))[0-9]{6})$/;

export async function POST(req: NextRequest) {
  ensureSeeded();
  try {
    const { name, email, phone, county, occupation, password } = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !county || !occupation || !password) {
      return err("All fields are required");
    }

    // Validate phone
    if (!phoneRegex.test(phone)) {
      return err("Invalid Kenyan phone number");
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check duplicate
    if (users.has(normalizedEmail)) {
      return err("An account with this email already exists", 409);
    }

    const id = generateId("user");
    const newUser: DBUser = {
      id,
      name: name.trim(),
      email: normalizedEmail,
      phone,
      county,
      occupation: occupation as OccupationType,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    users.set(normalizedEmail, newUser);
    usersById.set(id, newUser);

    const token = await signToken({
      sub: id,
      email: normalizedEmail,
      name: newUser.name,
      occupation: newUser.occupation,
    });

    return ok(
      {
        token,
        user: {
          id,
          name: newUser.name,
          email: normalizedEmail,
          phone,
          county,
          occupation,
        },
      },
      201
    );
  } catch {
    return err("Internal server error", 500);
  }
}
