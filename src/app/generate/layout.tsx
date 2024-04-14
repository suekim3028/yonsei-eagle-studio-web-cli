"use client";

import React from "react";
import StepContextProvider from "./StepContext";
import * as S from "./style";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StepContextProvider>
      <S.Bg>{children}</S.Bg>
    </StepContextProvider>
  );
}
