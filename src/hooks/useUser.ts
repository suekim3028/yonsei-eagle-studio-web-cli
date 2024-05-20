"use client";

import { photoRequestState, userState, userStateQueryId } from "@atoms";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";

export const useRefetchUser = () => {
  const setUserInfoQueryRequestID = useSetRecoilState(userStateQueryId);
  return () =>
    setUserInfoQueryRequestID((p) => {
      console.log("request id updated", p + 1);
      return p + 1;
    });
};

export const useUser = () => {
  const photoRequest = useRecoilValueLoadable(photoRequestState);
  const user = useRecoilValueLoadable(userState);

  return { user, photoRequest };
};
