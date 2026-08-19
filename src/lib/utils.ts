import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFeedDate(iso: string, locale: "en" | "kn" = "en") {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  const yearOnly = /^\d{4}-01-01$/.test(iso);

  if (yearOnly) {
    return date.getFullYear().toString();
  }

  const formatted = date.toLocaleDateString(locale === "kn" ? "kn-IN" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return locale === "kn" ? formatted : formatted.toUpperCase();
}

export function youtubeIdFromUrl(url?: string | null) {
  if (!url) return null;
  const cleaned = url.trim();
  if (!cleaned) return null;

  // Handle Shorts, watch, embed, youtu.be regex
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = cleaned.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }

  try {
    const fullUrl = cleaned.startsWith("http") ? cleaned : `https://${cleaned}`;
    const parsed = new URL(fullUrl);
    if (parsed.hostname.includes("youtu.be")) {
      const pathId = parsed.pathname.replace("/", "");
      return pathId.length === 11 ? pathId : null;
    }
    const vParam = parsed.searchParams.get("v");
    if (vParam && vParam.length === 11) {
      return vParam;
    }
    const embedMatch = parsed.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/);
    if (embedMatch?.[1] && embedMatch[1].length === 11) {
      return embedMatch[1];
    }
  } catch {
    // fallback
  }

  return null;
}

export function getPostThumbnail(post: {
  contentType?: "IMAGE" | "YOUTUBE";
  image?: string;
  youtubeUrl?: string;
}): string | null {
  if (post.contentType === "IMAGE" && post.image) {
    return post.image;
  }
  if (post.contentType === "YOUTUBE" && post.youtubeUrl) {
    const ytId = youtubeIdFromUrl(post.youtubeUrl);
    if (ytId) {
      return `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
    }
  }
  if (post.image) return post.image;
  return null;
}
