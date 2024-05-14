import { Button, Flex, Text } from "@components";
import { PhotoTypes } from "@types";
import { commonUtils } from "@utils";
import { jsUtils } from "@web-core";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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

  const [imageUrlList, setImageUrlList] = useState<(string | null)[]>(
    Array.from({ length: FRAME_NUM }, () => null)
  );

  const { imageUrl } = resultImage || {};
  const background = jsUtils.getRandomArrItem(BG);

  const downloadImage = () => {
    // TODO
  };

  const imageLoadRef = useRef(
    new Promise((resolve: (value: HTMLImageElement) => void) => {
      const image = document.createElement("img");
      image.crossOrigin = "anonymous";
      image.addEventListener("load", () => {
        console.log("LOAD!");
        resolve(image);
      });
      image.src = imageUrl;
    })
  ).current;

  const RATIO = 1.1156096897;
  const BORDER_RATIO = 0.04337915079;
  const BG_WIDTH = 1200;
  const BG_HEIGHT = BG_WIDTH * RATIO;
  const BORDER_START = BG_WIDTH * BORDER_RATIO;
  const IMAGE_SIZE = BG_WIDTH * (1 - BORDER_RATIO * 2);

  useEffect(() => {
    Array.from({ length: FRAME_NUM }, (_, i) => {
      const bgImage = document.createElement("img");
      bgImage.crossOrigin = "anonymous";
      const canvas = document.createElement("canvas");
      canvas.width = BG_WIDTH;
      canvas.height = BG_HEIGHT;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const gradient = ctx.createLinearGradient(
        BG_WIDTH * 0.5,
        0,
        BG_WIDTH * 0.5,
        BG_HEIGHT
      );
      gradient.addColorStop(0, background.start);
      gradient.addColorStop(1, background.end);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, BG_WIDTH, BG_HEIGHT);

      bgImage.addEventListener("load", async () => {
        const image = await imageLoadRef;
        console.log({ image });

        ctx.drawImage(
          image,
          BORDER_START,
          BORDER_START,
          IMAGE_SIZE,
          IMAGE_SIZE
        );
        ctx.drawImage(bgImage, 0, 0, BG_WIDTH, BG_HEIGHT);
        const dataUrl = canvas.toDataURL("image/png");
        console.log({ dataUrl });

        setImageUrlList((p) => [...p.slice(0, i), dataUrl, ...p.slice(i + 1)]);
      });
      bgImage.src = `/images/frames/frame-${i}.png`;
    });
  }, []);

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
          {imageUrlList.map((imageUrl, i) => {
            if (!imageUrl) return <></>;
            return (
              <Image
                key={imageUrl}
                style={{ zIndex: 1 }}
                alt={`result_image_${i}`}
                src={imageUrl}
                width={286.64}
                height={320}
                crossOrigin="anonymous"
              />
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
