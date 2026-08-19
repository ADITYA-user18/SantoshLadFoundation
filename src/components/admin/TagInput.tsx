"use client";

import { useEffect, useRef, useState } from "react";
import { X, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
}

export function TagInput({
  value,
  onChange,
  suggestions = [],
  placeholder = "Add a tag and press Enter…",
}: TagInputProps) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = suggestions.filter(
    (s) =>
      s.toLowerCase().includes(input.toLowerCase()) &&
      !value.includes(s) &&
      input.length > 0,
  );

  function addTag(raw: string) {
    const tag = raw.trim().replace(/^#/, "").replace(/\s+/g, "");
    if (!tag || value.includes(tag) || value.length >= 20) return;
    onChange([...value, tag]);
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && input === "" && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  }

  return (
    <div className="relative">
      {/* Tag pills + input area */}
      <div
        className={cn(
          "flex min-h-[48px] flex-wrap gap-2 rounded-xl border bg-paper px-3 py-2 transition-all duration-200",
          focused ? "border-navy shadow-[0_0_0_3px_rgba(14,28,64,0.08)]" : "border-line",
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full border border-saffron/40 bg-saffron/8 px-2.5 py-1 text-[12px] font-medium text-saffron-deep"
          >
            <Hash size={10} />
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-0.5 rounded-full p-0.5 text-saffron-deep/60 transition hover:text-saffron-deep"
              aria-label={`Remove ${tag}`}
            >
              <X size={10} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            if (input.trim()) addTag(input);
          }}
          placeholder={value.length === 0 ? placeholder : ""}
          className="min-w-[120px] flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
        />
      </div>

      {/* Suggestions dropdown */}
      {focused && filteredSuggestions.length > 0 && (
        <div className="absolute left-0 top-full z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-line bg-paper shadow-[0_8px_24px_rgba(17,17,17,0.10)]">
          {filteredSuggestions.slice(0, 8).map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                addTag(s);
              }}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] text-charcoal transition hover:bg-surface"
            >
              <Hash size={11} className="text-saffron-deep" />
              {s}
            </button>
          ))}
        </div>
      )}

      <p className="mt-1.5 text-[11px] text-muted">
        Press <kbd className="rounded border border-line bg-surface px-1 py-0.5 text-[10px]">Enter</kbd> or{" "}
        <kbd className="rounded border border-line bg-surface px-1 py-0.5 text-[10px]">,</kbd> to add a tag
      </p>
    </div>
  );
}
