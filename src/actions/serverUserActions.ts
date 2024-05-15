import { tokenActions } from "@actions";
import { userApis } from "@apis";

export const updateToken = async () => {
  const token = await tokenActions.get();

  if (!token) {
    console.log("[useUser] NO TOKEN IN STORAGE");
    return;
  }

  const { accessToken, refreshToken } = token;

  if (!accessToken || !refreshToken)
    return console.log("[userUser] token broken");

  // token check 용
  const { isError } = await userApis.getUserInfo();
  if (!isError) return console.log("[useUser] has proper token");

  /**
   * access token으로 유저 못가져오는 경우 refresh
   */
  const { data: newToken, isError: refreshTokenError } =
    await userApis.refreshLogin({
      refreshToken,
    });

  if (!newToken || refreshTokenError) {
    await tokenActions.remove();
    return console.log("[useUser] Refresh token does not. removed. ");
  }

  await tokenActions.set(newToken);
  console.log("[useUser] TOKEN REFRESHED!");
  return;
};
