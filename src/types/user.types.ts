export type RequestStatus = "";

export type User = {
  userId: string;
  userName: string;
  requestStatus: RequestStatus;
  createYmdt: number;
  requestYmdt: number;
};
