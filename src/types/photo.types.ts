export type Status =
  | "NOT_UPLOADED" // 이미지 메타데이터는 생성되었으나, 실제 이미지가 업로드 되지 않은 경우
  | "UPLOADED" // 업로드 된 이미지
  | "PROCESSED"; // 처리가 된 이미지

export type RequestStatus =
  | "NOT_REQUESTED" // 이미지 요청이 이루어지지 않은 상태
  | "PROCESSING" // 이미지 처리 중
  | "ERROR" // 이미지 처리 과정에서 에러 발생
  | "COMPLETED"; // 이미지 처리 완료

export type ProcessType = "NORMAL";

export type Info = {
  imageId: string;
  requestId: string;
  userId: string;
  imageUrl: string;
  imageStatus: Status;
  createYmdt: number;
};

export type Request = {
  requestId: string;
  userId: string;
  requestStatus: RequestStatus;
  createYmdt: number;
  updateYmdt: number;
  originalImages: Info[];
};
