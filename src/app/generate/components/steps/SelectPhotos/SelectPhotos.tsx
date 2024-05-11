"use client";

import { useStepContext } from "@app/generate/StepContext";
import { Button, Flex, NavBar, Text } from "@components";
import { GEN_CONSTS } from "@consts";
import { useRef } from "react";
import ScreenTemplate from "../../ScreenTemplate/ScreenTemplate";

const { MIN: NUM_MIN, MAX: NUM_MAX } = GEN_CONSTS.NUM_OF_PHOTOS;
const SelectPhotos = () => {
  const { goNext, goPrev, setPhotos, photos } = useStepContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const { files: fileList } = e.target;

    if (!fileList) {
      alert(`사진을 최소 ${NUM_MIN}장 이상 등록해주세요!`);
      return;
    }

    const files = Array.from({ length: fileList.length }, (_, i) => i).flatMap(
      (i) => {
        const file = fileList.item(i);
        if (!file) return [];
        return [file];
      }
    );

    setPhotos(files);

    if (GEN_CONSTS.NUM_OF_PHOTOS.MIN > files.length) {
      alert(`사진을 최소 ${NUM_MIN}장 이상 등록해주세요!`);
      return;
    }

    if (files.length > GEN_CONSTS.NUM_OF_PHOTOS.MAX) {
      alert(`사진을 ${NUM_MAX}장 이하로 등록해주세요!`);
      return;
    }

    goNext("SELECT_PHOTOS");
  };

  const clickInput = () => {
    inputRef.current?.click();
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <input
        style={{
          position: "absolute",
          top: -10000,
          left: -10000,
          width: 0,
          height: 0,
          display: "none",
        }}
        accept="image/*"
        type={"file"}
        ref={inputRef}
        multiple
        onChange={handleOnFileChange}
      />
      <ScreenTemplate mention="아래 버튼을 눌러 사진을 올려주세요">
        <NavBar onClick={() => goPrev("UPLOAD_DESCRIPTION")} />
        <>
          <Flex
            direction={"column"}
            py={71.5}
            w="100%"
            px={47.5}
            alignItems={"center"}
          >
            <Text type="16_Light_Single" color="BLUE" mb={20}>
              📢 사진을 5장 이상 등록해 주세요
            </Text>
            <Button
              stretch
              type={"BLUE"}
              size="L"
              title={"파일 업로드하기"}
              icon="gallery"
              onClick={clickInput}
            />

            <Button
              mt={12}
              type={"WHITE"}
              size="S"
              title={"사진 등록 가이드 다시 보기"}
              textColor="YONSEI_CHARCOAL"
            />
          </Flex>
          <Flex py={15} px={20}>
            <Text type={"14_Light_Multi"} color={"YONSEI_BABY_GRAY"} mr={8}>
              -
            </Text>
            <Text type={"14_Light_Multi"} color={"YONSEI_BABY_GRAY"}>
              가이드에 부합하지 않는 사진을 등록할 경우, 나와 닮지 않은 AI
              이미지가 생성될 수 있어요.
            </Text>
          </Flex>
        </>
        <Flex
          w="100%"
          p={20}
          bgColor={"WHITE"}
          direction={"column"}
          alignItems={"center"}
        >
          <Button
            disabled
            type={"NAVY_GRADIENT"}
            stretch
            title={"프로필 생성 시작"}
            onClick={() => goNext("UPLOAD_DESCRIPTION")}
          />
        </Flex>
      </ScreenTemplate>
    </div>
  );
};

export default SelectPhotos;
