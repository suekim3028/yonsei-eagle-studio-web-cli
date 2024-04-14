"use client";

import { UI_CONSTS } from "@consts";
import { ThemeProvider as ThemeProviderContext } from "styled-components";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProviderContext theme={UI_CONSTS.THEME}>
      {children}
    </ThemeProviderContext>
  );
};

export default ThemeProvider;
