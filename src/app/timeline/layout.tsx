import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Interactive 3D timeline of Santosh S. Lad's career, public service milestones, legislative achievements, and leadership journey.",
  alternates: {
    canonical: "/timeline",
  },
};

export default function TimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
