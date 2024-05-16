import API from "./API";

export const saveNotiToken = (notiToken: string) =>
  API().post("/noti", { body: { notiToken } });

export const sendNoti = (notiToken: string) =>
  API().post(
    `${process.env.NEXT_PUBLIC_WEB_URL}/send-push?subscription=${notiToken}`,
    undefined,
    { useFullUrl: true }
  );
