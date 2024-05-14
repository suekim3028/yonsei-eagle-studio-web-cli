"use client";

import { userActions } from "@actions";
import { photoRequestState, userState } from "@atoms";
import { WebPushManager } from "@lib";
import { commonHooks } from "@web-core";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";

const Initializer = ({ children }: { children: React.ReactNode }) => {
  const initiated = useRef(false);
  const setUserInfo = useSetRecoilState(userState);
  const setPhotoRequest = useSetRecoilState(photoRequestState);
  const router = useRouter();

  commonHooks.useAsyncEffect(async () => {
    if (initiated.current) return;
    initiated.current = true;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      console.log(`kakao initialized`);
    } else {
      console.log(`kakao already initialized`);
    }

    if (!WebPushManager.initialized) {
      WebPushManager.initialize();
    }

    const { userInfo, photoRequest } = await userActions.getUserFromToken(true);

    setUserInfo(userInfo);
    setPhotoRequest(photoRequest);
    if (photoRequest) router.push("/generate");
  }, []);

  return children;
};

export default React.memo(Initializer);
