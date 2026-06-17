import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

const isRouteMatch = (pathname: string, routes: string[]) =>
  routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

const applySetCookie = (
  response: NextResponse,
  setCookie?: string | string[]
) => {
  if (!setCookie) return;

  if (Array.isArray(setCookie)) {
    setCookie.forEach((cookie) => response.headers.append("set-cookie", cookie));
  } else {
    response.headers.append("set-cookie", setCookie);
  }
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

const accessToken = cookieStore.get("accessToken")?.value;
const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivateRoute = isRouteMatch(pathname, privateRoutes);
  const isAuthRoute = isRouteMatch(pathname, authRoutes);

  if (isPrivateRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (refreshToken && !accessToken) {
    try {
      const session = await checkSession();

      const response =
        isAuthRoute && session.data
          ? NextResponse.redirect(new URL("/", request.url))
          : NextResponse.next();

      applySetCookie(response, session.headers["set-cookie"]);

      return response;
    } catch {
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      return NextResponse.next();
    }
  }

  if (isAuthRoute && accessToken) {
    try {
      const session = await checkSession();

      if (session.data) {
        const response = NextResponse.redirect(new URL("/", request.url));
        applySetCookie(response, session.headers["set-cookie"]);

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
      applySetCookie(response, session.headers["set-cookie"]);

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