import { useStepContext } from "@app/generate/StepContext";
import { Flex, Text } from "@components";
import { WebPushManager } from "@lib";
import { PhotoTypes } from "@types";
import { useRef } from "react";
import { PushAvailableIOS } from "./components/PushAvailableIOS";
import Timer from "./components/Timer";
const Result = ({ request }: { request: PhotoTypes.Request }) => {
  const { style } = useStepContext();

  const hasPushManager = useRef(
    WebPushManager.status === "INITIALIZED"
  ).current;

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
        <div style={{ position: "relative" }}>
          <img
            src={`/images/style_${style === "A" ? "a" : "b"}.png`}
            style={{ aspectRatio: "1/1.2", flex: 1, filter: "blur(5px)" }}
            width={"100%"}
          />
          <Timer {...request} />
        </div>
        <Flex flex={1} />
      </Flex>
      <PushAvailableIOS />
    </Flex>
  );
};

export default Result;
