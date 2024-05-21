'use client';

import { userApis } from '@apis';
import { TokenStorage } from '@storage';
import { ApiTypes } from '@types';
import { returnFetch } from '@web-core';

const API = returnFetch<ApiTypes.ApiError>({
  baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT_URL,
  tokenHeaderFn: async () => {
    const token = TokenStorage.get();
    if (!token || !token.accessToken || !token.refreshToken) return null;
    return { Authorization: `Bearer ${token.accessToken}` };
  },
  onUnauthorizedError: async () => {
    try {
      const token = TokenStorage.get();
      if (!token) return;
      const refreshToken = token?.refreshToken;
      if (!refreshToken) return;

      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/user/login`, {
        body: JSON.stringify({
          loginType: 'REFRESH',
          payload: {
            refreshToken: token.refreshToken,
          },
        }),
        method: 'POST',
      });

      if (res.ok) {
        const json = await res.json();
        TokenStorage.set(json as userApis.LoginResponse);
      } else {
        TokenStorage.remove();
      }
    } catch (e) {
      TokenStorage.remove();
    }
  },
});

export default API;
