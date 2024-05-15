import { webUtils } from "@web-core";

export const sharePage = async () => {
  const url = process.env.NEXT_PUBLIC_WEB_URL;

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
        url,
      });
    } catch (e) {
      console.warn("canceled");
    }
  } else {
    webUtils.copyToClipboard(url, () => alert("링크 복사가 완료되었어요!"));
  }
};
