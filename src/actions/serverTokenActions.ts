"use server";

import { userApis } from "@apis";
import { cookies } from "next/headers";

export const get = () => {
  console.log("SERVER TOKEN ACTIONS_ GET TOKEN");

  try {
    const value = cookies().get("token")?.value;
    console.log({ value });

    if (!value) {
      remove();
      return null;
    } else {
      return JSON.parse(value) as userApis.LoginResponse;
    }
  } catch (e) {
    remove();
    return null;
    //
  }
};

export const set = (token: userApis.LoginResponse) => {
  try {
    const currentToken = get();
    console.log("SERVER TOKEN ACTIONS_ SET TOKEN", { currentToken, token });
    if (
      currentToken?.accessToken != token.accessToken ||
      currentToken?.refreshToken != token.refreshToken
    ) {
      cookies().set("token", JSON.stringify(token));
    }
  } catch (e) {
    //
  }
};
export const remove = () => {
  cookies().delete("token");
};
