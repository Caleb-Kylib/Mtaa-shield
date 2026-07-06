import { NextRequest } from "next/server";
import { ok, err, requireAuth } from "@/lib/api-helpers";
import { notifications, ensureSeeded } from "@/lib/db";

/** GET /api/notifications — list notifications for authenticated user */
export async function GET(req: NextRequest) {
  ensureSeeded();
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  const userNotifs = notifications.get(auth.payload.sub) ?? [];
  const unreadCount = userNotifs.filter((n) => !n.read).length;

  return ok({ notifications: userNotifs, unreadCount });
}

/** PATCH /api/notifications — mark all as read */
export async function PATCH(req: NextRequest) {
  ensureSeeded();
  const auth = await requireAuth(req);
  if ("status" in auth) return auth;

  const userNotifs = notifications.get(auth.payload.sub) ?? [];
  const updated = userNotifs.map((n) => ({ ...n, read: true }));
  notifications.set(auth.payload.sub, updated);

  return ok({ message: "All notifications marked as read" });
}
