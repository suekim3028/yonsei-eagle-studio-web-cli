"use client";

import { useStepContext } from "@app/generate/StepContext";
import { Button, Flex, Icon, NavBar, Text } from "@components";
import ScreenTemplate from "../../ScreenTemplate/ScreenTemplate";

const ConfirmPhotos = () => {
  const { goNext, goPrev, photos } = useStepContext();

  return (
    <ScreenTemplate>
      <NavBar onClick={goPrev} />
      <Flex w="100%" px={20} direction={"column"}>
        <Flex w="100%" direction={"row"}>
          <img
            src={"/images/talking_eagle.svg"}
            width={66.32}
            height={62.98}
            style={{ width: 66.32, height: 62.98 }}
          />
          <Flex ml={8} flex={1}>
            <Flex
              bgRgbColor={"#FFFFFFB2"}
              border={"1px solid white"}
              borderRadius={8}
              flex={1}
              py={18}
              pl={22}
            >
              <Text type={"14_Light_Multi"} color={"YONSEI_NAVY"}>
                {`이 사진들로 AI 프로필을 만들까요?`}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: 8,
            rowGap: 12,
            marginTop: 20,
          }}
        >
          {photos.map((photo) => (
            <img
              src={photo}
              style={{
                aspectRatio: "1/1.3",
                width: "100%",
                objectFit: "contain",
                backgroundColor: "gray",
                borderRadius: 32,
              }}
            />
          ))}
        </div>
        <Button
          type={"BABY_GRAY"}
          title={"사진 등록 가이드 다시 보기"}
          size="S"
          icon={"eye"}
          mt={20}
        />
        <Flex>
          <Text
            type={"14_Light_Multi"}
            color={"YONSEI_BABY_GRAY"}
            mt={15}
            mr={8}
          >
            -
          </Text>
          <Text type={"14_Light_Multi"} color={"YONSEI_BABY_GRAY"} mt={15}>
            가이드에 부합하지 않는 사진을 등록할 경우, 나와 닮지 않은 AI
            이미지가 생성될 수 있어요.
          </Text>
        </Flex>
      </Flex>
      <Flex w="100%" p={20}>
        <Button
          type={"NAVY_GRADIENT"}
          stretch
          title={"프로필 생성 시작"}
          onClick={goNext}
        />
      </Flex>
    </ScreenTemplate>
  );
};

export default ConfirmPhotos;
