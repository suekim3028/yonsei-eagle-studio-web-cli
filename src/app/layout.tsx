import { Initializer, RecoilRootWrapper } from "@components/app";
import { ThemeProvider } from "@contexts";
import { ModalWrapper, StyledComponentsRegistry } from "@web-core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <StyledComponentsRegistry>
        <body className={inter.className}>
          <ThemeProvider>
            <RecoilRootWrapper>
              <Initializer>
                <ModalWrapper>{children}</ModalWrapper>
              </Initializer>
            </RecoilRootWrapper>
          </ThemeProvider>

          <script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.js"
            integrity="sha384-pwDTu8wHS3HUfAgCS+FIgpFJHUJNO/2Eb0MZpYolcWKKVSQ6PDdeuEiwo/a1qdzq"
            crossOrigin="anonymous"
          ></script>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
