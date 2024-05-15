"use client";

import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";

const RecoilRootWrapper = ({ children }: { children: ReactNode }) => (
  <RecoilRoot>{children}</RecoilRoot>
);

export default React.memo(RecoilRootWrapper);
