import { PhotoTypes } from "@types";

/**
 * 유저 정보
 */
// TODO: request 상태 전부 가져오기
export type Info = {
  userId: string;
  userName: string;
  requestStatus: PhotoTypes.RequestStatus;
  createYmdt: string;
  requestYmdt: string;
};
