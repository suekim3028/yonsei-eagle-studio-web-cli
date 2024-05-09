"use client";

import { userActions } from "@actions";
import { WebPushManager } from "@lib";
import { TokenLocalStorage } from "@storage";
import { commonHooks } from "@web-core";
import React, { useRef } from "react";

const Initializer = ({ children }: { children: React.ReactNode }) => {
  const initiated = useRef(false);

  commonHooks.useAsyncEffect(async () => {
    if (initiated.current) return;
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    } else {
      console.log(`kakao initialized: ${window.Kakao.isInitialized()}`);
    }

    if (!WebPushManager.initialized) {
      WebPushManager.initialize();
    }

    const token = TokenLocalStorage.get();

    if (token) {
      const { accessToken, refreshToken } = token;
      if (accessToken && refreshToken)
        await userActions.initUser({ accessToken, refreshToken });
    } else {
      console.log("[Initializer] GUEST USER");
    }
    initiated.current = true;
  }, []);

  return children;
};

export default React.memo(Initializer);
