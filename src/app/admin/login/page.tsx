"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Shield, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Invalid credentials");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      {/* Top tricolor bar */}
      <div className="flex h-1 w-full">
        <span className="flex-1 bg-saffron" />
        <span className="flex-1 bg-white border-y border-line" />
        <span className="flex-1 bg-forest" />
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Brand Logo */}
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <div className="relative h-16 w-16 overflow-hidden rounded-full shadow-[0_4px_20px_rgba(14,28,64,0.18)] ring-2 ring-white">
              <Image
                src="/images/brand/congress-hand.png"
                alt="Indian National Congress"
                fill
                sizes="64px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-saffron-deep">
                Official CMS Portal
              </span>
              <h1 className="mt-1 font-display text-3xl text-navy">
                Santosh S. Lad
              </h1>
              <p className="mt-1 text-xs text-muted">
                Minister for Labour, Government of Karnataka
              </p>
            </div>
          </div>

          {/* Login Card */}
          <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_12px_48px_rgba(14,28,64,0.08)]">
            <div className="border-b border-line bg-surface/60 px-6 py-4">
              <div className="flex items-center gap-2 text-[12px] font-medium text-navy">
                <Shield size={14} className="text-saffron-deep" />
                <span>Secure Administrator Login</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Username
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="superadmin"
                    required
                    className="w-full rounded-2xl border border-line bg-bg py-3 pl-10 pr-4 text-[13px] text-ink outline-none transition placeholder:text-muted focus:border-navy focus:shadow-[0_0_0_3px_rgba(14,28,64,0.08)]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-2xl border border-line bg-bg py-3 pl-10 pr-11 text-[13px] text-ink outline-none transition placeholder:text-muted focus:border-navy focus:shadow-[0_0_0_3px_rgba(14,28,64,0.08)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted transition hover:text-ink cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-2xl text-[13px] font-semibold"
                >
                  {loading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  )}
                  <span>{loading ? "Signing in…" : "Sign in to Dashboard"}</span>
                  {!loading && <ArrowRight size={14} />}
                </Button>
              </div>
            </form>
          </div>

          <p className="mt-6 text-center text-[11px] text-muted">
            Protected area. Authorised access only.
          </p>
        </div>
      </div>
    </div>
  );
}
