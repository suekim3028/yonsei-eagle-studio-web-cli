import { Initializer } from "@components/app";

import { UserContextProvider } from "@contexts";
import { ModalWrapper } from "@web-core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "독수리 사진관",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SHARE_WEB_URL),
  description: "무악대동제 기념 무료 AI 프로필 서비스",
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_SHARE_WEB_URL,
    title: "독수리 사진관",
    description: "무악대동제 기념 나만의 AI 프로필 확인하러 가기!",
    siteName: "독수리 사진관",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.js"
          integrity="sha384-pwDTu8wHS3HUfAgCS+FIgpFJHUJNO/2Eb0MZpYolcWKKVSQ6PDdeuEiwo/a1qdzq"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
          rel="preload"
        />
        <React.StrictMode>
          <Initializer />
          <ModalWrapper>
            <UserContextProvider>{children}</UserContextProvider>
          </ModalWrapper>
        </React.StrictMode>
      </body>
    </html>
  );
}
