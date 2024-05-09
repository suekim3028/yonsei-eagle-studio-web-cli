"use server";
import { UserTypes } from "@types";
import API from "./API";

/**
 * OAuth 로그인
 */
type LoginRequest = {
  provider: "KAKAO";
  authorizationCode: string;
};

export type LoginResponse = {
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
export const refreshLogin = async (payload: RefreshLoginRequest) =>
  API.post<LoginResponse>("/user/login", {
    loginType: "REFRESH",
    payload,
  });

/**
 * 유저 정보 가져오기
 */

export const getUserInfo = () => API.get<UserTypes.Info>("/user");

/**
 * 유저 정보 삭제
 */
export const withdrawUser = () => API.delete("/user");
