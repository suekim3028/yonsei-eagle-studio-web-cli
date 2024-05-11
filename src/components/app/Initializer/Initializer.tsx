"use client";

import { userActions } from "@actions";
import { photoRequestState, userState } from "@atoms";
import { WebPushManager } from "@lib";
import { commonHooks } from "@web-core";
import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";

const Initializer = ({ children }: { children: React.ReactNode }) => {
  const initiated = useRef(false);
  const setUserInfo = useSetRecoilState(userState);
  const setPhotoRequest = useSetRecoilState(photoRequestState);

  commonHooks.useAsyncEffect(async () => {
    if (initiated.current) return;
    initiated.current = true;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    } else {
      console.log(`kakao initialized: ${window.Kakao.isInitialized()}`);
    }

    if (!WebPushManager.initialized) {
      WebPushManager.initialize();
    }

    const { userInfo, photoRequest } = await userActions.getUserFromToken(true);
    // TODO: photoRequest 있으면 generating으로
    setUserInfo(userInfo);
    setPhotoRequest(photoRequest);
  }, []);

  return children;
};

export default React.memo(Initializer);
