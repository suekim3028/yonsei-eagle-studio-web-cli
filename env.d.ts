import { CommonTypes } from "./src/types";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends CommonTypes.EnvConfig {}
  }
}
