export const STEPS = [
  "SELECT_STYLE",
  "UPLOAD_DESCRIPTION",
  "SELECT_PHOTOS",
  "CONFIRM_PHOTOS",
  "UPLOAD_PHOTOS",
  "GENERATING",
] as const;

export type Step = (typeof STEPS)[number];
