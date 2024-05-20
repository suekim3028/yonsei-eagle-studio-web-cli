"use client";

import { TokenManager } from "@lib";
import { ApiTypes } from "@types";
import { returnFetch } from "@web-core";

const API = () => {
  const tokenManager = new TokenManager();
  return returnFetch<ApiTypes.ApiError>({
    baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT_URL,
    tokenHeaderFn: async () => {
      const accessToken = await tokenManager.getAccessToken();
      if (!accessToken) return null;
      return { Authorization: `Bearer ${accessToken}` };
    },
    onUnauthorizedError: tokenManager.refreshAccessToken,
  });
};

export default API;
