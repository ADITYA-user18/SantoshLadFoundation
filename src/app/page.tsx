"use client";

import React, { useState } from "react";
import { Hero } from "@/components/foundation/Hero";
import { Philosophy } from "@/components/foundation/Philosophy";
import { FocusBento } from "@/components/foundation/FocusBento";
import { ImpactNumbers } from "@/components/foundation/ImpactNumbers";
import { StoryChapters } from "@/components/foundation/StoryChapters";
import { CrisisSection } from "@/components/foundation/CrisisSection";
import { FounderStory } from "@/components/foundation/FounderStory";
import { ClosingCTA } from "@/components/foundation/ClosingCTA";
import { Footer } from "@/components/foundation/Footer";
import { JoinModal } from "@/components/foundation/JoinModal";

export const dynamic = "force-dynamic";

export default function Home() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleExploreWork = () => {
    const el = document.getElementById("focus-areas");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenStory = (chapterId: string) => {
    const el = document.getElementById("chapters");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#141414] flex flex-col font-sans selection:bg-[#141414] selection:text-[#F8F6F0]">
      {/* Main Editorial Experience */}
      <div className="flex-1">
        {/* 1. Hero: Centered Typography + Curved Arc Portrait Gallery + 3 Minimal Columns */}
        <Hero
          onExploreWork={handleExploreWork}
          onOpenJoin={() => setIsJoinModalOpen(true)}
        />

        {/* 2. Guiding Philosophy */}
        <Philosophy />

        {/* 3. Our Focus Areas: Bento Card Layout */}
        <FocusBento onOpenStory={handleOpenStory} />

        {/* 4. Impact / Numbers */}
        <ImpactNumbers />

        {/* 5. Stories from the Field */}
        <StoryChapters onOpenJoin={() => setIsJoinModalOpen(true)} />

        {/* 6. Crisis Response */}
        <CrisisSection />

        {/* 7. Founder Story */}
        <FounderStory />

        {/* 8. Closing CTA */}
        <ClosingCTA onOpenJoin={() => setIsJoinModalOpen(true)} />
      </div>

      {/* 9. Minimal Clean Footer */}
      <Footer onOpenJoin={() => setIsJoinModalOpen(true)} />

      {/* Interactive Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}
