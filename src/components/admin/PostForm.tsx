"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Save,
  Eye,
  EyeOff,
  Globe,
  ImageIcon,
  Video,
  FileText,
  Calendar,
  Link2,
  Sparkles,
  Layers,
  ArrowRight,
  Newspaper,
} from "lucide-react";
import { FEED_CATEGORIES, GALLERY_CATEGORIES } from "@/types/post";
import type { Post, PublishDestination } from "@/types/post";
import { TagInput } from "@/components/admin/TagInput";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { CategorySelect } from "@/components/admin/CategorySelect";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { saveLocalPost } from "@/lib/custom-posts";

interface PostFormProps {
  initial?: Partial<Post>;
  mode: "create" | "edit";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function nowDatetime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

export function PostForm({ initial, mode }: PostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [slugManual, setSlugManual] = useState(mode === "edit");

  const [form, setForm] = useState<{
    title: string;
    titleKn: string;
    slug: string;
    description: string;
    descriptionKn: string;
    contentType: "IMAGE" | "YOUTUBE";
    image: string;
    youtubeUrl: string;
    category: string;
    tags: string[];
    publishedDate: string;
    readMoreUrl: string;
    featured: boolean;
    status: "draft" | "published";
    publishDestination: PublishDestination;
  }>({
    title: initial?.title ?? "",
    titleKn: initial?.titleKn ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    descriptionKn: initial?.descriptionKn ?? "",
    contentType: initial?.contentType ?? "IMAGE",
    image: initial?.image ?? "",
    youtubeUrl: initial?.youtubeUrl ?? "",
    category: initial?.category ?? FEED_CATEGORIES[0],
    tags: initial?.tags ?? [],
    publishedDate: initial?.publishedDate
      ? initial.publishedDate.length === 10
        ? initial.publishedDate + "T09:00"
        : initial.publishedDate.slice(0, 16)
      : nowDatetime(),
    readMoreUrl: initial?.readMoreUrl ?? "",
    featured: initial?.featured ?? true,
    status: initial?.status ?? "published",
    publishDestination: initial?.publishDestination ?? "FEED",
  });

  // Fetch tag suggestions
  useEffect(() => {
    fetch("/api/admin/tags")
      .then((r) => r.json())
      .then((d: { tags?: string[] }) => setSuggestions(d.tags ?? []))
      .catch(() => {});
  }, []);

  // Auto-slug from title
  useEffect(() => {
    if (!slugManual && form.title) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, slugManual]);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleDestinationChange(dest: PublishDestination) {
    const validCats =
      dest === "GALLERY"
        ? (GALLERY_CATEGORIES as readonly string[])
        : dest === "BOTH"
          ? [...FEED_CATEGORIES, ...GALLERY_CATEGORIES]
          : (FEED_CATEGORIES as readonly string[]);

    setForm((f) => ({
      ...f,
      publishDestination: dest,
      category: validCats.includes(f.category) ? f.category : "Labour",
    }));
  }

  async function handleSubmit(status: "draft" | "published") {
    const finalTitle = form.title.trim() || (form.publishDestination === "GALLERY" ? `${form.category} Photo` : "");
    const finalSlug = form.slug.trim() || (form.publishDestination === "GALLERY" ? slugify(`${form.category}-${Date.now().toString().slice(-6)}`) : "");
    const finalDesc = form.description.trim() || (form.publishDestination === "GALLERY" ? form.category : "");

    if (form.publishDestination !== "GALLERY") {
      if (!form.title.trim()) {
        setError("Title is required.");
        return;
      }
      if (!form.slug.trim()) {
        setError("Slug is required.");
        return;
      }
      if (!form.description.trim()) {
        setError("Description is required.");
        return;
      }
    }

    if (form.contentType === "IMAGE" && !form.image.trim()) {
      setError("Please provide an image for photo posts.");
      return;
    }
    if (form.contentType === "YOUTUBE" && !form.youtubeUrl.trim()) {
      setError("Please provide a valid YouTube URL for video posts.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload: Partial<Post> = {
      title: finalTitle,
      titleKn: form.publishDestination === "GALLERY" ? undefined : form.titleKn.trim() || undefined,
      slug: finalSlug,
      description: finalDesc,
      descriptionKn: form.publishDestination === "GALLERY" ? undefined : form.descriptionKn.trim() || undefined,
      contentType: form.contentType,
      image: form.contentType === "IMAGE" ? form.image.trim() : undefined,
      youtubeUrl: form.contentType === "YOUTUBE" ? form.youtubeUrl.trim() : undefined,
      category: form.category as Post["category"],
      tags: form.tags,
      publishedDate: form.publishedDate,
      readMoreUrl: form.readMoreUrl.trim() || undefined,
      featured: form.featured,
      status,
      publishDestination: form.publishDestination,
    };

    try {
      const url =
        mode === "edit"
          ? `/api/admin/posts/${initial!.slug}`
          : "/api/admin/posts";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; post?: Post };
      if (!res.ok) throw new Error(json.error ?? "Save failed");

      // Save locally to guarantee persistence across serverless cold starts
      const finalPost = json.post ?? (payload as Post);
      if (finalPost.slug) {
        saveLocalPost(finalPost);
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-paper px-4 py-3 text-[13px] text-ink outline-none transition placeholder:text-muted focus:border-navy focus:shadow-[0_0_0_3px_rgba(14,28,64,0.08)]";
  const labelClass =
    "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted";
  const sectionClass = "rounded-3xl border border-line bg-paper p-6 md:p-8 shadow-sm";

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-[13px] font-medium text-red-600">
          {error}
        </div>
      )}

      {/* ── Publish Destination ── */}
      <div className={sectionClass}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-saffron-deep" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">
              Publish Destination / Target Location
            </h2>
          </div>
          <span className="text-[11px] text-muted font-medium">Select where this content will appear</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => handleDestinationChange("FEED")}
            className={cn(
              "flex flex-col items-start p-4 rounded-2xl border transition-all text-left cursor-pointer",
              form.publishDestination === "FEED"
                ? "border-saffron-deep bg-saffron/10 dark:bg-saffron/20 shadow-sm ring-2 ring-saffron/30"
                : "border-line bg-paper hover:border-saffron/40 hover:bg-surface"
            )}
          >
            <div className="flex items-center gap-2 font-semibold text-ink text-sm">
              <Newspaper size={16} className="text-saffron-deep dark:text-saffron" />
              <span>Feed & Latest News</span>
            </div>
            <p className="mt-1 text-[11px] text-muted leading-relaxed">
              Publishes to the main Latest Feed page (/latest) and home feed.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleDestinationChange("GALLERY")}
            className={cn(
              "flex flex-col items-start p-4 rounded-2xl border transition-all text-left cursor-pointer",
              form.publishDestination === "GALLERY"
                ? "border-emerald-600 bg-emerald-500/10 dark:bg-emerald-500/20 shadow-sm ring-2 ring-emerald-500/30"
                : "border-line bg-paper hover:border-emerald-500/40 hover:bg-surface"
            )}
          >
            <div className="flex items-center gap-2 font-semibold text-ink text-sm">
              <ImageIcon size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>Media Gallery Only</span>
            </div>
            <p className="mt-1 text-[11px] text-muted leading-relaxed">
              Uploads directly to the Public Photo & Video Gallery page (/gallery).
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleDestinationChange("BOTH")}
            className={cn(
              "flex flex-col items-start p-4 rounded-2xl border transition-all text-left cursor-pointer",
              form.publishDestination === "BOTH"
                ? "border-amber-600 bg-amber-500/10 dark:bg-amber-500/20 shadow-sm ring-2 ring-amber-500/30"
                : "border-line bg-paper hover:border-amber-500/40 hover:bg-surface"
            )}
          >
            <div className="flex items-center gap-2 font-semibold text-ink text-sm">
              <Sparkles size={16} className="text-amber-600 dark:text-amber-400" />
              <span>Both (Feed & Gallery)</span>
            </div>
            <p className="mt-1 text-[11px] text-muted leading-relaxed">
              Publishes to both Latest News Feed and Media Gallery simultaneously.
            </p>
          </button>
        </div>
      </div>

      {/* ── Bilingual Content ── */}
      {form.publishDestination !== "GALLERY" && (
        <div className={sectionClass}>
          <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-saffron-deep" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">
                Post Content (Bilingual)
              </h2>
            </div>
            <span className="text-[11px] text-muted">English & Kannada</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* English Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-ink">
                <Globe size={14} className="text-saffron-deep" />
                <span>English Details</span>
              </div>
              <div>
                <label className={labelClass}>Title (English)</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. 100 Hi-Tech Mobile Health Units"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Description (English)</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Write comprehensive description for the post…"
                  className={cn(inputClass, "resize-none")}
                />
              </div>
            </div>

            {/* Kannada Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-ink">
                <span className="flex h-4 w-4 items-center justify-center rounded bg-saffron/15 text-[11px] font-bold text-saffron-deep">
                  ಕ
                </span>
                <span>ಕನ್ನಡ ವಿವರಗಳು (Optional)</span>
              </div>
              <div>
                <label className={labelClass}>ಶೀರ್ಷಿಕೆ (ಕನ್ನಡ)</label>
                <input
                  type="text"
                  value={form.titleKn}
                  onChange={(e) => set("titleKn", e.target.value)}
                  placeholder="ಕನ್ನಡದಲ್ಲಿ ಶೀರ್ಷಿಕೆ ನಮೂದಿಸಿ"
                  className={cn(inputClass, "[font-family:var(--font-kn-sans),sans-serif]")}
                />
              </div>
              <div>
                <label className={labelClass}>ವಿವರಣೆ (ಕನ್ನಡ)</label>
                <textarea
                  rows={4}
                  value={form.descriptionKn}
                  onChange={(e) => set("descriptionKn", e.target.value)}
                  placeholder="ಕನ್ನಡದಲ್ಲಿ ಸಂಪೂರ್ಣ ವಿವರಣೆ ಬರೆಯಿರಿ…"
                  className={cn(inputClass, "resize-none [font-family:var(--font-kn-sans),sans-serif]")}
                />
              </div>
            </div>
          </div>
        </div>
      )}



      {/* ── Media Selection (Lucide Icons, No Emojis) ── */}
      <div className={sectionClass}>
        <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <ImageIcon size={16} className="text-saffron-deep" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">
              Media Type
            </h2>
          </div>
          <span className="text-[11px] text-muted">Photo or YouTube Link</span>
        </div>

        {/* Media Type Switcher with Lucide Icons */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => set("contentType", "IMAGE")}
            className={cn(
              "flex items-center justify-center gap-2.5 rounded-2xl border py-3.5 text-[13px] font-medium transition-all duration-200 cursor-pointer",
              form.contentType === "IMAGE"
                ? "border-saffron-deep bg-saffron text-[#0e1c40] font-semibold shadow-sm dark:bg-saffron dark:text-[#0e1c40]"
                : "border-line bg-paper text-charcoal hover:border-saffron/40 hover:bg-surface dark:bg-slate-800/80 dark:text-slate-200",
            )}
          >
            <ImageIcon size={16} />
            <span>Photo Upload</span>
          </button>

          <button
            type="button"
            onClick={() => set("contentType", "YOUTUBE")}
            className={cn(
              "flex items-center justify-center gap-2.5 rounded-2xl border py-3.5 text-[13px] font-medium transition-all duration-200 cursor-pointer",
              form.contentType === "YOUTUBE"
                ? "border-saffron-deep bg-saffron text-[#0e1c40] font-semibold shadow-sm dark:bg-saffron dark:text-[#0e1c40]"
                : "border-line bg-paper text-charcoal hover:border-saffron/40 hover:bg-surface dark:bg-slate-800/80 dark:text-slate-200",
            )}
          >
            <Video size={17} />
            <span>YouTube Video</span>
          </button>
        </div>

        {form.contentType === "IMAGE" ? (
          <ImageUpload
            value={form.image}
            onImageChange={(v) => set("image", v)}
          />
        ) : (
          <div className="space-y-3">
            <label className={labelClass}>YouTube Video URL</label>
            <input
              type="url"
              value={form.youtubeUrl}
              onChange={(e) => set("youtubeUrl", e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className={inputClass}
            />
            {form.youtubeUrl && (() => {
              const id = form.youtubeUrl.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
              return id ? (
                <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface p-3">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted">
                    Video Thumbnail Preview
                  </p>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                      alt="YouTube thumbnail preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>

      {/* ── Metadata & Categorization ── */}
      <div className={sectionClass}>
        <div className="mb-5 flex items-center gap-2 border-b border-line pb-4">
          <Layers size={16} className="text-saffron-deep" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">
            Publishing Metadata & Tags
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Category</label>
            <CategorySelect
              value={form.category}
              onChange={(val) => set("category", val)}
              destination={form.publishDestination}
            />
          </div>

          <div>
            <label className={labelClass}>Publish Date & Time</label>
            <input
              type="datetime-local"
              value={form.publishedDate}
              onChange={(e) => set("publishedDate", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Hashtags & Tags</label>
            <TagInput
              value={form.tags}
              onChange={(tags) => set("tags", tags)}
              suggestions={suggestions}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>
              Official News Website / External Article Link (Optional)
            </label>
            <input
              type="url"
              value={form.readMoreUrl}
              onChange={(e) => set("readMoreUrl", e.target.value)}
              placeholder="https://karnataka.gov.in/news/... or https://..."
              className={inputClass}
            />
            <p className="mt-1.5 text-[11px] text-muted">
              Optional: Enter the official news website or source URL for this post. When provided, visitors clicking &quot;Link&quot; on the public website will be taken directly to this official link.
            </p>
          </div>
        </div>
      </div>

      {/* ── Sticky Bottom Action Bar ── */}
      <div className="sticky bottom-4 z-30">
        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-paper/95 px-6 py-4 shadow-[0_12px_40px_rgba(14,28,64,0.15)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-end">

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() => handleSubmit("draft")}
              className="flex-1 sm:flex-none"
            >
              <EyeOff size={14} />
              <span>Save as Draft</span>
            </Button>

            <Button
              type="button"
              variant="forest"
              disabled={saving}
              onClick={() => handleSubmit("published")}
              className="flex-1 sm:flex-none"
            >
              {saving ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Eye size={14} />
              )}
              <span>Publish Post</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
