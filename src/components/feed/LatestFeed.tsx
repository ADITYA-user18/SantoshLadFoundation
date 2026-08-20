"use client";

import { useEffect, useMemo, useState } from "react";
import { FeedCard } from "@/components/feed/FeedCard";
import { FeedFilters } from "@/components/feed/FeedFilters";
import { useContent } from "@/i18n/language";
import type { FeedCategory, Post } from "@/types/post";

export function LatestFeed({ posts: initialPosts }: { posts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filter, setFilter] = useState<"All" | FeedCategory>("All");
  const [activeTag, setActiveTag] = useState("");
  const [search, setSearch] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const { ui } = useContent();

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data: { posts?: Post[] }) => {
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
        }
      })
      .catch(() => {});
  }, []);

  // Collect all unique tags from posts
  useEffect(() => {
    const tagSet = new Set<string>();
    for (const post of posts) {
      for (const tag of post.tags ?? []) tagSet.add(tag);
    }
    setAllTags(Array.from(tagSet).sort());
  }, [posts]);

  const visible = useMemo(() => {
    let result = posts.filter(
      (p) =>
        !p.publishDestination ||
        p.publishDestination === "FEED" ||
        p.publishDestination === "BOTH"
    );

    if (filter !== "All") result = result.filter((p) => p.category === filter);

    if (activeTag) {
      result = result.filter((p) =>
        (p.tags ?? []).some((t) => t.toLowerCase() === activeTag.toLowerCase()),
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.titleKn ?? "").toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.descriptionKn ?? "").toLowerCase().includes(q) ||
          (p.tags ?? []).some((t) => t.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [posts, filter, activeTag, search]);

  function handleTagClick(tag: string) {
    if (activeTag === tag) {
      setActiveTag("");
    } else {
      setActiveTag(tag);
      setFilter("All");
    }
  }

  function handleTagFilterChange(tag: string) {
    setActiveTag(tag);
    if (tag) setFilter("All");
  }

  return (
    <div>
      <FeedFilters
        activeCategory={filter}
        activeTag={activeTag}
        search={search}
        onCategoryChange={(c) => {
          setFilter(c);
        }}
        onTagChange={handleTagFilterChange}
        onSearchChange={setSearch}
        allTags={allTags}
      />
      {visible.length === 0 ? (
        <div className="mt-16 text-center py-12 rounded-3xl border border-[#E8E4D9] bg-[#FAF8F5]">
          <p className="text-[#666055] font-light">{ui.noPosts}</p>
          {(activeTag || filter !== "All" || search) && (
            <button
              type="button"
              onClick={() => {
                setFilter("All");
                setActiveTag("");
                setSearch("");
              }}
              className="mt-3 text-xs font-semibold text-[#141414] hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((post) => (
            <FeedCard key={post.slug} post={post} onTagClick={handleTagClick} />
          ))}
        </div>
      )}
    </div>
  );
}
