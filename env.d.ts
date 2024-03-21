import { CommonTypes } from "./src/types";

// MUST ADD THIS FILE TO GITIGNORE
declare global {
  namespace NodeJS {
    interface ProcessEnv extends CommonTypes.EnvConfig {}
  }
}
