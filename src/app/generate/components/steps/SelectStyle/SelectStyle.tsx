"use client";

import { useStepContext } from "@app/generate/StepContext";
import { Button, Flex, NavBar, Text } from "@components";
import { PhotoTypes } from "@types";
import { useRouter } from "next/navigation";
import ScreenTemplate from "../../ScreenTemplate/ScreenTemplate";
import StyleExample from "../../StyleExample/StyleExample";

const SelectProcessType = () => {
  const router = useRouter();
  const { goNext, imageProcessType, setImageProcessType } = useStepContext();

  const handleGoNext = () => {
    if (!imageProcessType) return;
    setImageProcessType(imageProcessType);
    goNext("SELECT_STYLE");
  };

  return (
    <ScreenTemplate
      mention={`독수리사진관에 어서오세요!\n어떤 AI 프로필을 만들어 볼까요?`}
    >
      <NavBar onClick={() => router.replace("/")} />
      <>
        <Flex px={20} w={"100%"} mt={20}>
          {["F", "M"].map((_imageProcessType, idx) => (
            <StyleExample
              idx={idx}
              key={_imageProcessType}
              type={_imageProcessType as PhotoTypes.ProcessType}
              selected={imageProcessType}
              onClick={(imageProcessType) =>
                setImageProcessType((s) =>
                  s === imageProcessType ? null : imageProcessType
                )
              }
            />
          ))}
        </Flex>
        <Text type={"14_Light_Multi"} color={"YONSEI_BABY_GRAY"} mt={20}>
          원하는 프로필 컨셉을 골라주세요
        </Text>
      </>
      {!!imageProcessType && (
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

export default SelectProcessType;
