import { Button, Flex, Text } from "@components";
import { StartButtons } from "@components/app";
import { APP_CONSTS } from "@consts";
import * as S from "./styles";

const Home = () => {
  return (
    <S.Main>
      <Flex w={"100%"} py={"12px"} px={"20px"}>
        <Button
          title="1 : 1 문의하기"
          type="WHITE"
          size="XS"
          icon={"kakaotalk"}
          href={APP_CONSTS.KAKAO_CHANNEL_CHAT_URL}
          openInNewTab
        />
      </Flex>
      <Flex direction={"column"} alignItems={"center"} w={"100%"} mt={11}>
        <div style={{ position: "relative" }}>
          <img
            src={"/images/logo_icon.svg"}
            width={56}
            height={52}
            style={{
              width: 56,
              height: 52,
              position: "absolute",
              right: -64,
              bottom: -3,
            }}
          />
          <img
            src={"/images/logo_title.png"}
            width={141.46}
            height={82.26}
            style={{ width: 141.46, height: 82.26 }}
          />
        </div>
        <img
          src={"/images/main/sample_images.png"}
          width={586.36}
          height={286}
          style={{ width: 586.36, height: 286, marginTop: 30 }}
        />
        <Text type={"16_Light_Multi"} mt={32} color={"YONSEI_NAVY"}>
          2024 아카라카를 기념할
        </Text>
        <Text type={"16_Medium_Multi"} color={"YONSEI_NAVY"}>
          나만의 AI 프로필 만들기!
        </Text>
        <StartButtons />
        <Flex
          p={"20px 60px"}
          w={"100%"}
          direction={"column"}
          alignItems={"center"}
        >
          <img
            src={"/images/main/ribbon_sticker.svg"}
            style={{ alignSelf: "flex-end" }}
          />
          <img
            src={"/images/main/gdsc_sticker.svg"}
            style={{ alignSelf: "flex-start" }}
          />
        </Flex>
      </Flex>
    </S.Main>
  );
};

export default Home;
