import { LocalStorageItem } from "@web-core";

export const TokenLocalStorage = new LocalStorageItem<{
  refreshToken: string;
  accessToken: string;
}>("token");
