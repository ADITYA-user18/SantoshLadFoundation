import mongoose, { Schema, model, models, type Document } from "mongoose";
import { FEED_CATEGORIES } from "@/types/post";

export interface IPost extends Document {
  title: string;
  titleKn?: string;
  slug: string;
  description: string;
  descriptionKn?: string;
  contentType: "IMAGE" | "YOUTUBE";
  image?: string;
  imagePosition?: string;
  youtubeUrl?: string;
  category: string;
  tags?: string[];
  publishedDate: string;
  readMoreUrl?: string;
  featured?: boolean;
  status: "published" | "draft";
  publishDestination?: "FEED" | "GALLERY" | "BOTH";
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    titleKn: { type: String },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    descriptionKn: { type: String },
    contentType: { type: String, enum: ["IMAGE", "YOUTUBE"], required: true },
    image: { type: String },
    imagePosition: { type: String },
    youtubeUrl: { type: String },
    category: {
      type: String,
      enum: FEED_CATEGORIES as unknown as string[],
      required: true,
    },
    tags: [{ type: String }],
    publishedDate: { type: String, required: true },
    readMoreUrl: { type: String },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
      required: true,
    },
    publishDestination: {
      type: String,
      enum: ["FEED", "GALLERY", "BOTH"],
      default: "FEED",
    },
  },
  { timestamps: true },
);

export const PostModel =
  (models.Post as mongoose.Model<IPost>) ?? model<IPost>("Post", PostSchema);
