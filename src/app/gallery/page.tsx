import type { Metadata } from "next";
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
      <GalleryIntro />
      <div className="mt-12">
        <GalleryGrid />
      </div>
    </section>
  );
}
