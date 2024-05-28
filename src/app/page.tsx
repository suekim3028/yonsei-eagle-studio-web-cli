import { Button, Carousel, Flex, Text } from "@components";
import { StartButtons } from "@components/app";
import BottomSection from "@components/app/BottomSection/BottomSection";
import { APP_CONSTS } from "@consts";
import Image from "next/image";

const Home = () => {
  return (
    <Flex
      direction={"column"}
      alignItems={"flex-start"}
      minH={"100vh"}
      bgImage={"/images/main/bg.png"}
      w={"100%"}
      pb={63}
      backgroundSize={"cover"}
    >
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
          <Image
            src={"/images/logo_icon.svg"}
            alt={"Logo"}
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
          <Image
            src={"/images/logo_title.png"}
            alt={"logo_title"}
            width={141.46}
            height={82.26}
            style={{ width: 141.46, height: 82.26 }}
          />
        </div>
        <Flex w="100%" mt={30}>
          <Carousel
            images={[1, 2, 3, 4].map((n) => `/images/main/image_${n}.png`)}
            gap={14}
            px={100}
            width={198}
            height={286}
            center={1}
          />
        </Flex>

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
          <Image
            width={56}
            height={66}
            alt={"ribbon sticker"}
            src={"/images/main/ribbon_sticker.svg"}
            style={{ alignSelf: "flex-end" }}
          />
          <Image
            alt={"gdsc sticker"}
            width={100}
            height={62}
            src={"/images/main/gdsc_sticker.svg"}
            style={{ alignSelf: "flex-start" }}
          />
        </Flex>
      </Flex>
      <BottomSection />
    </Flex>
  );
};

export default Home;
