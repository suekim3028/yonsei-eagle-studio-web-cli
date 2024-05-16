import { BgContainer, Button, Flex, Text } from "@components";
import Loading from "@public/lottie/loading.json";
import { PhotoTypes } from "@types";
import Image from "next/image";
import { useState } from "react";
import Lottie from "react-lottie";

const CompletedLanding = ({
  imageProcessType,
  show,
}: {
  imageProcessType: PhotoTypes.ProcessType;
  show: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    setTimeout(() => {
      show();
    }, 2000);
  };
  if (!loading)
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
              onClick={load}
            />
          </Flex>
        </Flex>
      </BgContainer>
    );

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

export default CompletedLanding;
