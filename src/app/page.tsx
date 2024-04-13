// "use client";
import { L } from "@web-core";
import Image from "next/image";
import * as S from "./styles";
import { Button, Text } from "@components";

export default function Home() {
  return (
    <S.Main>
      <L.Flex w={"100%"} py={"12px"} px={"20px"}>
        <Button title="1:1문의하기" type="WHITE" size="XS" icon={"kakaotalk"} />
      </L.Flex>

      <L.Flex direction={"column"} alignItems={"center"} w={"100%"}>
        <img src={"/images/main/title.png"} width={"100%"} />
        <Text type={"16_Light_Multi"} mt={32} color={"YONSEI_NAVY"}>
          2024 아카라카를 기념할
        </Text>
        <Text type={"16_Medium_Multi"} color={"YONSEI_NAVY"}>
          나만의 AI 프로필 만들기!
        </Text>
        <L.Flex
          p={"20px 60px"}
          w={"100%"}
          direction={"column"}
          alignItems={"center"}
        >
          <Button title={"시작하기"} type={"NAVY_GRADIENT"} stretch />
          <Button
            title={"친구에게 알려주기"}
            type={"WHITE"}
            size={"M"}
            mt={8}
          />
          <img
            src={"/images/main/ribbon_sticker.svg"}
            style={{ alignSelf: "flex-end" }}
          />
          <img
            src={"/images/main/gdsc_sticker.svg"}
            style={{ alignSelf: "flex-start" }}
          />
        </L.Flex>
      </L.Flex>
    </S.Main>
  );
}
