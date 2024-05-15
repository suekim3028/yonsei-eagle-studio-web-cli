// "requestId": String,
// "userId" : String,
// "requestStatus": RequestStatus,
// "createYmdt": Datetime,
// "updateYmdt": Datetime,
// "originalImages": List[Photo]

const dummyPhotoRequest: PhotoTypes.Request = {
  originalImages: [],
  requestId: "1",
  requestStatus: "COMPLETED",
  userId: "1",
  createYmdt: "2024-05-14T13:02:09.866",
  updateYmdt: "2024-05-14T13:02:09.866",
  imageProcessType: "F",
  resultImage: {
    imageId: "1",
    imageStatus: "PROCESSED",
    createYmdt: "2024-05-14T13:02:09.866",
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/029/284/491/large_2x/cheerful-brunette-business-woman-isolated-png.png",
    requestId: "1",
    userId: "1",
  },
};

const dummyUser: UserTypes.Info = {
  userId: "663f341106c71e69673aa130",
  userName: "김수빈",
  requestStatus: "PROCESSING",
  createYmdt: "2024-05-11T09:02:09.866",
  requestYmdt: "2024-05-11T09:02:09.866",
};

import { PhotoTypes, UserTypes } from "@types";
import API from "./API";

/**
 * 이미지 링크 요청
 */
type GetPhotoLinkIdRes = {
  imageId: string;
};
export const getPhotoLinkId = () =>
  API().post<GetPhotoLinkIdRes>("/photo/request", undefined, {
    // dummyData: { imageId: "2" },
  });

/**
 * 이미지 링크에 업로드
 */
type UploadPhotoReq = {
  imageId: string;
  data: FormData;
};

export const uploadPhoto = ({ imageId, data }: UploadPhotoReq) =>
  API().post(
    `/photo/${imageId}`,
    {
      isMultipartFormData: true,
      body: data,
    }
    // { dummyUrl: "http://localhost:3000/test" }
  );

/**
 * 이미지 처리 요청 생성
 */

type CreatePhotoRequestReq = {
  imageList: string[]; // photo id list
  imageProcessType: PhotoTypes.ProcessType; // ???
};

export const createPhotoRequest = (req: CreatePhotoRequestReq) =>
  API().post(
    "/photo-request",
    { body: req }
    // { dummyData: { success: true } }
  );

/**
 * 이미지 처리 요청 정보 가져오기
 */

export const getPhotoRequestById = (requestId: string) =>
  API().get<PhotoTypes.Request>(`photo-request/${requestId}`);

/**
 * 이미지 처리 요청 정보 가져오기
 */
export const getPhotoRequest = () =>
  API().get<PhotoTypes.Request>(`photo-request`, undefined, {
    // dummyData: dummyPhotoRequest,
  });

/**
 * 이미지 처리 요청 상태 확인
 */
export const checkRequestStatus = (requestId?: string) =>
  API().get<{ requestStatus: PhotoTypes.RequestStatus }>(
    `photo-request/check${requestId ? `/${requestId}` : ""}`
  );
