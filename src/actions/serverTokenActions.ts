"use server";

import { userApis } from "@apis";
import { cookies } from "next/headers";

export const get = async () => {
  console.log("SERVER TOKEN ACTIONS_ GET TOKEN");

  try {
    const value = cookies().get("token")?.value;
    console.log({ value });

    if (!!value) {
      const parsed = JSON.parse(value);
      if (
        typeof parsed === "object" &&
        "accessToken" in parsed &&
        "refreshToken" in parsed &&
        typeof parsed["accessToken"] === "string" &&
        typeof parsed["refreshToken"] === "string"
      ) {
        return JSON.parse(value) as userApis.LoginResponse;
      } else {
        throw new Error();
      }
    } else {
      return null;
    }
  } catch (e) {
    remove();
    return null;
    //
  }
};

export const set = async (token: userApis.LoginResponse) => {
  try {
    const currentToken = await get();
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
export const remove = async () => {
  cookies().delete("token");
};
