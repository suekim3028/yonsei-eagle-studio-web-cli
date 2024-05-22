import { UserTypes } from '@types';
import API from './API';

const dummyUser: UserTypes.Info = {
  createYmdt: '2024-05-11T09:02:09.866',
  requestStatus: 'COMPLETED',
  requestYmdt: '2024-05-11T09:02:09.866',
  userId: '1',
  userName: '김수빈',
};

/**
 * OAuth 로그인
 */
type LoginRequest = {
  provider: 'KAKAO';
  authorizationCode: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

const dummyToken: LoginResponse = {
  accessToken:
    'eyJhbGciOiJIUzI1NiJ9.eyJpc3N1ZWRBdCI6IlwiMjAyNC0wNS0yMFQwNDowODowMi45OTZcIiIsImV4cGlyZWRBdCI6IlwiMjAyNC0wNS0yMVQwNDowODowMi45OTZcIiIsInN1YiI6IjY2NDYzYjk4MGFmYTJkNjExYjRiNmQ2OSIsImlhdCI6MTcxNjE3ODA4MiwiZXhwIjoxNzE2MjY0NDgyfQ.foUEVSsBYj79PmKhHPD2jJR2CJhpOu7Bbqv9VeNc3p8',
  refreshToken:
    'eyJhbGciOiJIUzI1NiJ9.eyJpc3N1ZWRBdCI6IlwiMjAyNC0wNS0yMFQwNDowODowMi45OTdcIiIsImV4cGlyZWRBdCI6IlwiMjAyNC0wNS0yN1QwNDowODowMi45OTdcIiIsInN1YiI6IjY2NDYzYjk4MGFmYTJkNjExYjRiNmQ2OSIsImlhdCI6MTcxNjE3ODA4MiwiZXhwIjoxNzE2NzgyODgyfQ.dgMzuETNS4UfTkkSDa2Pg-BTMZ9X2D6nIlZlsFYQp6k',
};

export const login = async (payload: LoginRequest) =>
  API.post<LoginResponse>('/user/login', {
    body: {
      loginType: 'LOGIN',
      payload,
    },
  });

export const kakaoLogin = async (code: string) =>
  API.get<LoginResponse>(
    `/user/login/kakao?code=${code}`,
    {},
    {
      // dummyData: dummyToken,
    }
  );

/**
 * 유저 정보 가져오기
 */

export const getUserInfo = () =>
  API.get<UserTypes.Info>('/user/info', undefined, {
    // dummyData: dummyUser,
  });

/**
 * 유저 정보 삭제
 */
export const testWithdrawUser = () => API.delete('/manage/user');
