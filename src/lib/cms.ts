/**
 * cms.ts — MongoDB-backed post storage.
 * Drop-in replacement for the file-based version.
 * All exported function signatures are IDENTICAL to the old cms.ts.
 */
import { connectDB } from "./db/mongoose";
import { PostModel } from "./db/models/Post";
import { FEED_CATEGORIES, type FeedCategory, type Post } from "@/types/post";

function isCategory(value: unknown): value is FeedCategory {
  return typeof value === "string" && (FEED_CATEGORIES as readonly string[]).includes(value);
}

/** Convert Mongoose document → plain Post object matching the Post interface */
function toPost(doc: Record<string, unknown>): Post {
  return {
    title: doc.title as string,
    titleKn: doc.titleKn as string | undefined,
    slug: doc.slug as string,
    description: doc.description as string,
    descriptionKn: doc.descriptionKn as string | undefined,
    contentType: doc.contentType as "IMAGE" | "YOUTUBE",
    image: doc.image as string | undefined,
    imagePosition: doc.imagePosition as string | undefined,
    youtubeUrl: doc.youtubeUrl as string | undefined,
    category: doc.category as FeedCategory,
    tags: doc.tags as string[] | undefined,
    publishedDate: doc.publishedDate as string,
    readMoreUrl: doc.readMoreUrl as string | undefined,
    featured: doc.featured as boolean | undefined,
    status: doc.status as "published" | "draft",
    publishDestination: doc.publishDestination as "FEED" | "GALLERY" | "BOTH" | undefined,
  };
}

export async function getAllPosts(options?: {
  includeDrafts?: boolean;
  category?: FeedCategory | "All";
  tag?: string;
  search?: string;
}): Promise<Post[]> {
  await connectDB();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: Record<string, any> = {};

  if (!options?.includeDrafts) {
    query.status = "published";
  }
  if (options?.category && options.category !== "All" && isCategory(options.category)) {
    query.category = options.category;
  }
  if (options?.tag) {
    query.tags = { $regex: new RegExp(`^${options.tag}$`, "i") };
  }
  if (options?.search) {
    const re = new RegExp(options.search, "i");
    query.$or = [
      { title: re },
      { titleKn: re },
      { description: re },
      { descriptionKn: re },
      { tags: re },
    ];
  }

  const docs = await PostModel.find(query)
    .sort({ publishedDate: -1 })
    .lean<Record<string, unknown>[]>();

  return docs.map(toPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await connectDB();
  const doc = await PostModel.findOne({ slug }).lean<Record<string, unknown>>();
  if (!doc) return null;
  return toPost(doc);
}

export async function writePost(post: Post): Promise<void> {
  await connectDB();
  await PostModel.findOneAndUpdate({ slug: post.slug }, post, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
}

export async function deletePost(slug: string): Promise<void> {
  await connectDB();
  await PostModel.deleteOne({ slug });
}

export async function getAllTags(): Promise<string[]> {
  await connectDB();
  const result = await PostModel.aggregate<{ _id: string }>([
    { $unwind: "$tags" },
    { $group: { _id: "$tags" } },
    { $sort: { _id: 1 } },
  ]);
  return result.map((r) => r._id);
}
