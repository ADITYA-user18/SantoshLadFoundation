import { NextRequest, NextResponse } from "next/server";
import { verifyTokenEdge, getSessionCookieName } from "@/lib/auth-edge";

const ADMIN_PATHS = ["/admin"];
const ADMIN_API_PATHS = ["/api/admin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = ADMIN_PATHS.some((p) => pathname.startsWith(p));
  const isAdminApi = ADMIN_API_PATHS.some((p) => pathname.startsWith(p));

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  // Allow login page, login API, and seed APIs without auth
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/seed" ||
    pathname === "/api/admin/seed-timeline" ||
    pathname === "/api/admin/seed-posts"
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get(getSessionCookieName())?.value;
  const valid = token ? await verifyTokenEdge(token) : false;

  if (!valid) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
