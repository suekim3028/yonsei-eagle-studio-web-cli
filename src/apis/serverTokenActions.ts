"use server";

import { userApis } from "@apis";
import { cookies } from "next/headers";

export const setToken = async (token: userApis.LoginResponse) => {
  try {
    cookies().set("token", JSON.stringify(token));
  } catch (e) {
    //
  }
};
export const removeToken = async () => cookies().delete("token");
export const getToken = async () => {
  try {
    const value = cookies().get("token")?.value;
    if (!value) return null;
    return JSON.parse(value) as userApis.LoginResponse;
  } catch (e) {
    return null;
    //
  }
};
