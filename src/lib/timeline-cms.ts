/**
 * timeline-cms.ts — MongoDB-backed timeline storage.
 * Drop-in replacement for the file-based version.
 * All exported function signatures are IDENTICAL to the old timeline-cms.ts.
 */
import { connectDB } from "./db/mongoose";
import { TimelineItemModel } from "./db/models/TimelineItem";

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  titleKn?: string;
  text: string;
  textKn?: string;
  image?: string;
  imagePosition?: string;
  imagePositionX?: string;
  imageZoom?: number;
  order: number;
}

function toTimelineItem(doc: Record<string, unknown>): TimelineItem {
  return {
    id: doc.itemId as string,
    year: doc.year as string,
    title: doc.title as string,
    titleKn: doc.titleKn as string | undefined,
    text: doc.text as string,
    textKn: doc.textKn as string | undefined,
    image: doc.image as string | undefined,
    imagePosition: doc.imagePosition as string | undefined,
    imagePositionX: doc.imagePositionX as string | undefined,
    imageZoom: doc.imageZoom as number | undefined,
    order: doc.order as number,
  };
}

export async function getAllTimelineItems(): Promise<TimelineItem[]> {
  await connectDB();
  const docs = await TimelineItemModel.find({})
    .sort({ order: 1 })
    .lean<Record<string, unknown>[]>();
  return docs.map(toTimelineItem);
}

export async function saveTimelineItems(items: TimelineItem[]): Promise<void> {
  await connectDB();
  const sorted = [...items].sort((a, b) => a.order - b.order);

  const ops = sorted.map((item) => ({
    updateOne: {
      filter: { itemId: item.id },
      update: {
        $set: {
          itemId: item.id,
          year: item.year,
          title: item.title,
          titleKn: item.titleKn ?? "",
          text: item.text,
          textKn: item.textKn ?? "",
          image: item.image ?? "",
          imagePosition: item.imagePosition ?? "",
          imagePositionX: item.imagePositionX ?? "",
          imageZoom: item.imageZoom ?? 1.0,
          order: item.order,
        },
      },
      upsert: true,
    },
  }));

  if (ops.length > 0) {
    await TimelineItemModel.bulkWrite(ops);
  }
}

export async function addTimelineItem(
  item: Omit<TimelineItem, "id" | "order"> & { id?: string; order?: number },
): Promise<TimelineItem> {
  await connectDB();

  const allItems = await getAllTimelineItems();
  const id = item.id || `timeline-${Date.now()}`;
  const order =
    item.order ?? (allItems.length ? Math.max(...allItems.map((i) => i.order)) + 1 : 1);

  const newItem: TimelineItem = {
    id,
    year: item.year,
    title: item.title,
    titleKn: item.titleKn ?? "",
    text: item.text,
    textKn: item.textKn ?? "",
    image: item.image ?? "",
    imagePosition: item.imagePosition ?? "",
    imagePositionX: item.imagePositionX ?? "",
    imageZoom: item.imageZoom ?? 1.0,
    order,
  };

  await TimelineItemModel.findOneAndUpdate(
    { itemId: id },
    { $set: { ...newItem, itemId: id } },
    { upsert: true, new: true },
  );

  return newItem;
}

export async function updateTimelineItem(
  id: string,
  updates: Partial<TimelineItem>,
): Promise<TimelineItem> {
  await connectDB();

  const existing = await TimelineItemModel.findOne({ itemId: id }).lean<Record<string, unknown>>();

  if (!existing) {
    // Upsert if not found (cold-start edge case)
    const allItems = await getAllTimelineItems();
    const order =
      updates.order ?? (allItems.length ? Math.max(...allItems.map((i) => i.order)) + 1 : 1);

    const newItem = {
      itemId: id,
      year: updates.year ?? new Date().getFullYear().toString(),
      title: updates.title ?? "Untitled",
      titleKn: updates.titleKn ?? "",
      text: updates.text ?? "",
      textKn: updates.textKn ?? "",
      image: updates.image ?? "",
      imagePosition: updates.imagePosition ?? "",
      imagePositionX: updates.imagePositionX ?? "",
      imageZoom: updates.imageZoom ?? 1.0,
      order,
    };
    await TimelineItemModel.findOneAndUpdate({ itemId: id }, { $set: newItem }, { upsert: true, new: true });
    return { ...newItem, id };
  }

  const merged = { ...existing, ...updates, itemId: id };
  await TimelineItemModel.updateOne({ itemId: id }, { $set: merged });

  return toTimelineItem(merged as Record<string, unknown>);
}

export async function deleteTimelineItem(id: string): Promise<boolean> {
  await connectDB();
  await TimelineItemModel.deleteOne({ itemId: id });
  return true;
}
