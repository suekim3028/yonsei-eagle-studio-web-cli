"use client";

import { useStepContext } from "@app/generate/StepContext";
import { Button, Flex, NavBar } from "@components";
import { ModalManager, commonHooks } from "@web-core";
import { useState } from "react";
import PhotoExamplesModal from "../../PhotoExamplesModal/PhotoExamplesModal";
import ScreenTemplate from "../../ScreenTemplate/ScreenTemplate";

const ConfirmPhotos = () => {
  const { goNext, goPrev: _goPrev, photos, setPhotos } = useStepContext();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const goPrev = () => {
    setPhotos([]);
    _goPrev("CONFIRM_PHOTOS");
  };

  commonHooks.useAsyncEffect(async () => {
    const promises = photos.map((image) => {
      return new Promise((resolve: (value: string | null) => void) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          if (!e.target?.result) return resolve(null);
          resolve(e.target.result as string);
        };
        fileReader.readAsDataURL(image);
      });
    });
    const _imageUrls = (await Promise.all(promises)).filter(
      (i) => typeof i === "string"
    ) as string[];

    setImageUrls(_imageUrls);
  }, [photos]);

  const openExampleModal = () =>
    ModalManager.show({
      Component: <PhotoExamplesModal />,
      closeOnDim: true,
      position: "bottom",
    });

  return (
    <ScreenTemplate mention={`이 사진들로 AI 프로필을 만들까요?`}>
      <NavBar onClick={goPrev} />
      <Flex w="100%" px={20} direction={"column"} alignItems={"center"}>
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
          mb={20}
          onClick={openExampleModal}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: 8,
            rowGap: 12,
          }}
        >
          {imageUrls.map((imageUrl, idx) => (
            <img
              src={imageUrl}
              key={`IMAGE_${idx}`}
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
      </Flex>
      <Flex w="100%" p={20} bgColor={"WHITE"}>
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
