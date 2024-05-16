import { BgContainer, Flex, Text } from "@components";
import Loading from "@public/lottie/loading.json";
import React from "react";
import Lottie from "react-lottie";

const LoadingBeforeResult = () => {
  return (
    <BgContainer>
      <Flex
        direction={"column"}
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text type={"16_Light_Multi"} color={"YONSEI_NAVY"} mb={20}>
          두근두근, 어떤 모습일까요? 🦅
        </Text>
        <Lottie
          options={{ loop: true, autoplay: true, animationData: Loading }}
          width={48}
          height={48}
        />
      </Flex>
    </BgContainer>
  );
};

export default React.memo(LoadingBeforeResult);
