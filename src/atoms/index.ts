import { PhotoTypes, UserTypes } from "@types";
import { atom, selector, useRecoilStoreID } from "recoil";
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

export const photoRequestState = atom<PhotoTypes.Request | null>({
  key: "photoRequest",
  default: null,
});

export const recoilChecker = () => {
  const id = useRecoilStoreID();
  return {
    logStoreId: () => console.log(id),
  };
};
