/**
 * POST /api/admin/seed-posts
 * Seeds all static gallery items into MongoDB as Posts.
 * Protected by SEED_SECRET. Safe to run multiple times.
 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import { PostModel } from "@/lib/db/models/Post";
import { gallery } from "@/data/content";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { secret?: string };
    const seedSecret = process.env.SEED_SECRET;

    if (!seedSecret || body.secret !== seedSecret) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    let created = 0;
    let skipped = 0;

    for (const item of gallery.items) {
      const slug = slugify(item.alt || item.caption || "gallery-item");
      const existing = await PostModel.findOne({ slug });
      if (existing) {
        skipped++;
        continue;
      }
      
      const categoryMap: Record<string, string> = {
        "People": "Labour",
        "Labour": "Labour",
        "Rescue": "Rescue & Relief",
        "Public": "Development",
      };

      await PostModel.create({
        title: item.caption,
        slug: slug + "-" + Math.random().toString(36).substring(7),
        description: item.alt || item.caption,
        contentType: "IMAGE",
        image: item.src,
        category: categoryMap[item.category] || "Events",
        publishedDate: new Date().toISOString(),
        status: "published",
        publishDestination: "GALLERY",
      });
      created++;
    }

    return NextResponse.json({
      ok: true,
      message: `Gallery posts seeded: ${created} created, ${skipped} already existed.`,
      total: gallery.items.length,
    });
  } catch (err) {
    console.error("Posts seed error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
