import { BgContainer, Flex, Icon, Text } from "@components";
import { APP_CONSTS } from "@consts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Break = () => {
  return (
    <BgContainer>
      <Flex
        direction={"column"}
        w="100%"
        h="100%"
        alignItems={"center"}
        justifyContent={"center"}
        px={20}
        pb={88}
        overflowY={"scroll"}
      >
        <Text
          textAlign={"center"}
          type={"20_Medium_Multi"}
          color="YONSEI_NAVY"
        >{`🦅 이벤트 종료`}</Text>

        <Flex w="100%" justifyContent={"center"}>
          <Flex position="relative">
            <Image
              alt={"waiting state result"}
              src={`/images/talking_eagle.png`}
              priority
              width={80}
              height={80}
              style={{ width: 80, height: 80 }}
            />
          </Flex>
        </Flex>
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
            {`그동안 독수리 사진관을\n사랑해 주신 모든 분들께\n진심으로 감사드립니다 🦅💙`}
          </Text>

          <Flex alignItems={"center"} mt={52}>
            <Icon name={"alert_circle"} size={16} />
            <Text type="14_Light_Single" color={"YONSEI_BABY_GRAY"} ml={2}>
              궁금한 사항이 있으신 경우 문의를 남겨주세요
            </Text>
          </Flex>

          <Link href={APP_CONSTS.KAKAO_CHANNEL_CHAT_URL}>
            <Text type="14_Light_Single" color={"YONSEI_CHARCOAL"} mt={14}>
              1:1 문의하기
            </Text>
          </Link>
        </Flex>
      </Flex>
    </BgContainer>
  );
};

export default React.memo(Break);
