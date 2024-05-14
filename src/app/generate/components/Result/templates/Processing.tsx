import { Flex, Text } from "@components";
import { WebPushManager } from "@lib";
import { PhotoTypes } from "@types";
import React, { useRef } from "react";
import { PushAvailable } from "../components/PushAvailable";
import Timer from "../components/Timer";

const Processing = ({ request }: { request: PhotoTypes.Request }) => {
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
      <Flex w="100%" justifyContent={"center"}>
        <Flex position="relative">
          <img
            src={`/images/blur_result/${
              request.imageProcessType === "F" ? "F" : "M"
            }.png`}
            style={{
              width: 198,
              height: 286,
            }}
            width={198}
            height={286}
          />
          <Timer {...request} />
        </Flex>
      </Flex>
      {hasPushManager ? <PushAvailable /> : <></>}
    </Flex>
  );
};

export default React.memo(Processing);
