import { tokenActions } from "@actions";
import { photoApis, userApis } from "@apis";
import { PhotoTypes, UserTypes } from "@types";

export const getUserFromToken = async (): Promise<{
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

  const { requestId } = userInfo;
  if (!requestId) return { userInfo, photoRequest: null };

  const { data: photoRequest, isError: photoRequestError } =
    await photoApis.getPhotoRequest(requestId);

  if (photoRequestError) {
    throw new Error();
  }

  return { userInfo, photoRequest };
};
