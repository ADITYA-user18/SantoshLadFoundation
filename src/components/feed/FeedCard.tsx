"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Hash, X, Calendar } from "lucide-react";
import { YoutubeEmbed } from "@/components/feed/YoutubeEmbed";
import { useContent, useLanguage } from "@/i18n/language";
import { formatFeedDate } from "@/lib/utils";
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
      <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#E8E4D9] bg-[#FAF8F5] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Media: Image or YouTube Video */}
        <div className="relative overflow-hidden bg-[#F8F6F0]">
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
            <div className="aspect-[16/10] bg-[#F8F6F0]" />
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
          <div>
            {/* Category Badge (Right-aligned) */}
            <div className="flex items-center justify-end">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#736B5E]">
                {category}
              </span>
            </div>

            {/* Title */}
            <h3
              onClick={() => setOpenModal(true)}
              className="mt-2.5 font-display text-xl leading-snug text-[#141414] line-clamp-2 cursor-pointer hover:text-[#062058] transition-colors"
            >
              {title}
            </h3>

            {/* Description (Fixed line clamp) */}
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#5C5549] font-light">
              {description}
            </p>

            {isLongDescription && (
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-semibold text-[#141414] transition hover:text-[#062058] cursor-pointer"
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
                    className="inline-flex items-center gap-1 rounded-full border border-[#E8E4D9] bg-[#F8F6F0] px-2.5 py-0.5 text-[11px] font-medium text-[#5C5549] transition hover:border-[#141414] hover:text-[#141414] cursor-pointer"
                  >
                    <Hash size={10} className="text-[#736B5E]" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer info & links */}
          <div className="mt-5 flex items-center justify-between border-t border-[#E8E4D9] pt-4 text-[12px] text-[#736B5E]">
            <time dateTime={post.publishedDate} className="flex items-center gap-1 text-[#736B5E]">
              <Calendar size={12} />
              <span>{formatFeedDate(post.publishedDate, locale)}</span>
            </time>
            {post.readMoreUrl ? (
              <a
                href={post.readMoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#141414] transition hover:underline"
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
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] border border-[#E8E4D9] bg-[#FAF8F5] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Media Header */}
            {post.contentType === "YOUTUBE" && post.youtubeUrl ? (
              <div className="relative aspect-video w-full">
                <YoutubeEmbed url={post.youtubeUrl} title={title} />
              </div>
            ) : post.image ? (
              <div className="relative aspect-[16/10] w-full bg-[#F8F6F0]">
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
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#736B5E]">
                  {category}
                </span>
                <span className="text-xs text-[#736B5E]">
                  • {formatFeedDate(post.publishedDate, locale)}
                </span>
              </div>

              <h2 className="mt-4 font-display text-2xl text-[#141414] md:text-3xl">
                {title}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#5C5549] font-light whitespace-pre-line">
                {description}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-[#E8E4D9] pt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full border border-[#E8E4D9] bg-[#F8F6F0] px-3 py-1 text-xs font-medium text-[#5C5549]"
                    >
                      <Hash size={11} className="text-[#736B5E]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="mt-6 flex items-center justify-between border-t border-[#E8E4D9] pt-4">
                {post.readMoreUrl ? (
                  <Button asChild className="bg-[#141414] text-[#F8F6F0] hover:bg-[#2C2A26]" size="sm">
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
                  className="border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-[#F8F6F0]"
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
