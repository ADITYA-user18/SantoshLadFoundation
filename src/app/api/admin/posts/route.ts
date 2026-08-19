import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllPosts, writePost } from "@/lib/cms";
import { ALL_FEED_CATEGORIES, type FeedCategory, type Post } from "@/types/post";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getAllPosts({ includeDrafts: true });
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Partial<Post>;

    if (!body.title || !body.slug || !body.description || !body.category || !body.publishedDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!body.contentType || (body.contentType !== "IMAGE" && body.contentType !== "YOUTUBE")) {
      return NextResponse.json({ error: "Invalid contentType" }, { status: 400 });
    }
    if (!(ALL_FEED_CATEGORIES as readonly string[]).includes(body.category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const post: Post = {
      title: body.title,
      titleKn: body.titleKn,
      slug: body.slug,
      description: body.description,
      descriptionKn: body.descriptionKn,
      contentType: body.contentType,
      image: body.image,
      imagePosition: body.imagePosition,
      youtubeUrl: body.youtubeUrl,
      category: body.category as FeedCategory,
      tags: body.tags ?? [],
      publishedDate: body.publishedDate,
      readMoreUrl: body.readMoreUrl,
      featured: body.featured ?? false,
      status: body.status === "published" ? "published" : "draft",
      publishDestination:
        body.publishDestination === "GALLERY" || body.publishDestination === "BOTH"
          ? body.publishDestination
          : "FEED",
    };

    await writePost(post);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/latest");
      revalidatePath("/api/posts");
    } catch {
      // ignore
    }

    return NextResponse.json({ ok: true, post });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
