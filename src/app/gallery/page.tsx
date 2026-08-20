import type { Metadata } from "next";
import Link from "next/link";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryIntro } from "@/components/gallery/GalleryIntro";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from the public life of Santosh S. Lad — labour programmes, constituency work, rescue operations and moments with the people of Karnataka.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-20 pt-24 sm:px-6 sm:pt-28 md:px-8 md:pt-32">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-[#736B5E]">
        <Link href="/" className="hover:text-[#141414] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#141414] font-semibold">Gallery</span>
        <span className="mx-2 text-[#DCD6C9]">|</span>
        <Link href="/latest" className="hover:text-[#141414] transition-colors">Latest Feed</Link>
        <span className="mx-1">•</span>
        <Link href="/timeline" className="hover:text-[#141414] transition-colors">Timeline</Link>
      </nav>
      <GalleryIntro />
      <div className="mt-12">
        <GalleryGrid />
      </div>
    </section>
  );
}

