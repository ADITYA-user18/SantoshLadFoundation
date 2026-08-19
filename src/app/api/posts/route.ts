import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/cms";
import { FEED_CATEGORIES, type FeedCategory } from "@/types/post";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const categoryParam = searchParams.get("category");
  const category =
    categoryParam &&
    categoryParam !== "All" &&
    (FEED_CATEGORIES as readonly string[]).includes(categoryParam)
      ? (categoryParam as FeedCategory)
      : "All";

  const tag = searchParams.get("tag") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const posts = await getAllPosts({ category, tag, search });
  return NextResponse.json({ posts });
}
