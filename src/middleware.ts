import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("MIDDLEWARE-", token);

  if (!!token && request.nextUrl.pathname.startsWith("/sign-in")) {
    return Response.redirect(new URL("/", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/generate")) {
    return Response.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
