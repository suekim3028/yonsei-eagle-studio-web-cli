import { userApis } from "@apis";
import { TokenLocalStorage } from "@storage";
import { ApiTypes } from "@types";
import { returnFetch, webUtils } from "@web-core";
import { ApiError } from "./ApiError";
import * as serverTokenActions from "./serverTokenActions";

export const APIToken = (() => {
  const setToken = async (token: userApis.LoginResponse) => {
    TokenLocalStorage.set(token);
    const cookieToken = await serverTokenActions.getToken();
    if (
      cookieToken?.accessToken != token.accessToken ||
      cookieToken.refreshToken != token.refreshToken
    )
      serverTokenActions.setToken(token);
  };

  const removeToken = async () => {
    TokenLocalStorage.remove();
    if (await serverTokenActions.getToken()) serverTokenActions.removeToken();
  };

  const getToken = async (): Promise<userApis.LoginResponse | null> => {
    console.log("server token", await serverTokenActions.getToken());
    const isServerSide = webUtils.isServerSide();
    const token = isServerSide
      ? await serverTokenActions.getToken()
      : TokenLocalStorage.get();

    if (!!token) {
      const { accessToken, refreshToken } = token;
      if (!accessToken || !refreshToken) {
        removeToken();
        return null;
      }

      setToken({ accessToken, refreshToken });

      return { accessToken, refreshToken };
    } else {
      removeToken();
      return null;
    }
  };

  return { setToken, removeToken, getToken };
})();

const API = () => {
  return returnFetch<ApiTypes.ApiError>({
    baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT_URL,
    getToken: async () => {
      const token = await APIToken.getToken();
      if (!token?.accessToken) return null;
      return token.accessToken;
    },
    tokenHandler: (token) => ({ Authorization: `Bearer ${token}` }),
    onError: (error) => {
      {
        if (webUtils.isServerSide()) throw new ApiError(error);
      }
    },
  });
};

export default API;
