"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  PlusCircle,
  LogOut,
  X,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts", label: "All Posts", icon: Newspaper, exact: false },
  { href: "/admin/posts/new", label: "New Post", icon: PlusCircle, exact: true },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-full w-64 flex-col bg-[#0e1c40] text-white shadow-2xl">
      {/* Tricolor top line */}
      <div className="flex h-1 w-full shrink-0">
        <span className="flex-1 bg-saffron" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-forest" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.25)] ring-1 ring-white/20">
            <Image
              src="/images/brand/congress-hand.png"
              alt="Indian National Congress"
              width={26}
              height={26}
              className="object-contain"
              priority
            />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-saffron">CMS Admin</span>
              <ShieldCheck size={11} className="text-saffron" />
            </div>
            <p className="truncate font-serif text-sm font-medium tracking-wide text-white">
              Santosh S. Lad
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="px-3 pt-4 pb-2">
        <p className="px-3 text-[10px] uppercase tracking-[0.2em] text-white/40">Navigation</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-3">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href) &&
              item.href !== "/admin" &&
              !(item.href === "/admin/posts" && pathname === "/admin/posts/new");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200",
                active
                  ? "bg-white/15 text-white shadow-sm ring-1 ring-white/20"
                  : "text-white/70 hover:bg-white/8 hover:text-white",
              )}
            >
              <Icon
                size={17}
                strokeWidth={1.8}
                className={cn(
                  "transition-colors",
                  active ? "text-saffron" : "text-white/50 group-hover:text-white/80",
                )}
              />
              <span className="flex-1">{item.label}</span>
              {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-saffron shadow-[0_0_8px_rgba(255,153,51,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3 space-y-2">
        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5 text-[12px] text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={14} className="text-forest" />
            <span>View Public Site</span>
          </span>
          <span className="text-[11px] text-white/40">Live ↗</span>
        </Link>

        <div className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Logged In</p>
            <p className="truncate text-[12px] font-medium text-white">superadmin</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Sign out"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition hover:bg-red-500/20 hover:text-red-300"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
