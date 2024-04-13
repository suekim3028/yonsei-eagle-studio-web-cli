"use client";

import { useEffect } from "react";

const KakaoInit = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(`"${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}"`);
    }
    console.log(`kakao initialized: ${window.Kakao.isInitialized()}`);
  }, []);
  return children;
};

export default KakaoInit;
