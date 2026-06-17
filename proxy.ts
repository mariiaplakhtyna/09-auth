import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isPrivateRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPrivateRoute && !accessToken && refreshToken) {
    try {
      const session = await checkSession();

      const response = NextResponse.next();

      const setCookie = session.headers["set-cookie"];

      if (setCookie) {
        response.headers.set(
          "set-cookie",
          Array.isArray(setCookie) ? setCookie.join(", ") : setCookie
        );
      }

      return response;
    } catch {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isAuthRoute && accessToken) {
    try {
      const session = await checkSession();

      const response = NextResponse.redirect(new URL("/", request.url));

      const setCookie = session.headers["set-cookie"];

      if (setCookie) {
        response.headers.set(
          "set-cookie",
          Array.isArray(setCookie) ? setCookie.join(", ") : setCookie
        );
      }

      if (session.data) {
        return response;
      }

      return NextResponse.next();
    } catch {
      return NextResponse.next();
    }
  }

  if (isPrivateRoute && accessToken) {
    try {
      const session = await checkSession();

      const response = NextResponse.next();

      const setCookie = session.headers["set-cookie"];

      if (setCookie) {
        response.headers.set(
          "set-cookie",
          Array.isArray(setCookie) ? setCookie.join(", ") : setCookie
        );
      }

      return response;
    } catch {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};