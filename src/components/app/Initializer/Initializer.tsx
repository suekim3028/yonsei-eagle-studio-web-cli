"use client";

import { API } from "@apis";
import { useUser } from "@hooks";
import { WebPushManager } from "@lib";
import React, { useEffect, useRef } from "react";

const Initializer = ({ children }: { children: React.ReactNode }) => {
  const { initUser } = useUser();

  const initiated = useRef(false);

  useEffect(() => {
    if (initiated.current) return;
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    } else {
      console.log(`kakao initialized: ${window.Kakao.isInitialized()}`);
    }

    if (!WebPushManager.initialized) {
      WebPushManager.initialize();
    }

    API.init({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_URL,
    });
    initUser();
    initiated.current = true;
  }, []);

  return children;
};

export default React.memo(Initializer);
