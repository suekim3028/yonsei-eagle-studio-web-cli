"use client";

import { userApis } from "@apis";
import { useRefetchUser } from "@hooks";
import { TokenManager } from "@lib";
import { commonUtils } from "@utils";
import { commonHooks } from "@web-core";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import Loading from "./loading";

const KakaoToken = () => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const refetchUser = useRefetchUser();

  const handleError = useCallback(() => {
    commonUtils.showError("로그인에 실패했어요. 다시 시도해 주세요.");
    router.replace("/sign-in");
  }, []);

  const initialRef = useRef(false);
  commonHooks.useAsyncEffect(async () => {
    if (initialRef.current) return;
    initialRef.current = true;
    const code = searchParams.get("code");
    if (!code || typeof code != "string") return handleError();
    const { isError, data: token } = await userApis.kakaoLogin("code");
    if (isError) return handleError();
    new TokenManager().setToken(token);
    try {
      refetchUser();
      router.replace("/generate");
    } catch (e) {
      return handleError();
    }
  }, []);

  return <Loading />;
};

export default KakaoToken;
