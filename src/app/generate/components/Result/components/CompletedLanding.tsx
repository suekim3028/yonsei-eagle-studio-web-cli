import { BgContainer, Button, Flex, Text } from "@components";
import { PhotoTypes } from "@types";
import Image from "next/image";
import React from "react";

const CompletedLanding = ({
  imageProcessType,
  show,
}: {
  imageProcessType: PhotoTypes.ProcessType;
  show: () => void;
}) => {
  return (
    <BgContainer>
      <Flex direction={"column"} w="100%" pt={112} alignItems={"center"}>
        <Image
          alt={"waiting state result"}
          src={`/images/blur_result/${
            imageProcessType === "FEMALE" ? "F" : "M"
          }.png`}
          style={{
            width: 198,
            height: 286,
          }}
          width={198}
          height={286}
        />
        <Flex w={"100%"} p={20} alignItems={"center"} direction={"column"}>
          <Text type={"16_Light_Single"} color="YONSEI_NAVY">
            나만의 AI 프로필이 준비됐어요!
          </Text>
          <Button
            icon="confetti"
            mt={14}
            type={"NAVY_GRADIENT"}
            title={"결과 확인하기"}
            stretch
            size={"L"}
            onClick={show}
          />
        </Flex>
      </Flex>
    </BgContainer>
  );
};

export default React.memo(CompletedLanding);
