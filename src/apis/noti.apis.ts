import { API } from "@web-core";

export const createNoti = (notiToken: string) =>
  API.post("/noti", { notiToken });
