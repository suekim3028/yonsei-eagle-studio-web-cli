"use client";
import { BgContainer, Button, Flex, Icon, Text } from "@components";
import { APP_CONSTS } from "@consts";
import { WebPushManager } from "@lib";
import { PhotoTypes } from "@types";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useRef } from "react";
import { PushAvailable } from "../components/PushAvailable";
import PushUnavailable from "../components/PushUnavailable";
import Timer from "../components/Timer";

const Processing = ({
  imageProcessType,
  leftSeconds,
}: {
  imageProcessType: PhotoTypes.ProcessType;
  leftSeconds: number;
}) => {
  const hasPushManager = useRef(
    new WebPushManager().status === "INITIALIZED"
  ).current;

  const renderButtons = useCallback(() => {
    if (leftSeconds > 0) {
      return hasPushManager ? <PushAvailable /> : <PushUnavailable />;
    } else {
      return (
        <Flex
          w={"100%"}
          px={20}
          pt={32}
          alignItems={"center"}
          direction={"column"}
        >
          <Text
            type={"16_Light_Single"}
            color="YONSEI_NAVY"
            textAlign={"center"}
          >
            {`앗, 예상보다 많은 트래픽으로\nAI 프로필 생성이 다소 지연되고 있어요.\n잠시 후 다시 접속해 주세요 🥺`}
          </Text>
          <Button
            icon="confetti"
            mt={14}
            type={"NAVY_GRADIENT"}
            title={"결과 확인하기"}
            stretch
            size={"L"}
            disabled
          />

          <Flex alignItems={"center"} mt={52}>
            <Icon name={"alert_circle"} size={16} />
            <Text type="14_Light_Single" color={"YONSEI_BABY_GRAY"} ml={2}>
              지속적 오류가 발생할 경우 문의를 남겨주세요
            </Text>
          </Flex>

          <Link href={APP_CONSTS.KAKAO_CHANNEL_CHAT_URL}>
            <Text type="14_Light_Single" color={"YONSEI_CHARCOAL"} mt={14}>
              1:1 문의하기
            </Text>
          </Link>
        </Flex>
      );
    }
  }, [leftSeconds > 0]);

  return (
    <BgContainer>
      <Flex
        direction={"column"}
        w="100%"
        alignItems={"center"}
        px={20}
        pb={88}
        overflowY={"scroll"}
      >
        <Flex w="100%" py={20} justifyContent={"center"}>
          <Text
            textAlign={"center"}
            type={"20_Medium_Multi"}
            color="YONSEI_NAVY"
          >{`🦅 사진 인화 중...\n조금만 기다려 주세요!`}</Text>
        </Flex>
        <Flex w="100%" justifyContent={"center"}>
          <Flex position="relative">
            <Image
              alt={"waiting state result"}
              src={`/images/blur_result/${
                imageProcessType === "FEMALE" ? "F" : "M"
              }.png`}
              priority
              style={{
                width: 198,
                height: 286,
              }}
              width={198}
              height={286}
            />
            {leftSeconds > 0 && <Timer leftSeconds={leftSeconds} />}
          </Flex>
        </Flex>
        {renderButtons()}
      </Flex>
    </BgContainer>
  );
};

export default React.memo(Processing);
