"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PlusCircle, Search, X, Sparkles, Filter, Newspaper, ImageIcon, Globe } from "lucide-react";
import { PostsTable } from "@/components/admin/PostsTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FEED_CATEGORIES } from "@/types/post";
import type { Post } from "@/types/post";
import { cn } from "@/lib/utils";

const statusFilters = ["All", "published", "draft"] as const;
const destFilters = ["All", "FEED", "GALLERY", "BOTH"] as const;

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [destFilter, setDestFilter] = useState<(typeof destFilters)[number]>("All");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts");
      const data = (await res.json()) as { posts: Post[] };
      setPosts(data.posts ?? []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleDelete(slug: string) {
    await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
    void load();
  }

  const filtered = useMemo(() => {
    let result = posts;
    if (statusFilter !== "All") result = result.filter((p) => p.status === statusFilter);
    if (categoryFilter !== "All") result = result.filter((p) => p.category === categoryFilter);
    if (destFilter !== "All") {
      result = result.filter((p) => {
        const dest = p.publishDestination ?? "FEED";
        return dest === destFilter;
      });
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [posts, statusFilter, categoryFilter, destFilter, search]);

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-ink md:text-4xl">Posts Management</h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span>{posts.length} total posts</span>
            <span>•</span>
            <span className="text-forest font-medium">{publishedCount} published</span>
            <span>•</span>
            <span className="text-saffron-deep font-medium">{draftCount} drafts</span>
          </div>
        </div>

        <Button asChild variant="default">
          <Link href="/admin/posts/new">
            <PlusCircle size={16} />
            <span>Create New Post</span>
          </Link>
        </Button>
      </div>

      {/* Filter Section */}
      <div className="space-y-3.5 rounded-3xl border border-line bg-paper p-4 md:p-5 shadow-sm">
        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts by title, slug, or keywords…"
            className="w-full rounded-2xl border border-line bg-bg py-2.5 pl-10 pr-10 text-[13px] text-ink outline-none transition placeholder:text-muted focus:border-navy focus:shadow-[0_0_0_3px_rgba(14,28,64,0.08)]"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Destination Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-line/60 pb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-navy dark:text-sky-300 shrink-0 mr-1">
            Target Destination:
          </span>
          {destFilters.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDestFilter(d)}
              className={cn(
                "inline-flex items-center gap-1.5 shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition cursor-pointer",
                destFilter === d
                  ? "border-navy bg-navy text-white dark:bg-slate-100 dark:text-slate-950 dark:border-white shadow-sm font-semibold"
                  : "border-line bg-surface text-charcoal hover:border-navy/30 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700",
              )}
            >
              {d === "All" && <span>All Locations</span>}
              {d === "FEED" && (
                <>
                  <Newspaper size={13} className={destFilter === d ? "text-white dark:text-slate-950" : "text-saffron-deep dark:text-saffron"} />
                  <span>Feed & News</span>
                </>
              )}
              {d === "GALLERY" && (
                <>
                  <ImageIcon size={13} className={destFilter === d ? "text-white dark:text-slate-950" : "text-emerald-600 dark:text-emerald-400"} />
                  <span>Gallery Only</span>
                </>
              )}
              {d === "BOTH" && (
                <>
                  <Globe size={13} className={destFilter === d ? "text-white dark:text-slate-950" : "text-amber-600 dark:text-amber-400"} />
                  <span>Both (Feed & Gallery)</span>
                </>
              )}
            </button>
          ))}
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted shrink-0 mr-1">
            Status:
          </span>
          {statusFilters.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition cursor-pointer",
                statusFilter === s
                  ? "border-navy bg-navy text-white dark:bg-slate-100 dark:text-slate-950 dark:border-white shadow-sm font-semibold"
                  : "border-line bg-surface text-charcoal hover:border-navy/30 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700",
              )}
            >
              {s === "All" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-t border-line/60 pt-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted shrink-0 mr-1">
            Category:
          </span>
          <button
            type="button"
            onClick={() => setCategoryFilter("All")}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition cursor-pointer",
              categoryFilter === "All"
                ? "border-navy bg-navy text-white dark:bg-slate-100 dark:text-slate-950 dark:border-white shadow-sm font-semibold"
                : "border-line bg-surface text-charcoal hover:border-navy/30 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700",
            )}
          >
            All Categories
          </button>
          {FEED_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition cursor-pointer",
                categoryFilter === cat
                  ? "border-navy bg-navy text-white dark:bg-slate-100 dark:text-slate-950 dark:border-white shadow-sm font-semibold"
                  : "border-line bg-surface text-charcoal hover:border-navy/30 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy border-t-transparent" />
          <p className="text-xs text-muted">Loading posts…</p>
        </div>
      ) : (
        <PostsTable posts={filtered} onDelete={handleDelete} />
      )}
    </div>
  );
}
