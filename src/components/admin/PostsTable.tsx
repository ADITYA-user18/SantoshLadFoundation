"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Pencil,
  Trash2,
  ExternalLink,
  Calendar,
  Eye,
  FileText,
  PlusCircle,
  Video,
  CheckCircle2,
  Clock,
  Newspaper,
  ImageIcon,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatFeedDate, getPostThumbnail } from "@/lib/utils";
import type { Post } from "@/types/post";

interface PostsTableProps {
  posts: Post[];
  onDelete: (slug: string) => void;
}

export function PostsTable({ posts, onDelete }: PostsTableProps) {
  const [confirming, setConfirming] = useState<string | null>(null);

  function handleDeleteClick(slug: string) {
    if (confirming === slug) {
      onDelete(slug);
      setConfirming(null);
    } else {
      setConfirming(slug);
      setTimeout(() => setConfirming(null), 3500);
    }
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-line bg-paper py-20 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface">
          <FileText size={26} className="text-muted" />
        </div>
        <div>
          <p className="text-lg font-semibold text-ink">No posts found</p>
          <p className="mt-1 text-sm text-muted">
            Create your first post or adjust your search / filters.
          </p>
        </div>
        <Button asChild variant="default" className="mt-2">
          <Link href="/admin/posts/new">
            <PlusCircle size={15} />
            <span>Create New Post</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Desktop & Tablet Table */}
      <div className="hidden overflow-hidden rounded-3xl border border-line bg-paper shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left">
            <thead>
              <tr className="border-b border-line bg-surface/70 text-[12px] font-semibold uppercase tracking-wider text-muted">
                <th className="px-6 py-4">Post Details</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-6 py-4 text-right min-w-[190px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60 text-sm">
              {posts.map((post) => {
                const thumbnail = getPostThumbnail(post);
                return (
                  <tr
                    key={post.slug}
                    className="transition-colors hover:bg-surface/50 group"
                  >
                    {/* Post Details (Thumbnail + Title + Slug) */}
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-4">
                        {thumbnail ? (
                          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-surface border border-line/70 shadow-2xs">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={thumbnail}
                              alt=""
                              className="h-full w-full object-cover object-top"
                            />
                          </div>
                        ) : (
                          <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-xl bg-surface border border-line/70 text-muted shadow-2xs">
                            <Video size={18} />
                          </div>
                        )}
                        <div className="min-w-0 max-w-[340px] lg:max-w-[420px]">
                          <p className="font-semibold text-ink leading-snug truncate">
                            {post.title}
                          </p>
                          <p className="mt-1 font-mono text-[11px] text-muted truncate">
                            /{post.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category & Destination */}
                    <td className="px-5 py-4.5">
                      <div className="flex flex-col items-start gap-1">
                        <Badge variant="outline" className="font-medium text-xs dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700">
                          {post.category}
                        </Badge>
                        {post.publishDestination === "GALLERY" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 dark:text-emerald-400">
                            <ImageIcon size={12} />
                            <span>Gallery Only</span>
                          </span>
                        ) : post.publishDestination === "BOTH" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-amber-600 dark:text-amber-400">
                            <Globe size={12} />
                            <span>Feed & Gallery</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-orange-600 dark:text-orange-400">
                            <Newspaper size={12} />
                            <span>Feed Posts</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4.5">
                      {post.status === "published" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>Published</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          <span>Draft</span>
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4.5 whitespace-nowrap text-xs text-muted">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-muted/80" />
                        <span>{formatFeedDate(post.publishedDate)}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2.5">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="h-8.5 px-3.5 rounded-xl border-line hover:border-navy hover:bg-surface font-medium"
                        >
                          <Link href={`/admin/posts/${post.slug}`}>
                            <Pencil size={13} />
                            <span>Edit</span>
                          </Link>
                        </Button>

                        <Button
                          variant={confirming === post.slug ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => handleDeleteClick(post.slug)}
                          className="h-8.5 px-3.5 rounded-xl border-line hover:border-red-400 hover:text-red-600 hover:bg-red-500/10 font-medium"
                        >
                          <Trash2 size={13} />
                          <span>{confirming === post.slug ? "Confirm?" : "Delete"}</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card List View */}
      <div className="grid gap-4 md:hidden">
        {posts.map((post) => {
          const thumbnail = getPostThumbnail(post);
          return (
            <div
              key={post.slug}
              className="overflow-hidden rounded-3xl border border-line bg-paper shadow-sm"
            >
              <div className="flex gap-4 p-4.5">
                {thumbnail ? (
                  <div className="relative h-18 w-24 shrink-0 overflow-hidden rounded-2xl bg-surface border border-line/70">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbnail}
                      alt=""
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="flex h-18 w-24 shrink-0 items-center justify-center rounded-2xl bg-surface border border-line/70">
                    <Video size={20} className="text-muted" />
                  </div>
                )}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink line-clamp-2 leading-snug">
                  {post.title}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {post.status === "published" ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>Published</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>Draft</span>
                    </span>
                  )}
                  <Badge variant="outline" className="text-[11px] dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700">
                    {post.category}
                  </Badge>
                  {post.publishDestination === "GALLERY" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <ImageIcon size={11} />
                      <span>Gallery</span>
                    </span>
                  ) : post.publishDestination === "BOTH" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      <Globe size={11} />
                      <span>Feed & Gallery</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange-600 dark:text-orange-400">
                      <Newspaper size={11} />
                      <span>Feed</span>
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[11px] text-muted flex items-center gap-1">
                  <Calendar size={11} />
                  <span>{formatFeedDate(post.publishedDate)}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 border-t border-line/60 bg-surface/40 p-3.5">
              <Button asChild variant="outline" size="sm" className="flex-1 h-9 rounded-xl">
                <Link href={`/admin/posts/${post.slug}`}>
                  <Pencil size={13} />
                  <span>Edit Post</span>
                </Link>
              </Button>
              <Button
                variant={confirming === post.slug ? "destructive" : "outline"}
                size="sm"
                onClick={() => handleDeleteClick(post.slug)}
                className="flex-1 h-9 rounded-xl"
              >
                <Trash2 size={13} />
                <span>{confirming === post.slug ? "Confirm Delete?" : "Delete"}</span>
              </Button>
            </div>
          </div>
        );
      })}
      </div>
    </>
  );
}
