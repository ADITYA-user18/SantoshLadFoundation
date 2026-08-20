import type { Post } from "@/types/post";

/**
 * All admin-posted posts and gallery items are fetched and managed
 * exclusively via MongoDB Atlas database API endpoints (/api/admin/posts and /api/posts).
 * LocalStorage usage for dynamic admin content is disabled.
 */

export function getLocalPosts(): Post[] {
  return [];
}

export function saveLocalPost(_post: Post): void {
  // Posts are stored strictly in MongoDB Atlas database
}

export function removeLocalPost(_slug: string): void {
  // Posts are managed strictly in MongoDB Atlas database
}

export function mergePosts(serverPosts: Post[], _localPosts: Post[]): Post[] {
  return serverPosts;
}

