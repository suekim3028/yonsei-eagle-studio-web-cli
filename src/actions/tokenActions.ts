"use server";

import { userApis } from "@apis";
import { cookies } from "next/headers";

export const get = async () => {
  try {
    const value = cookies().get("token")?.value;

    if (!!value) {
      const parsed = JSON.parse(value);
      if (
        typeof parsed === "object" &&
        "accessToken" in parsed &&
        "refreshToken" in parsed &&
        typeof parsed["accessToken"] === "string" &&
        typeof parsed["refreshToken"] === "string"
      ) {
        console.log("[GET TOKEN] 🔐 token is here!");

        return JSON.parse(value) as userApis.LoginResponse;
      } else {
        throw new Error();
      }
    } else {
      console.log("[GET TOKEN] 🔓 no token");
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
    if (
      currentToken?.accessToken != token.accessToken ||
      currentToken?.refreshToken != token.refreshToken
    ) {
      cookies().set("token", JSON.stringify(token));
      console.log("[SET TOKEN] 🔏 token updated");
    }
  } catch (e) {
    //
  }
};
export const remove = async () => {
  cookies().delete("token");
};
