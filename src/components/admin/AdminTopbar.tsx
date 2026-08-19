"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { Button } from "@/components/ui/button";

interface AdminTopbarProps {
  onMenuOpen: () => void;
}

function useBreadcrumbs(pathname: string) {
  const crumbs: { label: string; href: string }[] = [
    { label: "Admin", href: "/admin" },
  ];
  if (pathname.startsWith("/admin/posts/new")) {
    crumbs.push({ label: "Posts", href: "/admin/posts" });
    crumbs.push({ label: "New Post", href: "/admin/posts/new" });
  } else if (pathname.match(/^\/admin\/posts\/[^/]+$/)) {
    crumbs.push({ label: "Posts", href: "/admin/posts" });
    crumbs.push({ label: "Edit Post", href: pathname });
  } else if (pathname === "/admin/posts") {
    crumbs.push({ label: "Posts", href: "/admin/posts" });
  }
  return crumbs;
}

export function AdminTopbar({ onMenuOpen }: AdminTopbarProps) {
  const pathname = usePathname();
  const crumbs = useBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-bg/90 px-4 backdrop-blur-sm md:px-6">
      {/* Left: hamburger + breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-paper text-charcoal transition hover:border-saffron/40 lg:hidden cursor-pointer"
          aria-label="Open menu"
        >
          <Menu size={16} />
        </button>
        <nav className="flex items-center gap-1.5 text-[13px]">
          {crumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} className="text-muted" />}
              {i === crumbs.length - 1 ? (
                <span className="font-semibold text-ink">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-muted hover:text-ink">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Right: theme toggle + view public site */}
      <div className="flex items-center gap-2.5">
        <ThemeToggle />
        <Button asChild variant="outline" size="sm" className="rounded-full px-3.5 h-8">
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={12} />
            <span>View Site</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
