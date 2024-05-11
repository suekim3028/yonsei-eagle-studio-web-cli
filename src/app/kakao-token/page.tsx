"use client";

import { tokenActions, userActions } from "@actions";
import { userApis } from "@apis";
import { photoRequestState, userState } from "@atoms";
import { commonHooks } from "@web-core";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { useSetRecoilState } from "recoil";

const KakaoToken = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(userState);
  const setPhotoRequest = useSetRecoilState(photoRequestState);

  const handleError = useCallback(() => {
    // TODO: 에러보여주기
    router.replace("/sign-in");
  }, []);

  const initialRef = useRef(false);
  commonHooks.useAsyncEffect(async () => {
    if (initialRef.current) return;
    initialRef.current = true;
    const code = searchParams["code"];
    if (typeof code != "string") return handleError();

    const { isError, data: token } = await userApis.kakaoLogin(code);
    if (isError) return handleError();
    tokenActions.set(token);

    try {
      const { userInfo, photoRequest } = await userActions.getUserFromToken();
      if (!userInfo) return handleError();

      setUserInfo(userInfo);
      setPhotoRequest(photoRequest);
      router.replace("/generate");
    } catch (e) {
      return handleError();
    }
  }, []);
  return <>Loading...</>;
};

export default KakaoToken;
