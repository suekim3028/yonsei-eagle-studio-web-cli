import { UserTypes } from "@types";
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

export const login = async (payload: LoginRequest) => {
  console.log({ payload });
  const response: LoginResponse = {
    accessToken: "abcd",
    refreshToken: "abcd",
  };
  return response;
};
// export const login =  (payload: LoginRequest) =>
// API.post<LoginResponse>("/user/login", {
//   loginType: "LOGIN",
//   payload,
// });

/**
 * 로그인 refresh
 */
type RefreshLoginRequest = {
  refreshToken: string;
};
// export const refreshLogin = (payload: RefreshLoginRequest) =>
//   API.post<LoginResponse>("/user/login", {
//     loginType: "REFRESH",
//     payload,
// });
export const refreshLogin = async (
  payload: RefreshLoginRequest
): Promise<LoginResponse> => ({
  accessToken: "abcd",
  refreshToken: "abcd",
});

/**
 * 유저 정보 가져오기
 */

const dummyUser: UserTypes.User = {
  createYmdt: 0,
  requestStatus: "",
  requestYmdt: 0,
  userId: "1",
  userName: "김수빈",
};
// export const getUserInfo = () => API.get<UserTypes.User>("/user");
export const getUserInfo = async (): Promise<UserTypes.User> => dummyUser;
