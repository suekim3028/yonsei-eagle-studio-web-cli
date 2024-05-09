"use client";

import React from "react";
import { RecoilRoot } from "recoil";

const RecoilRootComponent = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
export default React.memo(RecoilRootComponent);
