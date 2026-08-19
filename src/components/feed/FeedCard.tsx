"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Hash, X, ExternalLink, Calendar, Eye } from "lucide-react";
import { YoutubeEmbed } from "@/components/feed/YoutubeEmbed";
import { useContent, useLanguage } from "@/i18n/language";
import { formatFeedDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Post } from "@/types/post";

interface FeedCardProps {
  post: Post;
  onTagClick?: (tag: string) => void;
}

export function FeedCard({ post, onTagClick }: FeedCardProps) {
  const { locale } = useLanguage();
  const { ui, feed } = useContent();
  const [openModal, setOpenModal] = useState(false);

  const title = locale === "kn" && post.titleKn ? post.titleKn : post.title;
  const description =
    locale === "kn" && post.descriptionKn ? post.descriptionKn : post.description;
  const category = (feed.categories as Record<string, string>)?.[post.category] || post.category;
  const isLongDescription = description.length > 120;

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-paper shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Media: Image or YouTube Video */}
        <div className="relative overflow-hidden bg-surface">
          {post.contentType === "YOUTUBE" && post.youtubeUrl ? (
            <YoutubeEmbed url={post.youtubeUrl} title={title} />
          ) : post.image ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={post.image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          ) : (
            <div className="aspect-[16/10] bg-surface" />
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
          <div>
            {/* Category / Section Badge (Right-aligned) */}
            <div className="flex items-center justify-end">
              <Badge variant="forest" className="text-[11px] font-medium tracking-wide">
                {category}
              </Badge>
            </div>

            {/* Title */}
            <h3
              onClick={() => setOpenModal(true)}
              className="mt-2.5 font-display text-xl leading-snug text-ink line-clamp-2 cursor-pointer hover:text-saffron-deep transition-colors"
            >
              {title}
            </h3>

            {/* Description (Fixed line clamp) */}
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-charcoal/90">
              {description}
            </p>

            {isLongDescription && (
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-semibold text-ink transition hover:text-saffron-deep cursor-pointer"
              >
                <span>...more</span>
              </button>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagClick?.(tag)}
                    className="inline-flex items-center gap-1 rounded-full border border-saffron/30 bg-saffron/8 px-2.5 py-0.5 text-[11px] font-medium text-saffron-deep transition hover:border-saffron/60 hover:bg-saffron/15 cursor-pointer"
                  >
                    <Hash size={10} />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer info & links */}
          <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-4 text-[12px] text-muted">
            <time dateTime={post.publishedDate} className="flex items-center gap-1 text-muted">
              <Calendar size={12} />
              <span>{formatFeedDate(post.publishedDate, locale)}</span>
            </time>
            {post.readMoreUrl ? (
              <a
                href={post.readMoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-saffron-deep transition hover:underline"
              >
                <span>{ui.publicRecord}</span>
                <ArrowUpRight size={13} />
              </a>
            ) : null}
          </div>
        </div>
      </article>

      {/* Dedicated Reading Modal for THIS specific post */}
      {openModal && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] border border-line bg-paper shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Media Header */}
            {post.contentType === "YOUTUBE" && post.youtubeUrl ? (
              <div className="relative aspect-video w-full">
                <YoutubeEmbed url={post.youtubeUrl} title={title} />
              </div>
            ) : post.image ? (
              <div className="relative aspect-[16/10] w-full bg-surface">
                <Image
                  src={post.image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover object-top"
                />
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="forest">{category}</Badge>
                <span className="text-xs text-muted">
                  {formatFeedDate(post.publishedDate, locale)}
                </span>
              </div>

              <h2 className="mt-4 font-display text-2xl text-ink md:text-3xl">
                {title}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-charcoal whitespace-pre-line">
                {description}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full border border-saffron/30 bg-saffron/10 px-3 py-1 text-xs font-medium text-saffron-deep"
                    >
                      <Hash size={11} />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                {post.readMoreUrl ? (
                  <Button asChild variant="saffron" size="sm">
                    <a href={post.readMoreUrl} target="_blank" rel="noreferrer">
                      <span>{ui.readMore}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </Button>
                ) : <div />}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
