import { photoRequestState, userState, userStateQueryId } from "@atoms";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";

export const useRefetchUser = () => {
  const setUserInfoQueryRequestID = useSetRecoilState(userStateQueryId);
  return () => setUserInfoQueryRequestID((p) => p + 1);
};

export const useUser = () => {
  const user = useRecoilValueLoadable(userState);
  const photoRequest = useRecoilValueLoadable(photoRequestState);

  return { user, photoRequest };
};
