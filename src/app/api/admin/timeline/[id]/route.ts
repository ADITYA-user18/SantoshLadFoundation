import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updateTimelineItem, deleteTimelineItem, TimelineItem } from "@/lib/timeline-cms";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const rawParams = await Promise.resolve(props.params);
    const id = rawParams?.id;
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const body = (await req.json()) as Partial<TimelineItem>;
    const updated = await updateTimelineItem(id, body);

    try {
      revalidatePath("/timeline");
      revalidatePath("/api/timeline");
    } catch {
      // ignore
    }

    return NextResponse.json({ ok: true, item: updated });
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, props: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const rawParams = await Promise.resolve(props.params);
    const id = rawParams?.id;
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await deleteTimelineItem(id);

    try {
      revalidatePath("/timeline");
      revalidatePath("/api/timeline");
    } catch {
      // ignore
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
