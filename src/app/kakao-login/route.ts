import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(`https://kauth.kakao.com/oauth/authorize`, req.url);

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
};
