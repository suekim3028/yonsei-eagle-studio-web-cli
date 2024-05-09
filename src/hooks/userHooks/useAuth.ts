import { APIToken, userApis } from "@apis";
import { UserAtoms } from "@atoms";
import { useSetRecoilState } from "recoil";

export const useAuth = () => {
  const setUser = useSetRecoilState(UserAtoms.userState);

  const initUser = async () => {
    const token = await APIToken.getToken();
    if (!token) {
      console.log("[useUser] NO TOKEN IN STORAGE");
      return null;
    }

    const { data: userInfo, isError } = await userApis.getUserInfo();

    if (isError) {
      const token = await APIToken.getToken();

      const { refreshToken } = token || {};
      if (!refreshToken) return;

      const { data: newToken, isError } = await userApis.refreshLogin({
        refreshToken,
      });

      if (!newToken || isError) {
        APIToken.removeToken();
        return null;
      }

      APIToken.setToken(newToken);

      console.log("[useUser] TOKEN REFRESHED!");
      initUser();
    } else {
      setUser(userInfo);
      console.log("[useUser] SILENTLY LOGGED IN", { userInfo });
      return userInfo;
    }
  };

  return { initUser };
};
