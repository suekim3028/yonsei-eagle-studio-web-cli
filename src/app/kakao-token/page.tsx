"use client";

import { tokenActions } from "@actions";
import { userApis } from "@apis";
import { Flex, Text } from "@components";
import { useRefetchUser } from "@hooks";
import { commonUtils } from "@utils";
import { commonHooks } from "@web-core";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";

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

    const alreadyHasToken = await tokenActions.get();
    if (alreadyHasToken) return;

    const code = searchParams.get("code");

    if (!code || typeof code != "string") return handleError();

    const { isError, data: token } = await userApis.kakaoLogin(code);

    if (isError) return handleError();
    await tokenActions.set(token);

    try {
      refetchUser();

      router.replace("/generate");
    } catch (e) {
      return handleError();
    }
  }, []);

  // TODO
  return (
    <Flex p={20} alignItems={"center"} justifyContent={"center"}>
      <Text type={"20_Medium_Multi"}>로그인중!!!</Text>
      <Text type={"20_Medium_Multi"}>디자인 적용할 예정!!!</Text>
    </Flex>
  );
};

export default KakaoToken;
