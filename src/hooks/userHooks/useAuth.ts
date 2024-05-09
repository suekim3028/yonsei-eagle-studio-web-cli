import { commonActions, tokenActions } from "@actions";
import { userApis } from "@apis";
import { UserAtoms } from "@atoms";
import { useRecoilStoreID, useSetRecoilState } from "recoil";

export const useAuth = () => {
  const setUser = useSetRecoilState(UserAtoms.userState);
  const RECOIL_STORE_ID = useRecoilStoreID();

  const initUser = async () => {
    const token = await tokenActions.get();

    if (!token) {
      console.log("[useUser] NO TOKEN IN STORAGE");
      return null;
    }

    const { data: userInfo, isError } = await userApis.getUserInfo();

    if (isError) {
      const { refreshToken } = token || {};
      if (!refreshToken) return;

      const { data: newToken, isError } = await userApis.refreshLogin({
        refreshToken,
      });

      if (!newToken || isError) {
        tokenActions.remove();
        return null;
      }
      tokenActions.set(newToken);

      console.log("[useUser] TOKEN REFRESHED!");
      initUser();
    } else {
      commonActions.log("SET USER!", { RECOIL_STORE_ID: RECOIL_STORE_ID });
      setUser(userInfo);

      console.log("[useUser] SILENTLY LOGGED IN", { userInfo });
      return userInfo;
    }
  };

  return { initUser };
};
