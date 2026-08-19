"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { X, ZoomIn, Play } from "lucide-react";
import { useContent } from "@/i18n/language";
import { Button } from "@/components/ui/button";
import { cn, getPostThumbnail } from "@/lib/utils";
import type { Post } from "@/types/post";
import { YoutubeEmbed } from "@/components/feed/YoutubeEmbed";

const filters = [
  "All",
  "Portrait",
  "Rescue",
  "Special Occasions",
  "Labour",
  "Dharwad",
  "Kalaghatgi",
  "Public Life",
  "Dignitaries",
] as const;

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  category: string;
  slug?: string;
  youtubeUrl?: string;
}

export function GalleryGrid() {
  const { gallery } = useContent();
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);
  const [dynamicPosts, setDynamicPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Clear legacy browser local storage cache
    try {
      localStorage.removeItem("sl_custom_posts");
    } catch {}

    async function loadGalleryPosts() {
      try {
        const res = await fetch("/api/posts");
        const data = res.ok ? await res.json() : { posts: [] };
        const serverPosts: Post[] = Array.isArray(data.posts) ? data.posts : [];
        setDynamicPosts(serverPosts);
      } catch {
        setDynamicPosts([]);
      }
    }
    loadGalleryPosts();
  }, []);

  const allItems = useMemo<GalleryItem[]>(() => {
    const dynamicItems: GalleryItem[] = dynamicPosts
      .filter(
        (p) =>
          p.status === "published" &&
          (p.publishDestination === "GALLERY" || p.publishDestination === "BOTH")
      )
      .map((p) => {
        const thumb = getPostThumbnail(p) || p.image || "";
        return {
          src: thumb,
          alt: p.title,
          caption: p.title,
          category: p.category || "Public Life",
          youtubeUrl: p.youtubeUrl,
          slug: p.slug,
        };
      });

    return dynamicItems;
  }, [dynamicPosts]);

  const visible = useMemo(() => {
    if (filter === "All") return allItems;
    return allItems.filter((item) => item.category === filter);
  }, [filter, allItems]);

  const activeItem = active === null ? null : visible[active];

  return (
    <div>
      {/* Category filter pills */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
        {filters.map((item) => {
          const isActive = filter === item;
          const label = item === "All" ? gallery.all : (gallery.categories[item as keyof typeof gallery.categories] || item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => {
                setFilter(item);
                setActive(null);
              }}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200 cursor-pointer",
                isActive
                  ? "border-[#141414] bg-[#141414] text-[#F8F6F0] shadow-sm"
                  : "border-[#E8E4D9] bg-[#FAF8F5] text-[#5C5549] hover:border-[#141414]/40 hover:text-[#141414]",
              )}
            >
              {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#F8F6F0]" />
              )}
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-[#666055] font-light">{gallery.empty}</p>
      ) : (
        /* Uniform Grid */
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <article
              key={`${item.slug || item.src}-${index}`}
              onClick={() => setActive(index)}
              className="group flex flex-col overflow-hidden rounded-[26px] border border-[#E8E4D9] bg-[#FAF8F5] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8F6F0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt || "Gallery item"}
                  width="400"
                  height="300"
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Hover indicator */}
                <span className="absolute bottom-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#141414] opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 group-hover:opacity-100">
                  {item.youtubeUrl ? <Play size={15} className="ml-0.5 fill-[#141414]" /> : <ZoomIn size={15} />}
                </span>
              </div>

              {/* Category Badge Only */}
              <div className="p-4 md:p-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#736B5E]">
                  {gallery.categories[item.category as keyof typeof gallery.categories] || item.category}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeItem ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <X size={20} />
          </button>

          <figure
            className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-[#E8E4D9] bg-[#FAF8F5] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative max-h-[75vh] min-h-[300px] w-full bg-black/95 sm:aspect-[16/10] flex items-center justify-center">
              {activeItem.youtubeUrl ? (
                <div className="w-full h-full p-2">
                  <YoutubeEmbed url={activeItem.youtubeUrl} title={activeItem.caption} />
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={activeItem.src}
                  alt={activeItem.alt}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              )}
            </div>
            <figcaption className="flex items-center justify-between p-5 md:p-6 bg-[#FAF8F5]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#736B5E]">
                  {gallery.categories[activeItem.category as keyof typeof gallery.categories] || activeItem.category}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActive(null)}
                className="border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-[#F8F6F0]"
              >
                Close
              </Button>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
