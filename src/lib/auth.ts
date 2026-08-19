/**
 * auth.ts — Node.js runtime auth (used in API routes, NOT middleware).
 * - Validates credentials against MongoDB Admin collection
 * - Issues JWT stored in httpOnly cookie
 * - Preserves existing function call signatures so login/logout routes need zero changes
 */
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "./db/mongoose";
import { AdminModel } from "./db/models/Admin";

const JWT_SECRET = process.env.JWT_SECRET ?? "santosh-lad-jwt-fallback-secret-2024";
const SESSION_COOKIE = "slad_jwt_token";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

export interface JWTPayload {
  sub: string; // admin _id
  username: string;
  role: string;
}

// ── Validate credentials against MongoDB (falls back to env vars for first-run) ──
export async function validateCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  try {
    await connectDB();
    const admin = await AdminModel.findOne({ username }).lean();
    if (!admin) {
      // Fallback: allow env-var credentials if no admin exists in DB yet
      const envUser = process.env.ADMIN_USERNAME ?? "superadmin";
      const envPass = process.env.ADMIN_PASSWORD ?? "admin@123";
      return username === envUser && password === envPass;
    }
    return bcrypt.compare(password, admin.passwordHash);
  } catch (err) {
    console.error("validateCredentials error:", err);
    // Fallback to env vars if DB is unreachable
    const envUser = process.env.ADMIN_USERNAME ?? "superadmin";
    const envPass = process.env.ADMIN_PASSWORD ?? "admin@123";
    return username === envUser && password === envPass;
  }
}

// ── Create JWT session (same signature as old createSession) ──
export async function createSession(username = "superadmin"): Promise<void> {
  let role = "superadmin";
  let sub = username;

  try {
    await connectDB();
    const admin = await AdminModel.findOne({ username }).lean();
    if (admin) {
      sub = admin._id.toString();
      role = admin.role;
      // Update last login
      await AdminModel.updateOne({ _id: admin._id }, { lastLogin: new Date() });
    }
  } catch {
    // If DB unreachable, still issue a token
  }

  const token = jwt.sign({ sub, username, role } satisfies JWTPayload, JWT_SECRET, {
    expiresIn: "8h",
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

// ── Destroy JWT session ──
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

// ── Verify session (returns boolean — matches old signature) ──
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// ── Get cookie name (for reference in edge code) ──
export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}
