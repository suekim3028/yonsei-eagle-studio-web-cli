"use client";

import { useStepContext } from "@app/generate/StepContext";
import { Button, Flex, NavBar, Text } from "@components";
import ScreenTemplate from "../../ScreenTemplate/ScreenTemplate";

const ConfirmPhotos = () => {
  const { goNext, goPrev: _goPrev, photos, setPhotos } = useStepContext();

  const goPrev = () => {
    setPhotos([]);
    _goPrev("CONFIRM_PHOTOS");
  };

  return (
    <ScreenTemplate mention={`이 사진들로 AI 프로필을 만들까요?`}>
      <NavBar onClick={goPrev} />
      <Flex w="100%" px={20} direction={"column"} alignItems={"center"}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: 8,
            rowGap: 12,
          }}
        >
          {photos.map((photo) => (
            <img
              src={photo}
              style={{
                aspectRatio: "1/1.3",
                width: "100%",
                objectFit: "cover",
                backgroundColor: "gray",
                borderRadius: 32,
              }}
            />
          ))}
        </div>
        <Button
          type={"BABY_GRAY"}
          title={"다시 등록하기"}
          size="M"
          stretch
          mt={20}
          onClick={goPrev}
        />

        <Button
          type={"WHITE"}
          textColor="YONSEI_CHARCOAL"
          title={"사진 등록 가이드 다시 보기"}
          size="S"
          mt={12}
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
          onClick={() => goNext("CONFIRM_PHOTOS")}
        />
      </Flex>
    </ScreenTemplate>
  );
};

export default ConfirmPhotos;
