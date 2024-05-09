import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("MIDDLEWARE-", token, request.nextUrl.pathname);
  const pathname = request.nextUrl.pathname;
  if (token) {
    if (pathname.startsWith("/sign-in")) {
      return Response.redirect(new URL("/", request.url));
    }
  } else {
    if (pathname.startsWith("/generate")) {
      return Response.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
