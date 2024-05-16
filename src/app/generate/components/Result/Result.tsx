"use client";

import Loading from "@app/generate/loading";
import { Flex, Text } from "@components";
import { useRefetchUser } from "@hooks";
import { PhotoTypes } from "@types";
import { commonHooks } from "@web-core";
import React, { useCallback, useEffect, useState } from "react";
import Completed from "./templates/Completed";
import Processing from "./templates/Processing";
import { calcDiff } from "./utils";
const Result = ({ request }: { request: PhotoTypes.Request }) => {
  const [leftSeconds, setLeftSeconds] = useState<number>();
  const refetchUser = useRefetchUser();

  const { imageProcessType, resultImage, requestStatus } = request;

  useEffect(() => {
    if (!leftSeconds) refetchUser();
  }, [leftSeconds === 0]);

  commonHooks.useEverySecondEffect(
    useCallback((now) => {
      setLeftSeconds(calcDiff(request, now));
    }, [])
  );

  if (leftSeconds === undefined) return <Loading />;

  if (leftSeconds <= 0 || requestStatus === "COMPLETED")
    return (
      <Completed
        imageProcessType={imageProcessType}
        resultImageUrl={resultImage ? resultImage.imageUrl : null}
      />
    );

  switch (requestStatus) {
    case "WAITING":
    case "PROCESSING":
      return (
        <Processing
          imageProcessType={request.imageProcessType}
          leftSeconds={leftSeconds}
        />
      );

    case "ERROR":
      return (
        <Flex w="100%" p={20}>
          <Text type={"16_Medium_Multi"}>
            예상하지 못한 에러가 발생했어요. 혹시 이 화면을 보셨다면 카카오톡
            채널로 꼭 저희에게 알려주세요!
          </Text>
        </Flex>
      );
    case "NOT_REQUESTED":
      return <></>;
  }
};
export default React.memo(Result);
