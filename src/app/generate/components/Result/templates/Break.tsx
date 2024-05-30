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
        >{`🦅 독수리는 휴식 중...`}</Text>

        <Flex w="100%" justifyContent={"center"}>
          <Flex position="relative">
            <Image
              alt={"waiting state result"}
              src={`/images/crying_eagle.svg`}
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
            {`예상보다 많은 트래픽으로\nAI 프로필 생성이 지연되고 있어요 🥺`}
          </Text>
          <Text
            my={8}
            type={"16_Medium_Single"}
            color="YONSEI_NAVY"
            textAlign={"center"}
          >
            오후 7시부터 다시 서비스 이용이 가능해요.
          </Text>
          <Text
            type={"16_Light_Single"}
            color="YONSEI_NAVY"
            textAlign={"center"}
          >
            조금만 기다려 주세요!
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
