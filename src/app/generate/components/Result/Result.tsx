"use client";

import { useStepContext } from "@app/generate/StepContext";
import { Flex, Text } from "@components";
import { PhotoTypes } from "@types";
import React from "react";
import Completed from "./templates/Completed";
import Processing from "./templates/Processing";
const Result = ({ request }: { request: PhotoTypes.Request }) => {
  const {} = useStepContext();

  const render = () => {
    switch (request.requestStatus) {
      case "WAITING":
        return <Processing request={request} />;
      case "COMPLETED":
        return request.resultImage ? (
          <Completed
            resultImage={request.resultImage}
            imageProcessType={request.imageProcessType}
          />
        ) : (
          <Processing request={request} />
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

  return render();
};
export default React.memo(Result);
