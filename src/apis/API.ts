import { APIConstructor } from "@web-core";

const API = new APIConstructor({
  baseURL: process.env.API_ENDPOINT_URL,
});
export default API;
