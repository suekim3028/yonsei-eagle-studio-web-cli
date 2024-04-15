"use client";

import { WebPushManager } from "@lib";
import { useEffect } from "react";

const Initializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    } else {
      console.log(`kakao initialized: ${window.Kakao.isInitialized()}`);
    }

    if (!WebPushManager.initialized) {
      WebPushManager.initialize();
    }
  }, []);

  return children;
};

export default Initializer;
