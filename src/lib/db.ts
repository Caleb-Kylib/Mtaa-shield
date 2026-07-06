/**
 * In-memory mock database.
 * Replace each store with real DB calls (Prisma, Supabase, etc.) in production.
 *
 * Stores are module-level Maps so they persist across API route calls
 * within a single server process (dev mode). In production use a real DB.
 */

import type { OccupationType } from "@/types";

// ── User ──────────────────────────────────────────────────────────────────────
export interface DBUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  county: string;
  occupation: OccupationType;
  passwordHash: string;   // bcrypt hash in production; plain for mock
  createdAt: string;
}

// ── Policy ────────────────────────────────────────────────────────────────────
export interface DBPolicy {
  id: string;
  userId: string;
  packageId: string;
  packageName: string;
  frequency: "weekly" | "monthly" | "quarterly";
  premium: number;
  status: "active" | "expired" | "cancelled" | "pending";
  startDate: string;
  endDate: string;
  policyNumber: string;
  coverageAmount: string;
  addOns: string[];
  createdAt: string;
}

// ── Payment ───────────────────────────────────────────────────────────────────
export interface DBPayment {
  id: string;
  userId: string;
  policyId: string;
  amount: number;
  method: "mpesa" | "card" | "bank";
  mpesaRef?: string;
  status: "success" | "pending" | "failed";
  date: string;
}

// ── Claim ─────────────────────────────────────────────────────────────────────
export interface DBClaim {
  id: string;
  userId: string;
  policyId: string;
  claimType: string;
  occupation: OccupationType;
  description: string;
  evidenceUrls: string[];
  status: "submitted" | "under_review" | "approved" | "rejected" | "paid";
  reference: string;
  submittedAt: string;
  updatedAt: string;
  payoutAmount?: number;
}

// ── Notification ──────────────────────────────────────────────────────────────
export interface DBNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "payment" | "claim" | "policy" | "promo" | "system";
  read: boolean;
  createdAt: string;
}

// ── In-memory stores ──────────────────────────────────────────────────────────
export const users = new Map<string, DBUser>();           // key: email
export const usersById = new Map<string, DBUser>();       // key: id
export const policies = new Map<string, DBPolicy[]>();   // key: userId
export const payments = new Map<string, DBPayment[]>();  // key: userId
export const claims = new Map<string, DBClaim[]>();      // key: userId
export const notifications = new Map<string, DBNotification[]>(); // key: userId

// ── Seed data (demo user) ─────────────────────────────────────────────────────
function seedDemoUser() {
  const demoId = "user-demo-001";
  const demoUser: DBUser = {
    id: demoId,
    name: "James Omondi",
    email: "demo@mtaashield.co.ke",
    phone: "0712345678",
    county: "Nairobi",
    occupation: "boda-rider",
    passwordHash: "Demo1234!",   // plain text for mock
    createdAt: "2026-01-15T08:00:00Z",
  };
  users.set(demoUser.email, demoUser);
  usersById.set(demoId, demoUser);

  const demoPolicy: DBPolicy = {
    id: "pol-001",
    userId: demoId,
    packageId: "rider-plus",
    packageName: "Rider Plus",
    frequency: "weekly",
    premium: 250,
    status: "active",
    startDate: "2026-06-10",
    endDate: "2026-07-08",
    policyNumber: "MS-2026-00412",
    coverageAmount: "Up to KES 500,000",
    addOns: ["hospital-cash"],
    createdAt: "2026-06-10T08:00:00Z",
  };
  policies.set(demoId, [demoPolicy]);

  const demoPayments: DBPayment[] = [
    { id: "pay-001", userId: demoId, policyId: "pol-001", amount: 250, method: "mpesa", mpesaRef: "QHJ82930AL", status: "success", date: "2026-06-24T09:12:00Z" },
    { id: "pay-002", userId: demoId, policyId: "pol-001", amount: 250, method: "mpesa", mpesaRef: "QHJ72831BM", status: "success", date: "2026-06-17T09:05:00Z" },
    { id: "pay-003", userId: demoId, policyId: "pol-001", amount: 250, method: "mpesa", mpesaRef: "QHJ62730CN", status: "success", date: "2026-06-10T08:55:00Z" },
  ];
  payments.set(demoId, demoPayments);

  const demoNotifications: DBNotification[] = [
    { id: "notif-001", userId: demoId, title: "Payment Received", message: "Your KES 250 weekly premium has been received via M-Pesa.", type: "payment", read: false, createdAt: "2026-06-24T09:12:00Z" },
    { id: "notif-002", userId: demoId, title: "Policy Renewed", message: "Your Rider Plus policy has been renewed until Jul 8, 2026.", type: "policy", read: false, createdAt: "2026-06-24T09:12:00Z" },
    { id: "notif-003", userId: demoId, title: "No-Claim Discount", message: "Congrats! You qualify for a 5% loyalty discount on your next renewal.", type: "promo", read: true, createdAt: "2026-06-20T10:00:00Z" },
  ];
  notifications.set(demoId, demoNotifications);
}

// Run seed once at module load
let seeded = false;
export function ensureSeeded() {
  if (!seeded) {
    seedDemoUser();
    seeded = true;
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
export function generateId(prefix = "id"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function claimReference(): string {
  return `CLM-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`;
}
