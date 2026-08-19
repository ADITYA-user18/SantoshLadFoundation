"use client";

import { useState } from "react";
import { Search, X, Hash } from "lucide-react";
import { FEED_CATEGORIES, type FeedCategory } from "@/types/post";
import { useContent } from "@/i18n/language";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categoryFilters = ["All", ...FEED_CATEGORIES] as const;

interface FeedFiltersProps {
  activeCategory: "All" | FeedCategory;
  activeTag: string;
  search: string;
  onCategoryChange: (value: "All" | FeedCategory) => void;
  onTagChange: (tag: string) => void;
  onSearchChange: (value: string) => void;
  allTags: string[];
}

export function FeedFilters({
  activeCategory,
  activeTag,
  search,
  onCategoryChange,
  onTagChange,
  onSearchChange,
  allTags,
}: FeedFiltersProps) {
  const { feed } = useContent();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search
          size={15}
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
            searchFocused ? "text-[#141414]" : "text-[#736B5E]",
          )}
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search by keywords, titles, or initiatives…"
          className={cn(
            "w-full rounded-2xl border bg-[#FAF8F5] py-3 pl-11 pr-10 text-[13px] text-[#141414] shadow-sm outline-none transition-all duration-200 placeholder:text-[#8C8476]",
            searchFocused
              ? "border-[#141414] shadow-[0_0_0_3px_rgba(20,20,20,0.08)] ring-1 ring-[#141414]"
              : "border-[#E8E4D9] hover:border-[#141414]/40",
          )}
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#736B5E] transition hover:text-[#141414] cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {categoryFilters.map((filter) => {
          const isActive = activeCategory === filter;
          const label = filter === "All" ? feed.all : ((feed.categories as Record<string, string>)?.[filter] || filter);
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onCategoryChange(filter)}
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

      {/* Tag pills */}
      {allTags.length > 0 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {activeTag && (
            <button
              type="button"
              onClick={() => onTagChange("")}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#141414] bg-[#141414] px-3.5 py-1.5 text-[12px] font-semibold text-[#F8F6F0] transition hover:bg-[#2C2A26] cursor-pointer"
            >
              <X size={11} /> #{activeTag}
            </button>
          )}
          {allTags
            .filter((t) => t !== activeTag)
            .map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onTagChange(tag)}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#E8E4D9] bg-[#FAF8F5] px-3.5 py-1.5 text-[12px] text-[#5C5549] transition hover:border-[#141414]/40 hover:text-[#141414] cursor-pointer"
              >
                <Hash size={10} className="text-[#736B5E]" />
                <span>{tag}</span>
              </button>
            ))}
        </div>
      )}

      {/* Active filter summary */}
      {(search || activeTag || activeCategory !== "All") && (
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#736B5E] pt-1">
          <span>Active filter:</span>
          {activeCategory !== "All" && (
            <Badge className="bg-[#141414] text-[#F8F6F0]">{activeCategory}</Badge>
          )}
          {activeTag && (
            <Badge className="bg-[#5C5549] text-[#F8F6F0]">#{activeTag}</Badge>
          )}
          {search && (
            <Badge variant="outline" className="border-[#141414] text-[#141414]">"{search}"</Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onCategoryChange("All");
              onTagChange("");
              onSearchChange("");
            }}
            className="h-6 px-2 text-[11px] text-[#736B5E] underline hover:text-[#141414]"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
