import { photoApis } from "@apis";
import { UserTypes } from "@types";
import { atom, atomFamily, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom<UserTypes.Info | null>({
  key: "user",
  default: null,
});

export const hasUserState = selector({
  key: "hasUserState",
  get: ({ get }) => {
    const user = get(userState);
    return !!user;
  },
});

export const photoRequestState = atomFamily({
  key: "photoRequest",
  default: async (requestId: string) => {
    const { data, isError } = await photoApis.getPhotoRequest(requestId);
    if (isError) throw new Error();
    return data;
  },
});
