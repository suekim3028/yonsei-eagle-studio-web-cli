import API from "./API";

export const createNoti = (notiToken: string) =>
  API().post("/noti", { body: { notiToken } });
