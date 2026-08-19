/**
 * POST /api/admin/seed
 * One-time setup: creates the initial superadmin user in MongoDB.
 * Protected by a SEED_SECRET env var so it can't be abused.
 * Run once after first deploy: POST /api/admin/seed { "secret": "...", "username": "...", "password": "..." }
 */
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db/mongoose";
import { AdminModel } from "@/lib/db/models/Admin";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      secret?: string;
      username?: string;
      password?: string;
    };

    // Require a seed secret to prevent abuse
    const seedSecret = process.env.SEED_SECRET;
    if (!seedSecret || body.secret !== seedSecret) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const username = body.username ?? process.env.ADMIN_USERNAME ?? "superadmin";
    const password = body.password ?? process.env.ADMIN_PASSWORD ?? "admin@123";

    await connectDB();

    const existing = await AdminModel.findOne({ username });
    if (existing) {
      return NextResponse.json({ ok: true, message: "Admin already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await AdminModel.create({ username, passwordHash, role: "superadmin" });

    return NextResponse.json({ ok: true, message: `Admin '${username}' created successfully` });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
