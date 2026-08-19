import type { Metadata } from "next";
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
      <LatestIntro />
      <div className="mt-12">
        <LatestFeed posts={posts} />
      </div>
    </section>
  );
}
