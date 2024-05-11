import { UserTypes } from "@types";
import API from "./API";

const dummyUser: UserTypes.Info = {
  createYmdt: 3242424,
  requestStatus: "COMPLETED",
  requestYmdt: 32423432,
  userId: "1",
  userName: "김수빈",
};

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

const dummyToken: LoginResponse = {
  accessToken: "aa",
  refreshToken: "rr",
};

export const login = async (payload: LoginRequest) =>
  API().post<LoginResponse>(
    "/user/login",
    {
      body: {
        loginType: "LOGIN",
        payload,
      },
    },
    {
      error: {
        code: "500",
        message: "로그인 중 에러가 발생했습니다. 다시 시도해주세요.",
        value: {},
      },
      // dummyData: dummyToken,
    }
  );

export const kakaoLogin = async (code: string) =>
  API().get<LoginResponse>(`/user/login/kakao?code=${code}`, undefined, {
    error: {
      code: "500",
      message: "로그인 중 에러가 발생했습니다. 다시 시도해주세요.",
      value: {},
    },
    // dummyData: dummyToken,
  });
export const test = async () => null;

/**
 * 로그인 refresh
 */
type RefreshLoginRequest = {
  refreshToken: string;
};
export const refreshLogin = async (payload: RefreshLoginRequest) =>
  API().post<LoginResponse>("/user/login", {
    body: { loginType: "REFRESH", payload },
  });

/**
 * 유저 정보 가져오기
 */

export const getUserInfo = () =>
  API().get<UserTypes.Info>(
    "/user",
    undefined
    //  { dummyData: dummyUser }
  );

/**
 * 유저 정보 삭제
 */
export const withdrawUser = () => API().delete("/user");
