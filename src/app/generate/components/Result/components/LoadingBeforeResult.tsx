"use client";

import { BgContainer, Flex, Text } from "@components";
import { Player } from "@lottiefiles/react-lottie-player";
import Loading from "@public/lottie/loading.json";
import React from "react";

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
        <Player
          autoplay
          loop
          src={Loading}
          style={{ width: "48px", height: "48px" }}
        />
      </Flex>
    </BgContainer>
  );
};

export default React.memo(LoadingBeforeResult);
