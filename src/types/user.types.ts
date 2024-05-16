import { PhotoTypes } from "@types";

/**
 * 유저 정보
 */
export type Info = {
  userId: string;
  userName: string;
  requestStatus: PhotoTypes.RequestStatus;
  createYmdt: string;
  requestYmdt: string;
};
