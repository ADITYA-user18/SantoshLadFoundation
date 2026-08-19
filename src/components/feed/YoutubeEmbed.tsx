"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { useContent } from "@/i18n/language";
import { youtubeIdFromUrl } from "@/lib/utils";

export function YoutubeEmbed({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [active, setActive] = useState(false);
  const { ui } = useContent();
  const id = youtubeIdFromUrl(url);

  if (!id) {
    return (
      <div className="flex aspect-video items-center justify-center bg-surface text-sm text-muted">
        {ui.videoUnavailable}
      </div>
    );
  }

  if (!active) {
    return (
      <button
        type="button"
        onClick={() => setActive(true)}
        className="group relative block aspect-video w-full overflow-hidden bg-ink"
        aria-label={`Play ${title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          alt=""
          className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <span className="absolute inset-0 bg-black/25" />
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
          <Play size={20} fill="currentColor" />
        </span>
      </button>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden bg-ink">
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
