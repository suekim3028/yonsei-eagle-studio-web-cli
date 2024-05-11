import { tokenActions } from "@actions";
import { photoApis, userApis } from "@apis";
import { PhotoTypes, UserTypes } from "@types";

export const getUserFromToken = async (
  silent?: boolean
): Promise<{
  userInfo: UserTypes.Info | null;
  photoRequest: PhotoTypes.Request | null;
}> => {
  const token = await tokenActions.get();

  if (!token) {
    console.log("[useUser] NO TOKEN IN STORAGE");
    return { userInfo: null, photoRequest: null };
  }

  const { data: userInfo, isError } = await userApis.getUserInfo();

  if (isError) {
    if (!silent) throw new Error();
    const { refreshToken } = token || {};
    if (!refreshToken) return { userInfo: null, photoRequest: null };

    const { data: newToken, isError } = await userApis.refreshLogin({
      refreshToken,
    });

    if (!newToken || isError) {
      tokenActions.remove();
      return { userInfo: null, photoRequest: null };
    }
    tokenActions.set(newToken);

    console.log("[useUser] TOKEN REFRESHED!");
    return getUserFromToken();
  }

  const { requestStatus } = userInfo;
  if (requestStatus === "NOT_REQUESTED")
    return { userInfo, photoRequest: null };

  const { data: photoRequest, isError: photoRequestError } =
    await photoApis.getPhotoRequest();

  if (photoRequestError) {
    if (silent) throw new Error();
    return { userInfo, photoRequest: null };
  }

  return { userInfo, photoRequest };
};
