import { webUtils } from "@web-core";

export const copyLink = () => {
  webUtils.copyToClipboard("", () => undefined);
};
