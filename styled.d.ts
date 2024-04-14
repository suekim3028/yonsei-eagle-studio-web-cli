import "styled-components";

import { UiTypes } from "@types";

declare module "styled-components" {
  export interface DefaultTheme extends Record<UiTypes.ColorKey, string> {
    //
  }
}
