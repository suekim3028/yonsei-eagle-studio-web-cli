import { tokenActions } from "@actions";
import { ApiTypes } from "@types";
import { returnFetch, webUtils } from "@web-core";
import { ApiError } from "./ApiError";

const API = () => {
  return returnFetch<ApiTypes.ApiError>({
    baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT_URL,
    getToken: () => {
      const token = tokenActions.get();
      if (!token) return null;
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
