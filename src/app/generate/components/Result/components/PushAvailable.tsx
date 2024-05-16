import { Flex } from "@components";
import { WebPushManager } from "@lib";
import { commonUtils } from "@utils";
import AlternativeLinkSection from "./AltenativeLinkSection";
import NotiSection from "./NotiSection";

export const PushAvailable = () => {
  const handleOnClickNoti = () => {
    commonUtils.showConfirmPopup({
      title: `🔔 독수리 사진관\n알림 권한을 허용할까요?`,
      body: `AI 프로필이 완성되면\n푸시 알림을 보내드릴게요`,
      yesText: "허용",
      onPressYes: WebPushManager.subscribe,
      noText: "취소",
    });
  };

  return (
    <Flex w="100%" direction={"column"}>
      <NotiSection onClick={handleOnClickNoti} />
      <AlternativeLinkSection />
    </Flex>
  );
};
