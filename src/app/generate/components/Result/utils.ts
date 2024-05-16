import { GEN_CONSTS } from "@consts";
import { PhotoTypes } from "@types";
import { webUtils } from "@web-core";
import { addMinutes, differenceInSeconds } from "date-fns";

export const copyLink = async () => {
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/generate`;

  const canShare = navigator.canShare({
    title: "독수리 사진관",
    text: "아카라카 기념 나만의 Ai 프로필 확인하러 가기!",
    url,
  });
  if (canShare) {
    try {
      await navigator.share({
        title: "독수리 사진관",
        text: "아카라카 기념 나만의 Ai 프로필 확인하러 가기!",
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/generate`,
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
