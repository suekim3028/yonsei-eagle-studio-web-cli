import { Flex } from "@components";
import { WebPushManager } from "@lib";
import AlternativeLinkSection from "./AltenativeLinkSection";
import NotiSection from "./NotiSection";

export const PushAvailableIOS = () => {
  const handleOnClickNoti = () => {
    WebPushManager.subscribe();
  };

  return (
    <Flex w="100%" direction={"column"}>
      <NotiSection onClick={handleOnClickNoti} />
      <AlternativeLinkSection />
    </Flex>
  );
};
