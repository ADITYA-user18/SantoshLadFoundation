export const FEED_CATEGORIES = [
  "Labour",
  "Dharwad",
  "Kalaghatgi",
  "Events",
  "Janatha Darshan",
  "Party Works",
] as const;

export const GALLERY_CATEGORIES = [
  "Portrait",
  "Rescue",
  "Special Occasions",
  "Labour",
  "Dharwad",
  "Kalaghatgi",
  "Public Life",
  "Dignitaries",
] as const;

export const ALL_FEED_CATEGORIES = [
  ...FEED_CATEGORIES,
  ...GALLERY_CATEGORIES,
  "Development",
  "Rescue & Relief",
  "Announcements",
  "Public",
  "People",
] as const;

export type FeedCategory = (typeof ALL_FEED_CATEGORIES)[number];

export const IMAGE_POSITIONS = [
  { value: "center", label: "Center" },
  { value: "top", label: "Top" },
  { value: "center top", label: "Center Top" },
  { value: "bottom", label: "Bottom" },
  { value: "center bottom", label: "Center Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
  { value: "20% 10%", label: "Upper Left Area" },
  { value: "50% 20%", label: "Upper Center" },
  { value: "80% 10%", label: "Upper Right Area" },
] as const;

export type ContentType = "IMAGE" | "YOUTUBE";

export type PostStatus = "published" | "draft";

export type PublishDestination = "FEED" | "GALLERY" | "BOTH";

export interface Post {
  title: string;
  titleKn?: string;
  slug: string;
  description: string;
  descriptionKn?: string;
  contentType: ContentType;
  image?: string;
  imagePosition?: string;
  youtubeUrl?: string;
  category: FeedCategory;
  tags?: string[];
  publishedDate: string;
  readMoreUrl?: string;
  featured?: boolean;
  status: PostStatus;
  publishDestination?: PublishDestination;
}
