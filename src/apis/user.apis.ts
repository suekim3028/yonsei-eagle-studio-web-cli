import { API } from "@web-core";

/**
 * OAuth 로그인
 */
type LoginRequest = {
  provider: "KAKAO";
  authorizationCode: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export const login = (payload: LoginRequest) =>
  API.post<LoginResponse>("/user/login", {
    loginType: "LOGIN",
    payload,
  });

/**
 * 로그인 refresh
 */
type RefreshLoginRequest = {
  refreshToken: string;
};
export const refreshLogin = (payload: RefreshLoginRequest) =>
  API.post<LoginResponse>("/user/login", {
    loginType: "REFRESH",
    payload,
  });
