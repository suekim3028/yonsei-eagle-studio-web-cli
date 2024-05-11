import { NextResponse, type NextRequest } from "next/server";

const hasToken = (request: NextRequest) =>
  !!request.cookies.get("token")?.value;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/sign-in") && hasToken(request)) {
    return Response.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/generate") && !hasToken(request)) {
    return Response.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/kakao-login") && hasToken(request)) {
    const url = new URL(`https://kauth.kakao.com/oauth/authorize`, request.url);

    url.searchParams.set(
      "client_id",
      process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
    );
    url.searchParams.set(
      "redirect_uri",
      `${process.env.NEXT_PUBLIC_WEB_URL}kakao-token`
    );
    url.searchParams.set("response_type", "code");

    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
