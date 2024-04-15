"use client";

import { useStepContext } from "@app/generate/StepContext";
import { BackButton, Button, Flex, Icon, NavBar, Text } from "@components";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StyleExample from "../../StyleExample/StyleExample";

const UploadDescription = () => {
  const { goNext, goPrev } = useStepContext();

  return (
    <Flex
      w="100%"
      h={"100dvh"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex flexDirection={"column"} w="100%" alignItems={"center"}>
        <NavBar onClick={goPrev} />
        <Flex w="100%" direction={"row"} px={20}>
          <img
            src={"/images/talking_eagle.svg"}
            width={66.32}
            height={62.98}
            style={{ width: 66.32, height: 62.98 }}
          />
          <Flex ml={8} flex={1}>
            <Flex
              bgRgbColor={"#FFFFFFB2"}
              border={"1px solid white"}
              borderRadius={8}
              flex={1}
              py={18}
              pl={22}
            >
              <Text type={"14_Light_Multi"} color={"YONSEI_NAVY"}>
                {`자연스런 AI 프로필을 위해\n가이드에 따라 사진을 올려주세요!`}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Text type={"14_Light_Multi"} color={"YONSEI_BLUE"} mt={20}>
          내용 정리되면 변경 예정
        </Text>
      </Flex>

      <Flex
        w="100%"
        p={20}
        onClick={goNext}
        bgColor={"WHITE"}
        direction={"column"}
        alignItems={"center"}
      >
        {
          // TODO: 개인정보 연결 필요
        }
        <Flex mb={12} alignItems={"center"}>
          <Text type={"12_Light_Single"} color={"YONSEI_BABY_GRAY"}>
            개인정보 수집 및 이용 정책
          </Text>
          <Icon name="chevron_right" size={14} />
        </Flex>
        <Button type={"NAVY_GRADIENT"} stretch title={"내 사진 등록하기"} />
      </Flex>
    </Flex>
  );
};

export default UploadDescription;
