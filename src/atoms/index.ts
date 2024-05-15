import { photoApis, userApis } from "@apis";
import { PhotoTypes, UserTypes } from "@types";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userStateQueryId = atom<number>({
  key: "userStateQueryId",
  default: 0,
});

export const userState = selector<UserTypes.Info | null>({
  key: "user",
  get: async ({ get }) => {
    get(userStateQueryId);
    const { data, isError } = await userApis.getUserInfo();
    if (isError) return null;
    return data;
  },
});

export const photoRequestState = selector<PhotoTypes.Request | null>({
  key: "photoRequest",
  get: async ({ get }) => {
    const user = get(userState);
    if (!user || user.requestStatus === "NOT_REQUESTED") return null;

    const { data, isError } = await photoApis.getPhotoRequest();
    if (isError) return null;
    return data;
  },
});
