import { LocalStorageItem } from '@web-core';

export const TokenStorage = new LocalStorageItem<{
  refreshToken: string;
  accessToken: string;
}>('token');
