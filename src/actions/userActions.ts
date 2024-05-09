"use server";

import { API, userApis } from "@apis";
import { TokenLocalStorage } from "@storage";
import { UserTypes } from "@types";

export const initUser = async (
  token: userApis.LoginResponse
): Promise<{ user: UserTypes.Info; token: userApis.LoginResponse } | null> => {
  const { refreshToken, accessToken } = token;

  API.setHeaderToken(accessToken);
  const user = await userApis.getUserInfo();
  if (user) {
    console.log("[useUser] SILENTLY LOGGED IN");
    return { user, token };
  } else {
    API.removeHeaderToken();
    TokenLocalStorage.remove();
    const newToken = await userApis.refreshLogin({
      refreshToken,
    });

    if (!newToken) return null;
    console.log("[useUser] TOKEN REFRESHED!");

    TokenLocalStorage.set(newToken);
    return await initUser(newToken);
  }
};
