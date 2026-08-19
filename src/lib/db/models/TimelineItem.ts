import mongoose, { Schema, model, models, type Document } from "mongoose";

export interface ITimelineItem extends Document {
  itemId: string; // matches the existing `id` field in TimelineItem interface
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

const TimelineItemSchema = new Schema<ITimelineItem>(
  {
    itemId: { type: String, required: true, unique: true, index: true },
    year: { type: String, required: true },
    title: { type: String, required: true },
    titleKn: { type: String },
    text: { type: String, required: true },
    textKn: { type: String },
    image: { type: String },
    imagePosition: { type: String },
    imagePositionX: { type: String },
    imageZoom: { type: Number, default: 1.0 },
    order: { type: Number, required: true, index: true },
  },
  { timestamps: true },
);

export const TimelineItemModel =
  (models.TimelineItem as mongoose.Model<ITimelineItem>) ??
  model<ITimelineItem>("TimelineItem", TimelineItemSchema);
