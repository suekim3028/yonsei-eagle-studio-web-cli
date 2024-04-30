import { useStepContext } from "@app/generate/StepContext";
import { Button, Flex, Text } from "@components";
import { WebPushManager } from "@lib";
import { commonHooks } from "@web-core";
import { useEffect, useState } from "react";
import { isIOS, isMacOs } from "react-device-detect";
import { PushAvailableIOS } from "./components/PushAvailableIOS";
const Generating = () => {
  const { style } = useStepContext();
  const [status, setStatus] = useState<"NO_WORKER" | "IOS" | "ANDROID">(
    WebPushManager.status === "NO_SERVICE_WORKER"
      ? "NO_WORKER"
      : isIOS || isMacOs
      ? "IOS"
      : "ANDROID"
  );

  const handleOnClickNoti = () => {
    console.log(WebPushManager.status);
    WebPushManager.subscribe();
  };

  return (
    <Flex direction={"column"} w="100%" alignItems={"center"} px={20}>
      <Flex w="100%" py={20} justifyContent={"center"}>
        <Text
          type={"20_Medium_Multi"}
          color="YONSEI_NAVY"
        >{`${12}번째 독수리님의\n사진을 인화 중이에요`}</Text>
      </Flex>
      <Flex w="100%">
        <Flex flex={1} />

        <img
          src={`/images/style_${style === "A" ? "a" : "b"}.png`}
          style={{ aspectRatio: "1/1.2", flex: 1, filter: "blur(5px)" }}
          width={"100%"}
        />
        <Flex flex={1} />
      </Flex>
      <PushAvailableIOS />
    </Flex>
  );
};

export default Generating;
