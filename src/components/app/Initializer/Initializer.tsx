"use client";

import { useRefetchUser } from "@hooks";
import { WebPushManager } from "@lib";
import { commonHooks } from "@web-core";
import React, { useRef } from "react";

const Initializer = () => {
  const initiated = useRef(false);
  const refetchUser = useRefetchUser();
  console.log("===INITIALIZER!");

  commonHooks.useAsyncEffect(async () => {
    if (initiated.current) return;
    initiated.current = true;

    refetchUser();

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      console.log(`kakao initialized`);
    } else {
      console.log(`kakao already initialized`);
    }

    if (!WebPushManager.initialized) {
      WebPushManager.initialize();
    }
  }, []);

  return <></>;
};

export default React.memo(Initializer);
