"use client";

import { WebPushManager } from "@lib";
import { API } from "@web-core";
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
    API.init({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_URL,
    });
  }, []);

  return children;
};

export default Initializer;
