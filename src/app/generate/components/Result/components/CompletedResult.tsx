import { Button, Flex, Text } from "@components";
import { commonUtils } from "@utils";
import { commonHooks, jsUtils } from "@web-core";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ButtonEagle from "./ButtonEagle";
import LoadingBeforeResult from "./LoadingBeforeResult";

const Completed = ({ imageUrl }: { imageUrl: string }) => {
  const router = useRouter();

  const [imageUrlList, setImageUrlList] = useState<null | string[]>(null);
  const blobs = useRef<(Blob | null)[]>(
    Array.from({ length: FRAME_NUM }, () => null)
  );

  const [loading, setLoading] = useState(true);
  const canDownload = useRef(
    "canShare" in navigator && "share" in navigator
    // true
  ).current;

  const background = useMemo(() => jsUtils.getRandomArrItem(BG), []);

  const imageGenerationResolver = useRef<(value: null) => void>();
  const imageGenerationWaiter = useRef<Promise<null>>();

  const rendered = useRef(false);

  const download = () => {
    imageUrlList &&
      jsUtils.downloadImages(
        imageUrlList,
        blobs.current.filter((blob): blob is Blob => !!blob),
        (i) => `eagle_studio_profile_${i}.png`,
        {
          type: "image/png",
        }
      );
  };

  const shareStory = () => {
    alert("1");
  };

  commonHooks.useAsyncEffect(async () => {
    if (rendered.current) return;
    rendered.current = true;
    // 생성된 이미지로 html element 만들기
    imageGenerationWaiter.current = new Promise(
      (r) => (imageGenerationResolver.current = r)
    );

    const frameImageSrc = Array.from(
      { length: FRAME_NUM },
      (_, i) => `/images/frames/frame-${i}.png`
    );

    const frameImages = await Promise.all(
      frameImageSrc.map(
        (f) =>
          new Promise((resolve: (image: HTMLImageElement) => void) => {
            const frameImage = document.createElement("img");
            frameImage.crossOrigin = "anonymous";
            frameImage.onload = () => {
              resolve(frameImage);
            };
            frameImage.src = f;
          })
      )
    );

    const profileImage = await new Promise(
      (resolve: (image: HTMLImageElement) => void) => {
        const image = document.createElement("img");
        image.crossOrigin = "anonymous";
        image.addEventListener("load", () => {
          resolve(image);
        });
        image.src = imageUrl;
      }
    );

    frameImages.forEach(async (frameImage, i) => {
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

      ctx.drawImage(
        profileImage,
        BORDER_START,
        BORDER_START,
        IMAGE_SIZE,
        IMAGE_SIZE
      );
      ctx.drawImage(frameImage, -1, -1, BG_WIDTH + 2, BG_HEIGHT + 2);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = window.URL.createObjectURL(blob);

        blobs.current = [
          ...blobs.current.slice(0, i),
          blob,
          ...blobs.current.slice(i + 1),
        ];

        if (blobs.current.every(Boolean)) {
          setImageUrlList(
            (blobs.current as Blob[]).map((blob) =>
              window.URL.createObjectURL(blob)
            )
          );
          imageGenerationResolver.current &&
            imageGenerationResolver.current(null);
        }
      }, "image/png");
    });
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      await imageGenerationWaiter.current;
      setLoading(false);
    }, 2000);
  }, []);

  return loading ? (
    <LoadingBeforeResult />
  ) : (
    <Flex
      style={{ visibility: loading ? "hidden" : "visible" }}
      overflow={loading ? "hidden" : "scroll"}
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
        <Text
          type="20_Bold_Single"
          fontSize={28}
          lineHeight={"33.6px"}
          mt={12}
          color="WHITE"
        >
          내 AI 프로필 완성!
        </Text>
      </Flex>

      <Flex w={"100%"}>
        <Flex overflowX={"scroll"} gap={5} px={20}>
          {imageUrlList &&
            imageUrlList.map((imageUrl, i) => (
              <img
                key={i}
                fetchPriority="high"
                loading="eager"
                style={{ zIndex: 1, width: 286.64, height: 320 }}
                alt={`result_image_${i}`}
                src={imageUrl}
                width={286.64}
                height={320}
              />
            ))}
        </Flex>
      </Flex>
      <Flex w="100%" py={36}></Flex>

      <Flex direction={"column"} w="100%" p={20}>
        <Flex position={"relative"} direction={"column"}>
          <div onClick={canDownload ? download : shareStory}>
            <ButtonEagle />
          </div>
          {canDownload && (
            <Flex w={"100%"} zIndex={1}>
              <Button
                type={"NAVY_GRADIENT"}
                title="이미지 다운로드"
                onClick={download}
                size="L"
                stretch
              />
            </Flex>
          )}
          <Flex w={"100%"} zIndex={1}>
            <Button
              mt={canDownload ? 12 : 0}
              stretch
              type={"WHITE"}
              title={"스토리에 공유하기"}
              icon={"instagram"}
              size="L"
              onClick={shareStory}
            />
          </Flex>
        </Flex>
      </Flex>
      <Text
        type="14_Light_Multi"
        color={"WHITE"}
        textAlign={"center"}
      >{`@eaglefilm_yonsei 를 태그해주면 기쁠 거예요!\n즐거운 대동제 되세요 🤍`}</Text>
      <Flex mt={80} direction={"column"}>
        <Button
          type={"WHITE"}
          title={"친구에게 알려주기"}
          onClick={commonUtils.sharePage}
        />
        <Button
          type={"WHITE"}
          title={"처음으로"}
          mt={12}
          onClick={() => router.replace("/")}
        />
      </Flex>
    </Flex>
  );
};

const RATIO = 1.1159499183;
const BORDER_RATIO = 0.04337915079;
const BG_WIDTH = 1200;
const BG_HEIGHT = BG_WIDTH * RATIO;
const BORDER_START = BG_WIDTH * BORDER_RATIO;
const IMAGE_SIZE = BG_WIDTH * (1 - BORDER_RATIO * 2);

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

export default React.memo(Completed);
