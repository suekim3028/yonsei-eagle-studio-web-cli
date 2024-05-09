import { userApis } from "@apis";
import { UserAtoms } from "@atoms";
import { TokenLocalStorage } from "@storage";
import { API } from "@web-core";
import { useRecoilState } from "recoil";

export const useUser = () => {
  const [user, setUser] = useRecoilState(UserAtoms.userState);

  let initRetry = 0;

  const initUser = async () => {
    if (initRetry >= 3) return;
    initRetry++;

    const tokenData = TokenLocalStorage.get();
    if (!tokenData) {
      setUser(null);
      return;
    }

    const { refreshToken, accessToken } = tokenData;
    if (!accessToken || !refreshToken) {
      console.log("[useUser] NO TOKEN DATA..");
      return;
    }

    API.setHeaderToken(accessToken);
    const user = await userApis.getUserInfo();
    if (user) {
      console.log("[useUser] SILENTLY LOGGED IN");

      setUser(user);
    } else {
      API.removeHeaderToken();
      TokenLocalStorage.remove();
      const newToken = await userApis.refreshLogin({
        refreshToken,
      });
      if (!newToken) return;
      console.log("[useUser] TOKEN REFRESHED!");

      TokenLocalStorage.set(newToken);
      await initUser();
    }
  };

  return { initUser };
};
