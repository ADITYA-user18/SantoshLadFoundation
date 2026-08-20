import type { Metadata } from "next";
import Link from "next/link";
import { LatestFeed } from "@/components/feed/LatestFeed";
import { LatestIntro } from "@/components/feed/LatestIntro";
import { getAllPosts } from "@/lib/cms";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Latest Feed",
  description:
    "Latest public updates from the office and work of Santosh S. Lad — labour, development, Dharwad, Janatha Darshan, and rescue operations.",
  alternates: {
    canonical: "/latest",
  },
};

export default async function LatestPage() {
  const posts = await getAllPosts();

  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-20 pt-24 sm:px-6 sm:pt-28 md:px-8 md:pt-32">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-[#736B5E]">
        <Link href="/" className="hover:text-[#141414] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#141414] font-semibold">Latest Feed</span>
        <span className="mx-2 text-[#DCD6C9]">|</span>
        <Link href="/gallery" className="hover:text-[#141414] transition-colors">Gallery</Link>
        <span className="mx-1">•</span>
        <Link href="/timeline" className="hover:text-[#141414] transition-colors">Timeline</Link>
      </nav>
      <LatestIntro />
      <div className="mt-12">
        <LatestFeed posts={posts} />
      </div>
    </section>
  );
}

