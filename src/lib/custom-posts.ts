import type { Post } from "@/types/post";

const STORAGE_KEY = "sl_custom_posts";

export function getLocalPosts(): Post[] {
  if (typeof window === "undefined") return [];
  try {
    // Clear legacy local storage so old cached feed data is removed completely
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch {
    return [];
  }
}

export function saveLocalPost(post: Post): void {
  // Posts are stored strictly in the database (MongoDB) via API
}

export function removeLocalPost(slug: string): void {
  // Posts are managed strictly via MongoDB API
}

export function mergePosts(serverPosts: Post[], localPosts: Post[]): Post[] {
  const map = new Map<string, Post>();
  for (const post of serverPosts) {
    map.set(post.slug, post);
  }
  for (const post of localPosts) {
    map.set(post.slug, post);
  }
  return Array.from(map.values()).sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}
