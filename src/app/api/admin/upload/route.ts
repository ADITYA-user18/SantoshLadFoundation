/**
 * POST /api/admin/upload
 * Accepts a multipart file upload and stores it on Cloudinary.
 * Falls back to local /public/uploads/ if Cloudinary is not configured.
 */
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { cloudinary } from "@/lib/cloudinary";

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function sanitizeFilename(name: string): string {
  const ext = name.split(".").pop() ?? "jpg";
  const base = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  return `${base}-${Date.now()}.${ext}`;
}

/** Upload a Buffer to Cloudinary and return the secure URL */
async function uploadToCloudinary(
  buffer: Buffer,
  filename: string,
  mimeType: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "santosh-lad-cms",
        public_id: filename.replace(/\.[^.]+$/, ""), // strip extension — Cloudinary adds it
        resource_type: "image",
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("No result"));
        resolve(result.secure_url);
      },
    );
    uploadStream.end(buffer);
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPEG, PNG, WebP or GIF." },
        { status: 400 },
      );
    }

    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Max 10 MB." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = sanitizeFilename(file.name);

    // ── Cloudinary (production) ───────────────────────────────────────────────
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      const secureUrl = await uploadToCloudinary(buffer, filename, file.type);
      return NextResponse.json({ ok: true, path: secureUrl });
    }

    // ── Fallback: local filesystem (dev without Cloudinary) ───────────────────
    try {
      await mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
      const filepath = path.join(LOCAL_UPLOAD_DIR, filename);
      await writeFile(filepath, buffer);
      return NextResponse.json({ ok: true, path: `/uploads/${filename}` });
    } catch (fsErr) {
      console.warn("Filesystem write failed, returning data URL:", fsErr);
      const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
      return NextResponse.json({ ok: true, path: dataUrl });
    }
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
