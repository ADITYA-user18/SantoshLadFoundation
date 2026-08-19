import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllTimelineItems, addTimelineItem, saveTimelineItems, TimelineItem } from "@/lib/timeline-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getAllTimelineItems();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Partial<TimelineItem>;

    if (!body.year || !body.title || !body.text) {
      return NextResponse.json({ error: "Missing required fields: year, title, and text" }, { status: 400 });
    }

    const newItem = await addTimelineItem({
      year: body.year,
      title: body.title,
      titleKn: body.titleKn || "",
      text: body.text,
      textKn: body.textKn || "",
      image: body.image || "",
      order: body.order,
    });

    try {
      revalidatePath("/timeline");
      revalidatePath("/api/timeline");
    } catch {
      // ignore
    }

    return NextResponse.json({ ok: true, item: newItem });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json() as { items: TimelineItem[] };
    if (Array.isArray(body.items)) {
      await saveTimelineItems(body.items);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
