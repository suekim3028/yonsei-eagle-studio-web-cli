import { GEN_CONSTS } from "@consts";
import { PhotoTypes } from "@types";
import { webUtils } from "@web-core";
import { addMinutes, differenceInSeconds } from "date-fns";

export const copyLink = async () => {
  const url = `${process.env.NEXT_PUBLIC_SHARE_WEB_URL}/generate`;

  const canShare =
    "canShare" in navigator &&
    navigator.canShare({
      text: `무악대동제 기념 나만의 AI 프로필 확인하러 가기!\n${`${process.env.NEXT_PUBLIC_SHARE_WEB_URL}/generate`}`,
    });
  if (canShare) {
    try {
      await navigator.share({
        text: `무악대동제 기념 나만의 AI 프로필 확인하러 가기!\n${`${process.env.NEXT_PUBLIC_SHARE_WEB_URL}/generate`}`,
      });
    } catch (e) {
      console.warn("canceled");
    }
  } else {
    webUtils.copyToClipboard(url, () => alert("링크 복사가 완료되었어요!"));
  }
};

export const calcDiff = (request: PhotoTypes.Request, now: Date) => {
  const expectedResultDate = addMinutes(
    new Date(request.createYmdt + "Z"),
    GEN_CONSTS.GENERATE_MINUTES
  );
  return Math.max(differenceInSeconds(expectedResultDate, now), 0);
};
