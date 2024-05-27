"use client";

import { Button, Flex, Text } from "@components";
import { APP_CONSTS } from "@consts";
import { useUserContext } from "@contexts";
import { PhotoTypes } from "@types";
import { commonHooks } from "@web-core";
import React, { useCallback, useEffect, useState } from "react";
import Completed from "./templates/Completed";
import Processing from "./templates/Processing";
import { calcDiff } from "./utils";

const Result = ({ request }: { request: PhotoTypes.Request }) => {
  const [leftSeconds, setLeftSeconds] = useState<number>(
    calcDiff(request, new Date())
  );
  const { refreshUserInfo } = useUserContext();

  const { imageProcessType, resultImage, requestStatus } = request;

  useEffect(() => {
    if (!leftSeconds) refreshUserInfo();
  }, [leftSeconds === 0]);

  commonHooks.useEverySecondEffect(
    useCallback((now) => {
      setLeftSeconds(calcDiff(request, now));
    }, [])
  );

  if (resultImage)
    return (
      <Completed
        imageProcessType={imageProcessType}
        resultImageUrl={resultImage.imageUrl}
      />
    );

  switch (requestStatus) {
    case "WAITING":
    case "PROCESSING":
    case "COMPLETED": // completed 여도 result image 없으면 processing 으로 취급
      return (
        <Processing
          imageProcessType={request.imageProcessType}
          leftSeconds={leftSeconds}
        />
      );

    case "ERROR":
      return (
        <Flex w="100%" p={40} direction={"column"}>
          <Text
            type={"16_Medium_Multi"}
            textAlign={"center"}
            color={"YONSEI_NAVY"}
            mb={20}
          >
            {`예상하지 못한 에러가 발생했어요.\n혹시 이 화면을 보셨다면 아래 카카오톡 채널로 꼭 저희에게 알려주세요!`}
          </Text>
          <Button
            type={"NAVY"}
            title={"1:1 문의하기"}
            stretch
            href={APP_CONSTS.KAKAO_CHANNEL_CHAT_URL}
          />
        </Flex>
      );
    case "NOT_REQUESTED":
      return <></>;
  }
};
export default React.memo(Result);
