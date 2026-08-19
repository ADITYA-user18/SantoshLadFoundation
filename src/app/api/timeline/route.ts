import { NextResponse } from "next/server";
import { getAllTimelineItems } from "@/lib/timeline-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getAllTimelineItems();
  return NextResponse.json({ items });
}
