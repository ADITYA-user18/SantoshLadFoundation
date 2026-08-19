"use client";

import { useState } from "react";
import { Navbar } from "@/components/foundation/Navbar";
import { JoinModal } from "@/components/foundation/JoinModal";

export function Header() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenJoin={() => setIsJoinModalOpen(true)} />
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </>
  );
}
