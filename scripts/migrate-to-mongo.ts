/**
 * scripts/migrate-to-mongo.ts
 * One-time migration: reads all existing JSON files and writes them to MongoDB.
 *
 * Run:  npx tsx scripts/migrate-to-mongo.ts
 *
 * Requires MONGODB_URI to be set in .env.local (or environment).
 */
import "dotenv/config";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not set. Create a .env.local file first.");
  process.exit(1);
}

// ── Inline schemas so this script is self-contained ──────────────────────────
const { Schema, model } = mongoose;

const PostSchema = new Schema({
  title: String, titleKn: String, slug: { type: String, unique: true },
  description: String, descriptionKn: String,
  contentType: String, image: String, imagePosition: String, youtubeUrl: String,
  category: String, tags: [String], publishedDate: String,
  readMoreUrl: String, featured: Boolean,
  status: { type: String, default: "published" },
  publishDestination: { type: String, default: "FEED" },
}, { timestamps: true });

const TimelineSchema = new Schema({
  itemId: { type: String, unique: true },
  year: String, title: String, titleKn: String,
  text: String, textKn: String, image: String,
  imagePosition: String, imagePositionX: String,
  imageZoom: { type: Number, default: 1.0 },
  order: Number,
}, { timestamps: true });

const Post = mongoose.models?.Post ?? model("Post", PostSchema);
const TimelineItem = mongoose.models?.TimelineItem ?? model("TimelineItem", TimelineSchema);

async function migrate() {
  console.log("🔗  Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI!);
  console.log("✅  Connected\n");

  // ── Migrate Posts ──────────────────────────────────────────────────────────
  const postsDir = path.join(process.cwd(), "content", "posts");
  let postFiles: string[] = [];
  try {
    postFiles = (await readdir(postsDir)).filter((f) => f.endsWith(".json"));
  } catch {
    console.warn("⚠️   No content/posts directory found — skipping posts.");
  }

  console.log(`📰  Migrating ${postFiles.length} posts…`);
  for (const file of postFiles) {
    try {
      const raw = await readFile(path.join(postsDir, file), "utf8");
      const post = JSON.parse(raw) as Record<string, unknown>;
      await Post.findOneAndUpdate(
        { slug: post.slug },
        { $set: post },
        { upsert: true, new: true },
      );
      console.log(`   ✅  ${post.slug}`);
    } catch (err) {
      console.error(`   ❌  Failed: ${file}`, err);
    }
  }

  // ── Migrate Timeline ───────────────────────────────────────────────────────
  const timelineFile = path.join(process.cwd(), "content", "timeline.json");
  try {
    const raw = await readFile(timelineFile, "utf8");
    const items = JSON.parse(raw) as Array<Record<string, unknown>>;
    console.log(`\n🕰️   Migrating ${items.length} timeline items…`);
    for (const item of items) {
      await TimelineItem.findOneAndUpdate(
        { itemId: item.id },
        { $set: { ...item, itemId: item.id } },
        { upsert: true, new: true },
      );
      console.log(`   ✅  ${item.id} — ${item.title}`);
    }
  } catch {
    console.warn("⚠️   No content/timeline.json found — skipping timeline.");
  }

  console.log("\n🎉  Migration complete!");
  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
