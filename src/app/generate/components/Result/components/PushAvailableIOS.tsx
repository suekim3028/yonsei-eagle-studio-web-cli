import { Flex } from "@components";
import NotiSection from "./NotiSection";
import { WebPushManager } from "@lib";
import AlternativeLinkSection from "./AltenativeLinkSection";

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
