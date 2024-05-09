"use client";

import { userHooks } from "@hooks";
import { WebPushManager } from "@lib";
import { commonHooks } from "@web-core";
import React, { useRef } from "react";

const Initializer = ({ children }: { children: React.ReactNode }) => {
  const initiated = useRef(false);
  const { initUser } = userHooks.useAuth();

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

    await initUser();
  }, []);

  return children;
};

export default React.memo(Initializer);
