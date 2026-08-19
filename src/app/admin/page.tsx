import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/cms";
import {
  PlusCircle,
  Newspaper,
  Eye,
  EyeOff,
  FileText,
  TrendingUp,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { formatFeedDate, getPostThumbnail } from "@/lib/utils";

export default async function AdminDashboard() {
  const posts = await getAllPosts({ includeDrafts: true });
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.filter((p) => p.status === "draft");
  const recent = posts.slice(0, 6);

  const stats = [
    {
      label: "Total Posts",
      value: posts.length,
      icon: FileText,
      color: "text-blue-600 dark:text-sky-400",
      bgColor: "bg-blue-500/10 dark:bg-sky-400/15",
      borderColor: "border-blue-500/20 dark:border-sky-400/30",
    },
    {
      label: "Published",
      value: published.length,
      icon: Eye,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10 dark:bg-emerald-400/15",
      borderColor: "border-emerald-500/20 dark:border-emerald-400/30",
    },
    {
      label: "Drafts",
      value: drafts.length,
      icon: EyeOff,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10 dark:bg-amber-400/15",
      borderColor: "border-amber-500/20 dark:border-amber-400/30",
    },
    {
      label: "Categories",
      value: new Set(posts.map((p) => p.category)).size,
      icon: TrendingUp,
      color: "text-saffron-deep dark:text-saffron",
      bgColor: "bg-saffron/10 dark:bg-saffron/15",
      borderColor: "border-saffron/25 dark:border-saffron/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-paper p-6 shadow-sm md:p-8">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-saffron/5 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-saffron/30 bg-saffron/10 px-3 py-1 text-[11px] font-medium text-saffron-deep">
              <Sparkles size={12} />
              <span>Santosh S. Lad CMS Admin</span>
            </div>
            <h1 className="mt-2.5 font-display text-3xl text-ink md:text-4xl">
              Content Management Dashboard
            </h1>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
              Publish photos, updates, videos, and news directly to the official public profile.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-[13px] font-medium text-charcoal transition hover:border-saffron/40 hover:bg-paper"
            >
              <ExternalLink size={14} />
              Live Site
            </Link>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 rounded-xl bg-saffron text-navy font-semibold px-5 py-2.5 text-[13px] shadow-sm transition hover:bg-saffron-deep hover:text-white"
            >
              <PlusCircle size={15} />
              Create Post
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-line bg-paper p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                  {stat.label}
                </p>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border ${stat.bgColor} ${stat.borderColor}`}
                >
                  <Icon size={16} className={stat.color} />
                </div>
              </div>
              <p className="mt-4 font-display text-4xl text-ink">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/posts/new"
          className="group flex items-center justify-between rounded-2xl border border-line bg-paper p-4 transition-all duration-200 hover:border-navy/40 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/10 text-forest">
              <PlusCircle size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-ink group-hover:text-navy">New Post</p>
              <p className="text-[11px] text-muted">Add photo, video, or news</p>
            </div>
          </div>
          <ArrowRight size={14} className="text-muted transition group-hover:translate-x-1 group-hover:text-navy" />
        </Link>

        <Link
          href="/admin/posts"
          className="group flex items-center justify-between rounded-2xl border border-line bg-paper p-4 transition-all duration-200 hover:border-navy/40 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
              <Newspaper size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-ink group-hover:text-navy">Manage Posts</p>
              <p className="text-[11px] text-muted">Edit, tag, or delete posts</p>
            </div>
          </div>
          <ArrowRight size={14} className="text-muted transition group-hover:translate-x-1 group-hover:text-navy" />
        </Link>

        <Link
          href="/latest"
          target="_blank"
          className="group flex items-center justify-between rounded-2xl border border-line bg-paper p-4 transition-all duration-200 hover:border-navy/40 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/8 text-navy">
              <ExternalLink size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-ink group-hover:text-navy">Public Feed</p>
              <p className="text-[11px] text-muted">View live feed with filters</p>
            </div>
          </div>
          <ArrowRight size={14} className="text-muted transition group-hover:translate-x-1 group-hover:text-navy" />
        </Link>
      </div>

      {/* Recent Posts Section */}
      <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-sm">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface">
              <Newspaper size={14} className="text-navy" />
            </div>
            <h2 className="text-sm font-medium text-ink">Recent Posts</h2>
          </div>
          <Link
            href="/admin/posts"
            className="flex items-center gap-1 text-[12px] font-medium text-navy transition hover:underline"
          >
            <span>View all ({posts.length})</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="divide-y divide-line/60">
          {recent.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-muted">
              No posts found.{" "}
              <Link href="/admin/posts/new" className="text-navy hover:underline">
                Create your first post
              </Link>
            </div>
          )}

          {recent.map((post) => {
            const thumbnail = getPostThumbnail(post);
            return (
              <div
                key={post.slug}
                className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-surface/50"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {thumbnail ? (
                    <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-xl bg-surface border border-line/60">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbnail}
                        alt=""
                        className="h-full w-full object-cover"
                        style={{ objectPosition: post.imagePosition ?? "center" }}
                      />
                    </div>
                  ) : (
                    <div className="flex h-11 w-14 shrink-0 items-center justify-center rounded-xl bg-surface border border-line/60 text-muted">
                      <ExternalLink size={15} />
                    </div>
                  )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink">{post.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        post.status === "published"
                          ? "border border-forest/20 bg-forest/10 text-forest-deep"
                          : "border border-line bg-mist text-muted"
                      }`}
                    >
                      {post.status === "published" ? <Eye size={9} /> : <EyeOff size={9} />}
                      {post.status}
                    </span>
                    <span className="rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] text-charcoal">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-muted">
                      {formatFeedDate(post.publishedDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/posts/${post.slug}`}
                  className="rounded-xl border border-line bg-paper px-3.5 py-1.5 text-[12px] font-medium text-charcoal transition hover:border-navy hover:text-navy hover:shadow-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
