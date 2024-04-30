"use client";

import { useStepContext } from "@app/generate/StepContext";
import { BackButton, Button, Flex, NavBar, Text } from "@components";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StyleExample from "../../StyleExample/StyleExample";
import ScreenTemplate from "../../ScreenTemplate/ScreenTemplate";

const SelectStyle = () => {
  const router = useRouter();
  const { goNext, style, setStyle } = useStepContext();

  const handleGoNext = () => {
    if (!style) return;
    setStyle(style);
    goNext("SELECT_STYLE");
  };

  return (
    <ScreenTemplate>
      <NavBar />
      <>
        <Flex w="100%" direction={"row"} px={20}>
          <img
            src={"/images/talking_eagle.svg"}
            width={64}
            height={64}
            style={{ width: 64, height: 64 }}
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
                {`독수리사진관에 어서오세요!\n어떤 AI 프로필을 만들어 볼까요?`}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex px={20} w={"100%"} mt={40}>
          {["A", "B"].map((_style, idx) => (
            <StyleExample
              idx={idx}
              key={_style}
              style={_style as "A" | "B"}
              selectedStyle={style}
              onClick={(style) => setStyle((s) => (s === style ? null : style))}
            />
          ))}
        </Flex>
        <Text type={"14_Light_Multi"} color={"YONSEI_BABY_GRAY"} mt={20}>
          원하는 프로필 컨셉을 골라주세요
        </Text>
      </>
      {!!style && (
        <Flex w="100%" p={20}>
          <Button
            type={"NAVY_GRADIENT"}
            stretch
            title={"선택 완료"}
            onClick={handleGoNext}
          />
        </Flex>
      )}
    </ScreenTemplate>
  );
};

export default SelectStyle;
