import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./server/better-auth";
import { getCookieCache } from "better-auth/cookies";
import { ROLE_ACCESS, type UserRole } from "./constant";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const session = await auth.api.getSession({
        headers: await headers()
    })

    // const session = await getCookieCache(request);
    const user = session?.user;

    if (!session) {
        if (pathname === "/") return NextResponse.next();
        return NextResponse.redirect(new URL("/", request.url));
      }
    
      // === ALREADY LOGGED IN (BLOCK AUTH ROUTE) ===
      if (pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    
      // === ROLE AUTHORIZATION ===
      const role = user?.roleId as UserRole | undefined;
    
      if (!role || !ROLE_ACCESS[role]) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    
      const isAllowed = ROLE_ACCESS[role].some((route) =>
        pathname.startsWith(route)
      );
    
      if (!isAllowed) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    
      return NextResponse.next();
}

export const config = {
    runtime: "nodejs",
    matcher: [
        "/",
        "/dashboard/:path*",
        "/students/:path*",
        "/teachers/:path*",
        "/parents/:path*",
        "/subjects/:path*",
        "/classes/:path*",
        "/lessons/:path*",
        "/exams/:path*",
        "/assignments/:path*",
        "/results/:path*",
        "/attendance/:path*",
    ], // Apply middleware to specific routes
};