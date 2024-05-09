"use client";
import { userApis } from "@apis";
import { userHooks } from "@hooks";
import { TokenLocalStorage } from "@storage";
import { commonHooks } from "@web-core";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const KakaoToken = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { initUser } = userHooks.useAuth();
  const router = useRouter();
  const effected = useRef(false);

  commonHooks.useAsyncEffect(async () => {
    if (effected.current) return;
    effected.current = true;
    const code = searchParams["code"];
    if (typeof code != "string") {
      router.replace("/sign-in");
    } else {
      const { isError, data } = await userApis.kakaoLogin(code);
      console.log({ isError, data });
      if (isError) {
        router.replace("/sign-in");
      } else {
        TokenLocalStorage.set(data);
        initUser();

        router.replace("/generate");
      }
    }
  }, []);

  return <>Loading...</>;
};

export default KakaoToken;
