import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("__accessToken");
  const isVerified = Boolean(accessToken);
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  try {
    if (!isVerified) throw new Error("Unauthorized");

    if (isAuthPage) {
      return NextResponse.redirect(new URL("/members", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    if (!isAuthPage)
      return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/members", "/clinic/:path*", "/auth/:path*"],
};
