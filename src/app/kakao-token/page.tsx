import { userApis } from "@apis";
import { jsUtils } from "@web-core";
import { redirect } from "next/navigation";

export default async function KakaoToken({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const authorizationCode = searchParams["code"];
  if (typeof authorizationCode != "string") redirect("/sign-in");

  await userApis.login({ provider: "KAKAO", authorizationCode });
  await jsUtils.wait(3);
  return redirect("/generate");
}
