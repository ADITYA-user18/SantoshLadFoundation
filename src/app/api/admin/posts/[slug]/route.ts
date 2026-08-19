import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPostBySlug, writePost, deletePost } from "@/lib/cms";
import { ALL_FEED_CATEGORIES, type FeedCategory, type Post } from "@/types/post";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const existing = await getPostBySlug(slug);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json() as Partial<Post>;

    if (!body.title || !body.description || !body.category || !body.publishedDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!(ALL_FEED_CATEGORIES as readonly string[]).includes(body.category ?? "")) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const updated: Post = {
      ...existing,
      title: body.title ?? existing.title,
      titleKn: body.titleKn,
      slug: existing.slug, // slug cannot change
      description: body.description ?? existing.description,
      descriptionKn: body.descriptionKn,
      contentType: body.contentType ?? existing.contentType,
      image: body.image ?? existing.image,
      imagePosition: body.imagePosition,
      youtubeUrl: body.youtubeUrl,
      category: (body.category ?? existing.category) as FeedCategory,
      tags: body.tags ?? [],
      publishedDate: body.publishedDate ?? existing.publishedDate,
      readMoreUrl: body.readMoreUrl,
      featured: body.featured ?? false,
      status: body.status === "published" ? "published" : "draft",
      publishDestination:
        body.publishDestination === "GALLERY" || body.publishDestination === "BOTH" || body.publishDestination === "FEED"
          ? body.publishDestination
          : existing.publishDestination ?? "FEED",
    };

    await writePost(updated);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/latest");
      revalidatePath("/api/posts");
    } catch {
      // ignore
    }

    return NextResponse.json({ ok: true, post: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const existing = await getPostBySlug(slug);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await deletePost(slug);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/latest");
      revalidatePath("/api/posts");
    } catch {
      // ignore
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
