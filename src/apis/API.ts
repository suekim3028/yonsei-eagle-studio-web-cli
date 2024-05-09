import { userApis } from "@apis";
import { TokenLocalStorage } from "@storage";
import { ApiTypes } from "@types";
import { returnFetch, webUtils } from "@web-core";
import { ApiError } from "./ApiError";
import * as serverTokenActions from "./serverTokenActions";

export const APIToken = (() => {
  const setToken = (token: userApis.LoginResponse) => {
    TokenLocalStorage.set(token);
    serverTokenActions.setToken(token);
  };

  const removeToken = () => {
    TokenLocalStorage.remove();
    serverTokenActions.removeToken();
  };

  const getToken = async () => {
    return webUtils.isServerSide()
      ? await serverTokenActions.getToken()
      : TokenLocalStorage.get();
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
        else alert(error.message);
      }
    },
  });
};

export default API;
