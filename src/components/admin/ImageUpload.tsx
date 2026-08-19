"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Upload, X, ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onImageChange: (path: string) => void;
}

export function ImageUpload({
  value,
  onImageChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = (await res.json()) as { ok?: boolean; path?: string; error?: string };
      if (!res.ok || !json.path) throw new Error(json.error ?? "Upload failed");
      onImageChange(json.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    void uploadFile(files[0]);
  }

  return (
    <div className="space-y-4">
      {/* Drop zone / Image Preview */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-200",
          dragging ? "border-saffron bg-saffron/5" : "border-line bg-surface",
          value ? "min-h-[220px]" : "min-h-[160px]",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        {value ? (
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={value}
              alt="Uploaded Preview"
              fill
              sizes="600px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            {/* Top controls */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                <CheckCircle2 size={13} className="text-forest" />
                Photo ready
              </span>
              <button
                type="button"
                onClick={() => onImageChange("")}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-red-500"
                title="Remove photo"
              >
                <X size={15} />
              </button>
            </div>

            {/* Bottom replace button */}
            <div className="absolute bottom-3 left-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-black/70 px-3.5 py-1.5 text-[12px] font-medium text-white backdrop-blur-md transition hover:bg-black/90"
              >
                <Upload size={13} />
                <span>Replace Photo</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-3 py-10"
          >
            {uploading ? (
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-saffron border-t-transparent" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper shadow-sm">
                <ImageIcon size={22} className="text-navy" />
              </div>
            )}
            <div className="text-center">
              <p className="text-[13px] font-medium text-ink">
                {uploading ? "Uploading photo…" : "Drag & drop photo here or click to browse"}
              </p>
              <p className="mt-1 text-[11px] text-muted">Supports JPG, PNG, WebP · Max 10 MB</p>
            </div>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-[12px] text-red-600">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {/* Manual URL input */}
      <div>
        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          Or Enter Photo Path / URL
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onImageChange(e.target.value)}
          placeholder="/images/work/example.jpg or https://..."
          className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-[13px] text-ink outline-none transition placeholder:text-muted focus:border-navy focus:shadow-[0_0_0_3px_rgba(14,28,64,0.08)]"
        />
      </div>
    </div>
  );
}
