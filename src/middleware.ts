import { NextResponse, type NextRequest } from "next/server";

const hasToken = (request: NextRequest) =>
  !!request.cookies.get("token")?.value;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/sign-in") && hasToken(request)) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  if (pathname.startsWith("/generate") && !hasToken(request)) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  if (pathname.startsWith("/kakao-token") && hasToken(request)) {
    return NextResponse.rewrite(new URL("/generate", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
