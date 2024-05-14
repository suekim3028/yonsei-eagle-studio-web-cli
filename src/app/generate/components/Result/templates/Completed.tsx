import { Button, Flex, Text } from "@components";
import { PhotoTypes } from "@types";
import { commonUtils } from "@utils";
import { jsUtils } from "@web-core";
import Image from "next/image";
import React, { useState } from "react";
import CompletedLanding from "../components/CompletedLanding";

const INITIAL_FRAME_ID = 2;
const FRAME_NUM = 8;
const BG: { start: string; end: string }[] = [
  {
    start: "#DDEAFF",
    end: "#C0D9FE",
  },
  {
    start: "#C1D9FF",
    end: "#9BBCF2",
  },
  {
    start: "#8FB6F4",
    end: "#6793DB",
  },
  {
    start: "#8FB6F4",
    end: "#3463DC",
  },
];

const Completed = ({
  resultImage,
  imageProcessType,
}: {
  imageProcessType: PhotoTypes.ProcessType;
  resultImage: PhotoTypes.Info;
}) => {
  const [showResult, onShowResult] = useState(false);

  const { imageUrl } = resultImage || {};
  const background = jsUtils.getRandomArrItem(BG);

  const downloadImage = () => {
    // TODO
  };

  if (!showResult)
    return (
      <CompletedLanding
        {...{
          resultImage,
          imageProcessType,
        }}
        show={() => onShowResult(true)}
      />
    );

  return (
    <Flex
      direction={"column"}
      w="100%"
      alignItems={"center"}
      bgRgbColor="#008CFF"
      minH={"100dvh"}
      pb={30}
    >
      <Flex w="100%" direction={"column"} py={40} alignItems={"center"}>
        <Text type="16_Light_Single" color="YONSEI_NAVY">
          {12}번째 독수리님
        </Text>
        <Text type="20_Bold_Single" fontSize={28} lineHeight={"33.6px"} mt={12}>
          내 AI 프로필 완성!
        </Text>
      </Flex>

      <Flex w={"100%"}>
        <Flex overflowX={"scroll"} gap={5} px={20}>
          {Array.from({ length: FRAME_NUM }, (_, i) => {
            return (
              <Flex
                w={286.84}
                h={320}
                position={"relative"}
                background={`linear-gradient(180deg, ${background.start}, ${background.end})`}
              >
                <Image
                  alt={"image"}
                  src={imageUrl}
                  width={261.14}
                  height={261.14}
                  style={{
                    position: "absolute",
                    top: 12.75,
                    left: 12.75,
                    zIndex: 0,
                  }}
                />
                <Image
                  style={{ zIndex: 1 }}
                  alt={`image_frame_${i}`}
                  src={`/images/frames/frame-${i}.png`}
                  width={286.64}
                  height={320}
                />
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      <Flex w="100%" py={36}></Flex>

      <Flex direction={"column"} w="100%" p={20}>
        <Flex position={"relative"}>
          <Image
            src={"/images/happy_eagle_arm.svg"}
            alt={"eagle_icon_arm"}
            width={112}
            height={118}
            style={{
              width: 112,
              height: 118,
              position: "absolute",
              right: -10,
              bottom: 8,
              zIndex: 3,
            }}
          />
          <Image
            src={"/images/happy_eagle_body.svg"}
            alt={"eagle_icon_body"}
            width={112}
            height={118}
            style={{
              width: 112,
              height: 118,
              position: "absolute",
              right: -10,
              bottom: 8,
              zIndex: 0,
            }}
          />
          <Flex w={"100%"} zIndex={1}>
            <Button
              type={"NAVY_GRADIENT"}
              title="이미지 다운로드"
              onClick={downloadImage}
              size="L"
              stretch
            />
          </Flex>
        </Flex>
        <Button
          mt={12}
          stretch
          type={"WHITE"}
          title={"스토리에 공유하기"}
          icon={"instagram"}
          size="L"
        />
      </Flex>
      <Text
        type="14_Light_Multi"
        color={"WHITE"}
        textAlign={"center"}
      >{`@instagram_id 를 태그해주면 기쁠거에요!\n즐거운 아카라카 되세요 🤍`}</Text>
      <Flex mt={80} direction={"column"}>
        <Button
          type={"WHITE"}
          title={"친구에게 알려주기"}
          onClick={commonUtils.sharedPage}
        />
        <Button type={"WHITE"} title={"처음으로"} mt={12} />
      </Flex>
    </Flex>
  );
};

export default React.memo(Completed);
