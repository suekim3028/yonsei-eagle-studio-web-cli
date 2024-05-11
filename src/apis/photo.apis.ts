// "requestId": String,
// "userId" : String,
// "requestStatus": RequestStatus,
// "createYmdt": Datetime,
// "updateYmdt": Datetime,
// "originalImages": List[Photo]

import { PhotoTypes } from "@types";
import API from "./API";

/**
 * 이미지 링크 요청
 */
type GetPhotoLinkIdRes = {
  imageId: string;
};
export const getPhotoLinkId = () =>
  API().post<GetPhotoLinkIdRes>("/photo/request");

/**
 * 이미지 링크에 업로드
 */
type UploadPhotoReq = {
  imageId: string;
};
export const uploadPhoto = ({ imageId }: UploadPhotoReq) =>
  API().post(`/photo/${imageId}`);

/**
 * 이미지 처리 요청 생성
 */

type CreatePhotoRequestReq = {
  imageList: string[]; // photo id list
  imageProcessType: PhotoTypes.ProcessType; // ???
};

export const createPhotoRequest = (req: CreatePhotoRequestReq) =>
  API().post("/photo-request", { body: req });

/**
 * 이미지 처리 요청 정보 가져오기
 */

export const getPhotoRequestById = (requestId: string) =>
  API().get<PhotoTypes.Request>(`photo-request/${requestId}`);

/**
 * 이미지 처리 요청 정보 가져오기
 */
export const getPhotoRequest = () =>
  API().get<PhotoTypes.Request>(`photo-request`);

/**
 * 이미지 처리 요청 상태 확인
 */
export const checkRequestStatus = (requestId?: string) =>
  API().get<{ requestStatus: PhotoTypes.RequestStatus }>(
    `photo-request/check${requestId ? `/${requestId}` : ""}`
  );
