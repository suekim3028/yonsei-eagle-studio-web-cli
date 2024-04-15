"use client";

import { useStepContext } from "@app/generate/StepContext";
import { BackButton, Button, Flex, Icon, NavBar, Text } from "@components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StyleExample from "../../StyleExample/StyleExample";
import { commonHooks } from "@web-core";

const SelectPhotos = () => {
  const { goNext, goPrev, setPhotos } = useStepContext();

  const handleOnFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    console.log("============");
    const { files: fileList } = e.target;
    console.log({ fileList });
    if (!fileList) return;

    const images = Array.from({ length: fileList.length }, (_, i) => i).flatMap(
      (i) => {
        const file = fileList.item(i);
        if (!file) return [];
        return [file];
      }
    );

    console.log({ images });

    const promises = images.map((image) => {
      return new Promise((resolve: (value: string | null) => void) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          if (!e.target?.result) return resolve(null);
          resolve(e.target.result as string);
        };
        fileReader.readAsDataURL(image);
      });
    });
    const imageUrls = await Promise.all(promises);

    setPhotos(imageUrls.filter((i) => typeof i === "string") as string[]);
    goNext();
  };

  return (
    <Flex
      w="100%"
      h={"100dvh"}
      direction={"column"}
      alignItems={"center"}
      bgColor={"WHITE"}
    >
      <Flex justifyContent={"space-between"} w={"100%"} px={20} py={12}>
        <BackButton onClick={goPrev} />
        <Flex></Flex>
      </Flex>
      <input
        type="file"
        id="input"
        multiple
        onChange={handleOnFileChange}
        style={{ width: 200, height: 200 }}
        accept="image/*"
      />
    </Flex>
  );
};

export default SelectPhotos;
