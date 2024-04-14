import type { NextRequest } from "next/server";
// TODO: 확인 필요
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;
  console.log({ currentUser, pathname: request.nextUrl.pathname });

  if (currentUser && request.nextUrl.pathname.startsWith("/sign-in")) {
    return Response.redirect(new URL("/generate", request.url));
  }

  if (!currentUser && request.nextUrl.pathname.startsWith("/generate")) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
